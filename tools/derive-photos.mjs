// Produit les tailles réduites des photographies à partir de la plus grande, dans Chrome (canvas → WebP), sans
// nouvelle requête vers Commons. node tools/derive-photos.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dir = path.join(root, "public/photos");
const files = fs.readdirSync(dir).filter((f) => f.endsWith(".webp") && !f.endsWith("-web.webp"));
const groups = new Map();
for (const f of files) {
  const m = f.match(/^(.*)-(\d+)\.webp$/);
  if (!m) continue;
  const g = groups.get(m[1]) ?? [];
  g.push(Number(m[2]));
  groups.set(m[1], g);
}
const browser = await puppeteer.launch({ executablePath: process.env.CHROME ?? "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new" });
const page = await browser.newPage();
await page.goto("about:blank");
for (const [name, widths] of groups) {
  const max = Math.max(...widths);
  const src = path.join(dir, `${name}-${max}.webp`);
  const dataUrl = `data:image/webp;base64,${fs.readFileSync(src).toString("base64")}`;
  const info = await page.evaluate(async (href) => { const img = new Image(); img.src = href; await img.decode(); return { w: img.naturalWidth, h: img.naturalHeight }; }, dataUrl);
  console.log(`${name}: ${max} → ${info.w}×${info.h}, ${Math.round(fs.statSync(src).size / 1024)} ko`);
  // La source « -<max> » est en réalité plus large que sa largeur déclarée : on écrit à côté une variante de
  // diffusion réellement à <max> px (« -<max>-web.webp »), que le site référence. La source n'est jamais modifiée.
  if (info.w > max) {
    const out = await page.evaluate(async (href, width) => {
      const img = new Image(); img.src = href; await img.decode();
      const h = Math.round((img.naturalHeight * width) / img.naturalWidth);
      const c = document.createElement("canvas"); c.width = width; c.height = h;
      const ctx = c.getContext("2d"); ctx.imageSmoothingQuality = "high"; ctx.drawImage(img, 0, 0, width, h);
      return c.toDataURL("image/webp", 0.8).split(",")[1];
    }, dataUrl, max);
    const target = path.join(dir, `${name}-${max}-web.webp`);
    fs.writeFileSync(target, Buffer.from(out, "base64"));
    console.log(`   ${name}-${max}-web.webp : ${Math.round(fs.statSync(target).size / 1024)} ko (source ${info.w} px, ${Math.round(fs.statSync(src).size / 1024)} ko)`);
  }
  for (const w of widths.filter((x) => x < max)) {
    const out = await page.evaluate(async (href, width) => {
      const img = new Image(); img.src = href; await img.decode();
      const h = Math.round((img.naturalHeight * width) / img.naturalWidth);
      const c = document.createElement("canvas"); c.width = width; c.height = h;
      const ctx = c.getContext("2d"); ctx.imageSmoothingQuality = "high"; ctx.drawImage(img, 0, 0, width, h);
      return c.toDataURL("image/webp", 0.8).split(",")[1];
    }, dataUrl, w);
    const target = path.join(dir, `${name}-${w}.webp`);
    fs.writeFileSync(target, Buffer.from(out, "base64"));
    console.log(`   ${name}-${w}.webp : ${Math.round(fs.statSync(target).size / 1024)} ko`);
  }
}
await browser.close();
