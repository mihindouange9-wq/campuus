// Repère des photographies libres (Wikimedia Commons) d'étudiants et de campus d'Afrique francophone, télécharge
// les vignettes et compose une planche-contact numérotée pour choisir. node tools/photo-candidates.mjs <dossier>
import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";

const out = process.argv[2] ?? ".impeccable/review/photos";
fs.mkdirSync(out, { recursive: true });
const UA = { headers: { "User-Agent": "campuus-site-build/1.0 (contact: site build; photos libres pour un site étudiant)" } };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const api = async (params) => {
  for (let i = 0; i < 4; i++) {
    const res = await fetch("https://commons.wikimedia.org/w/api.php?format=json&" + params, UA);
    const text = await res.text();
    try { return JSON.parse(text); } catch { await sleep(4000 * (i + 1)); }
  }
  return null;
};

const CATS = ["Category:Students of Gabon", "Category:Students in Senegal", "Category:Students in Cameroon", "Category:Students of the Democratic Republic of the Congo", "Category:Students in Côte d'Ivoire", "Category:Université Omar Bongo", "Category:Cheikh Anta Diop University", "Category:University of Yaoundé I", "Category:Students in Benin", "Category:Students of the Republic of the Congo", "Category:Students in Togo", "Category:Students in Burkina Faso", "Category:Students in Mali", "Category:University students of Senegal", "Category:Students in Ghana"];
const FILES = ["File:A student at University of Kinshasa, DR Congo.jpg", "File:Students using SMILE in Ghana.jpg", "File:Africa student in classroom.jpg", "File:Students reading in a classroom 02.jpg", "File:African students preparing for a test.jpg", "File:A student asking a question in a classroom 04.jpg", "File:Students learning in a classroom 12234.jpg", "File:Photo from the Wiki For Minorities 2026 in Uganda in Makerere Uninversity Students, Wikimedian Community and Stakeholders 20.jpg", "File:Photo from the Wiki For Minorities 2026 in Uganda in Makerere Uninversity Students, Wikimedian Community and Stakeholders 19.jpg", "File:Photo from the Wiki For Minorities 2026 in Uganda in Makerere Uninversity Students, Wikimedian Community and Stakeholders 30.jpg", "File:Université Marien-Ngouabi - Faculté de droit.jpg", "File:Oub-uob-towers cropped.jpg", "File:Chasse photos.jpg", "File:Chasse photos1.jpg", "File:Chasse photos2.jpg", "File:Chasse photos5.jpg", "File:Students makerere.jpg"];

const all = new Map();
for (const c of CATS) {
  const j = await api("action=query&list=categorymembers&cmtitle=" + encodeURIComponent(c) + "&cmtype=file&cmlimit=40");
  for (const m of j?.query?.categorymembers ?? []) if (/\.jpe?g$/i.test(m.title)) all.set(m.title, c.replace("Category:", ""));
  await sleep(1200);
}
for (const f of FILES) all.set(f, "liste");
const titles = [...all.keys()];
console.log("candidats :", titles.length);
const picks = [];
for (let i = 0; i < titles.length; i += 15) {
  const j = await api("action=query&titles=" + encodeURIComponent(titles.slice(i, i + 15).join("|")) + "&prop=imageinfo&iiprop=url|size|extmetadata&iiurlwidth=420");
  for (const p of Object.values(j?.query?.pages ?? {})) {
    const ii = p.imageinfo?.[0];
    if (!ii || ii.width < 1000) continue;
    const m = ii.extmetadata ?? {};
    picks.push({ n: picks.length + 1, title: p.title, cat: all.get(p.title), w: ii.width, h: ii.height, lic: m.LicenseShortName?.value, author: (m.Artist?.value ?? "").replace(/<[^>]+>/g, "").trim().slice(0, 40), thumb: ii.thumburl, url: ii.url, page: ii.descriptionurl });
  }
  await sleep(1500);
}
fs.writeFileSync(path.join(out, "candidates.json"), JSON.stringify(picks, null, 1));
console.log("retenus :", picks.length);
for (const p of picks) {
  const f = path.join(out, `t${p.n}.jpg`);
  if (!fs.existsSync(f)) {
    const r = await fetch(p.thumb, UA);
    if (r.ok) fs.writeFileSync(f, Buffer.from(await r.arrayBuffer()));
    await sleep(350);
  }
}
const cells = picks.map((p) => `<figure><img src="t${p.n}.jpg"><figcaption><b>${p.n}</b> ${p.title.slice(5, 48)}<br>${p.lic} · ${p.w}×${p.h} · ${p.cat}</figcaption></figure>`).join("");
fs.writeFileSync(path.join(out, "sheet.html"), `<!doctype html><meta charset="utf-8"><style>body{margin:0;background:#111;color:#eee;font:11px Inter,system-ui}main{display:grid;grid-template-columns:repeat(6,1fr);gap:6px;padding:6px}figure{margin:0}img{width:100%;height:160px;object-fit:cover;display:block}figcaption{padding:3px 2px;line-height:1.25}b{color:#80aee8;font-size:14px}</style><main>${cells}</main>`);
const browser = await puppeteer.launch({ executablePath: process.env.CHROME ?? "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args: ["--allow-file-access-from-files"] });
const page = await browser.newPage();
await page.setViewport({ width: 1500, height: 1000 });
await page.goto("file:///" + path.resolve(out, "sheet.html").replace(/\\/g, "/"), { waitUntil: "networkidle0" });
await page.screenshot({ path: path.join(out, "sheet.png"), fullPage: true });
await browser.close();
console.log("planche :", path.join(out, "sheet.png"));
