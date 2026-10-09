---
name: CAMPUUS
description: L'emploi du temps — la disponibilité est la première information ; l'aide apparaît là où quelqu'un est libre.
colors:
  bordeaux: "#5b0015"
  horizon: "#80aee8"
  ivory: "#f7f2e0"
  ink: "#2b171d"
  ink-muted: "#6b4f58"
  ink-faint: "#7a5f69"
  bordeaux-deep: "#3d000e"
  bordeaux-soft: "#7a1f33"
  bordeaux-tint: "#efe1e1"
  bordeaux-mix: "#2e0013"
  horizon-ink: "#2f5f96"
  horizon-deep: "#5b8fcc"
  horizon-tint: "#e2ecf8"
  horizon-soft: "#b9d2f1"
  horizon-on-dark: "#a9c8ee"
  ivory-deep: "#ece5cc"
  ivory-soft: "#fbf8ee"
  paper-muted: "#d9c9cd"
  ok: "#2e6b47"
  ok-tint: "#e3eee6"
  error: "#b3261e"
  error-tint: "#f6e2e0"
  warn: "#7a5a00"
  warn-tint: "#f3ebd3"
  rule: "rgb(91 0 21 / 0.14)"
  rule-strong: "rgb(91 0 21 / 0.32)"
  rule-on-dark: "rgb(247 242 224 / 0.18)"
  rule-on-dark-strong: "rgb(247 242 224 / 0.4)"
typography:
  display:
    fontFamily: "Plus Jakarta Sans Variable, Plus Jakarta Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 1.1rem + 4.4vw, 4.75rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Plus Jakarta Sans Variable, Plus Jakarta Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 1.2rem + 2.4vw, 3.25rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Plus Jakarta Sans Variable, Plus Jakarta Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 1.1rem + 0.5vw, 1.5rem)"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  lead:
    fontFamily: "Inter Variable, Inter, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 1rem + 0.35vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Inter Variable, Inter, Segoe UI, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
    fontFeature: "\"cv11\", \"ss01\""
  small:
    fontFamily: "Inter Variable, Inter, Segoe UI, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Inter Variable, Inter, Segoe UI, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 650
    lineHeight: 1.2
    letterSpacing: "0.14em"
  numeric:
    fontFamily: "Inter Variable, Inter, Segoe UI, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 400
    fontVariation: "tabular-nums"
rounded:
  slot: "2px"
  base: "3px"
  pill: "999px"
spacing:
  grid-cell: "52px"
  row: "44px"
  cell-compact: "36px"
  cell-mobile: "34px"
  target: "44px"
  gutter: "clamp(1rem, 0.5rem + 3vw, 3rem)"
  section: "clamp(4.5rem, 2.5rem + 7vw, 8.5rem)"
  max: "1280px"
  sidebar: "248px"
components:
  button-primary:
    backgroundColor: "{colors.bordeaux}"
    textColor: "{colors.ivory}"
    rounded: "{rounded.base}"
    padding: "0.7rem 1.25rem"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.bordeaux-soft}"
    textColor: "{colors.ivory}"
  button-primary-on-bordeaux:
    backgroundColor: "{colors.ivory}"
    textColor: "{colors.bordeaux}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.bordeaux}"
    rounded: "{rounded.base}"
    padding: "0.7rem 1.25rem"
    height: "44px"
  button-secondary-hover:
    backgroundColor: "{colors.bordeaux-tint}"
    textColor: "{colors.bordeaux}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.bordeaux}"
    rounded: "{rounded.base}"
    padding: "0.7rem 0.6rem"
    height: "44px"
  button-horizon:
    backgroundColor: "{colors.horizon}"
    textColor: "{colors.ink}"
    rounded: "{rounded.base}"
    padding: "0.7rem 1.25rem"
    height: "44px"
  button-lg:
    padding: "0.9rem 1.6rem"
    height: "52px"
  button-sm:
    padding: "0.4rem 0.85rem"
    height: "36px"
  input:
    backgroundColor: "{colors.ivory-soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.base}"
    padding: "0.6rem 0.8rem"
    height: "44px"
  searchbar:
    backgroundColor: "{colors.ivory-soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.base}"
    padding: "0 0.6rem 0 1rem"
    height: "52px"
  tag:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.base}"
    padding: "0.2rem 0.55rem"
    typography: "{typography.small}"
  tag-horizon:
    backgroundColor: "{colors.horizon-tint}"
    textColor: "{colors.horizon-ink}"
    rounded: "{rounded.base}"
    padding: "0.2rem 0.55rem"
  tag-bordeaux:
    backgroundColor: "{colors.bordeaux}"
    textColor: "{colors.ivory}"
    rounded: "{rounded.base}"
    padding: "0.2rem 0.55rem"
  status:
    backgroundColor: "transparent"
    textColor: "{colors.ink-muted}"
    rounded: "{rounded.base}"
    padding: "0.3rem 0.55rem"
    typography: "{typography.label}"
  status-envoyee:
    backgroundColor: "transparent"
    textColor: "{colors.horizon-ink}"
  status-acceptee:
    backgroundColor: "{colors.bordeaux}"
    textColor: "{colors.ivory}"
  status-refusee:
    backgroundColor: "transparent"
    textColor: "{colors.error}"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0.35rem 0.7rem"
  chip-on:
    backgroundColor: "{colors.bordeaux}"
    textColor: "{colors.ivory}"
    rounded: "{rounded.pill}"
  badge:
    backgroundColor: "{colors.horizon}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    height: "18px"
  nav-item:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.base}"
    padding: "0.65rem 0.75rem"
  nav-item-hover:
    backgroundColor: "{colors.ivory-deep}"
    textColor: "{colors.ink}"
  nav-item-active:
    backgroundColor: "{colors.bordeaux}"
    textColor: "{colors.ivory}"
  slot-course:
    backgroundColor: "{colors.bordeaux}"
    textColor: "{colors.ivory}"
    rounded: "{rounded.slot}"
    padding: "0.3rem 0.45rem"
  slot-free:
    backgroundColor: "{colors.horizon}"
    textColor: "{colors.ink}"
    rounded: "{rounded.slot}"
    padding: "0.3rem 0.45rem"
  slot-meet:
    backgroundColor: "{colors.bordeaux-mix}"
    textColor: "{colors.ivory}"
    rounded: "{rounded.slot}"
  sheet:
    backgroundColor: "{colors.ivory-soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.slot}"
    padding: "0.6rem 0.7rem"
  tile-now:
    backgroundColor: "{colors.horizon}"
    textColor: "{colors.ink}"
    rounded: "{rounded.slot}"
    padding: "0.6rem 0.7rem"
    height: "88px"
  tile-tonight:
    backgroundColor: "{colors.horizon-soft}"
    textColor: "{colors.ink}"
  tile-weekend:
    backgroundColor: "{colors.horizon-tint}"
    textColor: "{colors.ink}"
  bubble:
    backgroundColor: "{colors.ivory}"
    textColor: "{colors.ink}"
    rounded: "{rounded.base}"
    padding: "0.55rem 0.8rem"
  bubble-me:
    backgroundColor: "{colors.bordeaux}"
    textColor: "{colors.ivory}"
  toast:
    backgroundColor: "{colors.bordeaux}"
    textColor: "{colors.ivory}"
    rounded: "{rounded.base}"
    padding: "0.8rem 1rem"
