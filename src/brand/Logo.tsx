import { useId } from "react";

/*
 * Le symbole CAMPUUS : les deux U du nom, imbriqués. Le second U est décalé de 30 unités ; la zone de recouvrement
 * est remplie de la troisième couleur (les deux encres multipliées). Les fichiers SVG autonomes sont régénérés
 * par `node tools/build-brand.mjs` à partir de la même géométrie.
 */
const U = (dx: number) => `M${10 + dx} 10H${24 + dx}V54a11 11 0 0 0 22 0V10H${60 + dx}V54a25 25 0 0 1-50 0Z`;

type Tone = "light" | "dark" | "mono" | "mono-dark";

const INKS: Record<Tone, { a: string; b: string; mix?: string; bg?: string }> = {
  light: { a: "#0D0C0B", b: "#F03A17", mix: "#7A1A08" },
  dark: { a: "#F3EFE7", b: "#F03A17", mix: "#B02A10" },
  mono: { a: "currentColor", b: "currentColor", bg: "var(--bg)" },
  "mono-dark": { a: "currentColor", b: "currentColor", bg: "var(--bg)" },
};

export function Mark({ size = 28, tone = "light", className }: { size?: number; tone?: Tone; className?: string }) {
  const id = useId();
  const ink = INKS[tone];
  return (
    <svg viewBox="0 0 100 90" width={size} height={size * 0.9} className={className} aria-hidden="true" focusable="false">
      {ink.mix ? (
        <>
          <defs>
            <clipPath id={id}>
              <path d={U(0)} />
            </clipPath>
          </defs>
          <path d={U(0)} fill={ink.a} />
          <path d={U(30)} fill={ink.b} />
          <path d={U(30)} fill={ink.mix} clipPath={`url(#${id})`} />
        </>
      ) : (
        <>
          <path d={U(0)} fill={ink.a} />
          <path d={U(30)} fill={ink.b} stroke={ink.bg} strokeWidth={3} paintOrder="stroke" />
        </>
      )}
    </svg>
  );
}

export function Logo({ size = 28, tone = "light", className }: { size?: number; tone?: Tone; className?: string }) {
  return (
    <span className={`logo${className ? ` ${className}` : ""}`} data-tone-logo={tone} style={{ "--logo-size": `${size}px` } as React.CSSProperties}>
      <Mark size={size} tone={tone} />
      <span className="logo__word">CAMPUUS</span>
    </span>
  );
}
