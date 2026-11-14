import { campus } from "../content/fr";

/*
 * La vie des campus : une bande de photographies réelles (Wikimedia Commons, licences libres, crédits en pied de
 * page), posées comme des créneaux. Sur ordinateur la bande dérive avec le défilement ; sur téléphone elle se
 * fait glisser au doigt, avec un repère de position. Chaque légende dit le lieu, jamais un partenariat.
 */
export function Campus() {
  return (
    <section className="section campus" id="campus" aria-labelledby="campus-title">
      <div className="wrap campus__head">
        <h2 id="campus-title" data-split>{campus.title}</h2>
        <p className="lead" data-reveal>{campus.lead}</p>
      </div>
      <div className="campus__viewport" data-rail data-drift>
        <ul className="campus__strip">
          {campus.photos.map((p, i) => (
            <li key={p.src} className={`campus__item campus__item--${i % 3}`}>
              <figure>
                <img src={`/photos/${p.src}-${p.w}-web.webp`} srcSet={`/photos/${p.src}-${p.w / 2}.webp ${p.w / 2}w, /photos/${p.src}-${p.w}-web.webp ${p.w}w`} sizes="(max-width: 720px) 72vw, 30vw" alt={p.alt} width={p.w} height={Math.round(p.w / p.ratio)} loading="lazy" decoding="async" />
                <figcaption><b>{p.city}</b><span>{p.caption}</span></figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
      <div className="wrap rail" aria-hidden="true">
        <span className="rail__bar"><i data-rail-bar /></span>
        <span className="rail__count num"><b data-rail-count>1</b> / {campus.photos.length}</span>
      </div>
    </section>
  );
}
