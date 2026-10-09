import { useEffect, useState, type ReactNode } from "react";
import { DAYS, DAYS_LONG, HOURS } from "../data/mock";
import type { Slot } from "../data/types";

/*
 * L'emploi du temps : la grille qui structure CAMPUUS. Six jours, de 8 h à 20 h, filets fins sur ivoire.
 * - course : un cours suivi (bloc bordeaux plein)
 * - free : un créneau libre d'un étudiant (Cool Horizon), avec son nom
 * - inkA / inkB : deux encres superposées (bordeaux, puis Cool Horizon en multiplication) ; là où elles se
 *   recouvrent naît la troisième couleur, la mise en relation
 * - sheet : la feuille de demande d'aide posée sur un créneau
 * - printed : l'objet imprimé (en-tête de semaine, marge perforée) pour le site ; l'app reste compacte
 * Sur un écran étroit, la grille se réduit à un seul jour (jeudi), sauf si `fullOnMobile`.
 */
export interface Block { day: number; hour: number; span?: number; label?: string; sub?: string; id?: string }
interface Props {
  courses?: Block[];
  free?: Block[];
  inkA?: Block[];
  inkB?: Block[];
  /** encre bordeaux en multiplication, posée par-dessus un créneau Cool Horizon : la rencontre */
  meet?: Block[];
  /** étiquettes non mélangées, par-dessus les encres */
  labels?: Block[];
  sheet?: { day: number; hour: number; content: ReactNode };
  nowLine?: boolean;
  hours?: number[];
  fullOnMobile?: boolean;
  caption?: string;
  className?: string;
  onSlotClick?: (slot: Slot) => void;
  selected?: Slot[];
  compact?: boolean;
  printed?: boolean;
  week?: string;
}

export function Timetable({ courses = [], free = [], inkA = [], inkB = [], meet = [], labels = [], sheet, nowLine, hours = HOURS, fullOnMobile, caption, className, onSlotClick, selected = [], compact, printed, week }: Props) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    if (!nowLine) return;
    const t = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(t);
  }, [nowLine]);
  const first = hours[0], last = hours[hours.length - 1];
  const rows = hours.length;
  const nowHour = now.getHours() + now.getMinutes() / 60;
  const nowDay = (now.getDay() + 6) % 7; // lundi = 0
  const showNow = nowLine && nowDay <= 5;
  const nowPos = Math.min(Math.max(nowHour, first), last + 1);
  const row = (h: number) => h - first + 2; // ligne 1 = en-tête des jours
  const isSel = (d: number, h: number) => selected.some((s) => s.day === d && s.hour === h);

  const style = { "--rows": rows } as React.CSSProperties;
  const place = (b: Block) => ({ gridColumn: b.day + 2, gridRow: `${row(b.hour)} / span ${b.span ?? 1}` });
  const tile = (b: Block, cls: string, key: string) => (
    <div key={key} className={`slot ${cls}`} style={place(b)} data-day={b.day} data-id={b.id} title={b.label}>
      {b.label ? <span className="slot__label">{b.label}</span> : null}
      {b.sub ? <span className="slot__sub">{b.sub}</span> : null}
    </div>
  );

  return (
    <div className={`tt-wrap${printed ? " tt-wrap--printed" : ""}${className ? ` ${className}` : ""}`} role="group" aria-label={caption ?? week ?? "Emploi du temps"}>
      {week ? <div className="tt__week"><span>{week}</span><span className="tt__week-right">8 h → 20 h</span></div> : null}
      <div className={`tt${compact ? " tt--compact" : ""}${fullOnMobile ? " tt--full" : ""}${onSlotClick ? " tt--editable" : ""}${printed ? " tt--printed" : ""}`} style={style}>
        <div className="tt__corner" aria-hidden="true" />
        {DAYS.map((d, i) => (
          <div key={d} className="tt__day" style={{ gridColumn: i + 2 }} data-day={i}>
            <abbr title={DAYS_LONG[i]}>{d}</abbr>
          </div>
        ))}
        {hours.map((h) => (
          <div key={h} className="tt__hour" style={{ gridRow: row(h) }}>
            <span className="num">{h} h</span>
          </div>
        ))}
        {hours.map((h) =>
          DAYS.map((_, d) =>
            onSlotClick ? (
              <button key={`${d}-${h}`} type="button" className={`tt__cell${isSel(d, h) ? " tt__cell--selected" : ""}`} style={{ gridColumn: d + 2, gridRow: row(h) }} data-day={d} onClick={() => onSlotClick({ day: d, hour: h })} aria-pressed={isSel(d, h)} aria-label={`${DAYS_LONG[d]} ${h} h`} />
            ) : (
              <div key={`${d}-${h}`} className="tt__cell" style={{ gridColumn: d + 2, gridRow: row(h) }} data-day={d} aria-hidden="true" />
            ),
          ),
        )}
        {courses.map((b, i) => tile(b, "slot--course", `c${i}`))}
        {free.map((b, i) => tile(b, "slot--free", `f${i}`))}
        {inkA.map((b, i) => tile(b, "slot--inkA", `a${i}`))}
        {inkB.map((b, i) => tile(b, "slot--inkB", `b${i}`))}
        {meet.map((b, i) => tile(b, "slot--meet", `m${i}`))}
        {labels.map((b, i) => tile(b, "slot--label", `l${i}`))}
        {sheet ? (
          <div className="tt__sheet" style={{ gridColumn: `${sheet.day + 2} / span 2`, gridRow: `${row(sheet.hour)} / span 3` }} data-day={sheet.day} data-sheet>
            {sheet.content}
          </div>
        ) : null}
        {showNow ? (
          <div className="tt__now" style={{ gridColumn: "2 / -1", gridRow: `${row(first)} / span ${rows}`, "--now": (nowPos - first) / rows } as React.CSSProperties} aria-hidden="true">
            <span className="num">{now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }).replace(":", " h ")}</span>
          </div>
        ) : null}
      </div>
      {caption ? <p className="tt__caption">{caption}</p> : null}
    </div>
  );
}
