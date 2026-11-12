// Découpe la planche-contact en tranches lisibles. node tools/sheet-slices.mjs <dossier>
import path from "node:path";
import { pathToFileURL } from "node:url";
import puppeteer from "puppeteer-core";
const out = process.argv[2] ?? ".impeccable/review/photos";
const browser = await puppeteer.launch({ executablePath: process.env.CHROME ?? "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args: ["--allow-file-access-from-files"] });
const page = await browser.newPage();
await page.setViewport({ width: 1400, height: 1000 });
await page.goto(pathToFileURL(path.resolve(out, "sheet.html")).href, { waitUntil: "networkidle0" });
await page.addStyleTag({ content: "main{grid-template-columns:repeat(5,1fr)!important}img{height:200px!important}figcaption{font-size:13px!important}" });
const total = await page.evaluate(() => document.body.scrollHeight);
let i = 0;
for (let y = 0; y < total; y += 1000) {
  await page.screenshot({ path: path.join(out, `slice-${++i}.png`), clip: { x: 0, y, width: 1400, height: Math.min(1000, total - y) } });
}
await browser.close();
console.log(i, "tranches");