---

# Design System: CAMPUUS

Version 1, relevée le 9 octobre 2026 sur le build livré (site public, pages Partenaires / Rejoindre, application de démonstration). Il n'existe pas de version antérieure : ce monde est né avec ce build. Source normative des valeurs : `src/styles/tokens.css` ; ce fichier les décrit, il ne les redéfinit pas.

## Overview

**Creative North Star: "L'emploi du temps"**

CAMPUUS se lit comme un emploi du temps posé sur du papier ivoire. La thèse du monde est simple : la disponibilité est la première information. Un étudiant bloqué ne cherche pas un catalogue de profils, il cherche qui est libre, et quand. La grille de filets fins (1 px, bordeaux à 14 %) structure donc chaque surface ; les cours sont des blocs pleins Night Bordeaux, les créneaux libres s'allument en Cool Horizon, et la feuille de demande d'aide se pose sur un créneau de ce soir. Là où deux encres se recouvrent en multiplication naît une troisième couleur : la mise en relation. Elle est à la fois le symbole du logo (deux U imbriqués) et le moment clé de l'interface.

La densité est celle d'un objet imprimé plutôt que d'une application de bureau : en-tête de semaine en petites capitales espacées, marge perforée des heures, chiffres tabulaires, un seul type d'ombre (la feuille posée sur la grille). Les sections du site sont des blocs séparés par de vrais vides et ouverts par un filet, jamais des cartes égales. L'application hérite du même monde en mode Operate : la grille vit dans les détails (tuiles de créneaux, filets de listes, blocs bordeaux d'action), jamais en décor.

Refus confirmés par le build : pas de kicker au-dessus des titres, pas de grilles de trois cartes, pas de dégradés décoratifs, pas de verre translucide généralisé, pas de bordeaux en fond de tous les écrans, pas de carte d'Afrique (la dimension panafricaine est une grille horaire).

**Key Characteristics:**
- Papier ivoire comme sol unique ; bordeaux en blocs pleins réservés à l'identité, l'action et les cours.
- Grille de filets fins bordeaux atténué (jamais gris) au pas de 52 px (site) ou 44 px (hero), structure et non décor.
- Deux encres, bordeaux et Cool Horizon, dont la superposition en `multiply` fabrique la couleur de la rencontre.
- Plus Jakarta Sans 800 serré pour les titres ; Inter pour tout le reste, chiffres tabulaires pour heures et jours.
- Une seule ombre (`--shadow-sheet`), réservée à ce qui est « posé » : feuille de demande, toast, menu.
- Mouvement : un créneau s'allume en 300 ms, une feuille se pose en 600 ms, ease-out exponentiel, jamais de rebond.
- Mobile d'abord : cibles 44 px, grille réduite à un jour sous 720 px, onglets bas de 56 px.

## Colors

Trois couleurs officielles et non négociables, toutes les nuances en sont dérivées ; aucune quatrième teinte dominante, les couleurs fonctionnelles restent discrètes.

### Primary
- **Night Bordeaux** (`{colors.bordeaux}`): identité, action, navigation. Bouton principal, cours dans la grille, lien de navigation actif, ligne « maintenant », bloc de clôture et pied de page (ton `bordeaux` / `deep`), statut « acceptée », bulles de l'utilisateur, encre A du logo. Jamais en fond de tous les écrans.
- **Bordeaux profond** (`{colors.bordeaux-deep}`): ton `deep` pour le pied de page et l'en-tête d'application.
- **Bordeaux adouci** (`{colors.bordeaux-soft}`): survol du bouton principal, champ posé sur un bloc bordeaux.
- **Bordeaux teinté** (`{colors.bordeaux-tint}`): ligne sélectionnée, conversation active, case cochée, étape de suivi en cours, survol du bouton secondaire.
- **Encre de la rencontre** (`{colors.bordeaux-mix}`): bordeaux × horizon. Résultat visuel de la multiplication des deux encres ; couleur du recouvrement du logo, de l'avatar `mix` et de la légende « créneau commun ».

### Secondary
- **Cool Horizon** (`{colors.horizon}`): disponibilité, progression, information. Créneau libre, tuile « disponible maintenant », badge de compteur, cellule sélectionnée dans la grille éditable, point de présence, bouton `horizon`, encre B du logo, contour de focus sur fond bordeaux. Jamais en petit texte sur ivoire.
- **Horizon encre** (`{colors.horizon-ink}`): le texte « horizon » lisible sur ivoire (5,4:1) : liens, statut « envoyée », disponibilité « maintenant / ce soir », contour de focus sur ivoire, chapitres maîtrisés.
- **Horizon profond** (`{colors.horizon-deep}`): bordures et icônes non textuelles (3,2:1) : contour de la bande horaire, de la tuile week-end, de la bulle « moi » dans la conversation du problème.
- **Horizon teinté** (`{colors.horizon-tint}`): surface d'information (ton `horizon`), halo de focus des champs, étiquette de chapitre, icône de notification lue, étape « ensuite », succès de formulaire.
- **Horizon adouci** (`{colors.horizon-soft}`): créneau libre atténué (tuile « ce soir »), sélection de texte, cellule vide de l'état « aucun résultat ».
- **Horizon sur sombre** (`{colors.horizon-on-dark}`): liens sur bordeaux (7,6:1), « Ouvrir la démo » dans la clôture, survol des liens du pied de page.

### Neutral
- **Ivory Mist** (`{colors.ivory}`): le papier. Fond du site et de l'application, texte sur bordeaux, bouton principal inversé sur bloc bordeaux, case « moi » dans la grille de clôture.
- **Ivoire posé** (`{colors.ivory-soft}`): la feuille et tout ce qui est plus clair que le papier : champs, barre de recherche, feuille de demande, écran de fragment, ligne survolée, notification non lue, fond de la messagerie.
- **Ivoire en retrait** (`{colors.ivory-deep}`): zone en retrait et survol neutre : fond de la conversation du problème, survol des éléments de navigation et des puces, trame perforée, squelette de chargement.
- **Encre** (`{colors.ink}`): texte courant sur ivoire (bordeaux assombri, 13,4:1) ; texte sur Cool Horizon.
- **Encre atténuée** (`{colors.ink-muted}`): texte secondaire (6,1:1) : sous-titres, étiquettes en capitales, en-têtes de jours, textes d'appui.
- **Encre pâle** (`{colors.ink-faint}`): métadonnées (4,8:1) : heures de la marge, horodatages, placeholders, point « indisponible ».
- **Papier atténué** (`{colors.paper-muted}`): texte secondaire sur bordeaux (9,8:1).
- **Filets** (`{colors.rule}` / `{colors.rule-strong}`): bordeaux à 14 % pour la grille et les séparateurs de listes, 32 % pour les filets structurants (en-tête des jours, bordure des grilles, champs, barre de défilement). Sur bloc bordeaux : `{colors.rule-on-dark}` / `{colors.rule-on-dark-strong}` (ivoire à 18 % et 40 %).

### Fonctionnel
- **Succès** (`{colors.ok}` sur `{colors.ok-tint}`): confirmation d'enregistrement, en petit texte uniquement.
- **Erreur** (`{colors.error}` sur `{colors.error-tint}`): message d'erreur de champ, état d'erreur, statut « refusée », conversation bloquée, action dangereuse d'un menu.
- **Avertissement** (`{colors.warn}` sur `{colors.warn-tint}`): défini, réservé à un usage discret ; non employé sur les écrans livrés.

### Named Rules
**La règle des deux encres.** Il n'y a que deux encres : bordeaux (cours, action) et Cool Horizon (disponibilité, information). Leur superposition en `mix-blend-mode: multiply` est la seule façon légitime d'obtenir une troisième couleur, et elle signifie toujours une rencontre entre deux étudiants.

**La règle du filet bordeaux.** Aucun gris. Chaque filet, bordure et séparateur est du bordeaux atténué (`rgb(91 0 21 / 0.14)` ou `0.32`) sur ivoire, de l'ivoire atténué sur bordeaux.

**La règle du bloc bordeaux.** Le bordeaux plein est réservé aux blocs qui agissent ou identifient : bouton principal, cours, navigation active, clôture, pied de page, statut accepté. Il n'est jamais le fond d'un écran courant ; le papier reste ivoire.

**La règle de l'horizon lisible.** Cool Horizon `#80aee8` est une surface, jamais un texte sur ivoire. Pour écrire en horizon, on utilise `horizon-ink` ; pour border, `horizon-deep` ; sur bordeaux, `horizon-on-dark`.

## Typography

**Display Font:** Plus Jakarta Sans Variable (repli Plus Jakarta Sans, Segoe UI, system-ui), auto-hébergée via fontsource
**Body Font:** Inter Variable (repli Inter, Segoe UI, system-ui), avec `font-feature-settings: "cv11", "ss01"`
**Label/Mono Font:** Inter en chiffres tabulaires (`font-variant-numeric: tabular-nums` sur `time`, `.num`, `.tabular`)

**Character:** Des titres larges, graisse 800, interlettrage négatif, qui se posent sur les lignes de la grille ; une interface Inter neutre et dense qui laisse la grille parler. La hiérarchie se fait par l'échelle et le poids, jamais par une étiquette au-dessus du titre.

### Hierarchy
- **Display** (800, `{typography.display.fontSize}`, 1.05, −0.04em): le h1 du site, calé sur deux lignes de 44 px dans le hero (4rem en desktop, 3.25rem sous 1240 px, puis `--fs-display`). Max 12ch desktop, 16ch mobile.
- **Headline** (800, `{typography.headline.fontSize}`, 1.05, −0.03em): h2 de section, max 20ch, `text-wrap: balance`.
- **Title** (800, `{typography.title.fontSize}`, 1.2, −0.02em): h3 des listes et registres ; variantes fixes 1.0625–1.25rem selon la densité. h4 à 1.0625rem, −0.01em. Titre d'écran d'application en `clamp(1.5rem, 1.2rem + 1.2vw, 2rem)`.
- **Lead** (400, `{typography.lead.fontSize}`, 1.5): sous-titre en encre atténuée, max 62ch, `text-wrap: pretty`.
- **Body** (400, 1rem, 1.55): texte courant ; textes d'appui à 0.9375rem ; gras à 650.
- **Small** (400, 0.875rem): métadonnées, légendes, aide de champ, étiquettes de filtre.
- **Label** (650, 0.6875rem, 0.14em, capitales): en-tête de semaine, jours, pied de page, groupes de notifications ; 0.12em pour les jours et les colonnes, 0.10em pour les statuts. Toujours en encre atténuée ou bordeaux, jamais en position de kicker.
- **Numeric** (Inter tabulaire): heures de la marge (0.6875rem, 0.625rem en compact), ligne « maintenant » (0.625rem, 650, 0.05em), numéros de feuille de route en Plus Jakarta Sans 800 bordeaux.

### Named Rules
**La règle du titre sans étiquette.** Aucun kicker ni eyebrow au-dessus d'un titre. Les petites capitales espacées appartiennent à l'objet imprimé (semaine, jours, colonnes, statuts), pas à l'annonce d'une section.

**La règle du chiffre tabulaire.** Toute heure, tout jour, tout compteur et toute date s'affichent en chiffres tabulaires pour rester alignés sur la grille.

## Layout

Le modèle spatial est la grille de l'emploi du temps. Conteneur `min(100% − 2 × gutter, 1280px)` centré, gouttière fluide `clamp(1rem, 0.5rem + 3vw, 3rem)`, sections séparées par `clamp(4.5rem, 2.5rem + 7vw, 8.5rem)` et ouvertes par un filet de 1 px. Le pas de la grille est de 52 px (`--grid-cell`, fond `.gridbg` et cellules de la grille) ; le hero règle sa propre colonne de texte et sa grille sur un pas de 44 px (`--row`) : le titre occupe deux lignes, le sous-titre deux, la recherche une, l'appel à l'action une, et la colonne de gauche reprend les mêmes filets horizontaux (`background-size: 100% 44px`) avec la même origine que la grille de droite (sous l'en-tête de semaine de 30 px et la ligne des jours de 28 px).

