import { prefersReducedMotion } from "./motion";

/*
 * Les scènes de la page d'accueil liées au défilement. Aucun détournement du défilement : la page défile
 * nativement, les écrans collants sont en `position: sticky`, et le script ne fait que lire la position pour
 * écrire des transform / opacity (une seule écoute, une image par rafraîchissement).
 *
 * - Trois gestes : les trois feuilles d'interface se posent l'une sur l'autre, l'étape en cours s'allume.
 * - Mise en relation : la grille de Nadège glisse sur celle de Kevin ; le créneau commun apparaît au recouvrement.
 * - Grille des capitales : les bandes horaires se remplissent ville après ville.
 * - Bande des campus (ordinateur) : dérive horizontale ; (téléphone) repère de position du carrousel.
 * - La nuance (canvas de fond) est mise en pause quand ni le hero ni la clôture ne sont à l'écran.
 *
 * En mouvement réduit, ou sur un écran trop bas pour un écran collant, rien n'est épinglé : chaque scène reste
 * dans son état final, lisible.
 */
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export function setupScenes(root: HTMLElement) {
  const html = document.documentElement;
  const cleanups: (() => void)[] = [];
  const updaters: (() => void)[] = [];
  const measurers: (() => void)[] = [];

  /* La nuance ne tourne que sous le hero et la clôture */
  const live = new Set<Element>();
  const nio = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) live.add(e.target); else live.delete(e.target); });
    html.dataset.nuance = live.size ? "on" : "off";
  });
  root.querySelectorAll(".hero, .final").forEach((el) => nio.observe(el));
  cleanups.push(() => { nio.disconnect(); delete html.dataset.nuance; });

  /* Carrousels : barre et compteur de position (fonctionne aussi en mouvement réduit, c'est une information) */
  root.querySelectorAll<HTMLElement>("[data-rail]").forEach((viewport) => {
    const host = viewport.closest("section");
    const bar = host?.querySelector<HTMLElement>("[data-rail-bar]");
    const count = host?.querySelector<HTMLElement>("[data-rail-count]");
    const list = viewport.matches("ul, ol") ? viewport : viewport.querySelector("ul");
    const n = list?.children.length ?? 1;
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = viewport.scrollWidth - viewport.clientWidth;
      const p = max > 0 ? clamp(viewport.scrollLeft / max) : 0;
      if (bar) bar.style.transform = `scaleX(${(1 + p * (n - 1)) / n})`;
      if (count) count.textContent = String(1 + Math.round(p * (n - 1)));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    viewport.addEventListener("scroll", onScroll, { passive: true });
    cleanups.push(() => { viewport.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); });
  });

  if (prefersReducedMotion()) return () => cleanups.forEach((c) => c());

  const vh = () => window.innerHeight;
  const tall = window.matchMedia("(min-height: 640px)");
  const wide = window.matchMedia("(min-width: 721px)");
  /** Progression d'un élément collant dans sa piste : 0 quand il se fixe, 1 quand la piste se termine. */
  const progress = (track: HTMLElement, sticky: HTMLElement, top: number) => {
    const r = track.getBoundingClientRect();
    const total = r.height - sticky.offsetHeight;
    return total > 0 ? clamp((top - r.top) / total) : 1;
  };

  /* ── Trois gestes ── */
  const how = root.querySelector<HTMLElement>('[data-scene="how"]');
  if (how) {
    const track = how.querySelector<HTMLElement>(".how__track")!;
    const sticky = how.querySelector<HTMLElement>(".how__sticky")!;
    const screens = Array.from(how.querySelectorAll<HTMLElement>(".how__screen"));
    const bar = how.querySelector<HTMLElement>(".how__bar i");
    const meet = how.querySelector<HTMLElement>(".how__match");
    const inkB = how.querySelector<HTMLElement>(".match__board--b");
    let top = 0, on = false, step = -1;
    const measure = () => {
      const want = tall.matches && wide.matches; // sur téléphone, pas d’écran collant : les étapes se font glisser
      if (want !== on) {
        on = want;
        how.classList.toggle("is-scrolly", on);
        if (!on) { screens.forEach((s) => { s.style.transform = ""; s.style.opacity = ""; s.classList.remove("is-on"); }); delete how.dataset.step; step = -1; if (inkB) inkB.style.transform = ""; meet?.classList.remove("is-apart"); }
      }
      if (on) top = parseFloat(getComputedStyle(sticky).top) || 0;
    };
    const update = () => {
      if (!on) return;
      const r = track.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh() + 200) return;
      const p = progress(track, sticky, top);
      const last = screens.length - 1;
      const seg = p * (last + 0.9);
      const enter = screens.map((_, i) => (i === 0 ? 1 : easeOut(clamp((seg - (i - 0.5)) / 0.5))));
      screens.forEach((el, i) => {
        const depth = enter.slice(i + 1).reduce((a, b) => a + b, 0);
        const e = enter[i];
        el.style.transform = `translate3d(0, ${((1 - e) * 96 - depth * 16).toFixed(1)}px, 0) scale(${(1 - depth * 0.045).toFixed(4)}) rotate(${((1 - e) * -2).toFixed(2)}deg)`;
        el.style.opacity = String(clamp(e * 6).toFixed(3));
        // le contenu de la feuille se joue dès qu'elle commence à se poser, pour ne jamais montrer une feuille vide
        el.classList.toggle("is-on", e > 0.12);
      });
      const active = Math.min(last, Math.floor(seg + 0.2));
      // Dernière feuille : la grille de Nadège glisse sur celle de Kevin, puis le créneau commun apparaît
      const m = easeInOut(clamp((seg - (last - 0.1)) / 0.6));
      if (inkB) inkB.style.transform = `translate3d(${((1 - m) * 46).toFixed(2)}%, 0, 0)`;
      meet?.classList.toggle("is-apart", m < 0.98);
      if (active !== step) {
        step = active;
        how.dataset.step = String(active);
        
      }
      if (bar) bar.style.transform = `scaleX(${p.toFixed(4)})`;
    };
    measurers.push(measure); updaters.push(update);
    cleanups.push(() => { how.classList.remove("is-scrolly"); delete how.dataset.step; screens.forEach((s) => { s.style.transform = ""; s.style.opacity = ""; }); if (inkB) inkB.style.transform = ""; meet?.classList.remove("is-apart"); });
  }

  /* ── Mise en relation ── */
  const match = root.querySelector<HTMLElement>('[data-scene="match"]');
  if (match) {
    const track = match.querySelector<HTMLElement>(".match__track")!;
    const stage = match.querySelector<HTMLElement>(".match__stage")!;
    const a = match.querySelector<HTMLElement>(".match__board--a")!;
    const b = match.querySelector<HTMLElement>(".match__board--b")!;
    let top = 0, up = 0, down = 0, on = false, met: boolean | null = null;
    const measure = () => {
      const want = tall.matches;
      if (want !== on) {
        on = want;
        match.classList.toggle("is-scrolly", on);
        if (!on) { a.style.transform = ""; b.style.transform = ""; match.classList.remove("is-apart"); met = null; }
      }
      if (on) {
        top = parseFloat(getComputedStyle(stage).top) || 0;
        // Écart total entre les deux grilles séparées : une hauteur de grille + 14 px. La grille du haut ne monte que
        // de la place disponible au-dessus d'elle dans la scène (sinon elle passerait sous l'en-tête) ; celle du bas prend le reste.
        const gap = (a.querySelector<HTMLElement>(".tt")?.offsetHeight ?? 0) + 14;
        up = Math.min(gap / 2, Math.max(0, a.offsetTop - 4));
        down = gap - up;
      }
    };
    const update = () => {
      if (!on) return;
      const r = track.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh() + 200) return;
      const p = progress(track, stage, top);
      const m = easeInOut(clamp((p - 0.08) / 0.5));
      a.style.transform = `translate3d(0, ${(-up * (1 - m)).toFixed(1)}px, 0)`;
      b.style.transform = `translate3d(0, ${(down * (1 - m)).toFixed(1)}px, 0)`;
      const now = p > 0.56;
      if (now !== met) { met = now; match.classList.toggle("is-apart", !now); }
    };
    measurers.push(measure); updaters.push(update);
    cleanups.push(() => { match.classList.remove("is-scrolly", "is-apart"); a.style.transform = ""; b.style.transform = ""; });
  }

  /* ── Grille des capitales ── */
  const pan = root.querySelector<HTMLElement>('[data-scene="pan"]');
  if (pan) {
    const bands = Array.from(pan.querySelectorAll<HTMLElement>(".pan__band"));
    pan.classList.add("is-scrub");
    const update = () => {
      const r = pan.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh() + 200) return;
      const p = clamp((vh() * 0.92 - r.top) / (vh() * 0.62));
      bands.forEach((band, i) => { band.style.transform = `scaleX(${easeOut(clamp((p * 1.7 - i * 0.08) / 0.62)).toFixed(4)})`; });
      pan.classList.toggle("is-full", p > 0.8);
    };
    updaters.push(update);
    cleanups.push(() => { pan.classList.remove("is-scrub", "is-full"); bands.forEach((band) => { band.style.transform = ""; }); });
  }

  /* ── Bande des campus : dérive horizontale sur ordinateur ── */
  const drift = root.querySelector<HTMLElement>("[data-drift]");
  if (drift) {
    const strip = drift.firstElementChild as HTMLElement;
    let over = 0, on = false;
    const measure = () => {
      const want = wide.matches;
      if (want !== on) { on = want; drift.classList.toggle("is-drift", on); if (!on) strip.style.transform = ""; else drift.scrollLeft = 0; }
      if (on) over = Math.max(0, strip.scrollWidth - drift.clientWidth);
    };
    const update = () => {
      if (!on) return;
      const r = drift.getBoundingClientRect();
      if (r.bottom < -100 || r.top > vh() + 100) return;
      const p = clamp((vh() - r.top) / (vh() + r.height));
      strip.style.transform = `translate3d(${(-over * p).toFixed(1)}px, 0, 0)`;
    };
    measurers.push(measure); updaters.push(update);
    cleanups.push(() => { drift.classList.remove("is-drift"); strip.style.transform = ""; });
  }

  /* ── Mots fantômes : ils glissent latéralement avec le défilement ── */
  root.querySelectorAll<HTMLElement>("[data-ghost]").forEach((ghost) => {
    const update = () => {
      const r = ghost.getBoundingClientRect();
      if (r.bottom < -100 || r.top > vh() + 100) return;
      const p = clamp((vh() - r.top) / (vh() + r.height));
      ghost.style.transform = `translate3d(${(12 - p * 36).toFixed(2)}%, 0, 0)`;
    };
    updaters.push(update);
    cleanups.push(() => { ghost.style.transform = ""; });
  });

  let raf = 0;
  const frame = () => { raf = 0; updaters.forEach((u) => u()); };
  const onScroll = () => { if (!raf) raf = requestAnimationFrame(frame); };
  const onResize = () => { measurers.forEach((m) => m()); onScroll(); };
  onResize();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize);
  tall.addEventListener("change", onResize);
  wide.addEventListener("change", onResize);
  let alive = true;
  document.fonts?.ready.then(() => { if (alive) onResize(); });
  const late = window.setTimeout(onResize, 600);
  cleanups.push(() => {
    alive = false;
    clearTimeout(late);
    cancelAnimationFrame(raf);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onResize);
    tall.removeEventListener("change", onResize);
    wide.removeEventListener("change", onResize);
  });

  return () => cleanups.forEach((c) => c());
}
