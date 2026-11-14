import { Search, Paperclip } from "lucide-react";
import { Avatar, AvailabilityTag, ButtonLink } from "../components/ui";
import { how, match, nav } from "../content/fr";
import { MatchBoard } from "./Match";
import { student } from "../content/landingStudents";

export function SearchScreen() {
  return (
    <div className="mini">
      <div className="mini__bar"><span>Trouver un étudiant</span><span className="num">1 / 3</span></div>
      <div className="mini__search"><Search size={16} /><span>Actualisation et VAN</span></div>
      <ul className="mini__suggest">
        <li><b>Actualisation et valeur actuelle nette</b><span>Mathématiques financières</span></li>
        <li>Taux de rendement interne<span>Mathématiques financières</span></li>
        <li>Annuités et emprunts indivis<span>Mathématiques financières</span></li>
      </ul>
    </div>
  );
}

export function ResultsScreen() {
  const rows = ["aicha", "loic", "nadege"].map(student);
  return (
    <div className="mini">
      <div className="mini__bar"><span>Résultats</span><span className="num">2 / 3</span></div>
      <div className="mini__filters"><span className="tag tag--bordeaux">Disponible</span><span className="tag">Gabon</span><span className="tag">M1 · M2</span></div>
      <ul className="mini__results">
        {rows.map((s) => (
          <li key={s.id}>
            <Avatar student={s} size={36} />
            <span className="mini__who"><b>{s.pseudo}</b><span>{s.field} · {s.level}</span></span>
            <AvailabilityTag value={s.availability} short />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function RequestScreen() {
  return (
    <div className="mini">
      <div className="mini__bar"><span>Demande d'aide</span><span className="num">3 / 3</span></div>
      <div className="mini__form">
        <span className="mini__label">Chapitre</span><span className="mini__value">Actualisation et VAN</span>
        <span className="mini__label">Blocage</span><span className="mini__value">Je bloque sur un exercice</span>
        <span className="mini__label">Message</span><span className="mini__value mini__value--long">Je ne comprends pas pourquoi on actualise chaque flux séparément…</span>
        <span className="mini__label"><Paperclip size={13} /></span><span className="mini__value">TD3-exercice2.jpg</span>
      </div>
      <div className="mini__send"><span className="btn btn--primary btn--sm">Envoyer la demande</span></div>
      <div className="mini__after"><span className="status status--acceptee">Acceptée</span><span>réponse d’Aïcha N., 20 min plus tard</span></div>
    </div>
  );
}

const SCREENS = { search: SearchScreen, results: ResultsScreen, request: RequestScreen } as const;

/*
 * Trois gestes : un écran collant (position: sticky, pas de détournement du défilement). Au fil du défilement les
 * trois feuilles d'interface se posent l'une sur l'autre et le texte de l'étape en cours s'allume. Sans JavaScript,
 * en mouvement réduit ou sur un écran trop bas, les trois étapes sont simplement affichées l'une après l'autre.
 */
export function How() {
  return (
    <section className="how" id="fonctionnement" data-tone="bordeaux" data-scene="how" aria-labelledby="how-title">
      <div className="how__track">
        <div className="how__sticky">
          <div className="wrap how__grid">
            <h2 id="how-title" data-split>{how.title}</h2>
            <ol className="how__steps" data-rail>
              {how.steps.map((s, i) => {
                const Screen = SCREENS[s.screen as keyof typeof SCREENS];
                return (
                  <li key={s.title} className="how__step" data-i={i}>
                    <div className="how__text">
                      <span className="how__n num" aria-hidden="true">{i + 1}</span>
                      <h3>{s.title}</h3>
                      <p>{s.text}</p>
                    </div>
                    <div className="how__screen" aria-hidden="true"><Screen /></div>
                  </li>
                );
              })}
              {/* Conclusion de la scène : la mise en relation, deux emplois du temps qui se recouvrent */}
              <li className="how__step how__step--match" data-i={how.steps.length}>
                <div className="how__text how__text--plain">
                  <h3>{match.title}</h3>
                  <p>{match.lead}</p>
                </div>
                <div className="how__screen how__screen--match">
                  <div className="match how__match">
                    <MatchBoard />
                    <p className="how__match-note">{match.note}</p>
                  </div>
                </div>
              </li>
            </ol>
            <div className="how__bar" aria-hidden="true"><i /></div>
            <div className="how__cta"><ButtonLink to="/rejoindre" arrow>{nav.join}</ButtonLink></div>
            <div className="rail how__rail" aria-hidden="true">
              <span className="rail__bar"><i data-rail-bar /></span>
              <span className="rail__count num"><b data-rail-count>1</b> / {how.steps.length + 1}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
