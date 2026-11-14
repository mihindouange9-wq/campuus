import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Closing3, Features3, Footer3, Problem3, Reach3, Steps3 } from "../sections/v3";
import { setupReveals } from "../lib/motion";
import { setupScenes } from "../lib/landingMotion";

/*
 * Tout ce qui se trouve sous le premier écran de l’accueil (charte v3). Chargé à part et monté juste après le premier
 * affichage : la phrase-menu s’affiche sans attendre le rendu des sections suivantes.
 */
export function Sections() {
  const { hash } = useLocation();
  useEffect(() => {
    const main = document.querySelector<HTMLElement>("main.home");
    if (!main) return;
    const a = setupReveals(main);
    const b = setupScenes(main);
    return () => { a?.(); b?.(); };
  }, []);
  useEffect(() => {
    if (!hash) return;
    const el = document.querySelector(hash);
    if (!el) return;
    const go = () => el.scrollIntoView({ behavior: "smooth", block: "start" });
    const t = setTimeout(go, 50);
    let live = true;
    document.fonts?.ready.then(() => { if (live) setTimeout(() => { if (live) go(); }, 60); });
    return () => { live = false; clearTimeout(t); };
  }, [hash]);

  return (
    <>
      <Problem3 />
      <Steps3 />
      <Features3 />
      <Reach3 />
      <Closing3 />
    </>
  );
}

export { Footer3 as Foot };
