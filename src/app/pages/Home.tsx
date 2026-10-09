import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Avatar, AvailabilityTag, Button, StatusTag, relative } from "../../components/ui";
import { Timetable } from "../../components/Timetable";
import { api } from "../../services/api";
import { me, searchSync } from "../../services/demo";
import { useDemo } from "../../services/store";
import { GROUPS, chapter, institution, student, subject } from "../../data/mock";
import type { StudyGroup } from "../../data/types";

export function Component() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const overrides = useDemo((s) => s.meOverrides);
  const self = { ...me(), ...overrides };
  const requests = useDemo((s) => s.requests);
  const conversations = useDemo((s) => s.conversations);
  const joined = useDemo((s) => s.joinedGroups);
  const [groups, setGroups] = useState<StudyGroup[]>([]);
  useEffect(() => { document.title = "Accueil — CAMPUUS"; api().listGroups().then(setGroups); }, [joined]);

  const available = searchSync({ availability: "now" }).concat(searchSync({ availability: "tonight" })).slice(0, 6);
  const forMe = requests.filter((r) => r.toId === "me" && (r.status === "envoyee" || r.status === "en_attente"));
  const mine = requests.filter((r) => r.fromId === "me").slice(0, 3);
  const recommendations = searchSync({}).filter((r) => r.student.availability !== "off").filter((r) => self.follows.some((f) => r.student.masters.some((m) => chapter(m).subjectId === f))).slice(0, 4);
  const why = (sid: string) => {
    const s = student(sid);
    if (s.institutionId === self.institutionId) return "même établissement";
    const common = s.masters.map((m) => chapter(m).subjectId).find((x) => self.follows.includes(x));
    if (common) return `explique ${subject(common).name}`;
    return s.availability === "now" ? "disponible maintenant" : "disponible ce soir";
  };
  const submit = (e: FormEvent) => { e.preventDefault(); navigate(`/app/trouver?q=${encodeURIComponent(q.trim())}`); };
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Bonjour" : hour < 18 ? "Bon après-midi" : "Bonsoir";

  return (
    <div className="screen">
      <div className="screen__head">
        <div>
          <h1>{greeting}, {self.pseudo.split(" ")[0]}.</h1>
          <p>Sur quoi bloques-tu aujourd'hui ?</p>
        </div>
      </div>

      <form className="searchbar" onSubmit={submit} role="search">
        <Search size={20} aria-hidden="true" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Une matière, un chapitre, un nom…" aria-label="Rechercher une matière ou un chapitre" />
        <Button type="submit" size="sm">Chercher</Button>
      </form>

      <section className="block" aria-labelledby="h-avail">
        <div className="block__head"><h2 id="h-avail">Disponibles pour t'aider</h2><Link to="/app/trouver?availability=now">Tous</Link></div>
        <div className="tiles" role="list">
          {available.map(({ student: s }) => {
            const ch = s.masters.find((m) => self.follows.includes(chapter(m).subjectId)) ?? s.masters[0];
            return (
              <Link key={s.id} to={`/app/etudiants/${s.id}`} className={`tile tile--${s.availability}`} role="listitem">
                <span className="tile__who"><b>{s.pseudo}</b><small>{s.showInstitution ? institution(s.institutionId).short : s.field} · {s.level}</small></span>
                <span className="tile__chapter">{chapter(ch).name}</span>
                <span className="tile__when">{s.availability === "now" ? "maintenant" : "ce soir"}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <div className="two">
        <div className="screen" style={{ gap: "1.75rem" }}>
          <section className="block" aria-labelledby="h-req">
            <div className="block__head"><h2 id="h-req">Demandes d'aide</h2><Link to="/app/demandes">Toutes</Link></div>
            <ul className="requests">
              {forMe.map((r) => (
                <li key={r.id} className="request">
                  <Avatar student={student(r.fromId)} size={36} />
                  <div className="request__body">
                    <span className="request__title">{student(r.fromId).pseudo} te demande de l'aide <small>· {chapter(r.chapterId).name}</small></span>
                    <span className="request__meta"><span>{relative(r.createdAt)}</span></span>
                  </div>
                  <div className="request__right"><StatusTag status={r.status} /><Link to="/app/demandes" className="btn btn--secondary btn--sm">Répondre</Link></div>
                </li>
              ))}
              {mine.map((r) => (
                <li key={r.id} className="request">
                  <Avatar student={student(r.toId)} size={36} />
                  <div className="request__body">
                    <span className="request__title">Ta demande à {student(r.toId).pseudo} <small>· {chapter(r.chapterId).name}</small></span>
                    <span className="request__meta"><span>{relative(r.createdAt)}</span>{r.slot ? <span>créneau proposé</span> : null}</span>
                  </div>
                  <div className="request__right"><StatusTag status={r.status} /></div>
                </li>
              ))}
            </ul>
          </section>

          <section className="block" aria-labelledby="h-reco">
            <div className="block__head"><h2 id="h-reco">Recommandés pour toi</h2></div>
            <ul className="students">
              {recommendations.map(({ student: s }) => (
                <li key={s.id}>
                  <Link to={`/app/etudiants/${s.id}`} className="student-row">
                    <Avatar student={s} size={40} />
                    <span className="student-row__who">
                      <span className="student-row__name">{s.pseudo} <small>{s.field} · {s.level}{s.showInstitution ? ` · ${institution(s.institutionId).short}` : ""}</small></span>
                      <span className="student-row__chapters">{s.masters.slice(0, 2).map((m) => <span key={m}>{chapter(m).name}</span>)}</span>
                    </span>
                    <span className="student-row__right"><AvailabilityTag value={s.availability} short /><span className="student-row__why">{why(s.id)}</span></span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="screen" style={{ gap: "1.75rem" }}>
          <section className="block" aria-labelledby="h-week">
            <div className="block__head"><h2 id="h-week">Ta semaine</h2><Link to="/app/profil">Modifier</Link></div>
            <Timetable compact fullOnMobile hours={[16, 17, 18, 19, 20]} free={self.slots.filter((s) => s.hour >= 16).map((s) => ({ ...s, label: "libre" }))} nowLine caption="Tes créneaux libres, visibles par les étudiants qui te cherchent." />
          </section>

          <section className="block" aria-labelledby="h-subj">
            <div className="block__head"><h2 id="h-subj">Tes matières</h2></div>
            <div className="chips">
              {self.follows.map((f) => <Link key={f} to={`/app/trouver?subject=${f}`} className="chip chip--link">{subject(f).name}</Link>)}
            </div>
          </section>

          <section className="block" aria-labelledby="h-groups">
            <div className="block__head"><h2 id="h-groups">Groupes actifs</h2><Link to="/app/groupes">Tous</Link></div>
            <ul className="groups">
              {groups.filter((g) => g.memberIds.includes("me")).concat(groups.filter((g) => !g.memberIds.includes("me"))).slice(0, 3).map((g) => (
                <li key={g.id} className="group">
                  <div>
                    <Link to={`/app/groupes/${g.id}`} className="group__title">{g.name}</Link>
                    <div className="group__meta"><span>{g.memberIds.length} membres</span><span>{relative(g.lastActivity)}</span>{g.memberIds.includes("me") ? <span className="tag tag--horizon">Tu en fais partie</span> : null}</div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="block" aria-labelledby="h-conv">
            <div className="block__head"><h2 id="h-conv">Dernières conversations</h2><Link to="/app/messages">Toutes</Link></div>
            <ul className="convs" style={{ border: "1px solid var(--rule-strong)", background: "var(--ivory-soft)" }}>
              {conversations.slice(0, 3).map((c) => {
                const other = student(c.participantIds.find((p) => p !== "me")!);
                const last = c.messages[c.messages.length - 1];
                return (
                  <li key={c.id}>
                    <Link to={`/app/messages/${c.id}`} className="conv">
                      <Avatar student={other} size={34} />
                      <span className="conv__name">{other.pseudo}</span>
                      <span className="conv__at">{relative(last.at)}</span>
                      <span className="conv__last">{last.attachment ? "Pièce jointe" : last.text}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </div>
      {GROUPS.length === 0 ? null : null}
    </div>
  );
}
