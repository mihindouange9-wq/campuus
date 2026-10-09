// Capture du hero après le temps « Acceptée » de la séquence (≈ 9 s) : node tools/hero-late.mjs [url] [sortie]
import puppeteer from "puppeteer-core";
const url = process.argv[2] ?? "http://127.0.0.1:5201", out = process.argv[3] ?? ".impeccable/review/shots/1440-00-accueil-acceptee.png";
const browser = await puppeteer.launch({ executablePath: process.env.CHROME ?? "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args: ["--hide-scrollbars"] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(url, { waitUntil: "networkidle0" });
await new Promise((r) => setTimeout(r, 8200));
await page.screenshot({ path: out });
await browser.close();
console.log(out);
