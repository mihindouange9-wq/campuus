// Génère les fichiers de marque CAMPUUS dans public/ : SVG du système de logo (public/brand/), favicon.svg,
// favicon.ico, icônes PNG, apple-touch-icon, image de partage (og-image.png) et manifest.json.
// Les PNG sont rendus par Chrome sans interface. Lancer depuis le projet : node tools/build-brand.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pub = path.join(root, "public");
fs.mkdirSync(path.join(pub, "brand"), { recursive: true });

const BORDEAUX = "#5B0015", HORIZON = "#80AEE8", IVORY = "#F7F2E0";
const MIX_LIGHT = "#2E0013"; // bordeaux × horizon (multiplication des encres sur fond clair)
const MIX_DARK = "#7CA5CB"; // ivoire × horizon sur fond bordeaux

/*
 * Le symbole : les deux U de CAMPUUS, imbriqués. Chaque U est une forme pleine (bras de 14, rayon extérieur 25),
 * le second est décalé de 30 ; la zone où ils se recouvrent est remplie d'une troisième couleur (les deux encres
 * multipliées) : c'est la mise en relation. En monochrome, le second U garde un filet de réserve (couleur du fond)
 * pour rester lisible comme deux lettres qui s'imbriquent.
 */
const U = (dx) => `M${10 + dx} 10H${24 + dx}V54a11 11 0 0 0 22 0V10H${60 + dx}V54a25 25 0 0 1-50 0Z`;
let uid = 0;
const mark = ({ a, b, mix, bg }) => {
  const id = `u${++uid}`;
  if (mix) {
    return `<defs><clipPath id="${id}"><path d="${U(0)}"/></clipPath></defs><path d="${U(0)}" fill="${a}"/><path d="${U(30)}" fill="${b}"/><path d="${U(30)}" fill="${mix}" clip-path="url(#${id})"/>`;
  }
  return `<path d="${U(0)}" fill="${a}"/><path d="${U(30)}" fill="${b}" stroke="${bg}" stroke-width="3" paint-order="stroke"/>`;
};
const MARK_W = 100, MARK_H = 90;
const word = (ink, x = 118) => `<text x="${x}" y="68" font-family="Plus Jakarta Sans Variable, Plus Jakarta Sans, sans-serif" font-weight="800" font-size="66" letter-spacing="-2.4" fill="${ink}">CAMPUUS</text>`;
const svg = (w, h, body, title) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${title}"><title>${title}</title>${body}</svg>\n`;
const fontCss = () => {
  const f = path.join(root, "node_modules/@fontsource-variable/plus-jakarta-sans/files/plus-jakarta-sans-latin-wght-normal.woff2");
  const b64 = fs.readFileSync(f).toString("base64");
  return `<style>@font-face{font-family:"Plus Jakarta Sans Variable";src:url(data:font/woff2;base64,${b64}) format("woff2");font-weight:200 800}</style>`;
};

const light = { a: BORDEAUX, b: HORIZON, mix: MIX_LIGHT };
const dark = { a: IVORY, b: HORIZON, mix: MIX_DARK };
const monoLight = { a: BORDEAUX, b: BORDEAUX, bg: IVORY };
const monoDark = { a: IVORY, b: IVORY, bg: BORDEAUX };

const files = {
  // Symbole seul
  "brand/campuus-symbole.svg": svg(MARK_W, MARK_H, mark(light), "Symbole CAMPUUS"),
  "brand/campuus-symbole-sombre.svg": svg(MARK_W, MARK_H, mark(dark), "Symbole CAMPUUS sur fond sombre"),
  "brand/campuus-symbole-mono.svg": svg(MARK_W, MARK_H, mark(monoLight), "Symbole CAMPUUS monochrome"),
  "brand/campuus-symbole-mono-sombre.svg": svg(MARK_W, MARK_H, mark(monoDark), "Symbole CAMPUUS monochrome sur fond sombre"),
  // Logotype seul
  "brand/campuus-logotype.svg": svg(350, 90, fontCss() + word(BORDEAUX, 0), "CAMPUUS"),
  "brand/campuus-logotype-sombre.svg": svg(350, 90, fontCss() + word(IVORY, 0), "CAMPUUS"),
  // Version horizontale (symbole + logotype)
  "brand/campuus-logo.svg": svg(470, 90, fontCss() + mark(light) + word(BORDEAUX), "CAMPUUS"),
  "brand/campuus-logo-sombre.svg": svg(470, 90, fontCss() + mark(dark) + word(IVORY), "CAMPUUS"),
  "brand/campuus-logo-mono.svg": svg(470, 90, fontCss() + mark(monoLight) + word(BORDEAUX), "CAMPUUS monochrome"),
  "brand/campuus-logo-mono-sombre.svg": svg(470, 90, fontCss() + mark(monoDark) + word(IVORY), "CAMPUUS monochrome sur fond sombre"),
  // Version compacte (symbole au-dessus du logotype)
  "brand/campuus-logo-compact.svg": svg(312, 200, fontCss() + `<g transform="translate(106 0)">${mark(light)}</g>` + `<text x="156" y="178" text-anchor="middle" font-family="Plus Jakarta Sans Variable, Plus Jakarta Sans, sans-serif" font-weight="800" font-size="58" letter-spacing="-2" fill="${BORDEAUX}">CAMPUUS</text>`, "CAMPUUS"),
  // Icône d'application et favicon
  "brand/campuus-icone-application.svg": svg(100, 100, `<rect width="100" height="100" rx="22" fill="${BORDEAUX}"/><g transform="translate(5 10) scale(0.9)">${mark(dark)}</g>`, "Icône CAMPUUS"),
  "favicon.svg": svg(100, 100, `<rect width="100" height="100" fill="${BORDEAUX}"/><g transform="translate(5 10) scale(0.9)">${mark(dark)}</g>`, "CAMPUUS"),
};
for (const [name, body] of Object.entries(files)) fs.writeFileSync(path.join(pub, name), body);