Hero : 5/12 texte, 7/12 grille (`grid-template-columns: 5fr 7fr`), un seul écran. Sections du site : deux colonnes asymétriques (1.1fr/1fr, 1fr/1.3fr, 1fr/1.4fr) ou trois colonnes égales uniquement pour les trois étapes et les trois grilles de mise en relation ; registre des fonctionnalités à deux colonnes avec filets. Pied de page 1.6fr + 4 × 1fr.

Application : coquille à trois zones (`demo` / `side` / `main`), barre latérale collante de 248 px, contenu max 1100 px, rembourrage bas de 6rem. Listes construites en filets (`border-top` fort, `border-bottom` fin entre lignes), tuiles d'accueil en grille 5 colonnes avec un intervalle de 2 px (ce sont des cellules de l'emploi du temps, pas des cartes), messagerie 300 px + 1fr.

Points de rupture observés : 1240 (titre du hero à 3.25rem), 1100 (tuiles à 3 colonnes), 1000 (hero en une colonne, cellules à 40 px, `.two` en une colonne), 900 (menu plein écran, barre latérale remplacée par en-tête + onglets bas de 56 px, pied de page à 2 colonnes), 860 (sections en une colonne), 800 (messagerie liste/fil), 760 (pages secondaires en une colonne), 720 (grille réduite au jeudi en une colonne de 40 px de marge, cellules 36 px, 34 px en grille complète), 640 (lignes à deux colonnes, tuiles 2 colonnes), 560 et 520 (formulaires et pied de page en une colonne).

