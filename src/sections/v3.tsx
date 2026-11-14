import type React from "react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Plus, X } from "lucide-react";
import { Mark } from "../brand/Logo";
import { ButtonLink } from "../components/ui";
import { campus, features, final, footer, hero, how, match, nav, panafrican, partners, problem, trust } from "../content/fr";
import { PHOTO_CREDITS } from "../content/photos";
import { gsap, prefersReducedMotion, useGSAP, whenIntroDone } from "../lib/motion";
import { RequestScreen, ResultsScreen, SearchScreen } from "./How";
import { VIGNETTES } from "./Features";
import { MatchBoard } from "./Match";

/*
 * Charte v3 (14 novembre 2026) : fond Nuit, titres Instrument Serif en capitales géantes, éclat Cinabre.
 * La phrase de positionnement est le menu ; les illustrations restent l'emploi du temps et les maquettes produit.
 */

const NavLink = ({ href, children, ...rest }: { href: string; children: React.ReactNode } & React.AnchorHTMLAttributes<HTMLAnchorElement>) =>
  href.startsWith("/#") ? <a href={href} {...rest}>{children}</a> : <Link to={href} {...(rest as object)}>{children}</Link>;

/* ───────── En-tête : mot-symbole, section courante, « MENU + » ───────── */
export function Header3() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("");
  const location = useLocation();
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => { setOpen(false); }, [location]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) panel.current?.querySelector<HTMLElement>("a, button")?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape" && open) { setOpen(false); trigger.current?.focus(); } };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [open]);
  useEffect(() => {
    if (location.pathname !== "/") { setCurrent(location.pathname); return; }
    const ids = nav.links.filter((l) => l.href.startsWith("/#")).map((l) => l.href.slice(2));
    let raf = 0;
    const update = () => {
      raf = 0;
      let found = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.45 && r.bottom > 90) found = `/#${id}`;
      }
      setCurrent(found);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, [location.pathname]);
  const here = nav.links.find((l) => l.href === current);

  return (
    <header className="top3" data-tone="nuit">
      <a className="skip" href="#contenu">Aller au contenu</a>
      <div className="top3__bar">
        <Link to="/" className="top3__brand" aria-label="CAMPUUS, accueil"><Mark size={26} tone="dark" /><span>CAMPUUS</span></Link>
        <p className="top3__here" aria-live="polite">{here ? here.label : ""}</p>
        <div className="top3__actions">
          <ButtonLink to="/rejoindre" size="sm" className="top3__join">{nav.join}</ButtonLink>
          <button ref={trigger} type="button" className="top3__menu" aria-expanded={open} aria-controls="menu3" onClick={() => setOpen(true)}>Menu <Plus size={16} aria-hidden="true" /></button>
        </div>
      </div>
      <div id="menu3" ref={panel} className={`menu3${open ? " menu3--open" : ""}`} hidden={!open} role="dialog" aria-modal="true" aria-label="Menu">
        <div className="menu3__top">
          <span className="top3__brand"><Mark size={26} tone="dark" /><span>CAMPUUS</span></span>
          <button type="button" className="top3__menu" onClick={() => { setOpen(false); trigger.current?.focus(); }}>Fermer <X size={16} aria-hidden="true" /></button>
        </div>
        <nav className="menu3__nav" aria-label="Navigation principale">
          {nav.links.map((l) => (
            <NavLink key={l.href} href={l.href} aria-current={current === l.href ? (l.href.includes("#") ? "location" : "page") : undefined} onClick={() => setOpen(false)}>
              <span>{l.label}</span><ArrowRight size={22} aria-hidden="true" />
            </NavLink>
          ))}
        </nav>
        <div className="menu3__actions">
          <ButtonLink to="/rejoindre" size="lg" arrow>{nav.join}</ButtonLink>
          <ButtonLink to="/app" size="lg" variant="secondary">{nav.demo}</ButtonLink>
        </div>
      </div>
    </header>
  );
}

/* ───────── Écran 1 : la phrase imposée est le menu ───────── */
const ROWS = [
  { a: "Bloqué", b: "sur un" },
  { a: "cours ?", b: "Trouve" },
  { a: "quelqu'un", b: "qui", hot: true },
  { a: "peut t'aider.", b: "" },
];

