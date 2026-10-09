# Mise en ligne de CAMPUUS sur Render

Site statique : Render exécute `npm ci && npm run build` puis sert `dist/` depuis son CDN. Tout est décrit dans
`render.yaml` : build, dossier publié, réécriture d'adresses (nécessaire aux routes `/app/*`, `/partenaires`,
`/rejoindre`), en-têtes de cache et de sécurité, variables d'environnement.

## 1. Dépôt

Dépôt GitHub `mihindouange9-wq/campuus`, branche `main`. Le dépôt local y est rattaché : modifier, commiter, `git push`.
Render redéploie à chaque push.

## 2. Service Render

Deux façons de créer le service :

- **Par l'API** (celle qui a servi pour PAVEN, quand les pages du tableau de bord bouclaient) :
  `RENDER_API_KEY=rnd_xxx node tools/render-deploy.mjs`. La clé se crée dans Render → Account Settings → API Keys ;
  la supprimer après usage. Si le service existe déjà, le script demande un nouveau déploiement et le suit jusqu'à « live ».
  Le dépôt doit être lisible par Render : public, ou privé avec l'application GitHub de Render autorisée dessus
  (https://github.com/apps/render/installations/new).
- **Par le tableau de bord** : New → Blueprint → dépôt `campuus` → Apply.

Adresse : https://campuus.onrender.com.

## 3. Adresse publique (`SITE_URL`)

`SITE_URL` alimente la balise canonical, Open Graph, `robots.txt`, `sitemap.xml` et les données structurées. Quand le
domaine définitif est rattaché (Settings → Custom Domains), mettre `SITE_URL` à jour dans `render.yaml` (ou dans
l'onglet Environment) et redéployer.

## 4. Vérifications après déploiement

- `/`, `/partenaires`, `/rejoindre`, `/app`, `/app/trouver` répondent (réécriture `/*` → `index.html`).
- `/robots.txt` interdit `/app` ; `/sitemap.xml` liste les trois pages publiques.
- `curl -I https://<domaine>/` : `content-security-policy`, `x-frame-options: DENY`, `strict-transport-security`.
- Aperçu de partage (`og-image.png`) sur WhatsApp, LinkedIn ou Facebook.

## 5. Avant l'annonce publique

Nom de domaine, textes légaux (confidentialité, conditions), adresse de contact, réseaux sociaux (les liens affichent
« Bientôt » tant qu'ils ne sont pas fournis), version anglaise, et le branchement d'un backend réel (voir README).