**La règle du jour unique.** Sous 720 px, toute grille non marquée `fullOnMobile` ne montre que le jeudi (`data-day="3"`) ; l'en-tête de semaine passe à 0.625rem et perd sa plage horaire.

## Elevation & Depth

Le système est plat et tonal : la profondeur vient des tons (`ivory` papier → `ivory-soft` posé → `ivory-deep` en retrait, puis les blocs bordeaux) et des filets, pas des ombres. Une seule ombre existe et signifie « un objet est posé sur la grille ». L'en-tête du site est le seul élément flouté (ivoire à 92 % + `backdrop-filter: blur(6px)`) pour rester lisible en défilement ; ce n'est pas une licence pour du verre ailleurs.

### Shadow Vocabulary
- **La feuille posée** (`box-shadow: 0 10px 30px -12px rgb(91 0 21 / 0.35), 0 2px 6px -2px rgb(91 0 21 / 0.2)`): feuille de demande d'aide dans la grille, toast, menu contextuel, légende « feuille ». Rien d'autre.
- **Le halo de focus** (`box-shadow: 0 0 0 3px {colors.horizon-tint}`): champ en focus ; point « disponible maintenant ».

### Named Rules
**La règle de l'ombre unique.** Une seule ombre, bordeaux atténué, pour ce qui est posé. Les cartes, boutons et tuiles n'ont pas d'ombre, ni au repos ni au survol.

