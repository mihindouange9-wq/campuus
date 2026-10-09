import { useEffect, useState, type FormEvent } from "react";
import { Header } from "../sections/Header";
import { Footer } from "../sections/Footer";
import { Button, ButtonLink, Field, Input, Select } from "../components/ui";
import { join } from "../content/fr";
import { api } from "../services/api";
import { COUNTRIES, FIELDS, INSTITUTIONS } from "../data/mock";
import { LEVELS, type PilotSignup } from "../data/types";
import { setupInk, setupReveals } from "../lib/motion";
import "./landing.css";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function Component() {
  const [form, setForm] = useState<Omit<PilotSignup, "at">>({ name: "", email: "", institution: "", field: "", level: "", country: "GA", role: "aide" });
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  useEffect(() => { document.title = "Rejoindre la communauté pilote — CAMPUUS"; window.scrollTo(0, 0); }, []);
  useEffect(() => setupInk(document.body), []);
  useEffect(() => setupReveals(document.querySelector("main")!), []);
  const set = (k: keyof typeof form) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const institutions = INSTITUTIONS.filter((i) => i.country === form.country);

  async function submit(e: FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (form.name.trim().length < 2) errs.name = "Indique un prénom ou un pseudonyme (2 caractères au moins).";
    if (!EMAIL.test(form.email)) errs.email = "Entre une adresse e-mail valide, par exemple prenom@univ.ga.";
    if (!form.field) errs.field = "Choisis ta filière.";
    if (!form.level) errs.level = "Choisis ton niveau.";
    if (!consent) errs.consent = "Coche la case pour être prévenu à l'ouverture.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setState("sending");
    try {
      await api().signupPilot({ ...form, at: new Date().toISOString() });
      setState("done");
    } catch {
      setState("error");
    }
  }

  return (
    <>
      <Header />
      <main id="contenu" className="landing">
        <section className="page">
          <div className="wrap">
            <div className="page__head">
              <h1 style={{ fontSize: "var(--fs-h2)" }}>{join.title}</h1>
              <p className="lead">{join.lead}</p>
            </div>
            {state === "done" ? (
              <div className="form__success" role="status">
                <h2>{join.success.title}</h2>
                <p>{join.success.text}</p>
                <ButtonLink to="/app" arrow>{join.success.cta}</ButtonLink>
              </div>
            ) : (
              <form className="form" onSubmit={submit} noValidate>
                <div className="form__row">
                  <Field id="name" label={join.fields.name} error={errors.name}><Input id="name" value={form.name} onChange={set("name")} autoComplete="given-name" aria-invalid={!!errors.name} /></Field>
                  <Field id="email" label={join.fields.email} error={errors.email}><Input id="email" type="email" inputMode="email" value={form.email} onChange={set("email")} autoComplete="email" aria-invalid={!!errors.email} /></Field>
                </div>
                <div className="form__row">
                  <Field id="country" label={join.fields.country}>
                    <Select id="country" value={form.country} onChange={(e) => setForm((f) => ({ ...f, country: e.target.value as PilotSignup["country"], institution: "" }))}>
                      {COUNTRIES.map((c) => <option key={c.code} value={c.code}>{c.name}</option>)}
                    </Select>
                  </Field>
                  <Field id="institution" label={join.fields.institution} optional>
                    <Select id="institution" value={form.institution} onChange={set("institution")}>
                      <option value="">Choisir…</option>
                      {institutions.map((i) => <option key={i.id} value={i.name}>{i.name}</option>)}
                      <option value="autre">Autre établissement</option>
                    </Select>
                  </Field>
                </div>
                <div className="form__row">
                  <Field id="field" label={join.fields.field} error={errors.field}>
                    <Select id="field" value={form.field} onChange={set("field")} aria-invalid={!!errors.field}>
                      <option value="">Choisir…</option>
                      {FIELDS.map((f) => <option key={f} value={f}>{f}</option>)}
                    </Select>
                  </Field>
                  <Field id="level" label={join.fields.level} error={errors.level}>
                    <Select id="level" value={form.level} onChange={set("level")} aria-invalid={!!errors.level}>
                      <option value="">Choisir…</option>
                      {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
                    </Select>
                  </Field>
                </div>
                <fieldset className="field" style={{ border: 0, padding: 0, margin: 0 }}>
                  <legend className="field__label">{join.fields.role}</legend>
                  <div className="radios">
                    {join.roles.map((r) => (
                      <label key={r.value}>
                        <input type="radio" name="role" value={r.value} checked={form.role === r.value} onChange={() => setForm((f) => ({ ...f, role: r.value as PilotSignup["role"] }))} />
                        {r.label}
                      </label>
                    ))}
                  </div>
                </fieldset>
                <label className="form__check">
                  <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} aria-invalid={!!errors.consent} aria-describedby={errors.consent ? "consent-error" : undefined} />
                  <span>{join.consent}</span>
                </label>
                {errors.consent ? <p className="field__error" id="consent-error" role="alert">{errors.consent}</p> : null}
                {state === "error" ? <p className="field__error" role="alert">L'enregistrement a échoué sur cet appareil. Réessaie.</p> : null}
                <div><Button type="submit" size="lg" loading={state === "sending"} arrow>{join.submit}</Button></div>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
