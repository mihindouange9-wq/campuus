import { lazy, Suspense, useEffect, useState } from "react";
import { Header3, Hero3 } from "../sections/v3";
import { ButtonLink } from "../components/ui";
import { nav } from "../content/fr";
import { setupInk } from "../lib/motion";
import "./site.css";

const Sections = lazy(() => import("./LandingRest").then((m) => ({ default: m.Sections })));
const Foot = lazy(() => import("./LandingRest").then((m) => ({ default: m.Foot })));

/* Fil d'action sur téléphone : visible après le premier écran, s'efface quand la clôture (qui porte la même action) arrive. */
function ActionBar() {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const end = document.querySelector(".cl");
      const nearEnd = end ? end.getBoundingClientRect().top < window.innerHeight : false;
      setShown(window.scrollY > window.innerHeight * 0.85 && !nearEnd);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div className={`actionbar${shown ? " actionbar--on" : ""}`} data-tone="nuit" aria-hidden={!shown}>
      <ButtonLink to="/rejoindre" arrow tabIndex={shown ? undefined : -1}>{nav.join}</ButtonLink>
      <ButtonLink to="/app" variant="secondary" tabIndex={shown ? undefined : -1}>{nav.demo}</ButtonLink>
    </div>
  );
}

export default function Landing() {
  // Le premier affichage ne contient que l'en-tête et le hero ; la suite est montée juste après (tout de suite si
  // l'adresse vise une ancre ou si le visiteur défile déjà), pour que le titre n'attende pas le reste de la page.
  const [rest, setRest] = useState(false);
  useEffect(() => {
    if (rest) return;
    const show = () => setRest(true);
    const t = window.setTimeout(show, 350);
    window.addEventListener("scroll", show, { once: true, passive: true });
    return () => { clearTimeout(t); window.removeEventListener("scroll", show); };
  }, [rest]);
  useEffect(() => setupInk(document.body), []);
  useEffect(() => { document.title = "CAMPUUS — Bloqué sur un cours ? Trouve quelqu'un qui peut t'aider."; }, []);

  return (
    <>
      <Header3 />
      <main id="contenu" className="landing home">
        <Hero3 />
        {rest ? <Suspense fallback={null}><Sections /></Suspense> : null}
      </main>
      {rest ? <Suspense fallback={null}><Foot /></Suspense> : null}
      <ActionBar />
    </>
  );
}
