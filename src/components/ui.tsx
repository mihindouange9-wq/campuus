import { forwardRef, type ButtonHTMLAttributes, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { Link, type LinkProps } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";
import type { Availability, HelpRequest, Student } from "../data/types";
import { AVAILABILITY_LABEL, REQUEST_STATUS_LABEL } from "../data/mock";

/* ───────── Boutons : le bloc bordeaux plein (action), le filet (secondaire), le lien (tertiaire) ───────── */
type Variant = "primary" | "secondary" | "ghost" | "horizon";
interface ButtonBase { variant?: Variant; size?: "md" | "sm" | "lg"; arrow?: boolean; loading?: boolean; children: ReactNode; className?: string }

const cls = (v: Variant, size: string, extra?: string) => `btn btn--${v} btn--${size}${extra ? ` ${extra}` : ""}`;

export const Button = forwardRef<HTMLButtonElement, ButtonBase & ButtonHTMLAttributes<HTMLButtonElement>>(function Button(
  { variant = "primary", size = "md", arrow, loading, children, className, disabled, ...rest }, ref) {
  return (
    <button ref={ref} className={cls(variant, size, className)} disabled={disabled || loading} aria-busy={loading || undefined} {...rest}>
      {loading ? <Loader2 className="spin" size={16} aria-hidden="true" /> : null}
      <span>{children}</span>
      {arrow && !loading ? <ArrowRight size={16} aria-hidden="true" /> : null}
    </button>
  );
});

export function ButtonLink({ variant = "primary", size = "md", arrow, children, className, ...rest }: ButtonBase & LinkProps) {
  return (
    <Link className={cls(variant, size, className)} {...rest}>
      <span>{children}</span>
      {arrow ? <ArrowRight size={16} aria-hidden="true" /> : null}
    </Link>
  );
}

/* ───────── Avatar : initiales sur l'une des deux encres ───────── */
export function Avatar({ student, size = 40 }: { student: Pick<Student, "initials" | "hue" | "pseudo">; size?: number }) {
  return (
    <span className={`avatar avatar--${student.hue}`} style={{ width: size, height: size, fontSize: Math.round(size * 0.36) }} aria-hidden="true">
      {student.initials}
    </span>
  );
}

/* ───────── Disponibilité : un point et un mot ───────── */
export function AvailabilityTag({ value, short }: { value: Availability; short?: boolean }) {
  const label = AVAILABILITY_LABEL[value];
  return (
    <span className={`avail avail--${value}`}>
      <i aria-hidden="true" />
      {short ? label.replace("Disponible ", "").replace("Indisponible cette semaine", "Indisponible") : label}
    </span>
  );
}

/* ───────── Statut de demande ───────── */
export function StatusTag({ status }: { status: HelpRequest["status"] }) {
  return <span className={`status status--${status}`}>{REQUEST_STATUS_LABEL[status]}</span>;
}

/* ───────── Étiquette discrète ───────── */
export function Tag({ children, tone = "ivory" }: { children: ReactNode; tone?: "ivory" | "horizon" | "bordeaux" }) {
  return <span className={`tag tag--${tone}`}>{children}</span>;
}

/* ───────── Champs de formulaire ───────── */
interface FieldProps { label: string; hint?: string; error?: string; id: string; children: ReactNode; optional?: boolean }
export function Field({ label, hint, error, id, children, optional }: FieldProps) {
  return (
    <div className={`field${error ? " field--error" : ""}`}>
      <label htmlFor={id} className="field__label">
        {label} {optional ? <span className="field__optional">facultatif</span> : null}
      </label>
      {children}
      {error ? <p className="field__error" id={`${id}-error`} role="alert">{error}</p> : hint ? <p className="field__hint" id={`${id}-hint`}>{hint}</p> : null}
    </div>
  );
}
export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(function Input(props, ref) {
  return <input ref={ref} className="input" {...props} />;
});
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(function Textarea(props, ref) {
  return <textarea ref={ref} className="input input--area" {...props} />;
});
export function Select({ children, ...props }: SelectHTMLAttributes<HTMLSelectElement> & { children: ReactNode }) {
  return (
    <span className="select">
      <select className="input" {...props}>{children}</select>
    </span>
  );
}

/* ───────── États ───────── */
export function Empty({ title, text, action }: { title: string; text?: string; action?: ReactNode }) {
  return (
    <div className="empty" role="status">
      <svg viewBox="0 0 120 60" width="120" height="60" aria-hidden="true" className="empty__grid">
        {[0, 20, 40, 60, 80, 100, 120].map((x) => <line key={x} x1={x} y1="0" x2={x} y2="60" />)}
        {[0, 20, 40, 60].map((y) => <line key={y} x1="0" y1={y} x2="120" y2={y} />)}
        <rect x="41" y="21" width="18" height="18" className="empty__slot" />
      </svg>
      <h3>{title}</h3>
      {text ? <p className="muted">{text}</p> : null}
      {action}
    </div>
  );
}

export function Loading({ label = "Chargement…", rows = 3 }: { label?: string; rows?: number }) {
  return (
    <div className="loading" role="status" aria-live="polite">
      <span className="visually-hidden">{label}</span>
      {Array.from({ length: rows }, (_, i) => <span key={i} className="loading__row" style={{ width: `${88 - i * 14}%` }} />)}
    </div>
  );
}

export function ErrorState({ text, retry }: { text: string; retry?: () => void }) {
  return (
    <div className="error-state" role="alert">
      <p>{text}</p>
      {retry ? <Button variant="secondary" size="sm" onClick={retry}>Réessayer</Button> : null}
    </div>
  );
}

/* ───────── Dates ───────── */
export function relative(iso: string, nowDate = new Date()) {
  const d = new Date(iso);
  const diff = (nowDate.getTime() - d.getTime()) / 1000;
  if (diff < 60) return "à l'instant";
  if (diff < 3600) return `il y a ${Math.round(diff / 60)} min`;
  if (diff < 86400 && d.getDate() === nowDate.getDate()) return `aujourd'hui ${d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }).replace(":", " h ")}`;
  if (diff < 172800) return `hier ${d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }).replace(":", " h ")}`;
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
}
export const hourLabel = (h: number) => `${h} h`;
