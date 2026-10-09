import { useEffect, useState, type FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Paperclip, X } from "lucide-react";
import { Avatar, Button, ButtonLink, Field, Input, Loading, Select, Textarea } from "../../components/ui";
import { api } from "../../services/api";
import { useDemo } from "../../services/store";
import { toast } from "../../services/toast";
import { CHAPTERS, DAYS_LONG, REQUEST_KIND_LABEL, REQUEST_STATUS_LABEL, SUBJECTS, chapter, institution, subject } from "../../data/mock";
import type { HelpRequest, RequestKind, Slot, Student } from "../../data/types";

export function Component() {
  const [params] = useSearchParams();
  const toId = params.get("to") ?? "";
  const [to, setTo] = useState<Student | null | undefined>(null);
  const [subjectId, setSubjectId] = useState("");
  const [chapterId, setChapterId] = useState(params.get("chapter") ?? "");
  const [kind, setKind] = useState<RequestKind>("comprendre");
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState<string | undefined>();
  const [slot, setSlot] = useState<Slot | undefined>();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [sentId, setSentId] = useState<string | null>(null);
  const live = useDemo((s) => s.requests.find((r) => r.id === sentId));

  useEffect(() => {
    document.title = "Nouvelle demande d'aide — CAMPUUS";
    api().getStudent(toId).then((s) => {
      setTo(s);
      if (s && !subjectId) {
        const first = chapterId ? chapter(chapterId).subjectId : chapter(s.masters[0]).subjectId;
        setSubjectId(first);
      }
    });
  }, [toId]); // eslint-disable-line react-hooks/exhaustive-deps

  if (to === null) return <Loading label="Chargement…" />;
  if (!to) return <p>Choisis d'abord un étudiant : <Link to="/app/trouver">trouver un étudiant</Link>.</p>;
  const chapters = CHAPTERS.filter((c) => c.subjectId === subjectId);
  const masters = chapters.filter((c) => to.masters.includes(c.id));

  async function submit(e: FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!subjectId) errs.subject = "Choisis la matière.";
    if (!chapterId) errs.chapter = "Choisis le chapitre qui bloque.";
    if (message.trim().length < 15) errs.message = "Décris ton blocage en une ou deux phrases (15 caractères au moins) : l'autre saura comment t'aider.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSending(true);
    try {
      const r = await api().sendHelpRequest({ toId: to!.id, subjectId, chapterId, kind, message: message.trim(), attachment, slot });
      setSentId(r.id);
      toast(`Demande envoyée à ${to!.pseudo}.`, "/app/demandes");
    } catch {
      setErrors({ form: "L'envoi a échoué. Réessaie." });
    } finally {
      setSending(false);
    }
  }

  if (sentId && live) return <Sent request={live} to={to} />;

  return (
    <div className="screen">
      <p><Link to={`/app/etudiants/${to.id}`}>← Profil de {to.pseudo}</Link></p>
      <div className="screen__head">
        <div>
          <h1>Demander de l'aide</h1>
          <p>Une demande précise reçoit une réponse précise. Dis quel chapitre, quel blocage, et propose un créneau.</p>
        </div>
      </div>
      <form className="form-card" onSubmit={submit} noValidate>
        <div className="to-card">
          <Avatar student={to} size={40} />
          <span><b>{to.pseudo}</b><small>{to.field} · {to.level}{to.showInstitution ? ` · ${institution(to.institutionId).short}` : ""}</small></span>
        </div>
        <div className="edit-grid">
          <Field id="subject" label="Matière" error={errors.subject}>
            <Select id="subject" value={subjectId} onChange={(e) => { setSubjectId(e.target.value); setChapterId(""); }}>
              <option value="">Choisir…</option>
              {SUBJECTS.map((s) => <option key={s.id} value={s.id}>{s.name}{to.masters.some((m) => chapter(m).subjectId === s.id) ? " · explique" : ""}</option>)}
            </Select>
          </Field>
          <Field id="chapter" label="Chapitre" error={errors.chapter} hint={masters.length ? `${to.pseudo} se déclare à l'aise sur ${masters.length} chapitre${masters.length > 1 ? "s" : ""} de cette matière.` : undefined}>
            <Select id="chapter" value={chapterId} onChange={(e) => setChapterId(e.target.value)} disabled={!subjectId}>
              <option value="">Choisir…</option>
              {chapters.map((c) => <option key={c.id} value={c.id}>{c.name}{to.masters.includes(c.id) ? " ✓" : ""}</option>)}
            </Select>
          </Field>
        </div>
        <fieldset className="field" style={{ border: 0, padding: 0, margin: 0 }}>
          <legend className="field__label">Nature du blocage</legend>
          <div className="radios">
            {(Object.keys(REQUEST_KIND_LABEL) as RequestKind[]).map((k) => (
              <label key={k}><input type="radio" name="kind" value={k} checked={kind === k} onChange={() => setKind(k)} />{REQUEST_KIND_LABEL[k]}</label>
            ))}
          </div>
        </fieldset>
        <Field id="message" label="Ton message" error={errors.message} hint="Ce que tu as compris, ce qui bloque, ce que tu as déjà essayé.">
          <Textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Ex. Je comprends la formule de la VAN mais pas pourquoi on actualise chaque flux séparément…" aria-invalid={!!errors.message} />
        </Field>
        <Field id="file" label="Pièce jointe" optional hint="Photo de l'énoncé, PDF du cours. Dans la démo, seul le nom du fichier est conservé.">
          <div className="attach">
            <label className="btn btn--secondary btn--sm" htmlFor="file"><Paperclip size={14} /> Joindre un fichier<input id="file" type="file" onChange={(e) => setAttachment(e.target.files?.[0]?.name)} /></label>
            {attachment ? <span className="attach__name">{attachment}<button type="button" aria-label="Retirer la pièce jointe" onClick={() => setAttachment(undefined)}><X size={14} /></button></span> : null}
          </div>
        </Field>
        {to.slots.length ? (
          <fieldset className="field" style={{ border: 0, padding: 0, margin: 0 }}>
            <legend className="field__label">Créneau proposé <span className="field__optional">facultatif</span></legend>
            <div className="slot-picker" role="group">
              {to.slots.map((s) => {
                const on = slot?.day === s.day && slot?.hour === s.hour;
                return <button key={`${s.day}-${s.hour}`} type="button" className={`chip${on ? " chip--on" : ""}`} aria-pressed={on} onClick={() => setSlot(on ? undefined : s)}>{DAYS_LONG[s.day]} {s.hour} h</button>;
              })}
            </div>
          </fieldset>
        ) : null}
        {errors.form ? <p className="field__error" role="alert">{errors.form}</p> : null}
        <div className="save-bar">
          <Button type="submit" size="lg" loading={sending} arrow>Envoyer la demande</Button>
          <ButtonLink to={`/app/etudiants/${to.id}`} variant="ghost">Annuler</ButtonLink>
        </div>
      </form>
    </div>
  );
}

