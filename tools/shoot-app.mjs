// Captures pleine page des écrans de l'espace CAMPUUS, ordinateur et téléphone.
// node tools/shoot-app.mjs [base] [dossier] [largeurs]
import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";

const base = process.argv[2] ?? "http://127.0.0.1:5201";
const out = process.argv[3] ?? ".impeccable/review/app";
const widths = (process.argv[4] ?? "1440,390").split(",").map(Number);
fs.mkdirSync(out, { recursive: true });
const ROUTES = [
  ["accueil", "/app"], ["trouver", "/app/trouver?q=actualisation"], ["trouver-vide", "/app/trouver?q=zzzz"], ["profil-etudiant", "/app/etudiants/aicha"],
  ["demande-nouvelle", "/app/demandes/nouvelle?to=aicha"], ["demandes", "/app/demandes"], ["messages", "/app/messages"], ["conversation", "/app/messages/c-nadege"],
  ["groupes", "/app/groupes"], ["groupe", "/app/groupes/g1"], ["notifications", "/app/notifications"], ["mon-profil", "/app/profil"],
  ["partenaires", "/partenaires"], ["rejoindre", "/rejoindre"],
];
const browser = await puppeteer.launch({ executablePath: process.env.CHROME ?? "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args: ["--hide-scrollbars"] });
const errors = [];
for (const width of widths) {
  const page = await browser.newPage();
  page.on("pageerror", (e) => errors.push(`${width} ${e.message.slice(0, 120)}`));
  page.on("console", (m) => m.type() === "error" && errors.push(`${width} ${m.text().slice(0, 120)}`));
  await page.setViewport({ width, height: width < 800 ? 844 : 900, isMobile: width < 800 });
  for (const [name, route] of ROUTES) {
    await page.goto(base + route, { waitUntil: "networkidle0" });
    await page.evaluate(() => document.fonts.ready);
    await new Promise((r) => setTimeout(r, 400));
    const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    await page.screenshot({ path: path.join(out, `${width}-${name}.png`), fullPage: true });
    console.log(`${width} ${name.padEnd(22)} ${over > 0 ? `DÉBORDEMENT ${over}px` : "ok"}`);
  }
  await page.close();
}
await browser.close();
console.log(errors.length ? `erreurs console :\n  ${[...new Set(errors)].join("\n  ")}` : "aucune erreur console");
