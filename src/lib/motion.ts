import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);
gsap.defaults({ ease: "expo.out", duration: 0.8 });

export const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export { splitWords };

/** Découpe un titre en mots enveloppés (pour la révélation ligne par ligne). Idempotent. */
function splitWords(el: HTMLElement) {
  if (el.dataset.splitDone) return Array.from(el.querySelectorAll<HTMLElement>(".w > span"));
  const walk = (node: Node): Node[] => {
    if (node.nodeType === Node.TEXT_NODE) {
      const frag: Node[] = [];
      const parts = (node.textContent ?? "").split(/(\s+)/);
      for (const p of parts) {
        if (!p) continue;
        if (/^\s+$/.test(p)) { frag.push(document.createTextNode(" ")); continue; }
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
 * - [data-slots] : les créneaux s'impriment de gauche à droite, puis l'encre Cool Horizon glisse par-dessus
 *   l'encre bordeaux (planche « créneaux communs ») ;
 * - [data-stagger] : les enfants arrivent en cascade ; [data-stamp] se pose comme un tampon ;
 * - .pan__band : les bandes horaires se tracent.
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
    gsap.to(words, { yPercent: 0, duration: 0.9, stagger: 0.045, ease: "expo.out" });
  });

  // Blocs
  const blocks = gsap.utils.toArray<HTMLElement>("[data-reveal]:not([data-split])", scope);
  gsap.set(blocks, { autoAlpha: 0, y: 18 });
  const io = new IntersectionObserver((entries) => {
    const seen = entries.filter((e) => e.isIntersecting).map((e) => e.target);
    if (!seen.length) return;
    seen.forEach((el) => io.unobserve(el));
    gsap.to(seen, { autoAlpha: 1, y: 0, stagger: 0.06, overwrite: true });
  }, { rootMargin: "0px 0px -8% 0px" });
  blocks.forEach((el) => io.observe(el));
  cleanups.push(() => io.disconnect());

  // Filets de section
  once(".section, .site-footer", "0px 0px -5% 0px", (el) => el.classList.add("is-in"));

  // Créneaux qui s'impriment, puis encre qui glisse
  once("[data-slots]", "0px 0px -15% 0px", (el) => {
    const printed = gsap.utils.toArray<HTMLElement>(".slot--free, .slot--course, .slot--inkA", el);
    const ink = gsap.utils.toArray<HTMLElement>(".slot--inkB", el);
    const labels = gsap.utils.toArray<HTMLElement>(".slot--label", el);
    const tl = gsap.timeline();
    tl.fromTo(printed, { scaleY: 0.2, autoAlpha: 0, transformOrigin: "50% 100%" }, { scaleY: 1, autoAlpha: 1, duration: 0.5, stagger: { each: 0.05, from: "start" } });
    if (ink.length) {
      tl.fromTo(ink, { x: 56, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.9, stagger: 0.06, ease: "expo.out" }, "+=0.2")
        .fromTo(labels, { autoAlpha: 0, scale: 1.3 }, { autoAlpha: 1, scale: 1, duration: 0.4, stagger: 0.08, ease: "expo.out" }, "-=0.3");
    }
  });

  // Cascades et tampons
  const groups = gsap.utils.toArray<HTMLElement>("[data-stagger]", scope);
  groups.forEach((g) => gsap.set(g.children, { autoAlpha: 0, y: 14 }));
  once("[data-stagger]", "0px 0px -12% 0px", (el) => {
    const tl = gsap.timeline();
    tl.to(el.children, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.14 });
    const stamps = gsap.utils.toArray<HTMLElement>("[data-stamp]", el);
    if (stamps.length) tl.fromTo(stamps, { autoAlpha: 0, scale: 1.25, rotate: -2 }, { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.5, stagger: 0.1, ease: "expo.out" }, "-=0.1");
  });
  const loneStamps = gsap.utils.toArray<HTMLElement>("[data-stamp]", scope).filter((s) => !s.closest("[data-stagger]"));
  gsap.set(loneStamps, { autoAlpha: 0, scale: 1.25, rotate: -2 });
  once("[data-stamp]", "0px 0px -12% 0px", (el) => { if (!el.closest("[data-stagger]")) gsap.to(el, { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.5, ease: "expo.out" }); });

  // Bandes horaires
  const bands = gsap.utils.toArray<HTMLElement>(".pan__band", scope);
  gsap.set(bands, { scaleX: 0, transformOrigin: "0 50%" });
  once(".pan__chart", "0px 0px -15% 0px", (el) => {
    gsap.to(gsap.utils.toArray<HTMLElement>(".pan__band", el), { scaleX: 1, duration: 0.9, stagger: 0.08, ease: "expo.out" });
    gsap.fromTo(gsap.utils.toArray<HTMLElement>(".pan__dot", el), { scale: 0 }, { scale: 1, duration: 0.5, stagger: 0.1, delay: 0.6, ease: "back.out(2)" });
  });

  // Les trois gestes : les écrans jouent l'un après l'autre
  once(".how__steps", "0px 0px -15% 0px", (el) => {
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    const typed = el.querySelector<HTMLElement>(".mini__search span");
    const suggest = gsap.utils.toArray<HTMLElement>(".mini__suggest li", el);
    const results = gsap.utils.toArray<HTMLElement>(".mini__results li", el);
    const filters = gsap.utils.toArray<HTMLElement>(".mini__filters .tag", el);
    const formRows = gsap.utils.toArray<HTMLElement>(".mini__form .mini__value", el);
    const send = el.querySelector<HTMLElement>(".mini__send .btn");
    const after = el.querySelector<HTMLElement>(".mini__after");
    if (typed) {
      const text = typed.textContent ?? "";
      const o = { n: 0 };
      typed.textContent = "";
      tl.to(o, { n: text.length, duration: 0.9, ease: "none", onUpdate: () => { typed.textContent = text.slice(0, Math.round(o.n)); } }, 0.2);
    }
    tl.fromTo(suggest, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.1 }, "-=0.2")
      .fromTo(filters, { autoAlpha: 0, scale: 0.9 }, { autoAlpha: 1, scale: 1, duration: 0.35, stagger: 0.08 }, "+=0.1")
      .fromTo(results, { autoAlpha: 0, x: -14 }, { autoAlpha: 1, x: 0, duration: 0.5, stagger: 0.12 }, "-=0.1")
      .fromTo(formRows, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35, stagger: 0.1 }, "+=0.1");
    if (send) tl.fromTo(send, { scale: 1 }, { scale: 0.94, duration: 0.12, yoyo: true, repeat: 1, ease: "power1.inOut" }, "+=0.2");
    if (after) tl.fromTo(after, { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0, duration: 0.5 }, "+=0.5");
  });

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

export { gsap, ScrollTrigger, useGSAP };
