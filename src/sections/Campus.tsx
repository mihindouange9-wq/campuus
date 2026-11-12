import { campus } from "../content/fr";

/*
 * La vie des campus : une rangée de photographies réelles (Wikimedia Commons, licences libres, crédits en pied de
 * page), posées sur la grille comme des créneaux. Chaque légende dit le lieu, jamais un partenariat.
 */
export function Campus() {
  return (
    <section className="section campus" id="campus" aria-labelledby="campus-title">
      <div className="wrap">
        <h2 id="campus-title" data-reveal data-split>{campus.title}</h2>
        <p className="lead" data-reveal>{campus.lead}</p>
      </div>
      <ul className="campus__strip" data-stagger>
        {campus.photos.map((p, i) => (
          <li key={p.src} className={`campus__item campus__item--${i % 3}`}>
            <figure>
              <img src={`/photos/${p.src}-${p.w}.webp`} srcSet={`/photos/${p.src}-${p.w / 2}.webp ${p.w / 2}w, /photos/${p.src}-${p.w}.webp ${p.w}w`} sizes="(max-width: 720px) 70vw, 32vw" alt={p.alt} width={p.w} height={Math.round(p.w / p.ratio)} loading="lazy" decoding="async" />
              <figcaption><b>{p.city}</b><span>{p.caption}</span></figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
