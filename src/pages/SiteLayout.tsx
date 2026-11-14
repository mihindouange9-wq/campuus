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

/** Fragments de la phrase d'ouverture, montrés un à un pendant l'animation. */
const SAY = ["Bloqué", "sur un cours ?", "Trouve quelqu'un"];
/** Créneaux qui s'allument dans la grille. */
const HOT = [5, 18, 23];

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
    const count = el.querySelector<HTMLElement>(".intro__count");
    const n = { v: 0 };
    // Cinq secondes, cinq temps. 1. La grille d'un emploi du temps s'allume case par case, le compteur part.
    tl.fromTo(".intro__cell", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, stagger: { each: 0.022, from: "random" } }, 0)
      .to(n, { v: 100, duration: 3.8, ease: "power2.inOut", onUpdate: () => { if (count) count.textContent = String(Math.round(n.v)).padStart(3, "0"); } }, 0)
      .fromTo(".intro__line", { scaleX: 0 }, { scaleX: 1, duration: 3.8, ease: "power2.inOut" }, 0);
    // 2. Les fragments de la phrase passent en grand, chacun dans son masque
    gsap.utils.toArray<HTMLElement>(".intro__say > span > span", el).forEach((w, i) => {
      // un fragment sort avant que le suivant n'entre : jamais deux à l'écran
      const t = 0.25 + i * 0.7;
      // course plus longue que le masque et sa marge : rien ne dépasse avant l'entrée ni après la sortie
      tl.fromTo(w, { yPercent: 170, autoAlpha: 1 }, { yPercent: 0, duration: 0.45 }, t).to(w, { yPercent: -170, duration: 0.26, ease: "expo.in" }, t + 0.43).set(w, { autoAlpha: 0 }, t + 0.7);
    });
    // 3. Trois créneaux s'allument en Cinabre : quelqu'un est disponible
    tl.fromTo(".intro__cell--hot i", { scaleY: 0 }, { scaleY: 1, duration: 0.45, stagger: 0.09 }, 1.7)
      // 4. Le symbole s'assemble, chaque U descend derrière son masque ; le mot-symbole monte lettre à lettre
      .fromTo(".intro__mark", { scale: 1.7 }, { scale: 1, duration: 1.2 }, 2.36)
      .fromTo(".intro__u--a", { clipPath: "inset(0 0 100% 0)", x: -18 }, { clipPath: "inset(0 0 0% 0)", x: 0, duration: 0.8 }, 2.36)
      .fromTo(".intro__u--b", { clipPath: "inset(0 0 100% 0)", x: 18 }, { clipPath: "inset(0 0 0% 0)", x: 0, duration: 0.8 }, 2.5)
      .fromTo(".intro__word span > span", { yPercent: 112 }, { yPercent: 0, duration: 0.7, stagger: 0.045 }, 2.85)
      .to(".intro__cell", { autoAlpha: 0, duration: 0.3, ease: "power1.in", stagger: { each: 0.012, from: "random" } }, 3.3)
      .to(".intro__logo", { scale: 1.05, duration: 0.7, ease: "power1.inOut" }, 3.3)
      // 5. Cinq volets Cinabre montent en cascade, puis se retirent et découvrent la page
      .fromTo(".intro__col", { scaleY: 0 }, { scaleY: 1, duration: 0.38, ease: "expo.inOut", stagger: 0.05 }, 3.85)
      .set(".intro__bg, .intro__logo, .intro__grid, .intro__say, .intro__meta", { autoAlpha: 0 }, 4.44)
      .add(() => introDone(), 4.44)
      .to(".intro__col", { scaleY: 0, transformOrigin: "50% 0%", duration: 0.38, ease: "expo.inOut", stagger: 0.04 }, 4.46);
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
      <div className="intro__grid">
        {Array.from({ length: 24 }, (_, i) => (
          <span key={i} className={HOT.includes(i) ? "intro__cell intro__cell--hot" : "intro__cell"}><i /></span>
        ))}
      </div>
      <p className="intro__say">
        {SAY.map((w) => <span key={w}><span>{w}</span></span>)}
      </p>
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
      <div className="intro__meta">
        <span className="intro__count">000</span>
        <span className="intro__line" />
      </div>
      <div className="intro__cols">
        {[0, 1, 2, 3, 4].map((k) => <span key={k} className="intro__col" />)}
      </div>
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
