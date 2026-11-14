import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { gsap, introDone, introStart, prefersReducedMotion } from "../lib/motion";
import "./site.css";

/*
 * Cadre des pages publiques :
 * - l'animation d'ouverture (symbole puis mot CAMPUUS, éclat Cinabre) joue à chaque chargement complet d'une page
 *   publique, jamais lors d'une navigation interne ni dans l'application ;
 * - la transition de page : un volet Cinabre recouvre l'écran, la page change dessous, le volet se retire ;
 * - à chaque page : retour en haut, focus sur le titre ; les anciennes ancres de l'accueil mènent aux nouvelles pages.
 */
let played = typeof window !== "undefined" && window.location.pathname.startsWith("/app");

const OLD_ANCHORS: Record<string, string> = {
  "#fonctionnement": "/comment-ca-marche",
  "#comment-ca-marche": "/comment-ca-marche",
  "#probleme": "/comment-ca-marche",
  "#mise-en-relation": "/comment-ca-marche",
  "#fonctionnalites": "/fonctionnalites",
  "#confiance": "/confiance",
  "#panafricain": "/confiance",
  "#rejoindre": "/rejoindre",
};

const U = (dx: number) => `M${10 + dx} 10H${24 + dx}V54a11 11 0 0 0 22 0V10H${60 + dx}V54a25 25 0 0 1-50 0Z`;

function Intro({ onEnd }: { onEnd: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const end = useRef(onEnd);
  end.current = onEnd;
  useEffect(() => {
    const el = root.current!;
    const html = document.documentElement;
    html.style.overflow = "hidden";
    introStart();
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      html.style.overflow = "";
      end.current();
    };
    const tl = gsap.timeline({ defaults: { ease: "expo.out" }, onComplete: finish });
    // 1. le symbole s'assemble : chaque U descend derrière son masque et rejoint l'autre
    tl.fromTo(".intro__u--a", { clipPath: "inset(0 0 100% 0)", x: -14 }, { clipPath: "inset(0 0 0% 0)", x: 0, duration: 0.6 }, 0.05)
      .fromTo(".intro__u--b", { clipPath: "inset(0 0 100% 0)", x: 14 }, { clipPath: "inset(0 0 0% 0)", x: 0, duration: 0.6 }, 0.16)
      // 2. le mot-symbole monte lettre à lettre
      .fromTo(".intro__word span > span", { yPercent: 110 }, { yPercent: 0, duration: 0.6, stagger: 0.035 }, 0.42)
      // 3. l'éclat Cinabre balaie l'écran…
      .fromTo(".intro__flash", { scaleX: 0 }, { scaleX: 1, duration: 0.42, ease: "expo.inOut" }, 1.18)
      .set(".intro__bg, .intro__logo", { autoAlpha: 0 }, 1.6)
      .add(() => introDone(), 1.6)
      // …et découvre la page, dont le titre enchaîne sa propre révélation
      .to(".intro__flash", { scaleX: 0, transformOrigin: "100% 50%", duration: 0.44, ease: "expo.inOut" }, 1.6);
    // un clic, un toucher ou une touche passe l'animation
    const skip = () => {
      if (finished) return;
      tl.kill();
      introDone();
      gsap.to(el, { autoAlpha: 0, duration: 0.16, ease: "power2.in", onComplete: finish });
    };
    window.addEventListener("pointerdown", skip, { once: true });
    window.addEventListener("keydown", skip, { once: true });
    return () => { tl.kill(); window.removeEventListener("pointerdown", skip); window.removeEventListener("keydown", skip); html.style.overflow = ""; introDone(); };
  }, []);

  return (
    <div className="intro" ref={root} aria-hidden="true">
      <div className="intro__bg" />
      <div className="intro__logo">
        <svg className="intro__mark" viewBox="0 0 100 90" width="104" height="94">
          <defs><clipPath id="intro-u"><path d={U(0)} /></clipPath></defs>
          <path className="intro__u intro__u--a" d={U(0)} fill="#F3EFE7" />
          <g className="intro__u intro__u--b">
            <path d={U(30)} fill="#F03A17" />
            <path d={U(30)} fill="#B02A10" clipPath="url(#intro-u)" />
          </g>
        </svg>
        <span className="intro__word">{"CAMPUUS".split("").map((c, i) => <span key={i}><span>{c}</span></span>)}</span>
      </div>
      <div className="intro__flash" />
    </div>
  );
}

export default function SiteLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  // (le drapeau est levé dès le rendu, avant les effets des pages, pour que leurs titres attendent la fin de l’ouverture)
  const [intro, setIntro] = useState(() => { const play = !played && !prefersReducedMotion(); if (play) introStart(); return play; });
  const veil = useRef<HTMLDivElement>(null);
  const covering = useRef(false);
  const first = useRef(true);
  played = true;

  // Anciennes ancres de l'accueil → nouvelles pages
  useEffect(() => {
    if (location.pathname !== "/" || !location.hash) return;
    const to = OLD_ANCHORS[location.hash];
    if (to) navigate(to, { replace: true });
  }, [location.pathname, location.hash, navigate]);

  // Clic sur un lien interne : le volet recouvre l'écran, puis la page change
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement).closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || a.target || a.hasAttribute("download")) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return; // même page : ancre ou lien courant
      e.preventDefault();
      if (covering.current) return;
      covering.current = true;
      introStart();
      const v = veil.current!;
      gsap.killTweensOf(v);
      gsap.fromTo(v, { yPercent: 100, autoAlpha: 1 }, { yPercent: 0, duration: 0.3, ease: "expo.in", onComplete: () => navigate(url.pathname + url.search + url.hash) });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [navigate]);

  // Nouvelle page : retour en haut, le volet se retire, le focus va au titre
  useLayoutEffect(() => {
    if (first.current) { first.current = false; return; }
    window.scrollTo(0, 0);
    const v = veil.current;
    if (!v || prefersReducedMotion()) { covering.current = false; introDone(); return; }
    gsap.killTweensOf(v);
    gsap.set(v, { yPercent: 0, autoAlpha: 1 }); // aussi pour Précédent / Suivant : la page change sous le volet
    introStart();
    const t = window.setTimeout(() => {
      introDone();
      gsap.to(v, { yPercent: -100, duration: 0.36, ease: "expo.out", onComplete: () => { gsap.set(v, { autoAlpha: 0 }); covering.current = false; } });
      document.querySelector<HTMLElement>("main h1")?.focus({ preventScroll: true });
    }, 60);
    return () => clearTimeout(t);
  }, [location.pathname]);

  return (
    <>
      <Outlet />
      <div className="veil3" ref={veil} aria-hidden="true" />
      {intro ? <Intro onEnd={() => setIntro(false)} /> : null}
    </>
  );
}
