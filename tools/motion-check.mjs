// Contrôle du mouvement : après un défilement complet, aucun élément animé ne doit rester invisible ;
// un clic sur un bouton doit produire une goutte d'encre ; les mots du hero doivent être revenus en place.
// node tools/motion-check.mjs [url]
import puppeteer from "puppeteer-core";

const url = process.argv[2] ?? "http://127.0.0.1:5201";
const browser = await puppeteer.launch({ executablePath: process.env.CHROME ?? "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let failures = 0;
for (const [width, height] of [[1440, 900], [390, 844]]) {
  const page = await browser.newPage();
  await page.setViewport({ width, height, isMobile: width < 800 });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(url, { waitUntil: "networkidle0" });
  await sleep(1500);
  // mots du hero
  const heroWords = await page.evaluate(() => [...document.querySelectorAll("h1 .w > span")].map((s) => getComputedStyle(s).transform));
  const heroMoved = heroWords.every((t) => t === "none" || t === "matrix(1, 0, 0, 1, 0, 0)");
  console.log(`${width} hero : ${heroWords.length} mots, ${heroMoved ? "en place" : "ENCORE DÉCALÉS"}`);
  if (!heroMoved) failures++;
  // encre au clic
  const ink = await page.evaluate(() => { const el = document.querySelector(".hero__cta .btn"); const r = el.getBoundingClientRect(); el.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, clientX: r.left + r.width / 2, clientY: r.top + r.height / 2 })); return document.querySelectorAll(".ink").length; });
  console.log(`${width} encre au clic : ${ink ? "ok" : "ABSENTE"}`);
  if (!ink) failures++;
  await page.goBack({ waitUntil: "networkidle0" }).catch(() => {});
  await page.goto(url, { waitUntil: "networkidle0" });
  // défilement complet
  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < total; y += height * 0.5) { await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), y); await sleep(260); }
  await sleep(2500);
  const hidden = await page.evaluate(() => {
    const sel = "[data-reveal], [data-stagger] > *, [data-stamp], .pan__band, [data-split] .w > span, [data-slots] .slot--free, .slot--inkA, .slot--inkB, [data-slots] .slot--course, .mini__suggest li, .mini__results li, .mini__after";
    return [...document.querySelectorAll(sel)].filter((el) => { const cs = getComputedStyle(el); return parseFloat(cs.opacity) < 0.9 || cs.visibility === "hidden" || (cs.transform.includes("matrix(0") ); }).map((el) => `${el.tagName.toLowerCase()}.${[...el.classList].join(".")} ${(el.textContent || "").trim().slice(0, 30)}`);
  });
  const sectionsIn = await page.evaluate(() => [...document.querySelectorAll(".section")].filter((s) => s.classList.contains("is-in")).length + "/" + document.querySelectorAll(".section").length);
  console.log(`${width} sections tracées : ${sectionsIn} · éléments restés invisibles : ${hidden.length}`);
  hidden.slice(0, 12).forEach((h) => console.log("   ", h));
  if (hidden.length) failures++;
  const progress = await page.evaluate(() => getComputedStyle(document.querySelector(".progress")).transform);
  console.log(`${width} progression : ${progress}`);
  if (errors.length) { console.log("erreurs :", errors); failures++; }
  await page.close();
}
await browser.close();
console.log(failures ? `ÉCHECS : ${failures}` : "mouvement : ok");
process.exit(failures ? 1 : 0);