/* PNG par Chrome */
const browser = await puppeteer.launch({ executablePath: process.env.CHROME ?? "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new" });
const page = await browser.newPage();
const render = async (html, w, h, out) => {
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(pub, out) });
};
const icon = (s) => `<html><body style="margin:0;background:${BORDEAUX}"><svg viewBox="0 0 100 100" width="${s}" height="${s}" style="display:block"><g transform="translate(5 10) scale(0.9)">${mark(dark)}</g></svg></body></html>`;
await render(icon(512), 512, 512, "icon-512.png");
await render(icon(192), 192, 192, "icon-192.png");
await render(icon(180), 180, 180, "apple-touch-icon.png");

/* Image de partage : la grille d'emploi du temps, le titre, un créneau allumé */
const cols = 6, hours = 6;
let grid = "";
for (let c = 0; c <= cols; c++) grid += `<line x1="${c * 90}" y1="0" x2="${c * 90}" y2="${hours * 52}" stroke="${BORDEAUX}" stroke-opacity=".18"/>`;
for (let r = 0; r <= hours; r++) grid += `<line x1="0" y1="${r * 52}" x2="${cols * 90}" y2="${r * 52}" stroke="${BORDEAUX}" stroke-opacity=".18"/>`;
const og = `<html><head>${fontCss()}<style>
body{margin:0;width:1200px;height:630px;background:${IVORY};font-family:"Plus Jakarta Sans Variable",sans-serif;color:${BORDEAUX};position:relative;overflow:hidden}
.logo{position:absolute;left:72px;top:52px;display:flex;align-items:center;gap:16px;font-weight:800;font-size:32px;letter-spacing:-1.4px}
.title{position:absolute;left:72px;top:170px;width:520px;font-weight:800;font-size:58px;letter-spacing:-2.6px;line-height:1.04}
.sub{position:absolute;left:72px;top:430px;width:560px;font-size:22px;line-height:1.4;color:#4a2a33;font-family:Inter,system-ui,sans-serif}
.grid{position:absolute;right:72px;top:150px}
.slot{position:absolute;right:72px;top:150px;width:540px;height:312px}
.foot{position:absolute;left:72px;bottom:48px;font-size:14px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#6e4a55;font-family:Inter,system-ui,sans-serif}
</style></head><body>
<div class="logo"><svg viewBox="0 0 100 90" width="52" height="47">${mark(light)}</svg>CAMPUUS</div>
<div class="title">Bloqué sur un cours ? Trouve quelqu'un qui peut t'aider.</div>
<div class="sub">Les étudiants d'Afrique francophone apprennent ensemble, échangent leurs connaissances et progressent sans frontières.</div>
<svg class="grid" width="540" height="312" viewBox="0 0 540 312">${grid}
<rect x="91" y="53" width="88" height="50" fill="${BORDEAUX}"/><rect x="271" y="105" width="88" height="50" fill="${BORDEAUX}"/><rect x="451" y="1" width="88" height="50" fill="${BORDEAUX}"/>
<rect x="181" y="157" width="88" height="50" fill="${HORIZON}"/><rect x="361" y="209" width="88" height="50" fill="${HORIZON}"/><rect x="1" y="209" width="88" height="50" fill="${HORIZON}"/>
<rect x="271" y="209" width="178" height="50" fill="${BORDEAUX}"/><rect x="361" y="209" width="88" height="50" fill="${MIX_LIGHT}"/>
<text x="280" y="240" font-family="Inter,system-ui" font-size="15" font-weight="600" fill="${IVORY}">Jeudi 19 h · Aïcha</text>
<line x1="0" y1="190" x2="540" y2="190" stroke="${BORDEAUX}" stroke-width="2"/>
</svg>
<div class="foot">Entraide académique · Gabon → Afrique francophone</div>
</body></html>`;
await render(og, 1200, 630, "og-image.png");
await browser.close();

/* favicon.ico : le PNG 192 embarqué tel quel */
const png = fs.readFileSync(path.join(pub, "icon-192.png"));
const head = Buffer.alloc(6); head.writeUInt16LE(0, 0); head.writeUInt16LE(1, 2); head.writeUInt16LE(1, 4);
const dir = Buffer.alloc(16); dir.writeUInt8(192, 0); dir.writeUInt8(192, 1); dir.writeUInt16LE(1, 4); dir.writeUInt16LE(32, 6); dir.writeUInt32LE(png.length, 8); dir.writeUInt32LE(22, 12);
fs.writeFileSync(path.join(pub, "favicon.ico"), Buffer.concat([head, dir, png]));
fs.writeFileSync(path.join(pub, "manifest.json"), JSON.stringify({ name: "CAMPUUS", short_name: "CAMPUUS", description: "Trouve l'étudiant qui peut t'aider sur un chapitre précis.", lang: "fr", start_url: "./app", display: "standalone", background_color: IVORY, theme_color: BORDEAUX, icons: [{ src: "icon-192.png", sizes: "192x192", type: "image/png" }, { src: "icon-512.png", sizes: "512x512", type: "image/png" }] }, null, 2));
console.log("marque générée :", Object.keys(files).length, "SVG · icon-512/192 · apple-touch-icon · og-image · favicon.ico · manifest.json");
