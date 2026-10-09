import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

/** Adresse publique (canonical, Open Graph, sitemap, données structurées). Fournie par Render via SITE_URL. */
const SITE_URL = (process.env.SITE_URL || process.env.RENDER_EXTERNAL_URL || "https://campuus.onrender.com").replace(/\/+$/, "");
const DESCRIPTION = "CAMPUUS connecte les étudiants d'Afrique francophone pour apprendre ensemble : trouve l'étudiant qui peut t'expliquer un chapitre précis, dans ton établissement ou ailleurs.";

function seo(): Plugin {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", "@id": `${SITE_URL}/#organisation`, name: "CAMPUUS", url: `${SITE_URL}/`, logo: `${SITE_URL}/icon-512.png`, areaServed: { "@type": "Continent", name: "Africa" } },
      { "@type": "WebSite", "@id": `${SITE_URL}/#site`, url: `${SITE_URL}/`, name: "CAMPUUS", description: DESCRIPTION, inLanguage: "fr", publisher: { "@id": `${SITE_URL}/#organisation` } },
      { "@type": "SoftwareApplication", name: "CAMPUUS", applicationCategory: "EducationalApplication", operatingSystem: "Web", description: DESCRIPTION, inLanguage: "fr", author: { "@id": `${SITE_URL}/#organisation` } },
    ],
  };
  const jsonld = JSON.stringify(data).replace(/</g, "\\u003c");
  return {
    name: "campuus-seo",
    transformIndexHtml: (html) => html.split("__SITE_URL__").join(SITE_URL).replace("<!--@jsonld-->", `<script type="application/ld+json">${jsonld}</script>`),
    generateBundle() {
      const today = new Date().toISOString().slice(0, 10);
      const urls = ["/", "/partenaires", "/rejoindre"].map((p) => `  <url><loc>${SITE_URL}${p}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>${p === "/" ? "1.0" : "0.7"}</priority></url>`).join("\n");
      this.emitFile({ type: "asset", fileName: "sitemap.xml", source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n` });
      this.emitFile({ type: "asset", fileName: "robots.txt", source: `User-agent: *\nAllow: /\nDisallow: /app\n\nSitemap: ${SITE_URL}/sitemap.xml\n` });
    },
  };
}

export default defineConfig({
  plugins: [react(), seo()],
  build: {
    target: "es2022",
    cssMinify: "esbuild",
    assetsInlineLimit: 0,
    rollupOptions: { output: { manualChunks: { vendor: ["react", "react-dom", "react-router-dom"], motion: ["gsap", "@gsap/react"] } } },
  },
});
