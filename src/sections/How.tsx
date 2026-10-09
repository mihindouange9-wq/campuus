import { Search, Paperclip } from "lucide-react";
import { Avatar, AvailabilityTag } from "../components/ui";
import { how } from "../content/fr";
import { student } from "../data/mock";

function SearchScreen() {
  return (
    <div className="mini" aria-hidden="true">
      <div className="mini__search"><Search size={14} /><span>Actualisation et VAN</span></div>
      <ul className="mini__suggest">
        <li><b>Actualisation et valeur actuelle nette</b><span>Mathématiques financières</span></li>
        <li>Taux de rendement interne<span>Mathématiques financières</span></li>
        <li>Annuités et emprunts indivis<span>Mathématiques financières</span></li>
      </ul>
    </div>
  );
}

function ResultsScreen() {
  const rows = ["aicha", "loic", "nadege"].map(student);
  return (
    <div className="mini" aria-hidden="true">
      <div className="mini__filters"><span className="tag tag--bordeaux">Disponible</span><span className="tag">Gabon</span><span className="tag">M1 · M2</span></div>
      <ul className="mini__results">
        {rows.map((s) => (
          <li key={s.id}>
            <Avatar student={s} size={28} />
            <span className="mini__who"><b>{s.pseudo}</b><span>{s.field} · {s.level}</span></span>
            <AvailabilityTag value={s.availability} short />
          </li>
        ))}
      </ul>
    </div>
  );
}

function RequestScreen() {
  return (
    <div className="mini" aria-hidden="true">
      <div className="mini__form">
        <span className="mini__label">Chapitre</span><span className="mini__value">Actualisation et VAN</span>
        <span className="mini__label">Blocage</span><span className="mini__value">Je bloque sur un exercice</span>
        <span className="mini__label">Message</span><span className="mini__value mini__value--long">Je ne comprends pas pourquoi on actualise chaque flux séparément…</span>
        <span className="mini__label"><Paperclip size={12} /></span><span className="mini__value">TD3-exercice2.jpg</span>
      </div>
      <div className="mini__send"><span className="btn btn--primary btn--sm">Envoyer la demande</span></div>
      <div className="mini__after"><span className="status status--acceptee">Acceptée</span><span>réponse d’Aïcha N., 20 min plus tard</span></div>
    </div>
  );
}

const SCREENS = { search: SearchScreen, results: ResultsScreen, request: RequestScreen } as const;

export function How() {
  return (
    <section className="section how" id="fonctionnement" aria-labelledby="how-title">
      <div className="wrap">
        <h2 id="how-title" data-reveal>{how.title}</h2>
        <ol className="how__steps">
          {how.steps.map((s, i) => {
            const Screen = SCREENS[s.screen as keyof typeof SCREENS];
            return (
              <li key={s.title} className="how__step" data-reveal>
                <div className="how__screen"><Screen /></div>
                <div className="how__text">
                  <span className="how__n num" aria-hidden="true">{i + 1}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