## Shapes

Angles quasi droits : 3 px de rayon pour boutons, champs, étiquettes, statuts, navigation et toasts ; 2 px pour les créneaux, la feuille, les tuiles, les lignes de squelette ; pilule (999 px) uniquement pour les puces de filtre, le badge de compteur et la barre de défilement. Les grilles, écrans de fragments, bandes horaires, états d'étapes et listes sont à angle vif (0) et bordés d'un filet bordeaux de 1 px. Les points (disponibilité 9 px, présence 8 px, ligne « maintenant » 8 px, ville 12 px) sont ronds. Pas de bordure arrondie répétée en cartes égales ; la silhouette récurrente est le rectangle à filet.

L'objet imprimé donne les formes signature : en-tête de semaine souligné d'un trait bordeaux plein, marge perforée (trame radiale `14 × 22 px` de disques `ivory-deep` cerclés de `rule-strong`), ligne « maintenant » de 2 px avec un point à gauche et l'heure à droite.

## Components

### Buttons
Blocs francs, 44 px minimum, Inter 600 à 0.9375rem, rayon 3 px, transitions de 160 ms.
- **Shape:** rectangle à peine adouci (3 px), bordure 1 px de la couleur du fond.
- **Primary:** bloc bordeaux plein, texte ivoire, `0.7rem 1.25rem` ; survol en bordeaux adouci ; actif : translation de 1 px vers le bas. Sur un bloc bordeaux, il s'inverse : ivoire plein, texte bordeaux, blanc au survol.
- **Secondary:** filet bordeaux sur fond transparent, texte bordeaux ; survol en bordeaux teinté. Sur bordeaux : filet et texte ivoire.
- **Ghost:** texte bordeaux sans bordure, rembourrage latéral réduit à 0.6rem ; survol en bordeaux teinté.
- **Horizon:** fond Cool Horizon, texte encre ; survol en horizon adouci. Réservé aux actions de disponibilité.
- **Sizes:** `lg` 52 px / 1.0625rem, `sm` 36 px / 0.875rem. Flèche Lucide 16 px à droite en option ; chargement = icône qui tourne en 0.9 s et `aria-busy`.
- **Disabled:** opacité 0.55, curseur interdit.
- **Focus:** contour 2 px `horizon-ink` décalé de 3 px (`horizon` sur fond bordeaux).

### Chips (puces de filtre) et Tags
- **Puce:** pilule 999 px, filet fort, Inter 500 à 0.8125rem, `0.35rem 0.7rem` ; survol ivoire en retrait ; sélectionnée : bordeaux plein, texte ivoire.
- **Étiquette:** rectangle 3 px, filet fort, 0.875rem ; variante `horizon` (fond teinté, texte horizon encre, sans bordure) pour chapitres et lieux ; variante `bordeaux` pleine pour « démo » et états affirmés.
- **Statut de demande:** petites capitales 0.6875rem / 0.1em, filet fort : `envoyée` en horizon encre ; `en attente` en pointillé ; `acceptée` en bloc bordeaux plein ; `refusée` en erreur ; `expirée` barrée en encre pâle.
- **Disponibilité:** un point de 9 px et un mot (0.875rem, 550) : `maintenant` horizon avec halo teinté, `ce soir` horizon profond, `week-end` horizon adouci cerclé, `indisponible` creux en encre pâle.
- **Badge de compteur:** pilule horizon 18 px, Inter 700 tabulaire ; ivoire/bordeaux sur un élément de navigation actif.

