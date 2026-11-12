import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "../sections/Header";
import { Hero } from "../sections/Hero";
import { Campus } from "../sections/Campus";
import { Problem } from "../sections/Problem";
import { How } from "../sections/How";
import { Match } from "../sections/Match";
import { Features } from "../sections/Features";
import { PanAfrican } from "../sections/PanAfrican";
import { Trust } from "../sections/Trust";
import { Final } from "../sections/Final";
import { Footer } from "../sections/Footer";
import { setupInk, setupReveals } from "../lib/motion";
import "./landing.css";

export default function Landing() {
  const main = useRef<HTMLElement>(null);
  const { hash } = useLocation();
  useEffect(() => setupReveals(main.current!), []);
  useEffect(() => setupInk(document.body), []);
  useEffect(() => {
    if (!hash) return;
    const el = document.querySelector(hash);
    if (!el) return;
    const go = () => el.scrollIntoView({ behavior: "smooth", block: "start" });
    const t = setTimeout(go, 50);
    // À l'arrivée directe sur une ancre, les polices décalent la mise en page après coup : on vise de nouveau la section.
    let live = true;
    document.fonts?.ready.then(() => { if (live) setTimeout(() => { if (live) go(); }, 60); });
    return () => { live = false; clearTimeout(t); };
  }, [hash]);
  useEffect(() => { document.title = "CAMPUUS — Bloqué sur un cours ? Trouve quelqu'un qui peut t'aider."; }, []);

  return (
    <>
      <Header />
      <main id="contenu" ref={main} className="landing">
        <Hero />
        <Campus />
        <Problem />
        <How />
        <Match />
        <Features />
        <PanAfrican />
        <Trust />
        <Final />
      </main>
      <Footer />
    </>
  );
}
