import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FileText, Link2, StickyNote } from "lucide-react";
import { Avatar, AvailabilityTag, Button, ButtonLink, Empty, Loading, relative } from "../../components/ui";
import { api } from "../../services/api";
import { toast } from "../../services/toast";
import { RESOURCES, institution, student, subject } from "../../data/mock";
import type { StudyGroup } from "../../data/types";

const ICON = { pdf: FileText, lien: Link2, notes: StickyNote };

export function Component() {
  const { id = "" } = useParams();
  const [g, setG] = useState<StudyGroup | null | undefined>(null);
  const [busy, setBusy] = useState(false);
  useEffect(() => { api().listGroups().then((gs) => { const found = gs.find((x) => x.id === id); setG(found); document.title = found ? `${found.name} — CAMPUUS` : "Groupe introuvable — CAMPUUS"; }); }, [id]);
  if (g === null) return <Loading rows={5} />;
  if (!g) return <Empty title="Ce groupe n'existe pas." action={<ButtonLink to="/app/groupes" variant="secondary">Voir les groupes</ButtonLink>} />;
  const joined = g.memberIds.includes("me");
  const resources = RESOURCES.filter((r) => r.subjectId === g.subjectId);

  async function toggle() {
    setBusy(true);
    const next = await api().joinGroup(g!.id, !joined);
    setG(next); setBusy(false);
    toast(joined ? `Tu as quitté « ${g!.name} ».` : `Bienvenue dans « ${g!.name} ».`);
  }

  return (
    <div className="screen">
      <p><Link to="/app/groupes">← Tous les groupes</Link></p>
      <div className="screen__head">
        <div>
          <h1>{g.name}</h1>
          <p>{g.subjectId ? subject(g.subjectId).name : g.field} · {g.goal} · {g.memberIds.length} membre{g.memberIds.length > 1 ? "s" : ""} · {Array.from(new Set(g.institutionIds)).map((i) => institution(i).short).join(", ")}</p>
        </div>
        <Button variant={joined ? "secondary" : "primary"} loading={busy} onClick={toggle}>{joined ? "Quitter le groupe" : "Rejoindre le groupe"}</Button>
      </div>
      <div className="two">
        <div className="screen">
          <section className="block" aria-labelledby="g-desc"><div className="block__head"><h2 id="g-desc">Description</h2></div><p>{g.description}</p></section>
          <section className="block" aria-labelledby="g-act">
            <div className="block__head"><h2 id="g-act">Dernières activités</h2></div>
            <ul className="activity">
              {g.activity.map((a, i) => <li key={i}><span><b>{student(a.by).pseudo}</b> {a.text}</span><small>{relative(a.at)}</small></li>)}
            </ul>
          </section>
          <section className="block" aria-labelledby="g-res">
            <div className="block__head"><h2 id="g-res">Ressources partagées</h2></div>
            {resources.length ? (
              <ul className="activity">
                {resources.map((r) => { const I = ICON[r.type]; return <li key={r.id}><span style={{ display: "inline-flex", gap: "0.5rem", alignItems: "center" }}><I size={16} style={{ color: "var(--horizon-ink)" }} />{r.title}</span><small>par {student(r.byId).pseudo} · {relative(r.at)}</small></li>; })}
              </ul>
            ) : <p className="muted">Aucune ressource partagée pour l'instant.</p>}
            {joined ? <p className="muted" style={{ fontSize: "var(--fs-small)" }}>Le partage de fichiers n'est pas encore disponible dans la démo.</p> : null}
          </section>
        </div>
        <section className="block" aria-labelledby="g-members">
          <div className="block__head"><h2 id="g-members">Membres</h2></div>
          <ul className="members">
            {g.memberIds.map((m) => { const s = student(m); return <li key={m}><Link to={m === "me" ? "/app/profil" : `/app/etudiants/${m}`} className="member"><Avatar student={s} size={32} /><span><b>{s.pseudo}</b>{m === "me" ? " (toi)" : ""} <small>· {s.level} · {s.showInstitution ? institution(s.institutionId).short : s.field}</small></span><span style={{ marginLeft: "auto" }}><AvailabilityTag value={s.availability} short /></span></Link></li>; })}
          </ul>
        </section>
      </div>
    </div>
  );
}