### Cards / Containers
Il n'y a pas de carte. Les conteneurs sont des rectangles à filet ou des surfaces tonales :
- **Corner Style:** 0 (grilles, écrans de fragments, bandes, messagerie) ou 2–3 px (feuille, tuile, bulle).
- **Background:** `ivory-soft` pour ce qui est posé (feuille, écran de fragment, carte destinataire, menu), `ivory-deep` pour ce qui est en retrait, `horizon-tint` pour l'information, bordeaux pour l'action.
- **Shadow Strategy:** aucune, sauf la feuille posée (voir Elevation).
- **Border:** 1 px `rule-strong` ; bordeaux plein pour la grille « créneaux communs » et les encarts d'état (`page__stage`, `trust__note` en filet gauche).
- **Internal Padding:** 0.6–1rem ; listes à `0.9–1.2rem 0` séparées par des filets fins, jamais encadrées.
- **Tuiles de créneaux (accueil app):** cellules de 88 px minimum dans une grille 5 → 3 → 2 colonnes avec 2 px d'intervalle ; `now` horizon plein, `tonight` horizon adouci, `weekend` horizon teinté cerclé ; survol `brightness(0.96)` ; heure en petites capitales en bas.

### Inputs / Fields
- **Style:** fond ivoire posé, filet fort 1 px, rayon 3 px, 44 px minimum, `0.6rem 0.8rem` ; placeholder en encre pâle ; zone de texte 120 px minimum.
- **Hover / Focus:** survol filet bordeaux adouci ; focus filet bordeaux + halo 3 px horizon teinté (pas de contour natif). Caret et `accent-color` bordeaux.
- **Error / Disabled:** filet erreur, message 0.875rem en erreur avec `role="alert"` ; libellé 0.875rem 600, mention « facultatif » en 400 atténué, aide en atténué.
- **Select:** même champ, chevron dessiné en CSS (8 px, encre atténuée).
- **Barre de recherche:** 52 px, fond ivoire posé, filet bordeaux plein, loupe bordeaux ; dans le hero elle occupe une ligne de la grille (44 px) et porte un caret bordeaux clignotant (steps 2, 1 s).
- **Cases et radios:** 18 px (20 px pour les interrupteurs) ; libellé encadré qui passe en bordeaux teinté + filet bordeaux quand coché (`:has(input:checked)`).

### Navigation
- **Site:** en-tête collant 68 px, ivoire à 92 % flouté, filet bas ; liens Inter 500 à 0.9375rem soulignés d'un trait horizon de 2 px au survol ; « Voir la démo » en bordeaux 600 ; bouton principal à droite. Sous 900 px : burger 44 px et menu plein écran ivoire, liens Plus Jakarta Sans 700 à 1.5rem séparés par des filets.
- **Application (desktop):** barre latérale 248 px collante, filet droit ; marque Plus Jakarta Sans 800 à 1.375rem ; éléments 0.9375rem 500 avec icône, rayon 3 px ; survol ivoire en retrait ; actif bloc bordeaux plein texte ivoire, badge inversé ; profil en bas, séparé d'un filet.
- **Application (mobile, ≤ 900 px):** en-tête collant avec icônes 44 px ; onglets bas fixes à 5 colonnes, 56 px, 0.6875rem 600, actif en bordeaux avec un trait de 2 px en haut ; `safe-area-inset-bottom` respecté.
- **Onglets de contenu:** filet bas fort, boutons 600 atténués, sélectionné bordeaux souligné de 2 px.
- **Bandeau démo:** 0.8125rem, filet bas, actions en horizon encre.
- **Lien d'évitement:** bloc bordeaux visible au focus.

