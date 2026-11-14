import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Header3 as Header, Footer3 as Footer } from "../sections/v3";
import { Button, ButtonLink, Field, Input, Select, Textarea } from "../components/ui";
import { partners } from "../content/fr";
import { api } from "../services/api";
import type { PartnerContact } from "../data/types";
import { pauseNuance, setupInk, setupReveals } from "../lib/motion";
import "../services/boot";
import "./site.css";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function Component() {
  const [form, setForm] = useState<Omit<PartnerContact, "at">>({ org: "", name: "", email: "", kind: "etablissement", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({});
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  useEffect(() => { document.title = "Partenaires et investisseurs — CAMPUUS"; window.scrollTo(0, 0); }, []);
  useEffect(() => setupInk(document.body), []);
  useEffect(() => pauseNuance(), []);
  useEffect(() => setupReveals(document.querySelector("main")!), []);

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function submit(e: FormEvent) {
    e.preventDefault();
    const errs: typeof errors = {};
    if (!form.org.trim()) errs.org = "Indiquez le nom de votre organisation.";
    if (!form.name.trim()) errs.name = "Indiquez votre nom.";
    if (!EMAIL.test(form.email)) errs.email = "Entrez une adresse e-mail valide, par exemple nom@domaine.ga.";
    if (form.message.trim().length < 20) errs.message = "Dites-nous en quelques phrases ce que vous souhaitez (20 caractères au moins).";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setState("sending");
    try {
      await api().contactPartner({ ...form, at: new Date().toISOString() });
      setState("done");
    } catch {
      setState("error");
    }
  }

  return (
    <>
      <Header />
      <main id="contenu" className="landing">
        <section className="page" data-tone="nuit">
          <div className="wrap">
            <Link to="/" className="page__back"><ArrowLeft size={16} aria-hidden="true" /> Retour à l’accueil</Link>
            <div className="page__head">
              <h1 style={{ fontSize: "var(--fs-h2)" }} data-split>{partners.title}</h1>
              <p className="lead" data-reveal>{partners.lead}</p>
              <p className="page__stage" data-reveal>{partners.stage}</p>
              <div className="page__actions" data-reveal><ButtonLink to="/partenaires#contact" arrow onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" }); }}>{partners.form.title}</ButtonLink></div>
            </div>


            <figure className="page__banner" data-wipe>
              <img src={`/photos/${partners.photo.src}-${partners.photo.w}-web.webp`} srcSet={`/photos/${partners.photo.src}-${partners.photo.w / 2}.webp ${partners.photo.w / 2}w, /photos/${partners.photo.src}-${partners.photo.w}-web.webp ${partners.photo.w}w`} sizes="(max-width: 1280px) 100vw, 1280px" alt={partners.photo.alt} width={partners.photo.w} height={Math.round(partners.photo.w / partners.photo.ratio)} decoding="async" />
            </figure>
            <div className="page__sections">
              {partners.sections.map((s) => (
                <section key={s.id} className="page__section" data-reveal id={s.id} aria-labelledby={`p-${s.id}`}>
                  <h2 id={`p-${s.id}`}>{s.title}</h2>
                  <p>{s.text}</p>
                </section>
              ))}

              <section className="page__section" data-reveal aria-labelledby="p-expansion">
                <h2 id="p-expansion">{partners.expansion.title}</h2>
                <div>
                  <ol className="steps" data-stagger>
                    {partners.expansion.steps.map((s) => (
                      <li key={s.title} data-state={s.state}>
                        <h3>{s.title}</h3>
                        <p>{s.text}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </section>

              <section className="page__section" data-reveal aria-labelledby="p-money">
                <h2 id="p-money">{partners.monetization.title}</h2>
                <div>
                  <p>{partners.monetization.text}</p>
                  <ul className="ledger" data-stagger>
                    {partners.monetization.items.map((m) => (
                      <li key={m.title}><h3>{m.title}</h3><p>{m.text}</p></li>
                    ))}
                  </ul>
                </div>
              </section>

              <section className="page__section" data-reveal aria-labelledby="p-roadmap">
                <h2 id="p-roadmap">{partners.roadmap.title}</h2>
                <ol className="roadmap" data-stagger>
                  {partners.roadmap.items.map((r) => <li key={r}>{r}</li>)}
                </ol>
              </section>

              <section className="page__section" data-reveal aria-labelledby="p-contact" id="contact">
                <h2 id="p-contact">{partners.form.title}</h2>
                <div>
                  <p>{partners.form.text}</p>
                  {state === "done" ? (
                    <div className="form__success" role="status">
                      <h2>Merci.</h2>
                      <p>{partners.form.success}</p>
                    </div>
                  ) : (
                    <form className="form" onSubmit={submit} noValidate data-reveal>
                      <p className="form__required">Tous les champs sont obligatoires.</p>
                      <div className="form__row">
                        <Field id="org" label={partners.form.org} error={errors.org}><Input id="org" value={form.org} onChange={set("org")} autoComplete="organization" aria-invalid={!!errors.org} /></Field>
                        <Field id="kind" label={partners.form.kind}><Select id="kind" value={form.kind} onChange={set("kind")}>{partners.form.kinds.map((k) => <option key={k.value} value={k.value}>{k.label}</option>)}</Select></Field>
                      </div>
                      <div className="form__row">
                        <Field id="name" label={partners.form.name} error={errors.name}><Input id="name" value={form.name} onChange={set("name")} autoComplete="name" aria-invalid={!!errors.name} /></Field>
                        <Field id="email" label={partners.form.email} error={errors.email}><Input id="email" type="email" value={form.email} onChange={set("email")} autoComplete="email" inputMode="email" aria-invalid={!!errors.email} /></Field>
                      </div>
                      <Field id="message" label={partners.form.message} error={errors.message}><Textarea id="message" value={form.message} onChange={set("message")} aria-invalid={!!errors.message} /></Field>
                      {state === "error" ? <p className="field__error" role="alert">L'enregistrement a échoué sur cet appareil. Réessayez.</p> : null}
                      <div><Button type="submit" loading={state === "sending"} arrow>{partners.form.submit}</Button></div>
                    </form>
                  )}
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
