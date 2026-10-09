# Charte CAMPUUS : le logo

## Le symbole

Les deux U de CAMPUUS, imbriqués. Chaque U est une forme pleine (bras de 14 unités, rayon extérieur 25, sur une grille
de 100 × 90). Le second U est décalé de 30 unités vers la droite. Là où les deux se recouvrent, une troisième couleur
apparaît : les deux encres multipliées (`#2E0013` sur fond clair, `#7CA5CB` sur fond bordeaux). C'est la mise en
relation : deux étudiants, un espace commun.

Idées portées : connexion entre étudiants, convergence de parcours, campus ouvert (le U est ouvert vers le haut).

## Fichiers (`public/brand/`)

| Fichier | Usage |
| --- | --- |
| `campuus-symbole.svg` | symbole seul, fond clair (bordeaux + Cool Horizon) |
| `campuus-symbole-sombre.svg` | symbole seul, fond bordeaux (ivoire + Cool Horizon) |
| `campuus-symbole-mono.svg`, `-mono-sombre.svg` | monochrome : une seule encre, le second U garde un filet de réserve de 3 unités pour rester lisible |
| `campuus-logotype.svg`, `-sombre.svg` | le mot CAMPUUS seul, Plus Jakarta Sans 800, interlettrage −2,4 (police embarquée dans le SVG) |
| `campuus-logo.svg`, `-sombre.svg`, `-mono.svg`, `-mono-sombre.svg` | version horizontale : symbole + logotype |
| `campuus-logo-compact.svg` | version compacte : symbole au-dessus du logotype |
| `campuus-icone-application.svg` | icône d'application : carré bordeaux à coins arrondis (rayon 22 %), symbole sombre |

PNG générés : `icon-512.png`, `icon-192.png`, `apple-touch-icon.png`, `favicon.ico`, `og-image.png`.
Tout est régénéré par `npm run brand` (`tools/build-brand.mjs`) ; la planche de contrôle par `node tools/brand-sheet.mjs`.

## Règles

- **Zone de protection** : autour du logo, un espace libre égal à la hauteur d'un bras de U (14 % de la hauteur du
  symbole), au minimum.
- **Taille minimale** : symbole 16 px (favicon) ; version horizontale 100 px de large ; version compacte 72 px de large.
  En dessous, utiliser le symbole seul.
- **Fonds** : sur Ivory Mist ou tout fond clair, la version `light` ; sur Night Bordeaux ou fond sombre, la version
  `sombre`. Jamais sur Cool Horizon (le second U disparaît) ni sur une photo chargée.
- **Monochrome** : une seule encre, bordeaux sur clair ou ivoire sur sombre. Le filet de réserve est obligatoire.
- **Interdits** : déformer, incliner, changer les couleurs, ajouter une ombre ou un dégradé, séparer les deux U, recomposer
  le logotype dans une autre police, réduire le recouvrement.
- **Dans l'interface** : le composant `Mark` (`src/brand/Logo.tsx`) dessine le symbole à toute taille ; `Logo` ajoute le
  logotype. Les tons : `light`, `dark`, `mono`, `mono-dark`.

Le nom CAMPUUS et ce logo n'ont pas fait l'objet d'une recherche d'antériorité : vérifier la disponibilité avant tout
dépôt ou usage commercial.
