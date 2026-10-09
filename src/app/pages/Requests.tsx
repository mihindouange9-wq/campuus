import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, Button, ButtonLink, Empty, StatusTag, relative } from "../../components/ui";
import { api } from "../../services/api";
import { useDemo } from "../../services/store";
import { toast } from "../../services/toast";
import { DAYS_LONG, REQUEST_KIND_LABEL, chapter, student, subject } from "../../data/mock";

export function Component() {
  const [tab, setTab] = useState<"envoyees" | "recues">("recues");
  const requests = useDemo((s) => s.requests);
  const [busy, setBusy] = useState<string | null>(null);
  useEffect(() => { document.title = "Demandes d'aide — CAMPUUS"; }, []);
  const received = requests.filter((r) => r.toId === "me");
  const sent = requests.filter((r) => r.fromId === "me");
  const list = tab === "recues" ? received : sent;
  const pending = received.filter((r) => r.status === "envoyee").length;

  async function answer(id: string, status: "acceptee" | "refusee") {
    setBusy(id);
    await api().answerRequest(id, status);
    setBusy(null);
    toast(status === "acceptee" ? "Demande acceptée. Une conversation s'ouvre." : "Demande refusée. L'étudiant en sera informé.");
  }

  return (
    <div className="screen">
      <div className="screen__head">
        <div>
          <h1>Demandes d'aide</h1>
          <p>Celles qu'on t'adresse et celles que tu as envoyées. Chaque demande a un état clair.</p>
        </div>
        <ButtonLink to="/app/trouver" variant="secondary" size="sm">Nouvelle demande</ButtonLink>
      </div>
      <div className="tabs" role="tablist">
        <button type="button" role="tab" aria-selected={tab === "recues"} onClick={() => setTab("recues")}>Reçues {pending ? <span className="badge">{pending}</span> : null}</button>
        <button type="button" role="tab" aria-selected={tab === "envoyees"} onClick={() => setTab("envoyees")}>Envoyées</button>
      </div>
      {list.length === 0 ? (
        <Empty title={tab === "recues" ? "Personne ne t'a encore demandé d'aide." : "Tu n'as envoyé aucune demande."} text={tab === "recues" ? "Indique les chapitres que tu maîtrises et tes créneaux libres dans ton profil : c'est ainsi qu'on te trouve." : "Cherche un chapitre, choisis un étudiant disponible et envoie une demande précise."} action={<ButtonLink to={tab === "recues" ? "/app/profil" : "/app/trouver"} variant="secondary" size="sm">{tab === "recues" ? "Compléter mon profil" : "Trouver un étudiant"}</ButtonLink>} />
      ) : (
        <ul className="requests">
          {list.map((r) => {
            const other = student(tab === "recues" ? r.fromId : r.toId);
            return (
              <li key={r.id} className="request">
                <Link to={`/app/etudiants/${other.id}`} aria-label={`Profil de ${other.pseudo}`}><Avatar student={other} size={40} /></Link>
                <div className="request__body">
                  <span className="request__title">{tab === "recues" ? `${other.pseudo} te demande de l'aide` : `À ${other.pseudo}`} <small>· {chapter(r.chapterId).name} · {subject(r.subjectId).name}</small></span>
                  <span className="request__msg">« {r.message} »</span>
                  <span className="request__meta"><span>{REQUEST_KIND_LABEL[r.kind]}</span><span>{relative(r.createdAt)}</span>{r.slot ? <span>{DAYS_LONG[r.slot.day]} {r.slot.hour} h</span> : null}{r.attachment ? <span>pièce jointe : {r.attachment}</span> : null}</span>
                </div>
                <div className="request__right">
                  <StatusTag status={r.status} />
                  {tab === "recues" && r.status === "envoyee" ? (
                    <div className="request__actions">
                      <Button size="sm" loading={busy === r.id} onClick={() => answer(r.id, "acceptee")}>Accepter</Button>
                      <Button size="sm" variant="secondary" disabled={busy === r.id} onClick={() => answer(r.id, "refusee")}>Refuser</Button>
                    </div>
                  ) : null}
                  {r.status === "acceptee" ? <ButtonLink to={`/app/messages/c-${other.id}`} variant="ghost" size="sm">Conversation</ButtonLink> : null}
                  {tab === "envoyees" && (r.status === "expiree" || r.status === "refusee") ? <ButtonLink to={`/app/trouver?chapter=${r.chapterId}`} variant="ghost" size="sm">Chercher quelqu'un d'autre</ButtonLink> : null}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
