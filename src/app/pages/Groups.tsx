import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, Button, Empty, Loading, relative } from "../../components/ui";
import { api } from "../../services/api";
import { toast } from "../../services/toast";
import { FIELDS, institution, student, subject } from "../../data/mock";
import type { StudyGroup } from "../../data/types";

export function Component() {
  const [groups, setGroups] = useState<StudyGroup[] | null>(null);
  const [field, setField] = useState("");
  const [busy, setBusy] = useState<string | null>(null);
  useEffect(() => { document.title = "Groupes d'étude — CAMPUUS"; api().listGroups().then(setGroups); }, []);

  async function toggle(g: StudyGroup) {
    const joined = g.memberIds.includes("me");
    setBusy(g.id);
    const next = await api().joinGroup(g.id, !joined);
    setGroups((gs) => gs!.map((x) => (x.id === g.id ? next : x)));
    setBusy(null);
    toast(joined ? `Tu as quitté « ${g.name} ».` : `Tu as rejoint « ${g.name} ».`, `/app/groupes/${g.id}`);
  }
  const list = (groups ?? []).filter((g) => !field || g.field === field);

  return (
    <div className="screen">
      <div className="screen__head">
        <div>
          <h1>Groupes d'étude</h1>
          <p>Par matière, filière ou objectif de révision. Rejoins-en un, ou propose-en un à ta promo.</p>
        </div>
      </div>
      <div className="chips" role="group" aria-label="Filtrer par filière">
        <button type="button" className={`chip${!field ? " chip--on" : ""}`} aria-pressed={!field} onClick={() => setField("")}>Toutes les filières</button>
        {FIELDS.filter((f) => groups?.some((g) => g.field === f)).map((f) => <button key={f} type="button" className={`chip${field === f ? " chip--on" : ""}`} aria-pressed={field === f} onClick={() => setField(f)}>{f}</button>)}
      </div>
      {groups === null ? <Loading rows={4} /> : list.length === 0 ? <Empty title="Aucun groupe dans cette filière." text="Les groupes se créent au fil des inscriptions. Dans la démo, la création de groupe n'est pas encore disponible." /> : (
        <ul className="groups">
          {list.map((g) => {
            const joined = g.memberIds.includes("me");
            return (
              <li key={g.id} className="group">
                <div>
                  <Link to={`/app/groupes/${g.id}`} className="group__title">{g.name}</Link>
                  <div className="group__meta">
                    <span>{g.subjectId ? subject(g.subjectId).name : g.field}</span>
                    <span>{g.goal}</span>
                    <span>{g.memberIds.length} membre{g.memberIds.length > 1 ? "s" : ""}</span>
                    <span>{Array.from(new Set(g.institutionIds)).map((i) => institution(i).short).join(", ")}</span>
                    <span>actif {relative(g.lastActivity)}</span>
                  </div>
                  <p className="group__desc">{g.description}</p>
                  <div style={{ display: "flex", marginTop: "0.5rem" }}>{g.memberIds.slice(0, 5).map((m) => <Avatar key={m} student={student(m)} size={26} />)}</div>
                </div>
                <div className="group__right">
                  <Button size="sm" variant={joined ? "secondary" : "primary"} loading={busy === g.id} onClick={() => toggle(g)}>{joined ? "Quitter" : "Rejoindre"}</Button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
