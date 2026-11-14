import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Logo } from "../brand/Logo";
import { ButtonLink } from "../components/ui";
import { nav } from "../content/fr";
import { setupProgress } from "../lib/motion";

export function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const bar = useRef<HTMLSpanElement>(null);
  useEffect(() => { setOpen(false); }, [location]);
  useEffect(() => setupProgress(bar.current!), []);
  // Section courante : le lien du menu correspondant est marqué pendant le défilement (accueil uniquement)
  const [current, setCurrent] = useState("");
  useEffect(() => {
    if (location.pathname !== "/") { setCurrent(location.pathname); return; }
    const ids = nav.links.filter((l) => l.href.startsWith("/#")).map((l) => l.href.slice(2));
    let raf = 0;
    const update = () => {
      raf = 0;
      let found = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.45 && r.bottom > 90) found = `/#${id}`;
      }
      setCurrent(found);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, [location.pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="site-header">
      <a className="skip" href="#contenu">Aller au contenu</a>
      <div className="wrap site-header__bar">
        <Link to="/" aria-label="CAMPUUS, accueil"><Logo size={30} /></Link>
        <nav className="site-nav" aria-label="Navigation principale">
          {nav.links.map((l) => <a key={l.href} href={l.href} aria-current={current === l.href ? (l.href.includes("#") ? "location" : "page") : undefined}>{l.label}</a>)}
        </nav>
        <div className="site-header__actions">
          <Link to="/app" className="site-header__demo">{nav.demo}</Link>
          <ButtonLink to="/rejoindre" size="sm">{nav.join}</ButtonLink>
          <button type="button" className="site-header__burger" aria-expanded={open} aria-controls="menu-mobile" aria-label={open ? "Fermer le menu" : "Ouvrir le menu"} onClick={() => setOpen((o) => !o)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      <span className="progress" ref={bar} aria-hidden="true" />
      <div id="menu-mobile" className={`site-menu${open ? " site-menu--open" : ""}`} hidden={!open}>
        <nav aria-label="Navigation mobile">
          {nav.links.map((l) => <a key={l.href} href={l.href} aria-current={current === l.href ? (l.href.includes("#") ? "location" : "page") : undefined} onClick={() => setOpen(false)}>{l.label}</a>)}
        </nav>
        <div className="site-menu__actions">
          <ButtonLink to="/rejoindre" size="lg" arrow>{nav.join}</ButtonLink>
          <ButtonLink to="/app" size="lg" variant="secondary">{nav.demo}</ButtonLink>
        </div>
      </div>
    </header>
  );
}
