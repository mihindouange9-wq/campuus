import { useRef } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { ButtonLink } from "../components/ui";
import { Timetable } from "../components/Timetable";
import { hero } from "../content/fr";
import { gsap, prefersReducedMotion, useGSAP } from "../lib/motion";

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

export function Hero() {
  const root = useRef<HTMLElement>(null);

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
      const text = hero.search;

      if (prefersReducedMotion()) {
        typed.textContent = text;
        gsap.set(sent, { autoAlpha: 0 });
        return;
      }
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 3.2, defaults: { ease: "expo.out" } });
      const typing = { n: 0 };
      tl.set(typed, { textContent: "" })
        .set(slots, { autoAlpha: 0, scaleY: 0.3, transformOrigin: "50% 100%" })
        .set(sheet, { autoAlpha: 0, y: -14 })
        .set([sent, accepted, meet], { autoAlpha: 0 })
        .set(caret, { autoAlpha: 1 })
        .to(typing, { n: text.length, duration: 1.3, ease: "none", onUpdate: () => { typed.textContent = text.slice(0, Math.round(typing.n)); } }, 0.6)
        .to(caret, { autoAlpha: 0, duration: 0.2 }, "+=0.3")
        .to(slots, { autoAlpha: 1, scaleY: 1, duration: 0.55, stagger: { each: 0.12, from: "start" } }, "+=0.1")
        .to(sheet, { autoAlpha: 1, y: 0, duration: 0.7 }, "+=0.5")
        .to(sent, { autoAlpha: 1, duration: 0.3 }, "<+0.3")
        .to(sent, { autoAlpha: 0, duration: 0.25 }, "+=1.6")
        .to(accepted, { autoAlpha: 1, duration: 0.3 }, "<")
        .to(meet, { autoAlpha: 1, duration: 0.4 }, "<");
      return () => { tl.kill(); };
    },
    { scope: root },
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
            <a href="#fonctionnement" className="hero__secondary">{hero.secondary}</a>
          </div>
          <p className="hero__demo">
            <Link to="/app">{hero.demo}</Link> <span className="muted">· {hero.demoNote}</span>
          </p>
        </div>
        <div className="hero__board">
          <Timetable
            printed
            week="Semaine du 5 au 10 octobre"
            courses={COURSES}
            free={FREE}
            meet={[{ day: 3, hour: 19 }]}
            labels={[{ day: 3, hour: 19, label: "Kevin · Aïcha", sub: "créneau commun" }]}
            nowLine
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
      </div>
    </section>
  );
}