function Sent({ request, to }: { request: HelpRequest; to: Student }) {
  const steps: HelpRequest["status"][] = ["envoyee", "en_attente", request.status === "refusee" || request.status === "expiree" ? request.status : "acceptee"];
  const idx = steps.indexOf(request.status);
  return (
    <div className="screen" style={{ maxWidth: 640 }}>
      <div className="screen__head">
        <div>
          <h1>Demande envoyée à {to.pseudo}.</h1>
          <p>{chapter(request.chapterId).name} · {subject(request.subjectId).name}{request.slot ? ` · ${DAYS_LONG[request.slot.day]} ${request.slot.hour} h` : ""}</p>
        </div>
      </div>
      <ol className="tracker" aria-live="polite" aria-label="État de la demande">
        {steps.map((s, i) => <li key={s} data-done={i < idx} data-on={i === idx && s !== "refusee" && s !== "expiree"} data-bad={i === idx && (s === "refusee" || s === "expiree")}>{REQUEST_STATUS_LABEL[s]}</li>)}
      </ol>
      <p className="muted">
        {request.status === "envoyee" && "Ta demande part vers " + to.pseudo + "."}
        {request.status === "en_attente" && `${to.pseudo} a reçu ta demande. Dans la démo, la réponse arrive en quelques secondes ; en vrai, tu serais prévenu par notification.`}
        {request.status === "acceptee" && `${to.pseudo} a accepté. Une conversation s'est ouverte pour fixer les détails.`}
        {request.status === "refusee" && `${to.pseudo} n'est pas disponible cette semaine. Tu peux chercher quelqu'un d'autre pour ce chapitre.`}
        {request.status === "expiree" && "Sans réponse au bout de 48 h, la demande expire. Tu peux la renvoyer ou chercher quelqu'un d'autre."}
      </p>
      <div className="save-bar">
        {request.status === "acceptee" ? <ButtonLink to={`/app/messages/c-${to.id}`} arrow>Ouvrir la conversation</ButtonLink> : null}
        {request.status === "refusee" || request.status === "expiree" ? <ButtonLink to={`/app/trouver?chapter=${request.chapterId}`} arrow>Chercher quelqu'un d'autre</ButtonLink> : null}
        <ButtonLink to="/app/demandes" variant="secondary">Voir toutes mes demandes</ButtonLink>
      </div>
      <Input type="hidden" value={request.id} readOnly aria-hidden="true" />
    </div>
  );
}
