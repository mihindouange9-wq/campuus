# CAMPUUS

Plateforme d'entraide académique née au Gabon : trouver l'étudiant qui peut t'expliquer un chapitre précis, dans ton
établissement ou dans un autre pays francophone d'Afrique. Ce dépôt contient le **frontend** : le site public de
présentation et l'interface de démonstration de l'application, sur des données fictives.

Phase de conception : aucun backend, aucun utilisateur réel, aucun chiffre d'usage. Tout ce qui est présenté comme
« démonstration » ou « envisagé » l'est réellement.

## Démarrer

```
npm install
npm run dev        # http://127.0.0.1:5200
npm run build      # vérification TypeScript puis build Vite dans dist/
npm run preview    # http://127.0.0.1:5201
npm run brand      # régénère les fichiers de marque (public/brand, favicon, icônes, image de partage)
```

Node 22 (voir `.node-version`).

## Organisation

```
src/
  brand/        Logo.tsx : le symbole (les deux U imbriqués) et le logotype, en React
  styles/       tokens.css (palette, typographie, rythme), base.css, components.css
  content/      fr.ts : tous les textes du site public
  data/         types.ts (modèle), mock.ts (données de démonstration, fictives)
  services/     api.ts (interface CampuusApi), demo.ts (implémentation démo), store.ts (session locale), toast.ts
  components/   ui.tsx (boutons, champs, états, avatars, étiquettes), Timetable.tsx (la grille d'emploi du temps)
  lib/          motion.ts (révélations GSAP, prefers-reduced-motion)
  sections/     les sections du site public
  pages/        Landing, Partners (/partenaires), Join (/rejoindre), NotFound, landing.css
  app/          Shell (navigation de l'application), app.css, pages/ (les écrans)
public/brand/   le système de logo en SVG (généré par tools/build-brand.mjs)
tools/          build-brand, brand-sheet, captures de contrôle (shoot, shoot-app, fullpage), render-deploy
docs/           DEPLOIEMENT.md, CHARTE.md (règles d'usage du logo)
```

## Brancher un backend

L'interface ne parle qu'à `CampuusApi` (`src/services/api.ts`). L'implémentation de démonstration (`demo.ts`) lit
`src/data/mock.ts` et persiste la session dans le stockage local (`store.ts`). Pour un backend réel : écrire une
implémentation de `CampuusApi` qui appelle l'API, puis la passer à `setApi` dans `src/main.tsx`. Les composants ne
changent pas.

## Routes

- `/` site public · `/partenaires` présentation pour établissements et investisseurs · `/rejoindre` inscription pilote
- `/app` accueil · `/app/trouver` recherche · `/app/etudiants/:id` profil · `/app/demandes` et `/app/demandes/nouvelle`
  · `/app/messages/:id` · `/app/groupes/:id` · `/app/notifications` · `/app/profil`

## Charte

Palette officielle : Night Bordeaux `#5B0015`, Cool Horizon `#80AEE8`, Ivory Mist `#F7F2E0`. Titres en Plus Jakarta
Sans, interface en Inter (auto-hébergées). Le système visuel est documenté dans `DESIGN.md`, la vérité produit dans
`PRODUCT.md`, le logo dans `docs/CHARTE.md`.
