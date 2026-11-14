import { Link } from "react-router-dom";
import { ButtonLink } from "../components/ui";
import { campus, final } from "../content/fr";

/* Trois photographies de campus (reprises de l’ancienne bande) accompagnent la clôture ; crédits en pied de page. */
const PHOTOS = ["diplomes", "amphi", "sous-les-arbres"].map((src) => campus.photos.find((p) => p.src === src)!);

/* Clôture : le fond vivant revient, le titre s’y pose ; un demi-écran. */
export function Final() {
  return (
    <section className="final" id="rejoindre" aria-labelledby="final-title">
      <div className="wrap final__grid">
        <div className="final__copy">
          <h2 id="final-title" data-split>{final.title}</h2>
          <p className="lead" data-reveal>{final.text}</p>
          <div className="final__cta" data-reveal>
            <ButtonLink to="/rejoindre" size="lg" arrow>{final.cta}</ButtonLink>
            <Link to="/app" className="final__demo">{final.demo}</Link>
          </div>
        </div>
        <ul className="final__photos" data-stagger>
          {PHOTOS.map((p) => (
            <li key={p.src}>
              <figure>
                <img src={`/photos/${p.src}-${p.w / 2}.webp`} alt={p.alt} width={p.w / 2} height={Math.round(p.w / 2 / p.ratio)} loading="lazy" decoding="async" />
                <figcaption><b>{p.city}</b><span>{p.caption}</span></figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
