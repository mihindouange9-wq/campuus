import { Timetable } from "../components/Timetable";
import { match } from "../content/fr";

const HOURS = [16, 17, 18, 19, 20];
const KEVIN = [{ day: 0, hour: 18 }, { day: 1, hour: 18 }, { day: 3, hour: 19 }, { day: 3, hour: 20 }, { day: 5, hour: 16 }];
const NADEGE = [{ day: 1, hour: 20 }, { day: 3, hour: 19 }, { day: 4, hour: 18 }, { day: 5, hour: 16 }, { day: 5, hour: 17 }];
const COMMON = KEVIN.filter((k) => NADEGE.some((n) => n.day === k.day && n.hour === k.hour));

export function Match() {
  return (
    <section className="section match" id="mise-en-relation" aria-labelledby="match-title">
      <div className="wrap">
        <div className="match__head">
          <h2 id="match-title" data-reveal data-split>{match.title}</h2>
          <p className="lead" data-reveal>{match.lead}</p>
        </div>
        <div className="match__boards">
          <figure className="match__board" data-reveal data-slots>
            <figcaption><b>{match.left.title}</b><span>{match.left.sub}</span></figcaption>
            <Timetable compact fullOnMobile printed hours={HOURS} free={KEVIN.map((s) => ({ ...s, label: "libre" }))} />
          </figure>
          <figure className="match__board" data-reveal data-slots>
            <figcaption><b>{match.right.title}</b><span>{match.right.sub}</span></figcaption>
            <Timetable compact fullOnMobile printed hours={HOURS} free={NADEGE.map((s) => ({ ...s, label: "libre" }))} />
          </figure>
          <figure className="match__board match__board--common" data-reveal data-slots>
            <figcaption><b>{match.common.title}</b><span>{match.common.sub}</span></figcaption>
            <Timetable compact fullOnMobile printed hours={HOURS} inkA={KEVIN.map((s) => ({ ...s, label: COMMON.some((c) => c.day === s.day && c.hour === s.hour) ? undefined : "Kevin" }))} inkB={NADEGE} labels={COMMON.map((s) => ({ ...s, label: "commun" }))} caption="Bordeaux : Kevin. Cool Horizon : Nadège. Là où les deux encres se recouvrent, un créneau commun." />
          </figure>
        </div>
        <ul className="match__criteria" data-reveal aria-label="Critères de mise en relation">
          {match.criteria.map((c) => <li key={c}>{c}</li>)}
        </ul>
        <p className="match__note muted" data-reveal>{match.note}</p>
      </div>
    </section>
  );
}
