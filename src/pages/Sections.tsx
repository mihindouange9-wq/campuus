import { useEffect, type ReactNode } from "react";
import { Features3, Footer3, Founder3, Header3, Next3, PageHead3, Problem3, Reach3, Steps3 } from "../sections/v3";
import { setupInk, setupReveals } from "../lib/motion";
import { setupScenes } from "../lib/landingMotion";
import "./site.css";

/*
 * Les pages de section du site public (charte v3) : chacune a son titre géant, son contenu, puis un bloc de fin
 * qui propose la page suivante et l'action « Rejoindre CAMPUUS ».
 */
function Page({ title, doc, children, next }: { title: string; doc: string; children: ReactNode; next: { href: string; label: string } }) {
  useEffect(() => { document.title = `${doc} — CAMPUUS`; }, [doc]);
  useEffect(() => setupInk(document.body), []);
  useEffect(() => {
    const main = document.querySelector<HTMLElement>("main.landing");
    if (!main) return;
    const a = setupReveals(main);
    const b = setupScenes(main);
    return () => { a?.(); b?.(); };
  }, []);
  return (
    <>
      <Header3 />
      <main id="contenu" className="landing home">
        <PageHead3 title={title} />
        {children}
        <Next3 href={next.href} label={next.label} />
      </main>
      <Footer3 />
    </>
  );
}

export function HowPage() {
  return (
    <Page title="Comment ça marche" doc="Comment ça marche" next={{ href: "/fonctionnalites", label: "Fonctionnalités" }}>
      <Problem3 />
      <Steps3 />
    </Page>
  );
}

export function FeaturesPage() {
  return (
    <Page title="Fonctionnalités" doc="Fonctionnalités" next={{ href: "/confiance", label: "Confiance" }}>
      <Features3 />
    </Page>
  );
}

export function TrustPage() {
  return (
    <Page title="Confiance" doc="Confiance et communauté" next={{ href: "/partenaires", label: "Partenaires" }}>
      <Reach3 />
      <Founder3 />
    </Page>
  );
}
