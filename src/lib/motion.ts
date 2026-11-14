import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);
/**
 * Le système de mouvement commun (miroir des jetons CSS --t-touch / --t-state / --t-enter et --ease) :
 * 160 ms pour un contact, 400 ms pour un changement d'état, 850 ms pour une entrée ; une seule courbe de sortie
 * (exponentielle) pour ce qui arrive, une accélération courte pour ce qui part (la sortie est plus rapide que l'entrée).
 */
export const MOTION = { touch: 0.16, state: 0.4, enter: 0.85, stagger: 0.05, ease: "expo.out", exit: "power2.in" } as const;
gsap.defaults({ ease: MOTION.ease, duration: MOTION.enter });

export const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export { splitWords };

/** Découpe un titre en mots enveloppés (pour la révélation ligne par ligne). Idempotent. */
function splitWords(el: HTMLElement) {
  if (el.dataset.splitDone) return Array.from(el.querySelectorAll<HTMLElement>(".w > span"));
  const walk = (node: Node): Node[] => {
    if (node.nodeType === Node.TEXT_NODE) {
      const frag: Node[] = [];
      const parts = (node.textContent ?? "").split(/([ \t\n]+)/); // les espaces insécables restent collées à leur mot
      for (const p of parts) {
        if (!p) continue;
        if (/^[ \t\n]+$/.test(p)) { frag.push(document.createTextNode(" ")); continue; }
        const w = document.createElement("span"); w.className = "w";
        const inner = document.createElement("span"); inner.textContent = p;
        w.appendChild(inner); frag.push(w);
      }
      return frag;
    }
    if (node instanceof HTMLElement) {
      const children = Array.from(node.childNodes);
      node.textContent = "";
      children.flatMap(walk).forEach((n) => node.appendChild(n));
      return [node];
    }
    return [node];
  };
  const children = Array.from(el.childNodes);
  el.textContent = "";
  children.flatMap(walk).forEach((n) => el.appendChild(n));
  el.dataset.splitDone = "1";
  return Array.from(el.querySelectorAll<HTMLElement>(".w > span"));
}

/**
 * Le langage de mouvement du site, orchestré une fois :
 * - [data-reveal] monte de quelques pixels à l'entrée dans l'écran ;
 * - h1/h2 [data-split] : les mots montent un à un derrière leur ligne ;
 * - .section : le filet de tête se trace de gauche à droite ;
 * - [data-wipe] : le bloc se dévoile derrière un masque, de gauche à droite ;
 * - [data-stagger] : les enfants arrivent en cascade courte ; [data-stamp] se pose comme un tampon.
 * Les scènes liées au défilement (trois gestes, mise en relation, grille des capitales) sont dans landingMotion.ts.
 * Tout est visible sans JavaScript : le JS ne retire que ce qu'il anime.
 */
