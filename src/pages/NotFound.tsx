import { Header } from "../sections/Header";
import { Footer } from "../sections/Footer";
import { ButtonLink } from "../components/ui";
import "./landing.css";

export function Component() {
  return (
    <>
      <Header />
      <main id="contenu" className="landing">
        <section className="section">
          <div className="wrap" style={{ maxWidth: 640 }}>
            <h1 style={{ fontSize: "var(--fs-h2)" }}>Cette page n'existe pas.</h1>
            <p className="lead" style={{ marginBlock: "1rem 1.5rem" }}>L'adresse est peut-être erronée, ou la page n'a pas encore été écrite. CAMPUUS est en phase de conception.</p>
            <ButtonLink to="/" arrow>Retour à l'accueil</ButtonLink>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
