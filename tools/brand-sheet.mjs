// Planche de contrôle du système de logo : tous les SVG de public/brand/ sur fond clair et sombre, plus le symbole
// aux petites tailles (16, 24, 32 px). Capture dans .impeccable/review/brand.png. node tools/brand-sheet.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, ".impeccable/review");
fs.mkdirSync(out, { recursive: true });
const brand = path.join(root, "public/brand");
const svgs = Object.fromEntries(fs.readdirSync(brand).filter((f) => f.endsWith(".svg")).map((f) => [f, fs.readFileSync(path.join(brand, f), "utf8")]));
const cell = (name, bg) => `<figure style="background:${bg};margin:0;padding:24px;display:grid;gap:12px;align-content:start"><div style="height:90px;display:flex;align-items:center">${svgs[name].replace("<svg ", '<svg style="height:90px;width:auto;max-width:100%" ')}</div><figcaption style="font:12px Inter,system-ui;color:${bg === "#F7F2E0" ? "#6b4f58" : "#d9c9cd"}">${name}</figcaption></figure>`;
const small = (name, bg) => [16, 24, 32, 48].map((s) => `<span style="display:inline-flex;align-items:center;gap:8px;margin-right:24px;font:12px Inter;color:${bg === "#F7F2E0" ? "#6b4f58" : "#d9c9cd"}">${svgs[name].replace("<svg ", `<svg style="width:${s}px;height:${s}px" `)} ${s}px</span>`).join("");
const html = `<html><body style="margin:0;background:#fff;width:1400px;font-family:Inter,system-ui">
<div style="display:grid;grid-template-columns:1fr 1fr">
${["campuus-logo.svg", "campuus-logo-sombre.svg", "campuus-logo-mono.svg", "campuus-logo-mono-sombre.svg", "campuus-symbole.svg", "campuus-symbole-sombre.svg", "campuus-symbole-mono.svg", "campuus-symbole-mono-sombre.svg", "campuus-logotype.svg", "campuus-logotype-sombre.svg", "campuus-logo-compact.svg", "campuus-icone-application.svg"].map((n, i) => cell(n, i % 2 ? "#5B0015" : "#F7F2E0")).join("")}
</div>
<div style="padding:24px;background:#F7F2E0">${small("campuus-symbole.svg", "#F7F2E0")}${small("campuus-icone-application.svg", "#F7F2E0")}</div>
<div style="padding:24px;background:#5B0015">${small("campuus-symbole-sombre.svg", "#5B0015")}${small("campuus-symbole-mono-sombre.svg", "#5B0015")}</div>
</body></html>`;
const browser = await puppeteer.launch({ executablePath: process.env.CHROME ?? "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new" });
const page = await browser.newPage();
await page.setViewport({ width: 1400, height: 1200, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: "load" });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: path.join(out, "brand.png"), fullPage: true });
await browser.close();
console.log("planche :", path.join(out, "brand.png"));
