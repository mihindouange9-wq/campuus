import { Link } from "react-router-dom";
import { Logo } from "../brand/Logo";
import { footer } from "../content/fr";

export function Footer() {
  return (
    <footer className="site-footer" data-tone="deep">
      <div className="wrap site-footer__grid">
        <div className="site-footer__about">
          <Link to="/" aria-label="CAMPUUS, accueil"><Logo size={30} tone="dark" /></Link>
          <p>{footer.about}</p>
          <p className="site-footer__stage">{footer.stage}</p>
        </div>
        {footer.columns.map((col) => (
          <div key={col.title} className="site-footer__col">
            <h3>{col.title}</h3>
            <ul>
              {col.links.map((l) => {
                const href = "href" in l ? l.href : null;
                return (
                  <li key={l.label}>
                    {!href ? (
                      <span className="site-footer__soon"><span>{l.label}</span><span className="tag">{footer.soon}</span></span>
                    ) : href.startsWith("/#") ? (
                      <a href={href}>{l.label}</a>
                    ) : (
                      <Link to={href}>{l.label}</Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      <div className="wrap site-footer__bottom">
        <span>© 2026 CAMPUUS</span>
        <span>{footer.credit}</span>
      </div>
    </footer>
  );
}
