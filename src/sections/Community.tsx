import type React from "react";
import { panafrican, trust } from "../content/fr";

/*
 * Version courte de l’accueil : la grille des capitales et la fiche de confiance partagent une seule section.
 * À gauche, les heures de révision partagées (une grille horaire, pas une carte) ; à droite, ce que la démonstration
 * contient déjà et ce qui est envisagé. Les ancres #panafricain et #confiance restent valides.
 */
const HOURS = [17, 18, 19, 20, 21, 22, 23];

export function Community() {
  return (
    <section className="section community" id="panafricain" aria-label="Ambition géographique et confiance">
      <div className="wrap community__grid">
        <div className="community__pan">
          <h2 id="pan-title" data-split>{panafrican.title}</h2>
          <p className="community__text" data-reveal>{panafrican.lead}</p>
          <div className="pan__chart" data-scene="pan" role="img" aria-label="Grille des heures de révision partagées entre neuf villes d’Afrique francophone, de 19 h à 22 h heure de Libreville">
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
          </div>
          <ul className="pan__legend">
            <li><i className="legend legend--course" />{panafrican.legend.pilot}</li>
            <li><i className="legend legend--free" />{panafrican.legend.next}</li>
            <li><i className="legend legend--band" />{panafrican.legend.band}</li>
          </ul>
          <p className="muted pan__note">{panafrican.note}</p>
        </div>
        <div className="community__trust" id="confiance">
          <h2 id="trust-title" data-split>{trust.title}</h2>
          <p className="community__text" data-reveal>{trust.lead}</p>
          <ul className="trust__list" data-stagger>
            {trust.items.map((t) => (
              <li key={t.title} className="trust__item">
                <div>
                  <h3>{t.title}</h3>
                  <p>{t.text}</p>
                </div>
                <span className={`trust__state trust__state--${t.state}`} data-stamp>{trust.states[t.state as keyof typeof trust.states]}</span>
              </li>
            ))}
          </ul>
          <p className="trust__note" data-reveal>{trust.note}</p>
        </div>
      </div>
    </section>
  );
}
