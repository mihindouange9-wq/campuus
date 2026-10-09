import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);
gsap.defaults({ ease: "expo.out", duration: 0.8 });

export const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Révélations communes du site : [data-reveal] monte de quelques pixels à l'entrée dans l'écran ;
 * [data-slots] allume ses créneaux (.slot--free) de gauche à droite dans l'ordre des jours.
 * Tout est visible sans JavaScript : le JS ne retire que ce qu'il anime.
 */
export function setupReveals(scope: HTMLElement) {
  if (prefersReducedMotion()) return;
  const blocks = gsap.utils.toArray<HTMLElement>("[data-reveal]", scope);
  gsap.set(blocks, { autoAlpha: 0, y: 18 });
  const io = new IntersectionObserver(
    (entries) => {
      const seen = entries.filter((e) => e.isIntersecting).map((e) => e.target);
      if (!seen.length) return;
      seen.forEach((el) => io.unobserve(el));
      gsap.to(seen, { autoAlpha: 1, y: 0, stagger: 0.06, overwrite: true });
    },
    { rootMargin: "0px 0px -8% 0px" },
  );
  blocks.forEach((el) => io.observe(el));

  const grids = gsap.utils.toArray<HTMLElement>("[data-slots]", scope);
  const ioSlots = new IntersectionObserver(
    (entries) => {
      entries.filter((e) => e.isIntersecting).forEach((e) => {
        ioSlots.unobserve(e.target);
        const slots = gsap.utils.toArray<HTMLElement>(".slot--free, .slot--inkA, .slot--inkB, .slot--course", e.target as HTMLElement);
        gsap.fromTo(slots, { scaleY: 0.2, autoAlpha: 0, transformOrigin: "50% 100%" }, { scaleY: 1, autoAlpha: 1, duration: 0.5, stagger: { each: 0.05, from: "start" }, overwrite: true });
      });
    },
    { rootMargin: "0px 0px -15% 0px" },
  );
  grids.forEach((el) => ioSlots.observe(el));

  return () => { io.disconnect(); ioSlots.disconnect(); };
}

export { gsap, ScrollTrigger, useGSAP };
