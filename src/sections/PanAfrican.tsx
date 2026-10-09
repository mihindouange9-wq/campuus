import { panafrican } from "../content/fr";

/*
 * Mêmes soirées, d'une capitale à l'autre : une grille horaire, pas une carte. Chaque ligne est une ville, chaque
 * colonne une heure (heure de Libreville). La bande 19 h → 22 h montre les heures de révision partagées ; Dakar et
 * Abidjan sont décalées d'une heure (UTC+0).
 */
const HOURS = [17, 18, 19, 20, 21, 22, 23];

export function PanAfrican() {
  return (
    <section className="section pan" id="panafricain" aria-labelledby="pan-title">
      <div className="wrap">
        <div className="pan__head">
          <h2 id="pan-title" data-reveal>{panafrican.title}</h2>
          <p className="lead" data-reveal>{panafrican.lead}</p>
        </div>
        <div className="pan__chart" data-reveal role="img" aria-label="Grille des heures de révision partagées entre neuf villes d'Afrique francophone, de 19 h à 22 h heure de Libreville">
          <div className="pan__hours" aria-hidden="true">
            <span />
            {HOURS.map((h) => <span key={h} className="num">{h} h</span>)}
          </div>
          {panafrican.cities.map((c) => (
            <div key={c.name} className={`pan__row${c.pilot ? " pan__row--pilot" : ""}`}>
              <span className="pan__city">
                <b>{c.name}</b>
                <span>{c.country}{c.offset ? ` · ${c.offset > 0 ? "+" : "−"}1 h` : ""}</span>
              </span>
              <span className="pan__track" aria-hidden="true">
                <span className="pan__band" style={{ "--from": 19 + c.offset - 17, "--len": 3 } as React.CSSProperties} />
                {c.pilot ? <span className="pan__dot" style={{ "--at": 19 + c.offset - 17 + 1.5 } as React.CSSProperties} /> : null}
              </span>
            </div>
          ))}
          <svg className="pan__links" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path d="M50 8 C 60 20, 60 30, 50 36" />
            <path d="M50 8 C 40 40, 40 60, 50 66" />
            <path d="M50 22 C 62 40, 62 70, 50 92" />
          </svg>
        </div>
        <ul className="pan__legend" data-reveal>
          <li><i className="legend legend--course" />{panafrican.legend.pilot}</li>
          <li><i className="legend legend--free" />{panafrican.legend.next}</li>
          <li><i className="legend legend--band" />{panafrican.legend.band}</li>
        </ul>
        <p className="muted pan__note" data-reveal>{panafrican.note}</p>
      </div>
    </section>
  );
}