function Preview({ i }: { i: number }) {
  if (i === 0) {
    const on = [7, 9, 14, 16, 22];
    return (
      <div className="flash__grid">
        {Array.from({ length: 30 }, (_, k) => <i key={k} className={on.includes(k) ? "is-on" : k === 15 ? "is-me" : undefined} />)}
      </div>
    );
  }
  if (i === 1) return <ul className="flash__list">{features.items.map((f) => <li key={f.id}>{f.title}</li>)}</ul>;
  if (i === 2) return <ul className="flash__list">{trust.items.map((t) => <li key={t.title}>{t.title}<small>{trust.states[t.state as keyof typeof trust.states]}</small></li>)}</ul>;
  return <ul className="flash__list">{partners.expansion.steps.map((s) => <li key={s.title}>{s.title}</li>)}</ul>;
}

export function Hero3() {
  const root = useRef<HTMLElement>(null);
  const [flash, setFlashRaw] = useState(-1);
  // L’éclat n’existe qu’avec un pointeur et un écran large : au doigt, le lien mène directement à la section
  const setFlash = (i: number) => setFlashRaw(i >= 0 && !window.matchMedia("(hover: hover) and (min-width: 861px)").matches ? -1 : i);
  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const scope = root.current!;
    const frags = gsap.utils.toArray<HTMLElement>(".hero3__frag > span", scope);
    const rest = gsap.utils.toArray<HTMLElement>(".hero3__link, .hero3__foot > *, .hero3__word", scope);
    gsap.set(frags, { yPercent: 105 });
    gsap.set(rest, { autoAlpha: 0, y: 12 });
    const tl = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } });
    whenIntroDone(() => tl.play());
    tl.to(frags, { yPercent: 0, duration: 0.95, stagger: 0.06 }, 0)
      .to(rest, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.05 }, 0.45)
      .fromTo(".hero3__ghost", { autoAlpha: 0, scale: 1.08 }, { autoAlpha: 1, scale: 1, duration: 1.4 }, 0.1);
    return () => { tl.kill(); };
  }, { scope: root });

  return (
    <section className="hero3" ref={root} data-tone="nuit" data-flash={flash >= 0 ? flash : undefined} aria-labelledby="hero-title">
      <Mark size={900} tone="mono" className="hero3__ghost" />
      <div className="hero3__flash" aria-hidden="true">
        {nav.links.map((l, i) => (
          <div key={l.href} className={`flash${flash === i ? " flash--on" : ""}`}>
            <span className="flash__label">{l.label}</span>
            <Preview i={i} />
          </div>
        ))}
      </div>
      <h1 id="hero-title" className="visually-hidden" tabIndex={-1}>{hero.title.join(" ")}</h1>
      <nav className="hero3__sentence" aria-label="Aller à une section">
        {ROWS.map((r, i) => {
          const l = nav.links[i];
          return (
            <span key={r.a} className="hero3__row">
              <span className={`hero3__frag${r.hot ? " hero3__frag--hot" : ""}`} aria-hidden="true"><span>{r.a}</span></span>
              <NavLink href={l.href} className="hero3__link" onMouseEnter={() => setFlash(i)} onMouseLeave={() => setFlash(-1)} onFocus={() => setFlash(i)} onBlur={() => setFlash(-1)}>
                <ArrowRight size={18} aria-hidden="true" /><span>{l.label}</span>
              </NavLink>
              {r.b ? <span className="hero3__frag hero3__frag--b" aria-hidden="true"><span>{r.b}</span></span> : null}
            </span>
          );
        })}
      </nav>
      <div className="hero3__foot">
        <p className="hero3__lead">{hero.lead}</p>
        <div className="hero3__cta">
          <ButtonLink to="/rejoindre" size="lg" arrow>{hero.cta}</ButtonLink>
          <ButtonLink to="/app" size="lg" variant="secondary">{hero.demo}</ButtonLink>
        </div>
        <Link to="/comment-ca-marche" className="hero3__more"><span>{hero.secondary}</span><ArrowRight size={16} aria-hidden="true" /></Link>
      </div>
      <span className="hero3__word" aria-hidden="true">CAMPUUS</span>
    </section>
  );
}

