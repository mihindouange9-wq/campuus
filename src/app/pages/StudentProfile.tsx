import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Flag, MoreHorizontal, ShieldBan } from "lucide-react";
import { Avatar, AvailabilityTag, Button, ButtonLink, Empty, Loading, Tag } from "../../components/ui";
import { Timetable } from "../../components/Timetable";
import { api } from "../../services/api";
import { toast } from "../../services/toast";
import { chapter, countryName, institution, subject } from "../../data/mock";
import type { Student } from "../../data/types";

export function Component() {
  const { id = "" } = useParams();
  const [s, setS] = useState<Student | null | undefined>(null);
  const [menu, setMenu] = useState(false);
  useEffect(() => { setS(null); api().getStudent(id).then((r) => { setS(r); document.title = r ? `${r.pseudo} — CAMPUUS` : "Profil introuvable — CAMPUUS"; }); }, [id]);

  if (s === null) return <Loading label="Chargement du profil…" rows={5} />;
  if (!s) return <Empty title="Ce profil n'existe pas ou n'est plus visible." action={<ButtonLink to="/app/trouver" variant="secondary">Retour à la recherche</ButtonLink>} />;
  const inst = institution(s.institutionId);
  const bySubject = s.masters.reduce<Record<string, string[]>>((acc, m) => { const sid = chapter(m).subjectId; (acc[sid] ??= []).push(m); return acc; }, {});

  return (
    <div className="screen">
      <p><Link to="/app/trouver">← Retour à la recherche</Link></p>
      <header className="profile__head">
        <Avatar student={s} size={72} />
        <div className="profile__name">
          <h1>{s.showName ? s.name : s.pseudo}</h1>
          <p>{s.field} · {s.level}{s.showInstitution ? ` · ${inst.name}, ${inst.city} (${countryName(s.country)})` : " · établissement non affiché"}</p>
          <AvailabilityTag value={s.availability} />
        </div>
        <div className="profile__actions">
          <ButtonLink to={`/app/demandes/nouvelle?to=${s.id}`} arrow>Demander de l'aide</ButtonLink>
          <ButtonLink to={`/app/messages/c-${s.id}`} variant="secondary">Envoyer un message</ButtonLink>
          <div className="menu">
            <Button variant="ghost" aria-haspopup="menu" aria-expanded={menu} aria-label="Plus d'actions" onClick={() => setMenu((m) => !m)}><MoreHorizontal size={18} /></Button>
            {menu ? (
              <div className="menu__list" role="menu">
                <button type="button" role="menuitem" onClick={() => { setMenu(false); toast("Signalement enregistré dans la démo. Dans la version finale, une équipe de modération le traitera."); }}><Flag size={16} /> Signaler ce profil</button>
                <button type="button" role="menuitem" className="danger" onClick={() => { setMenu(false); toast(`${s.pseudo} ne pourra plus te contacter (démo).`); }}><ShieldBan size={16} /> Bloquer</button>
              </div>
            ) : null}
          </div>
        </div>
      </header>

      <div className="profile__grid">
        <div className="screen">
          <section className="block" aria-labelledby="p-bio">
            <div className="block__head"><h2 id="p-bio">À propos</h2></div>
            <p>{s.bio}</p>
          </section>
          <section className="block" aria-labelledby="p-masters">
            <div className="block__head"><h2 id="p-masters">Peut t'expliquer</h2></div>
            <dl className="facts">
              {Object.entries(bySubject).map(([sid, chs]) => (
                <div key={sid}>
                  <dt>{subject(sid).name}</dt>
                  <dd><span className="chips">{chs.map((c) => <Link key={c} to={`/app/trouver?chapter=${c}`} className="chip chip--link">{chapter(c).name}</Link>)}</span></dd>
                </div>
              ))}
            </dl>
          </section>
          <section className="block" aria-labelledby="p-facts">
            <div className="block__head"><h2 id="p-facts">Informations</h2></div>
            <dl className="facts">
              <div><dt>Suit cette année</dt><dd>{s.follows.map((f) => subject(f).name).join(", ")}</dd></div>
              <div><dt>Langues</dt><dd>{s.languages.join(", ")}</dd></div>
              <div><dt>Membre depuis</dt><dd>{new Date(s.joined).toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}</dd></div>
              <div><dt>Aides données</dt><dd>{s.helped} <Tag>données de démonstration</Tag></dd></div>
            </dl>
          </section>
        </div>
        <section className="block" aria-labelledby="p-slots">
          <div className="block__head"><h2 id="p-slots">Créneaux libres cette semaine</h2></div>
          {s.slots.length ? (
            <Timetable compact fullOnMobile hours={[8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].filter((h) => h >= Math.min(...s.slots.map((x) => x.hour)) - 1 && h <= Math.max(...s.slots.map((x) => x.hour)) + 1)} free={s.slots.map((x) => ({ ...x, label: "libre" }))} caption={`${s.pseudo} indique ses créneaux ; tu proposes l'un d'eux dans ta demande.`} />
          ) : (
            <p className="muted">Aucun créneau indiqué cette semaine.</p>
          )}
        </section>
      </div>
    </div>
  );
}