export function setupReveals(scope: HTMLElement) {
  if (prefersReducedMotion()) return;
  const cleanups: (() => void)[] = [];
  const once = (selector: string, margin: string, play: (el: HTMLElement) => void) => {
    const els = gsap.utils.toArray<HTMLElement>(selector, scope);
    if (!els.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.filter((e) => e.isIntersecting).forEach((e) => { io.unobserve(e.target); play(e.target as HTMLElement); });
    }, { rootMargin: margin });
    els.forEach((el) => io.observe(el));
    cleanups.push(() => io.disconnect());
  };

  // Titres : mots qui montent
  const titles = gsap.utils.toArray<HTMLElement>("[data-split]", scope);
  titles.forEach((t) => { const words = splitWords(t); gsap.set(words, { yPercent: 110 }); });
  once("[data-split]", "0px 0px -10% 0px", (el) => {
    const words = el.querySelectorAll(".w > span");
    gsap.to(words, { yPercent: 0, duration: MOTION.enter, stagger: 0.04, ease: MOTION.ease });
  });

  // Blocs
  const blocks = gsap.utils.toArray<HTMLElement>("[data-reveal]:not([data-split])", scope);
  gsap.set(blocks, { autoAlpha: 0, y: 18 });
  const io = new IntersectionObserver((entries) => {
    const seen = entries.filter((e) => e.isIntersecting).map((e) => e.target);
    if (!seen.length) return;
    seen.forEach((el) => io.unobserve(el));
    gsap.to(seen, { autoAlpha: 1, y: 0, duration: MOTION.enter, stagger: MOTION.stagger, overwrite: true });
  }, { rootMargin: "0px 0px -8% 0px" });
  blocks.forEach((el) => io.observe(el));
  cleanups.push(() => io.disconnect());

  // Filets de section
  once(".section, .site-footer, .how, .final", "0px 0px -5% 0px", (el) => el.classList.add("is-in"));

  // Volets : le bloc se dévoile de gauche à droite derrière un masque (clip-path), sans déplacer la mise en page
  // (dans un carrousel horizontal, les cartes restent visibles : on ne masque pas ce qui se fait glisser au doigt)
  const wipes = gsap.utils.toArray<HTMLElement>("[data-wipe]", scope).filter((el) => !el.parentElement || getComputedStyle(el.parentElement).overflowX === "visible");
  gsap.set(wipes, { clipPath: "inset(0 100% 0 0)", autoAlpha: 0 });
  const wipeIo = new IntersectionObserver((entries) => {
    const seen = entries.filter((e) => e.isIntersecting).map((e) => e.target);
    if (!seen.length) return;
    seen.forEach((el) => wipeIo.unobserve(el));
    gsap.to(seen, { clipPath: "inset(0 0% 0 0)", autoAlpha: 1, duration: MOTION.enter, stagger: 0.07, ease: MOTION.ease, clearProps: "clipPath" });
  }, { rootMargin: "0px 0px -8% 0px" });
  wipes.forEach((el) => wipeIo.observe(el));
  cleanups.push(() => wipeIo.disconnect());

  // Cascades et tampons
  const groups = gsap.utils.toArray<HTMLElement>("[data-stagger]", scope);
  groups.forEach((g) => gsap.set(g.children, { autoAlpha: 0, y: 14 }));
  once("[data-stagger]", "0px 0px -12% 0px", (el) => {
    const tl = gsap.timeline();
    tl.to(el.children, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.08 });
    const stamps = gsap.utils.toArray<HTMLElement>("[data-stamp]", el);
    if (stamps.length) tl.fromTo(stamps, { autoAlpha: 0, scale: 1.25, rotate: -2 }, { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.5, stagger: 0.1, ease: "expo.out" }, "-=0.1");
  });
  const loneStamps = gsap.utils.toArray<HTMLElement>("[data-stamp]", scope).filter((s) => !s.closest("[data-stagger]"));
  gsap.set(loneStamps, { autoAlpha: 0, scale: 1.25, rotate: -2 });
  once("[data-stamp]", "0px 0px -12% 0px", (el) => { if (!el.closest("[data-stagger]")) gsap.to(el, { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.5, ease: "expo.out" }); });

  return () => cleanups.forEach((c) => c());
}

/**
 * L'encre au clic : une goutte Cool Horizon part du point de contact et s'étale (multiply), sur tout
 * élément interactif. Une seule écoute par racine.
 */
export function setupInk(root: HTMLElement) {
  if (prefersReducedMotion()) return;
  const handler = (e: PointerEvent) => {
    const target = (e.target as HTMLElement).closest<HTMLElement>(".btn, .chip, .tile, .app-nav__item, .app-tabs__item, .student-row, .conv, .notif, .group__title, .tt--editable .tt__cell, .radios label, .checks label, .switch, .tabs button, .site-nav a, .site-header__demo, .menu__list button");
    if (!target) return;
    const rect = target.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.6;
    const ink = document.createElement("span");
    ink.className = "ink";
    ink.style.width = ink.style.height = `${size}px`;
    ink.style.left = `${e.clientX - rect.left - size / 2}px`;
    ink.style.top = `${e.clientY - rect.top - size / 2}px`;
    const pos = getComputedStyle(target).position;
    if (pos === "static") target.classList.add("ink-host");
    target.appendChild(ink);
    ink.addEventListener("animationend", () => ink.remove(), { once: true });
  };
  root.addEventListener("pointerdown", handler);
  return () => root.removeEventListener("pointerdown", handler);
}

/** Barre de progression de lecture (site public). */
export function setupProgress(bar: HTMLElement) {
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
  };
  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
}

/** Met en pause le canvas de fond (la nuance) sur les écrans dont les surfaces sont opaques : pages secondaires, application. */
export function pauseNuance() {
  const html = document.documentElement;
  html.dataset.nuance = "off";
  return () => { delete html.dataset.nuance; };
}

export { gsap, ScrollTrigger, useGSAP };
