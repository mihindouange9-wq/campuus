import { useEffect, useRef } from "react";

/*
 * La nuance : des nuages des trois couleurs de la charte (Cool Horizon, bordeaux, ivoire) qui dérivent et
 * s'entremêlent lentement derrière la page. Dessinés sur un canvas basse résolution (1/7 de l'écran) étiré en
 * CSS : le flou vient de l'agrandissement, le coût reste faible sur téléphone. Là où bordeaux et horizon se
 * recouvrent, une passe en multiplication fabrique la couleur de la rencontre. Image fixe sous
 * prefers-reduced-motion, pause quand l'onglet est caché.
 */
interface Blob { color: [number, number, number]; alpha: number; r: number; x: number; y: number; ax: number; ay: number; fx: number; fy: number; px: number; py: number; multiply?: boolean }

const BLOBS: Blob[] = [
  { color: [128, 174, 232], alpha: 0.95, r: 0.62, x: 0.18, y: 0.22, ax: 0.22, ay: 0.16, fx: 0.031, fy: 0.023, px: 0.0, py: 1.2 },
  { color: [91, 0, 21], alpha: 0.72, r: 0.6, x: 0.82, y: 0.74, ax: 0.2, ay: 0.18, fx: 0.026, fy: 0.034, px: 2.1, py: 0.4 },
  { color: [247, 242, 224], alpha: 1, r: 0.46, x: 0.6, y: 0.18, ax: 0.26, ay: 0.14, fx: 0.019, fy: 0.027, px: 4.0, py: 2.6 },
  { color: [128, 174, 232], alpha: 0.8, r: 0.5, x: 0.72, y: 0.86, ax: 0.24, ay: 0.12, fx: 0.023, fy: 0.03, px: 1.1, py: 3.3 },
  { color: [91, 0, 21], alpha: 0.6, r: 0.52, x: 0.22, y: 0.82, ax: 0.22, ay: 0.16, fx: 0.029, fy: 0.021, px: 5.2, py: 1.9 },
  { color: [247, 242, 224], alpha: 0.9, r: 0.4, x: 0.42, y: 0.56, ax: 0.3, ay: 0.22, fx: 0.017, fy: 0.025, px: 2.8, py: 5.1 },
  { color: [128, 174, 232], alpha: 0.6, r: 0.55, x: 0.5, y: 0.5, ax: 0.32, ay: 0.26, fx: 0.014, fy: 0.018, px: 3.6, py: 0.8, multiply: true },
  { color: [91, 0, 21], alpha: 0.35, r: 0.45, x: 0.3, y: 0.4, ax: 0.28, ay: 0.24, fx: 0.021, fy: 0.016, px: 0.7, py: 4.4, multiply: true },
];

export function Nuance() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d", { alpha: false })!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0, last = 0, running = true;
    const SCALE = 7;
    const size = () => { canvas.width = Math.max(80, Math.round(window.innerWidth / SCALE)); canvas.height = Math.max(80, Math.round(window.innerHeight / SCALE)); };
    size();
    const draw = (t: number) => {
      const w = canvas.width, h = canvas.height, m = Math.max(w, h);
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "#f7f2e0";
      ctx.fillRect(0, 0, w, h);
      for (const pass of [false, true]) {
        ctx.globalCompositeOperation = pass ? "multiply" : "source-over";
        for (const b of BLOBS) {
          if (!!b.multiply !== pass) continue;
          const x = (b.x + Math.sin(t * b.fx + b.px) * b.ax) * w;
          const y = (b.y + Math.cos(t * b.fy + b.py) * b.ay) * h;
          const r = b.r * m * (1 + 0.08 * Math.sin(t * 0.02 + b.px));
          const g = ctx.createRadialGradient(x, y, 0, x, y, r);
          const [cr, cg, cb] = b.color;
          g.addColorStop(0, `rgba(${cr},${cg},${cb},${b.alpha})`);
          g.addColorStop(0.55, `rgba(${cr},${cg},${cb},${b.alpha * 0.45})`);
          g.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);
          ctx.fillStyle = g;
          ctx.fillRect(0, 0, w, h);
        }
      }
    };
    const loop = (now: number) => {
      if (!running) return;
      if (now - last > 40) { last = now; draw(now / 1000); }
      raf = requestAnimationFrame(loop);
    };
    if (reduced) draw(12);
    else raf = requestAnimationFrame(loop);
    const onVisibility = () => { running = !document.hidden && !reduced; if (running) raf = requestAnimationFrame(loop); else cancelAnimationFrame(raf); };
    const onResize = () => { size(); if (reduced) draw(12); };
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("resize", onResize);
    return () => { running = false; cancelAnimationFrame(raf); document.removeEventListener("visibilitychange", onVisibility); window.removeEventListener("resize", onResize); };
  }, []);
  return <canvas ref={ref} className="nuance" aria-hidden="true" />;
}