/* ───────── Le problème : quatre constats sur filets ───────── */
export function Problem3() {
  return (
    <section className="sec3 pb" id="probleme" data-tone="nuit" aria-labelledby="pb-title">
      <div className="wrap3 sec3__head">
        <h2 id="pb-title" data-split>{problem.title}</h2>
        <p className="sec3__lead" data-reveal>{problem.lead}</p>
      </div>
      <ol className="wrap3 rows3">
        {problem.points.map((p, i) => (
          <li key={p.title} className="row3" data-reveal>
            <span className="row3__n num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="row3__word">{p.title}</h3>
            <p className="row3__text">{p.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ───────── Comment ça marche : étapes numérotées, maquette produit en regard ───────── */
const SCREENS = [SearchScreen, ResultsScreen, RequestScreen];

export function Steps3() {
  const steps = [...how.steps.map((s) => ({ title: s.title, text: s.text })), { title: match.title, text: match.lead }];
  return (
    <section className="sec3 st" id="fonctionnement" aria-labelledby="st-title">
      <div className="wrap3 sec3__head">
        <h2 id="st-title" data-split>{how.title}</h2>
        <div className="rail st__rail" aria-hidden="true">
          <span className="rail__bar"><i data-rail-bar /></span>
          <span className="rail__count num"><b data-rail-count>1</b> / {steps.length}</span>
        </div>
      </div>
      <ol className="wrap3 st__list" data-rail>
        {steps.map((s, i) => {
          const Screen = SCREENS[i];
          return (
            <li key={s.title} className="st__step" data-wipe>
              <div className="st__head">
                <span className="st__n num" aria-hidden="true">{String(i + 1).padStart(2, "0")}.</span>
                <h3 className="st__title">{s.title}</h3>
              </div>
              <p className="st__text">{s.text}</p>
              <div className="st__mock" aria-hidden="true">
                {Screen ? <Screen /> : <div className="match st__match"><MatchBoard /><p className="st__note">{match.note}</p></div>}
              </div>
            </li>
          );
        })}
      </ol>
      <div className="wrap3 st__cta" data-reveal><ButtonLink to="/rejoindre" arrow>{nav.join}</ButtonLink></div>
    </section>
  );
}

/* ───────── Fonctionnalités : liste dépliable sur Brume ───────── */
export function Features3() {
  // Sur ordinateur la première entrée est ouverte (elle montre sa mini-illustration) ; sur téléphone tout est replié pour rester court
  const [wide] = useState(() => typeof window !== "undefined" && window.matchMedia("(min-width: 721px)").matches);
  return (
    <section className="sec3 acc" id="fonctionnalites" data-tone="brume" aria-labelledby="acc-title">
      <div className="wrap3 acc__grid">
        <h2 id="acc-title" data-split>{features.title}</h2>
        <div className="acc__list">
          {features.items.map((f, i) => {
            const Vig = VIGNETTES[f.id];
            return (
              <details key={f.id} className="acc__item" name="fonctionnalites" open={wide && i === 0}>
                <summary>
                  <span className="acc__n num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  <span className="acc__title">{f.title}</span>
                  <Plus size={20} className="acc__plus" aria-hidden="true" />
                </summary>
                <div className="acc__body">
                  <p>{f.text}</p>
                  <div className="acc__vig" aria-hidden="true"><Vig /></div>
                </div>
              </details>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ───────── Capitales et confiance : villes fantômes, grille horaire, états réels ───────── */
const HOURS = [17, 18, 19, 20, 21, 22, 23];

export function Reach3() {
  return (
    <section className="sec3 rc" id="panafricain" data-tone="nuit" aria-label="Ambition géographique et confiance">
      <p className="ghost3" data-ghost aria-hidden="true">{panafrican.cities.map((c) => c.name).join(" · ")}</p>
      <div className="wrap3 rc__grid">
        <div className="rc__col">
          <h2 id="pan-title" data-split>{panafrican.title}</h2>
          <p className="sec3__lead" data-reveal>{panafrican.lead}</p>
          <div className="pan__chart" data-scene="pan" role="img" aria-label="Grille des heures de révision partagées entre neuf villes d'Afrique francophone, de 19 h à 22 h heure de Libreville">
            <div className="pan__hours" aria-hidden="true">
              <span />
              {HOURS.map((h) => <span key={h} className="num">{h} h</span>)}
            </div>
            {panafrican.cities.map((c) => (
              <div key={c.name} className={`pan__row${c.pilot ? " pan__row--pilot" : ""}`}>
                <span className="pan__city"><b>{c.name}</b><span>{c.country}{c.offset ? ` · ${c.offset > 0 ? "+" : "−"}1 h` : ""}</span></span>
                <span className="pan__track" aria-hidden="true">
                  <span className="pan__band" style={{ "--from": 19 + c.offset - 17, "--len": 3 } as React.CSSProperties} />
                  {c.pilot ? <span className="pan__dot" style={{ "--at": 19 + c.offset - 17 + 1.5 } as React.CSSProperties} /> : null}
                </span>
              </div>
            ))}
          </div>
          <ul className="pan__legend">
            <li><i className="legend legend--course" />{panafrican.legend.pilot}</li>
            <li><i className="legend legend--free" />{panafrican.legend.next}</li>
            <li><i className="legend legend--band" />{panafrican.legend.band}</li>
          </ul>
          <p className="rc__note">{panafrican.note}</p>
        </div>
        <div className="rc__col" id="confiance">
          <h2 id="trust-title" data-split>{trust.title}</h2>
          <p className="sec3__lead" data-reveal>{trust.lead}</p>
          <ul className="trust__list" data-stagger>
            {trust.items.map((t) => (
              <li key={t.title}>
                <details className="trust__item" name="confiance">
                  <summary>
                    <h3>{t.title}</h3>
                    <span className={`trust__state trust__state--${t.state}`}>{trust.states[t.state as keyof typeof trust.states]}</span>
                    <Plus size={18} aria-hidden="true" />
                  </summary>
                  <p>{t.text}</p>
                </details>
              </li>
            ))}
          </ul>
          <p className="rc__note rc__note--box" data-reveal>{trust.note}</p>
        </div>
      </div>
    </section>
  );
}

/* ───────── Le fondateur ───────── */
export function Founder3() {
  return (
    <section className="sec3 fd" id="fondateur" aria-labelledby="fd-title">
      <div className="wrap3 fd__grid">
        <figure className="fd__photo" data-reveal>
          <img
            src="/photos/fondateur-960.webp"
            srcSet="/photos/fondateur-480.webp 480w, /photos/fondateur-960.webp 960w"
            sizes="(max-width: 760px) 92vw, 38vw"
            alt="Portrait de Fabrice Okemvele, fondateur de CAMPUUS"
            width={960}
            height={1280}
            loading="lazy"
            decoding="async"
          />
        </figure>
        <div className="fd__copy">
          <p className="fd__label" data-reveal>Le fondateur</p>
          <h2 id="fd-title" data-split>Fabrice <span className="hot">Okemvele</span></h2>
          <p className="sec3__lead" data-reveal>
            CAMPUUS est né sur un campus. Fabrice Okemvele l'a fondé pendant ses études : une application pensée par un étudiant, pour les étudiants.
          </p>
          <dl className="fd__facts" data-reveal>
            <div><dt>Rôle</dt><dd>Fondateur de CAMPUUS</dd></div>
            <div><dt>Études</dt><dd>Master 1</dd></div>
            <div><dt>École</dt><dd>École de Commerce de Lyon, campus de Libreville</dd></div>
          </dl>
        </div>
      </div>
    </section>
  );
}

/* ───────── Clôture ───────── */
const PHOTOS = ["diplomes", "amphi", "sous-les-arbres"].map((src) => campus.photos.find((p) => p.src === src)!);

export function Closing3() {
  const words = final.title.split(" ");
  const last = words.pop();
  return (
    <section className="sec3 cl" id="rejoindre" data-tone="nuit" aria-labelledby="cl-title">
      <div className="wrap3">
        <h2 id="cl-title" className="cl__title" data-split>{words.join(" ")} <span className="hot">{last}</span></h2>
        <div className="cl__row">
          <div className="cl__copy">
            <p className="sec3__lead" data-reveal>{final.text}</p>
            <div className="cl__cta" data-reveal>
              <ButtonLink to="/rejoindre" size="lg" arrow>{final.cta}</ButtonLink>
              <ButtonLink to="/app" size="lg" variant="secondary">{final.demo}</ButtonLink>
            </div>
          </div>
          <ul className="cl__photos" data-stagger>
            {PHOTOS.map((p) => (
              <li key={p.src}>
                <figure>
                  <img src={`/photos/${p.src}-${p.w / 2}.webp`} alt={p.alt} width={p.w / 2} height={Math.round(p.w / 2 / p.ratio)} loading="lazy" decoding="async" />
                  <figcaption><b>{p.city}</b><span>{p.caption}</span></figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ───────── Pied de page : liens à flèche, crédit, mot-symbole géant ───────── */
export function Footer3() {
  return (
    <footer className="foot3" data-tone="nuit">
      <nav className="wrap3 foot3__arrows" aria-label="Sections">
        {nav.links.map((l) => <NavLink key={l.href} href={l.href}><ArrowUpRight size={18} aria-hidden="true" /><span>{l.label}</span></NavLink>)}
      </nav>
      <div className="wrap3 foot3__grid">
        <div className="foot3__about">
          <p>{footer.about}</p>
          <p className="foot3__stage">{footer.stage}</p>
        </div>
        {footer.columns.map((col) => (
          <div key={col.title} className="foot3__col">
            <h3>{col.title}</h3>
            <ul>
              {col.links.map((l) => {
                const href = "href" in l ? l.href : null;
                return (
                  <li key={l.label}>
                    {!href ? <span className="foot3__soon">{l.label} <small>{footer.soon}</small></span> : <NavLink href={href}>{l.label}</NavLink>}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      <div className="wrap3 foot3__partner">
        <span className="foot3__label">{footer.partner.label}</span>
        <img src="/partenaires/methode-aura.png" alt="MÉTHODE AURA" width="800" height="246" loading="lazy" decoding="async" />
        <p><b>{footer.partner.title}</b> {footer.partner.text}</p>
      </div>
      <details className="wrap3 foot3__credits">
        <summary>{footer.photoCredits}</summary>
        <p>{footer.photoNote}</p>
        <ul>
          {PHOTO_CREDITS.map((c) => <li key={c.name}><a href={c.page} rel="noopener">{c.title}</a> · {c.author ? `${c.author} · ` : ""}{c.license}</li>)}
        </ul>
      </details>
      <div className="wrap3 foot3__bottom">
        <p><span>© 2026 CAMPUUS</span><span>{footer.credit}</span></p>
        <span className="foot3__word" aria-hidden="true">CAMPUUS</span>
      </div>
    </footer>
  );
}

/* ───────── Titre de page et bloc de fin (pages de section) ───────── */
export function PageHead3({ title }: { title: string }) {
  return (
    <section className="phead" data-tone="nuit">
      <Mark size={600} tone="mono" className="phead__ghost" />
      <div className="wrap3">
        <Link to="/" className="page__back"><ArrowRight size={16} aria-hidden="true" className="phead__back" /> Retour à l'accueil</Link>
        <h1 className="phead__title" tabIndex={-1} data-split>{title}</h1>
      </div>
    </section>
  );
}

export function Next3({ href, label }: { href: string; label: string }) {
  return (
    <section className="next3" data-tone="nuit" aria-label="Page suivante">
      <div className="wrap3 next3__row">
        <Link to={href} className="next3__link">
          <small>Suivant</small>
          <span>{label}</span>
          <ArrowRight size={44} aria-hidden="true" />
        </Link>
        <ButtonLink to="/rejoindre" size="lg" arrow>{nav.join}</ButtonLink>
      </div>
    </section>
  );
}
