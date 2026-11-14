import { Timetable } from "../components/Timetable";
import { match } from "../content/fr";

const HOURS = [15, 16, 17, 18, 19, 20];
const KEVIN = [{ day: 0, hour: 18 }, { day: 1, hour: 18 }, { day: 3, hour: 19 }, { day: 3, hour: 20 }, { day: 5, hour: 15 }];
const NADEGE = [{ day: 1, hour: 20 }, { day: 3, hour: 19 }, { day: 4, hour: 18 }, { day: 5, hour: 15 }, { day: 5, hour: 16 }];
const isCommon = (s: { day: number; hour: number }) => KEVIN.some((k) => k.day === s.day && k.hour === s.hour) && NADEGE.some((n) => n.day === s.day && n.hour === s.hour);
const COMMON = KEVIN.filter(isCommon);

/*
 * La mise en relation : deux emplois du temps, deux encres. Au défilement, la grille de Nadège (Cool Horizon, en
 * multiplication) glisse sur celle de Kevin (bordeaux) ; là où les encres se recouvrent, le créneau commun apparaît.
 * L'état par défaut (sans JavaScript, mouvement réduit) est l'état final : les deux grilles superposées.
 */
/** Les deux grilles superposées (Kevin en bordeaux, Nadège en Cool Horizon) et la ligne « Créneaux communs ». */
export function MatchBoard() {
  return (
    <div className="match__stage">
      <figure className="match__board match__board--a">
        <figcaption><b>{match.left.title}</b><span>{match.left.sub}</span></figcaption>
        <Timetable compact fullOnMobile printed hours={HOURS} inkA={KEVIN.map((s) => ({ ...s, label: isCommon(s) ? undefined : "Kevin" }))} caption={`${match.left.title} : créneaux libres en bordeaux`} />
      </figure>
      <figure className="match__board match__board--b">
        <Timetable compact fullOnMobile printed hours={HOURS} free={NADEGE.map((s) => ({ ...s, label: isCommon(s) ? undefined : "Nadège" }))} caption={`${match.right.title} : créneaux libres en Cool Horizon`} />
        <figcaption><b>{match.right.title}</b><span>{match.right.sub}</span></figcaption>
      </figure>
      <div className="match__board match__board--c" aria-hidden="true">
        <Timetable compact fullOnMobile printed hours={HOURS} labels={COMMON.map((s) => ({ ...s, label: "commun" }))} />
      </div>
      <p className="match__common"><b>{match.common.title}</b><span>{match.common.sub}</span></p>
    </div>
  );
}

/* Ancienne section autonome : elle n’est plus montée depuis la version courte de l’accueil (la scène est reprise dans How). */
export function Match() {
  return (
    <section className="section match" id="mise-en-relation" data-scene="match" aria-labelledby="match-title">
      <div className="wrap match__grid">
        <div className="match__copy">
          <h2 id="match-title" data-split>{match.title}</h2>
          <p className="lead" data-reveal>{match.lead}</p>
        </div>
        <div className="match__track">
          <div className="match__stage">
            <figure className="match__board match__board--a">
              <figcaption><b>{match.left.title}</b><span>{match.left.sub}</span></figcaption>
              <Timetable compact fullOnMobile printed hours={HOURS} inkA={KEVIN.map((s) => ({ ...s, label: isCommon(s) ? undefined : "Kevin" }))} caption={`${match.left.title} : créneaux libres en bordeaux`} />
            </figure>
            <figure className="match__board match__board--b">
              <Timetable compact fullOnMobile printed hours={HOURS} free={NADEGE.map((s) => ({ ...s, label: isCommon(s) ? undefined : "Nadège" }))} caption={`${match.right.title} : créneaux libres en Cool Horizon`} />
              <figcaption><b>{match.right.title}</b><span>{match.right.sub}</span></figcaption>
            </figure>
            <div className="match__board match__board--c" aria-hidden="true">
              <Timetable compact fullOnMobile printed hours={HOURS} labels={COMMON.map((s) => ({ ...s, label: "commun" }))} />
            </div>
            <p className="match__common"><b>{match.common.title}</b><span>{match.common.sub}</span></p>
          </div>
        </div>
      </div>
      <div className="wrap match__extra">
          <ul className="match__criteria" data-stagger aria-label="Critères de mise en relation">
            {match.criteria.map((c) => <li key={c}>{c}</li>)}
          </ul>
        <p className="match__note muted" data-reveal>{match.note}</p>
      </div>
    </section>
  );
}
