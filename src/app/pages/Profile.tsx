import { useEffect, useState, type FormEvent } from "react";
import { Avatar, AvailabilityTag, Button, Field, Input, Select, Textarea } from "../../components/ui";
import { Timetable } from "../../components/Timetable";
import { api } from "../../services/api";
import { me } from "../../services/demo";
import { useDemo } from "../../services/store";
import { toast } from "../../services/toast";
import { AVAILABILITY_LABEL, CHAPTERS, FIELDS, INSTITUTIONS, SUBJECTS, chapter, countryName, institution, subject } from "../../data/mock";
import { LEVELS, type Availability, type Level, type Slot, type Student } from "../../data/types";

export function Component() {
  const overrides = useDemo((s) => s.meOverrides);
  const self: Student = { ...me(), ...overrides };
  const [form, setForm] = useState<Student>(self);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  useEffect(() => { document.title = "Mon profil — CAMPUUS"; }, []);
  const set = <K extends keyof Student>(k: K, v: Student[K]) => { setForm((f) => ({ ...f, [k]: v })); setSaved(false); };
  const toggleSlot = (s: Slot) => set("slots", form.slots.some((x) => x.day === s.day && x.hour === s.hour) ? form.slots.filter((x) => !(x.day === s.day && x.hour === s.hour)) : [...form.slots, s]);
  const toggleIn = (k: "masters" | "follows", id: string) => set(k, form[k].includes(id) ? form[k].filter((x) => x !== id) : [...form[k], id]);

  async function submit(e: FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (form.pseudo.trim().length < 2) errs.pseudo = "Un pseudonyme de 2 caractères au moins.";
    if (form.bio.trim().length < 20) errs.bio = "Quelques mots sur toi (20 caractères au moins) : c'est ce que les autres lisent avant de te demander de l'aide.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSaving(true);
    await api().updateMe({ pseudo: form.pseudo.trim(), name: form.name, showName: form.showName, showInstitution: form.showInstitution, bio: form.bio.trim(), field: form.field, level: form.level, institutionId: form.institutionId, availability: form.availability, slots: form.slots, masters: form.masters, follows: form.follows, languages: form.languages, initials: form.pseudo.trim().split(/\s+/).map((w) => w[0]?.toUpperCase() ?? "").join("").slice(0, 2) || self.initials });
    setSaving(false); setSaved(true);
    toast("Profil enregistré (sur cet appareil).");
  }

  return (
    <div className="screen">
      <header className="profile__head">
        <Avatar student={form} size={72} />
        <div className="profile__name">
          <h1>{form.showName ? form.name : form.pseudo}</h1>
          <p>{form.field} · {form.level} · {institution(form.institutionId).name}, {institution(form.institutionId).city} ({countryName(form.country)})</p>
          <AvailabilityTag value={form.availability} />
        </div>
      </header>
      <form onSubmit={submit} noValidate className="screen">
        <section className="block" aria-labelledby="me-id">
          <div className="block__head"><h2 id="me-id">Identité et confidentialité</h2></div>
          <div className="edit-grid">
            <Field id="pseudo" label="Pseudonyme" error={errors.pseudo} hint="Affiché partout dans CAMPUUS."><Input id="pseudo" value={form.pseudo} onChange={(e) => set("pseudo", e.target.value)} aria-invalid={!!errors.pseudo} /></Field>
            <Field id="name" label="Nom complet" hint="Visible seulement si tu l'autorises ci-dessous."><Input id="name" value={form.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" /></Field>
          </div>
          <label className="switch"><span>Afficher mon nom complet plutôt que mon pseudonyme</span><input type="checkbox" checked={form.showName} onChange={(e) => set("showName", e.target.checked)} /></label>
          <label className="switch"><span>Afficher mon établissement et mon pays sur mon profil</span><input type="checkbox" checked={form.showInstitution} onChange={(e) => set("showInstitution", e.target.checked)} /></label>
        </section>

        <section className="block" aria-labelledby="me-studies">
          <div className="block__head"><h2 id="me-studies">Études</h2></div>
          <div className="edit-grid">
            <Field id="inst" label="Établissement"><Select id="inst" value={form.institutionId} onChange={(e) => { const i = INSTITUTIONS.find((x) => x.id === e.target.value)!; setForm((f) => ({ ...f, institutionId: i.id, country: i.country })); }}>{INSTITUTIONS.map((i) => <option key={i.id} value={i.id}>{i.name} · {i.city}</option>)}</Select></Field>
            <Field id="field" label="Filière"><Select id="field" value={form.field} onChange={(e) => set("field", e.target.value)}>{FIELDS.map((f) => <option key={f}>{f}</option>)}</Select></Field>
            <Field id="level" label="Niveau"><Select id="level" value={form.level} onChange={(e) => set("level", e.target.value as Level)}>{LEVELS.map((l) => <option key={l}>{l}</option>)}</Select></Field>
            <Field id="langs" label="Langues" hint="Séparées par des virgules."><Input id="langs" value={form.languages.join(", ")} onChange={(e) => set("languages", e.target.value.split(",").map((x) => x.trim()).filter(Boolean))} /></Field>
          </div>
          <Field id="bio" label="À propos de toi" error={errors.bio}><Textarea id="bio" value={form.bio} onChange={(e) => set("bio", e.target.value)} aria-invalid={!!errors.bio} /></Field>
        </section>

        <section className="block" aria-labelledby="me-follows">
          <div className="block__head"><h2 id="me-follows">Matières que tu suis</h2></div>
          <div className="checks">
            {SUBJECTS.map((s) => <label key={s.id}><input type="checkbox" checked={form.follows.includes(s.id)} onChange={() => toggleIn("follows", s.id)} /><span>{s.name}<small>{s.field}</small></span></label>)}
          </div>
        </section>

        <section className="block" aria-labelledby="me-masters">
          <div className="block__head"><h2 id="me-masters">Chapitres que tu peux expliquer</h2></div>
          <p className="muted" style={{ fontSize: "var(--fs-small)" }}>C'est ce qui te rend visible dans les recherches. Coche seulement ce que tu es prêt à expliquer.</p>
          {form.follows.length === 0 ? <p className="muted">Coche d'abord les matières que tu suis : les chapitres apparaissent ici, matière par matière.</p> : null}
          {form.follows.map((sid) => {
            const chs = CHAPTERS.filter((c) => c.subjectId === sid);
            const n = chs.filter((c) => form.masters.includes(c.id)).length;
            return (
              <details key={sid} className="disclosure" open={n > 0}>
                <summary><span>{subject(sid).name}</span><span className="disclosure__count">{n ? `${n} coché${n > 1 ? "s" : ""}` : "aucun"}</span></summary>
                <div className="checks">
                  {chs.map((c) => <label key={c.id}><input type="checkbox" checked={form.masters.includes(c.id)} onChange={() => toggleIn("masters", c.id)} /><span>{c.name}</span></label>)}
                </div>
              </details>
            );
          })}
          {form.masters.length ? <div className="chips">{form.masters.map((m) => <span key={m} className="chip chip--on">{chapter(m).name}</span>)}</div> : null}
        </section>

        <section className="block" aria-labelledby="me-avail">
          <div className="block__head"><h2 id="me-avail">Disponibilité</h2></div>
          <div className="radios">
            {(Object.keys(AVAILABILITY_LABEL) as Availability[]).map((a) => <label key={a}><input type="radio" name="avail" checked={form.availability === a} onChange={() => set("availability", a)} />{AVAILABILITY_LABEL[a]}</label>)}
          </div>
          <p className="muted" style={{ fontSize: "var(--fs-small)" }}>Touche un créneau pour l'ajouter ou le retirer. Les autres étudiants voient ces créneaux et t'en proposent un dans leur demande.</p>
          <Timetable compact fullOnMobile hours={[8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]} selected={form.slots} onSlotClick={toggleSlot} caption={`${form.slots.length} créneau${form.slots.length > 1 ? "x" : ""} libre${form.slots.length > 1 ? "s" : ""} cette semaine.`} />
        </section>

        <div className="save-bar">
          <Button type="submit" size="lg" loading={saving}>Enregistrer mon profil</Button>
          {saved ? <span className="ok" role="status">Enregistré.</span> : null}
          <Button type="button" variant="ghost" onClick={() => { setForm(self); setErrors({}); setSaved(false); }}>Annuler les modifications</Button>
        </div>
      </form>
    </div>
  );
}
