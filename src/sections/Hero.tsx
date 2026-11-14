import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { ButtonLink } from "../components/ui";
import { Timetable } from "../components/Timetable";
import { hero } from "../content/fr";
import { HOURS } from "../data/constants";
import { gsap, prefersReducedMotion, splitWords, useGSAP } from "../lib/motion";

const COURSES = [
  { day: 0, hour: 8, span: 2, label: "Comptabilité", sub: "Amphi B" },
  { day: 0, hour: 14, span: 2, label: "Micro-éco" },
  { day: 1, hour: 10, span: 2, label: "Maths fi", sub: "TD" },
  { day: 2, hour: 8, span: 3, label: "Statistiques" },
  { day: 3, hour: 9, span: 2, label: "Maths fi", sub: "Cours" },
  { day: 3, hour: 14, span: 2, label: "Anglais" },
  { day: 4, hour: 10, span: 2, label: "Droit" },
  { day: 4, hour: 15, span: 2, label: "Comptabilité", sub: "TD" },
];
const FREE = [
  { day: 1, hour: 19, label: "Aïcha N.", sub: "USTM · M1", id: "a" },
  { day: 3, hour: 17, label: "Loïc O.", sub: "UOB · L3", id: "b" },
  { day: 3, hour: 19, label: "Aïcha N.", sub: "USTM · M1", id: "c" },
  { day: 4, hour: 17, label: "Nadège K.", sub: "Douala · M2", id: "d" },
  { day: 5, hour: 9, label: "Aïcha N.", sub: "USTM · M1", id: "e" },
  { day: 5, hour: 15, label: "Nadège K.", sub: "Douala · M2", id: "f" },
];
/* Sur téléphone, la grille montre la fin de journée (15 h → 20 h) de jeudi à samedi : le moment où l'aide arrive. */
const EVENING = HOURS.filter((h) => h >= 15);
const NARROW = "(max-width: 720px)";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const [narrow, setNarrow] = useState(() => typeof window !== "undefined" && window.matchMedia(NARROW).matches);
  useEffect(() => {
    const mq = window.matchMedia(NARROW);
    const on = () => setNarrow(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  const hours = narrow ? EVENING : HOURS;
  const courses = narrow ? COURSES.filter((c) => c.hour >= EVENING[0]) : COURSES;
  const free = narrow ? FREE.filter((c) => c.hour >= EVENING[0]) : FREE;

  useGSAP(
    () => {
      const scope = root.current!;
      const typed = scope.querySelector<HTMLElement>(".hero__typed")!;
      const slots = gsap.utils.toArray<HTMLElement>(".slot--free", scope);
      const sheet = scope.querySelector<HTMLElement>("[data-sheet]")!;
      const sent = scope.querySelector<HTMLElement>("[data-state='sent']")!;
      const accepted = scope.querySelector<HTMLElement>("[data-state='accepted']")!;
      const meet = gsap.utils.toArray<HTMLElement>(".slot--meet, .slot--label", scope);
      const caret = scope.querySelector<HTMLElement>(".hero__caret")!;
      const courseEls = gsap.utils.toArray<HTMLElement>(".slot--course", scope);
      const words = splitWords(scope.querySelector<HTMLElement>("h1")!);
      const copy = gsap.utils.toArray<HTMLElement>(".hero__copy > :not(h1), .hero__more", scope);
      const board = scope.querySelector<HTMLElement>(".hero__board")!;
      const text = hero.search;

      if (prefersReducedMotion()) {
        typed.textContent = text;
        gsap.set(sent, { autoAlpha: 0 });
        gsap.set(words, { yPercent: 0 });
        return;
      }
      // Entrée : le titre monte mot à mot derrière sa ligne, la colonne suit, la grille se dévoile puis les cours s'impriment
      gsap.set(words, { yPercent: 110 });
      gsap.set(copy, { autoAlpha: 0, y: 14 });
      gsap.set(board, { autoAlpha: 0, y: 24 });
      gsap.set(courseEls, { scaleY: 0.2, autoAlpha: 0, transformOrigin: "50% 100%" });
      const intro = gsap.timeline({ defaults: { ease: "expo.out" } });
      intro.to(words, { yPercent: 0, duration: 0.9, stagger: 0.045 }, 0)
        .to(copy, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.07 }, 0.45)
        .to(board, { autoAlpha: 1, y: 0, duration: 0.9 }, 0.35)
        .to(courseEls, { scaleY: 1, autoAlpha: 1, duration: 0.5, stagger: { each: 0.05, from: "start" } }, 0.6);

      // Le parcours, en boucle : recherche → créneaux libres → demande posée → envoyée → acceptée → rencontre, puis sortie rapide
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5, delay: 1.1, defaults: { ease: "expo.out" } });
      const typing = { n: 0 };
      const write = () => { typed.textContent = text.slice(0, Math.round(typing.n)); };
      tl.set(typed, { textContent: "" })
        .set(slots, { autoAlpha: 0, scaleY: 0.3, transformOrigin: "50% 100%" })
        .set(sheet, { autoAlpha: 0, y: -18, rotate: -1.5 })
        .set([sent, accepted, meet], { autoAlpha: 0 })
        .set(caret, { autoAlpha: 1 })
        .to(typing, { n: text.length, duration: 1.3, ease: "none", onUpdate: write }, 0.5)
        .to(caret, { autoAlpha: 0, duration: 0.2 }, "+=0.3")
        .to(slots, { autoAlpha: 1, scaleY: 1, duration: 0.5, stagger: { each: 0.09, from: "start" } }, "+=0.1")
        .to(sheet, { autoAlpha: 1, y: 0, rotate: 0, duration: 0.8 }, "+=0.45")
        .to(sent, { autoAlpha: 1, duration: 0.3 }, "<+0.3")
        .to(sent, { autoAlpha: 0, duration: 0.2, ease: "power2.in" }, "+=1.5")
        .fromTo(accepted, { autoAlpha: 0, scale: 1.25, rotate: -3 }, { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.45 }, ">")
        .to(meet, { autoAlpha: 1, duration: 0.5 }, "<+0.1")
        // sortie plus rapide que l'entrée : la feuille se lève, les créneaux s'éteignent, la recherche s'efface
        .to(sheet, { autoAlpha: 0, y: -12, duration: 0.35, ease: "power2.in" }, "+=3.2")
        .to(meet, { autoAlpha: 0, duration: 0.3, ease: "power2.in" }, "<")
        .to(slots, { autoAlpha: 0, duration: 0.3, stagger: 0.03, ease: "power2.in" }, "<+0.05")
        .to(typing, { n: 0, duration: 0.35, ease: "none", onUpdate: write }, "<");

      // Pause hors écran : la boucle ne tourne que lorsque la grille est visible
      const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) tl.resume(); else tl.pause(); }, { threshold: 0.05 });
      io.observe(board);
      return () => { io.disconnect(); tl.kill(); intro.kill(); };
    },
    { scope: root, dependencies: [narrow], revertOnUpdate: true },
  );

  return (
    <section className="hero" ref={root} aria-labelledby="hero-title">
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <h1 id="hero-title">
            {hero.title[0]} <span className="hero__em">{hero.title[1]}</span>
          </h1>
          <p className="lead">{hero.lead}</p>
          <div className="hero__search" aria-hidden="true">
            <Search size={18} />
            <span className="hero__typed"></span>
            <span className="hero__caret"></span>
            <span className="hero__placeholder">{hero.searchPlaceholder}</span>
          </div>
          <div className="hero__cta">
            <ButtonLink to="/rejoindre" size="lg" arrow>{hero.cta}</ButtonLink>
            <ButtonLink to="/app" size="lg" variant="secondary">{hero.demo}</ButtonLink>
          </div>
        </div>
        <div className="hero__board">
          <Timetable
            key={narrow ? "soir" : "semaine"}
            printed
            fullOnMobile
            week="Semaine du 5 au 10 octobre"
            hours={hours}
            courses={courses}
            free={free}
            meet={[{ day: 3, hour: 19 }]}
            labels={[{ day: 3, hour: 19, label: "Kevin · Aïcha", sub: "commun" }]}
            nowLine={!narrow}
            sheet={{
              day: 4,
              hour: 18,
              content: (
                <>
                  <span className="sheet__title">Demande d'aide</span>
                  <span>Actualisation et VAN · jeudi 19 h</span>
                  <span className="sheet__to">à Aïcha N.</span>
                  <span className="sheet__states">
                    <span className="status status--envoyee" data-state="sent">Envoyée</span>
                    <span className="status status--acceptee" data-state="accepted">Acceptée</span>
                  </span>
                </>
              ),
            }}
          />
          <ul className="hero__legend" aria-label="Légende">
            <li><i className="legend legend--course" />{hero.legend.course}</li>
            <li><i className="legend legend--free" />{hero.legend.free}</li>
            <li><i className="legend legend--sheet" />{hero.legend.sheet}</li>
          </ul>
        </div>
        <div className="hero__more">
          <a href="#fonctionnement" className="hero__secondary">{hero.secondary}</a>
          <p className="hero__demo"><span className="muted">{hero.demo} : {hero.demoNote}</span></p>
        </div>
      </div>
    </section>
  );
}