### L'emploi du temps (composant signature)
Le composant `Timetable` est la grille qui structure tout CAMPUUS : six jours (lun → sam), de 8 h à 20 h, en `grid-template-columns: 44px repeat(6, 1fr)`, lignes de 28 px (jours) puis `--cell`. Sa grammaire :
- **Filets:** cellules bordées à gauche et en haut d'un filet fin ; en-tête des jours en petites capitales 0.6875rem / 0.12em, souligné d'un filet fort ; heures en encre pâle, chiffres tabulaires, alignées à droite dans la marge.
- **course:** bloc bordeaux plein, texte ivoire, 2 px de marge, rayon 2 px, étiquette 600 à 0.75rem et sous-titre 0.6875rem à 85 %.
- **free:** bloc Cool Horizon, texte encre, avec le prénom et l'établissement.
- **inkA / inkB:** deux encres superposées, bordeaux dessous, horizon en `multiply` (z 2) par-dessus ; le recouvrement fabrique la couleur de la rencontre.
- **meet:** encre bordeaux en `multiply` posée sur un créneau horizon : la rencontre effective (hero, jeudi 19 h).
- **label:** étiquette non mélangée (z 3, ivoire, sans pointeur) posée sur les encres : « Kevin · Aïcha · créneau commun ».
- **sheet:** la feuille de demande, 2 colonnes × 3 lignes, ivoire posé, filet fort, l'unique ombre, titre Plus Jakarta Sans 700 à 0.875rem, corps 0.8125rem ; porte les statuts `envoyée` puis `acceptée`.
- **now:** ligne bordeaux de 2 px avec point de 8 px à gauche et heure (0.625rem, 650) à droite, position `--now` recalculée toutes les 30 s, masquée le dimanche.
- **printed:** l'objet imprimé : en-tête de semaine (bordeaux, 0.14em, souligné bordeaux plein, « 8 h → 20 h » à droite) et marge perforée de 58 px (50 px en compact). Réservé au site ; l'application reste sans perforation.
- **compact:** cellules 36 px, heures 0.625rem (grilles de mise en relation, aperçus d'application).
- **editable:** cellules cliquables (`aria-pressed`), survol horizon teinté, sélection horizon plein ; sert au choix de créneaux dans le profil et la demande.
- **mobile:** un seul jour (jeudi, « Jeudi » écrit en entier), colonne de marge 40 px ; `fullOnMobile` garde six colonnes à 34 px, étiquettes 0.5625rem sans sous-titre.
- **Motion:** à l'entrée dans l'écran, les créneaux poussent du bas (`scaleY 0.2 → 1`, 0.5 s, décalage 50 ms) de gauche à droite dans l'ordre des jours. Dans le hero, la séquence signature : frappe de « Actualisation et VAN » (1.3 s) → créneaux libres allumés (0.55 s, décalage 120 ms) → feuille posée depuis le haut (0.7 s) → « Envoyée » → « Acceptée » + encre de la rencontre, en boucle avec 3.2 s de pause. Sous `prefers-reduced-motion`, tout est à l'état final, sans boucle.

### Messagerie, listes et états
- **Bulles:** 76 % max, ivoire à filet fort, rayon 3 px, 0.9375rem ; « moi » en bloc bordeaux justifié à droite, métadonnées en papier atténué ; pièce jointe sur fond noir 6 % (blanc 12 % sur bordeaux).
- **Lignes de liste (étudiants, demandes, groupes, notifications, activité):** grille `auto 1fr auto`, filets fins, survol ivoire posé, non lu en ivoire posé avec icône bordeaux.
- **Vide:** mini-grille SVG 120 × 60 à filets forts avec une cellule horizon adouci, titre 1.125rem, texte atténué, action.
- **Chargement:** 3 lignes de 14 px en balayage ivoire en retrait / posé (1.4 s linéaire), `aria-live="polite"`.
- **Erreur:** encart erreur teinté à filet erreur, bouton secondaire « Réessayer », `role="alert"`.
- **Toast:** bloc bordeaux de 420 px max centré en bas (safe-area), l'ombre de la feuille, entrée 320 ms depuis 8 px plus bas.
- **Suivi de demande:** trois cases à filet fort ; en cours bordeaux teinté, faite bordeaux plein, refusée erreur.
- **Dévoilement de profil:** `details` à filet, « + » / « − » en Plus Jakarta Sans 800 bordeaux.

### Marque
Le symbole est formé des deux U du nom, imbriqués sur une grille 100 × 90 (bras de 14, rayon extérieur 25, second U décalé de 30). La zone de recouvrement porte la troisième couleur : `{colors.bordeaux-mix}` sur fond clair, `#7ca5cb` sur fond bordeaux ; en monochrome, un filet de réserve de 3 unités sépare les deux U. Logotype Plus Jakarta Sans 800, interlettrage −2,4 (−0.045em dans l'interface). Tons `light`, `dark`, `mono`, `mono-dark` ; le composant `Mark` dessine le symbole à toute taille, `Logo` ajoute le mot à 0.86 × la taille. Zone de protection : la hauteur d'un bras (14 %). Tailles minimales : symbole 16 px, horizontal 100 px, compact 72 px. Jamais sur Cool Horizon ni sur photo chargée ; jamais déformé, ombré, dégradé, recoloré, ni séparé.

## Do's and Don'ts

### Do:
- **Do** poser chaque surface sur Ivory Mist et la structurer avec des filets bordeaux à 14 % ou 32 % ; sur un bloc bordeaux, des filets ivoire à 18 % ou 40 %.
- **Do** réserver le bordeaux plein aux blocs qui agissent ou identifient (bouton principal, cours, navigation active, clôture, pied de page, « acceptée »).
- **Do** signaler la disponibilité en Cool Horizon comme surface, et écrire en `horizon-ink` (5,4:1) dès qu'il s'agit de texte sur ivoire.
- **Do** obtenir la couleur de la rencontre uniquement par `mix-blend-mode: multiply` entre les deux encres, ou par `bordeaux-mix` quand le mélange est impossible (logo, avatar, légende).
- **Do** aligner heures, jours, compteurs et dates en chiffres tabulaires (Inter, `tabular-nums`).
- **Do** garder 44 px minimum pour toute cible tactile (boutons, champs, icônes d'en-tête) et un contour de focus 2 px `horizon-ink` décalé de 3 px.
- **Do** animer en ease-out exponentiel : 160 ms pour un état, 320 ms pour un déplacement, 600 ms pour une feuille qui se pose ; réduire à l'état final sous `prefers-reduced-motion`.
- **Do** réduire toute grille à un seul jour sous 720 px, sauf demande explicite de grille complète.
- **Do** décliner les blocs sombres par `data-tone="bordeaux"` ou `"deep"` et les surfaces d'information par `data-tone="horizon"`, afin que boutons, liens, filets et focus s'inversent d'eux-mêmes.

### Don't:
- **Don't** mettre de kicker, d'eyebrow ou d'étiquette en petites capitales au-dessus d'un titre ; les petites capitales appartiennent à l'objet imprimé.
- **Don't** disposer le contenu en grilles de cartes égales, arrondies et ombrées ; une liste est une suite de filets, un ensemble de créneaux est une grille à 2 px d'intervalle.
- **Don't** ajouter une ombre en dehors de la feuille posée (feuille, toast, menu), ni une ombre au survol.
- **Don't** employer de dégradé décoratif, de verre translucide (hors l'en-tête collant du site), de particules, de 3D, de curseur personnalisé ou de défilement détourné.
- **Don't** mettre du bordeaux en fond d'un écran courant ; il n'habille que la clôture, le pied de page, l'en-tête profond et les blocs d'action.
- **Don't** écrire en Cool Horizon `#80aee8` sur ivoire, ni poser le logo sur Cool Horizon.
- **Don't** représenter l'Afrique par une carte décorative : la dimension panafricaine est une grille horaire (villes × heures, bandes horizon, point bordeaux « maintenant »).
- **Don't** introduire une quatrième couleur dominante ni un gris : toute nuance dérive du bordeaux, de l'horizon ou de l'ivoire.
- **Don't** rendre la grille comme une table HTML neutre ; elle garde en-tête de semaine, marge d'heures tabulaires et, sur le site, la perforation.


## Mouvement (v1.1, 9 octobre 2026)

Le client a demandé une page plus vivante : le langage de mouvement est orchestré dans `src/lib/motion.ts` et `src/styles/motion.css`, toujours désactivé sous `prefers-reduced-motion`.

- **L'encre au clic** : une goutte Cool Horizon part du point de contact et s'étale en multiplication sur tout élément interactif (`setupInk`, `.ink`, 650 ms).
- **Boutons** : pression (scale 0,98), balayage de teinte de gauche à droite au survol, flèche qui avance de 4 px, ombre portée légère sur le bloc bordeaux.
- **Liens** : le soulignement s'épaissit (1 → 2 px) ; dans la navigation, un filet Cool Horizon se trace sous le lien.
- **Titres** : les mots montent un à un derrière leur ligne (`[data-split]`, 0,9 s, décalage 45 ms).
- **Filets de section** : se tracent de gauche à droite à l'entrée (`.section.is-in::before`, 1,1 s).
- **Grilles** : les créneaux s'impriment de gauche à droite ; sur la planche « créneaux communs », l'encre Cool Horizon glisse de la droite par-dessus l'encre bordeaux et les étiquettes se posent quand les encres se recouvrent.
- **Séquences** : la conversation du problème arrive message par message puis « Sans réponse » se tamponne ; les trois gestes jouent l'un après l'autre (frappe, filtres, résultats, formulaire, pression du bouton, « Acceptée ») ; les bandes horaires panafricaines se tracent, les points pilotes apparaissent ; les états de confiance se tamponnent ; la grille de clôture est parcourue par un chenillard Cool Horizon.
- **Hero** : entrée (mots, colonne, cours qui s'impriment) puis la boucle existante ; la feuille se pose avec une rotation de −1,5° à 0.
- **Lecture** : barre de progression bordeaux de 2 px sous l'en-tête.
- **Application** : transition d'écran (fondu + 10 px), listes en cascade (délais 40 → 340 ms), tampons de statut, bulles de messagerie qui arrivent, onglet actif qui glisse, encre au clic, pulsations sur « disponible maintenant » et la ligne « maintenant ».
- **Pied de page** : bloc « En partenariat avec » MÉTHODE AURA (logo ivoire sur bordeaux profond, selon sa charte), révélé comme les autres blocs.

## La nuance (v1.2, 9 octobre 2026)

À la demande du client, le fond uni ivoire est remplacé par une nuance vivante des trois couleurs de la charte : deux nappes fixes de dégradés radiaux (`body::before` / `body::after` dans `base.css`), Cool Horizon à 46 % et 26 %, bordeaux à 17 % et 12 %, ivoire à 95 %, mélange à 8 %, qui dérivent, tournent et respirent sur 46 s et 64 s en alternance (transform seulement, `will-change`, désactivé sous `prefers-reduced-motion`). Les surfaces posées (grilles, feuilles, formulaires, écrans de démonstration) restent ivoire : elles se lisent comme des feuilles sur le bain. Les textes secondaires ont été assombris pour rester lisibles sur les zones les plus colorées (`--ink-muted` #52383f, `--ink-faint` #5f4650 : 9,4:1 et 7,6:1 sur ivoire ; ≥ 4,5:1 sur la zone horizon la plus dense ; les zones bordeaux les plus denses descendent à 4,5:1 pour le texte secondaire et sont dimensionnées pour ne jamais se superposer entièrement). Dans l'application, la coquille (barre latérale, barre haute, onglets) passe en ivoire à 80–90 % avec un léger flou pour rester lisible par-dessus le fond.
