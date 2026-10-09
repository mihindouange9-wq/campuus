import { Link } from "react-router-dom";
import { ButtonLink } from "../components/ui";
import { final } from "../content/fr";

export function Final() {
  return (
    <section className="section final" data-tone="bordeaux" aria-labelledby="final-title">
      <div className="wrap final__grid">
        <div className="final__board" aria-hidden="true">
          {Array.from({ length: 24 }, (_, i) => <span key={i} className={`final__cell${[5, 9, 14, 16].includes(i) ? " final__cell--free" : ""}${i === 15 ? " final__cell--me" : ""}`} />)}
        </div>
        <div className="final__copy">
          <h2 id="final-title" data-reveal>{final.title}</h2>
          <p className="lead" data-reveal>{final.text}</p>
          <div className="final__cta" data-reveal>
            <ButtonLink to="/rejoindre" size="lg" arrow>{final.cta}</ButtonLink>
            <Link to="/app" className="final__demo">{final.demo}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
