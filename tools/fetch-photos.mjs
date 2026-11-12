// Télécharge les photographies libres (Wikimedia Commons, redimensionnées par Commons) et les convertit en WebP
// via Chrome, sans dépendance native. Sortie : public/photos/<nom>-<largeur>.webp. node tools/fetch-photos.mjs
// Les crédits sont dans docs/CREDITS.md et dans src/content/photos.ts (affichés en pied de page).
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import puppeteer from "puppeteer-core";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "public/photos");
fs.mkdirSync(out, { recursive: true });
const UA = { headers: { "User-Agent": "campuus-site-build/1.0 (site étudiant ; photos libres)" } };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const PHOTOS = [
  { name: "diplomes", widths: [1800, 900], commons: "File:2ie etudiants logo.jpg" },
  { name: "promotion", widths: [1400, 700], commons: "File:2ie étudiants 1.JPG" },
  { name: "portrait", widths: [900, 450], commons: "File:Kabu Nartey.jpg" },
  { name: "amphi", widths: [1800, 900], commons: "File:Ghana Technology University College ,Code train bootcamp.jpg" },
  { name: "salle", widths: [1400, 700], commons: "File:Lecturer at Work.jpg" },
  { name: "bibliotheque", widths: [1200, 600], commons: "File:Le quotidien d’un étudiant 11.jpg" },
  { name: "campus-yaounde", widths: [1400, 700], commons: "File:Campus University of Yaoundé I (2014) frontal.jpg" },
  { name: "campus-dakar", widths: [1000, 500], commons: "File:Le quotidien d’un étudiant 26.jpg" },
  { name: "sous-les-arbres", widths: [1400, 700], commons: "File:Campus University of Yaoundé I (2014) 'chamignons' 2.jpg" },
  { name: "basket", widths: [1400, 700], commons: "File:La célébration de la journée d'etudiant agronome à la FSA de l'UAC 21ème Edition.jpg" },
  { name: "fablab", widths: [1400, 700], commons: "File:Etudiants à BLOLAB à Cotonou.jpg" },
  { name: "laptop", widths: [1000, 500], commons: "File:African boys.jpg" },
];

async function info(title, width) {
  const api = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=${width}&format=json`;
  let j = null;
  for (let i = 0; i < 5 && !j; i++) {
    const text = await (await fetch(api, UA)).text();
    try { j = JSON.parse(text); } catch { await sleep(5000 * (i + 1)); }
  }
  if (!j) throw new Error("API indisponible (limite de requêtes) : " + title);
  const page = Object.values(j.query.pages)[0];
  if (!page?.imageinfo) throw new Error("introuvable : " + title);
  const ii = page.imageinfo[0];
  const m = ii.extmetadata ?? {};
  return { thumb: ii.thumburl, license: m.LicenseShortName?.value, author: (m.Artist?.value ?? "").replace(/<[^>]+>/g, "").trim(), page: ii.descriptionurl };
}

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "campuus-photos-"));
const browser = await puppeteer.launch({ executablePath: process.env.CHROME ?? "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args: ["--allow-file-access-from-files"] });
const page = await browser.newPage();
const blank = path.join(tmp, "blank.html");
fs.writeFileSync(blank, "<!doctype html><title>conversion</title>");
await page.goto(pathToFileURL(blank).href);
const credits = [];

for (const p of PHOTOS) {
  let i = null;
  for (const w of p.widths) {
    const target = path.join(out, `${p.name}-${w}.webp`);
    if (!i) { i = await info(p.commons, p.widths[0]); credits.push({ name: p.name, title: p.commons.slice(5), license: i.license, author: i.author, page: i.page }); await sleep(2500); }
    if (fs.existsSync(target)) { console.log("déjà :", path.basename(target)); continue; }
    const thumb = i.thumb.replace(`/${p.widths[0]}px-`, `/${w}px-`);
    const res = await fetch(thumb, UA);
    if (!res.ok) { console.log("ÉCHEC", p.name, w, res.status); continue; }
    const src = path.join(tmp, `${p.name}-${w}.jpg`);
    fs.writeFileSync(src, Buffer.from(await res.arrayBuffer()));
    const data = await page.evaluate(async (href, quality) => {
      const img = new Image();
      img.src = href;
      await img.decode();
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth; canvas.height = img.naturalHeight;
      canvas.getContext("2d").drawImage(img, 0, 0);
      return canvas.toDataURL("image/webp", quality).split(",")[1];
    }, pathToFileURL(src).href, w > 1000 ? 0.76 : 0.8);
    fs.writeFileSync(target, Buffer.from(data, "base64"));
    console.log(path.basename(target), Math.round(fs.statSync(target).size / 1024) + " ko", "|", i.license, "|", i.author);
    await sleep(1500);
  }
}
await browser.close();
fs.writeFileSync(path.join(root, "src/content/photos.ts"), `/* Crédits des photographies (générés par tools/fetch-photos.mjs). Toutes viennent de Wikimedia Commons. */\nexport const PHOTO_CREDITS = ${JSON.stringify(credits, null, 2)} as const;\n`);
console.log("crédits :", credits.length);
