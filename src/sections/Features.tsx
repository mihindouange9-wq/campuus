import type React from "react";
import { Search, Paperclip, FileText, Link2 } from "lucide-react";
import { Avatar, AvailabilityTag, StatusTag } from "../components/ui";
import { features } from "../content/fr";
import { student } from "../content/landingStudents";

/* Chaque fonctionnalité est illustrée par un fragment de l'interface réelle, jamais par un pictogramme seul. */
export const VIGNETTES: Record<string, () => React.ReactElement> = {
  search: () => (
    <div className="vig">
      <div className="vig__search"><Search size={16} /><span>Régression linéaire</span></div>
      <div className="vig__chips"><span className="tag tag--bordeaux">Statistiques</span><span className="tag">L3</span><span className="tag">Cameroun</span><span className="tag tag--horizon">Disponible maintenant</span></div>
    </div>
  ),
  profiles: () => {
    const s = student("fatou");
    return (
      <div className="vig vig__row">
        <Avatar student={s} size={40} />
        <span className="vig__who"><b>{s.pseudo}</b><span>{s.field} · {s.level} · établissement masqué</span></span>
        <span className="vig__chapters">Récursivité · SQL · Normalisation</span>
      </div>
    );
  },
  availability: () => (
    <div className="vig vig__avail">
      <AvailabilityTag value="now" /><AvailabilityTag value="tonight" /><AvailabilityTag value="weekend" /><AvailabilityTag value="off" />
    </div>
  ),
  requests: () => (
    <div className="vig vig__statuses">
      <StatusTag status="envoyee" /><StatusTag status="en_attente" /><StatusTag status="acceptee" /><StatusTag status="refusee" /><StatusTag status="expiree" />
    </div>
  ),
  messages: () => (
    <div className="vig vig__msgs">
      <span className="vig__bubble">Mardi 20 h ça te va ?</span>
      <span className="vig__bubble vig__bubble--me">Parfait, je t'envoie l'énoncé. <Paperclip size={12} /></span>
      <span className="vig__read">Lu · 19 h 36</span>
    </div>
  ),
  groups: () => (
    <div className="vig vig__row">
      <span className="vig__stack">{["aicha", "nadege", "loic"].map((id) => <Avatar key={id} student={student(id)} size={32} />)}</span>
      <span className="vig__who"><b>Maths fi avant le partiel</b><span>5 membres · 4 établissements · partiel du 23 octobre</span></span>
    </div>
  ),
  resources: () => (
    <div className="vig vig__res">
      <span><FileText size={14} />Fiche-actualisation.pdf</span>
      <span><Link2 size={14} />Jointures SQL expliquées avec deux tables</span>
    </div>
  ),
  discover: () => (
    <div className="vig vig__places">
      {["Libreville", "Franceville", "Douala", "Brazzaville", "Dakar"].map((c) => <span key={c}>{c}</span>)}
    </div>
  ),
};

/*
 * Un registre à deux colonnes sur ordinateur (titre collant à gauche) ; sur téléphone, un carrousel à défilement
 * aimanté avec repère de position, pour ne pas empiler huit blocs.
 */
export function Features() {
  return (
    <section className="section features" id="fonctionnalites" data-tone="horizon" aria-labelledby="features-title">
      <div className="wrap features__grid">
        <div className="features__head">
          <h2 id="features-title" data-split>{features.title}</h2>
          <div className="rail" aria-hidden="true">
            <span className="rail__bar"><i data-rail-bar /></span>
            <span className="rail__count num"><b data-rail-count>1</b> / {features.items.length}</span>
          </div>
        </div>
        <ul className="features__list" data-rail>
          {features.items.map((f) => {
            const Vig = VIGNETTES[f.id];
            return (
              <li key={f.id} className="feature" data-wipe>
                <div className="feature__vig" aria-hidden="true"><Vig /></div>
                <div className="feature__text">
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
