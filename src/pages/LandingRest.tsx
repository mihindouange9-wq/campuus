import { useEffect } from "react";
import { Closing3, Footer3 } from "../sections/v3";
import { setupReveals } from "../lib/motion";

/* Sous l’écran d’ouverture de l’accueil : un court bloc de présentation (la phrase de clôture et ses actions). Monté juste après le premier affichage. */
export function Sections() {
  useEffect(() => {
    const main = document.querySelector<HTMLElement>("main.home");
    if (!main) return;
    return setupReveals(main);
  }, []);
  return <Closing3 />;
}

export { Footer3 as Foot };
