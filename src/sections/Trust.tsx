import { trust } from "../content/fr";

export function Trust() {
  return (
    <section className="section trust" id="confiance" aria-labelledby="trust-title">
      <div className="wrap trust__grid">
        <div className="trust__copy">
          <h2 id="trust-title" data-reveal data-split>{trust.title}</h2>
          <p className="lead" data-reveal>{trust.lead}</p>
          <p className="trust__note" data-reveal>{trust.note}</p>
        </div>
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
      </div>
    </section>
  );
}
