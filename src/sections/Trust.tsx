import { trust } from "../content/fr";

export function Trust() {
  return (
    <section className="section trust" id="confiance" aria-labelledby="trust-title">
      <div className="wrap trust__grid">
        <div className="trust__copy">
          <h2 id="trust-title" data-reveal data-split>{trust.title}</h2>
          <p className="lead" data-reveal>{trust.lead}</p>
          <p className="trust__note" data-reveal>{trust.note}</p>
          <figure className="photo photo--trust" data-reveal>
            <img src={`/photos/${trust.photo.src}-${trust.photo.w}.webp`} srcSet={`/photos/${trust.photo.src}-${trust.photo.w / 2}.webp ${trust.photo.w / 2}w, /photos/${trust.photo.src}-${trust.photo.w}.webp ${trust.photo.w}w`} sizes="(max-width: 860px) 90vw, 36vw" alt={trust.photo.alt} width={trust.photo.w} height={Math.round(trust.photo.w / trust.photo.ratio)} loading="lazy" decoding="async" />
            <figcaption>{trust.photo.caption}</figcaption>
          </figure>
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
