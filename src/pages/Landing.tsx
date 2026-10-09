import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "../sections/Header";
import { Hero } from "../sections/Hero";
import { Problem } from "../sections/Problem";
import { How } from "../sections/How";
import { Match } from "../sections/Match";
import { Features } from "../sections/Features";
import { PanAfrican } from "../sections/PanAfrican";
import { Trust } from "../sections/Trust";
import { Final } from "../sections/Final";
import { Footer } from "../sections/Footer";
import { setupReveals } from "../lib/motion";
import "./landing.css";

export default function Landing() {
  const main = useRef<HTMLElement>(null);
  const { hash } = useLocation();
  useEffect(() => setupReveals(main.current!), []);
  useEffect(() => {
    if (!hash) return;
    const el = document.querySelector(hash);
    if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  }, [hash]);
  useEffect(() => { document.title = "CAMPUUS — Bloqué sur un cours ? Trouve quelqu'un qui peut t'aider."; }, []);

  return (
    <>
      <Header />
      <main id="contenu" ref={main} className="landing">
        <Hero />
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
