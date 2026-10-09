# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Décidé par le client le 9 octobre 2026 : même chaîne que PAVEN. Vite 6 + React 19 + TypeScript + React Router 7 + CSS natif (tokens en variables CSS, pas de Tailwind) + GSAP/ScrollTrigger + Lucide + polices auto-hébergées (fontsource). Dépôt GitHub + Render (site statique, redéploiement à chaque push). Pas de backend : couche de données de démonstration séparée (`src/data`), services frontend remplaçables par une API (`src/services`), persistance de session en stockage local clairement présentée comme démonstration.

## Users

- **Primaire : l'étudiant bloqué.** Étudiant en licence ou master au Gabon (Libreville, Franceville, Port-Gentil), souvent sur smartphone avec une connexion limitée, qui ne comprend pas un chapitre précis (ex. mathématiques financières, chapitre « actualisation et valeur actuelle nette ») et ne sait pas qui, dans son établissement ou ailleurs, pourrait l'expliquer. Il cherche de l'aide le soir ou la veille d'un examen.
- **Primaire : l'étudiant qui aide.** Étudiant à l'aise dans une matière, disponible par créneaux, qui veut être trouvé pour ce qu'il maîtrise, aider, se constituer un réseau académique et, à terme, être reconnu.
- **Secondaire : établissements** (universités, grandes écoles, instituts) qui évaluent CAMPUUS comme partenaire potentiel.
- **Secondaire : investisseurs et partenaires** qui doivent comprendre le problème, la solution, le parcours, l'ambition géographique et les pistes de monétisation.

## Product Purpose

CAMPUUS permet à un étudiant de trouver et de contacter d'autres étudiants capables de l'aider à comprendre une matière, un cours ou un chapitre précis, dans son établissement ou dans d'autres, au Gabon puis en Afrique centrale et francophone. Autour de ce cœur : découverte d'étudiants d'une même filière ou de filières complémentaires, groupes de travail, partenaires de révision, partage de ressources, relations académiques au-delà des frontières. Succès : un étudiant bloqué trouve en quelques minutes une personne pertinente et disponible, lui adresse une demande d'aide claire et commence à échanger.

## Positioning

Ce n'est pas un réseau social généraliste ni une plateforme de cours. L'unité de recherche est le **chapitre** (pas la matière, pas le professeur) et l'unité de réponse est **un étudiant précis, disponible maintenant ou à un créneau donné**, dans son établissement ou dans un autre pays francophone africain. Mise en relation par pertinence : matière, chapitre, filière, niveau, établissement, pays, disponibilité, affinités.

## Operating Context

- Marché initial : Gabon ; cible : Afrique centrale (Cameroun, Congo, RDC, Tchad, Centrafrique, Guinée équatoriale), puis Afrique francophone, puis autres marchés francophones.
- Langue de l'interface : français.
- Usage majoritairement sur smartphone, connexions limitées : priorité absolue au mobile, pages légères, images optimisées, dépendances maîtrisées.
- Le produit est **en phase de conception** : aucun utilisateur, aucun établissement partenaire, aucun revenu, aucune levée. Le site assume ce stade et invite à rejoindre une communauté pilote.
- Établissements cités dans les données de démonstration : noms réels d'établissements publics (Université Omar Bongo, USTM Franceville, Université de Douala, Université de Yaoundé I, Université Marien Ngouabi…) utilisés comme lieux, jamais comme partenaires.

## Capabilities and Constraints

**Périmètre livré (frontend uniquement) :**
- Site public : hero avec composition produit animée (recherche → profil → demande), problème, fonctionnement en trois étapes, mise en relation (cas transfrontalier Gabon ↔ Cameroun), fonctionnalités, dimension panafricaine, confiance et communauté, appel à l'action, pied de page, page Partenaires / Investisseurs avec formulaire de contact fonctionnel côté frontend.
- Application (navigation propre, distincte du site) : Accueil, Trouver un étudiant (recherche par mots-clés, filière, matière, chapitre, niveau, pays, établissement, disponibilité ; tri et filtres sans rechargement), Résultats et profils, Demande d'aide (matière, chapitre, nature du blocage, message, pièce jointe facultative ; états envoyée / en attente / acceptée / refusée / expirée), Messages, Groupes d'étude, Notifications, Mon profil (consultation et modification).
- Comportements : navigation, recherche et filtres sur données de démonstration, formulaires validés, envoi simulé, conversations de démonstration, états de chargement, vides et d'erreur, notifications locales, modales et menus, persistance de session en stockage local.
- Entrée dans l'application (décidé le 9 oct. 2026) : « Rejoindre CAMPUUS » ouvre un formulaire d'inscription pilote (validation frontend, enregistrement local) ; « Voir la démo » ouvre l'application avec un profil fictif pré-connecté et un bandeau « Démonstration » visible. Pas d'écran de connexion factice.

**Hors périmètre, à ne jamais simuler comme réel :** backend, moteur de recherche réel, authentification serveur, messagerie temps réel, paiements, algorithme de recommandation, vérification d'identité, modération opérationnelle.

**Terminologie :** « demande d'aide » (pas « ticket »), « disponible » / « disponible ce soir » / « indisponible », « groupe d'étude », « chapitre », « filière », « niveau » (L1…M2), « établissement ».

**Interdits du brief :** statistiques inventées, témoignages, écoles partenaires, nombre d'utilisateurs, revenus, croissance, levées, indicateurs d'engagement, scores ou certifications présentés comme réels, promesse de vérification ou de protection non implémentée. Tout mécanisme de confiance est présenté comme « envisagé ».

## Brand Commitments

- Nom : **CAMPUUS** (disponibilité juridique non vérifiée : ne pas l'affirmer).
- Palette officielle, non négociable, trois couleurs : **Night Bordeaux** #5B0015 (identité, titres sélectionnés, boutons principaux, navigation, signatures), **Cool Horizon** #80AEE8 (interactions secondaires, progression, disponibilité, liens, surfaces d'information), **Ivory Mist** #F7F2E0 (fonds principaux, lecture, respiration). Nuances dérivées autorisées pour lisibilité, bordures, états désactivés, contrastes ; pas de quatrième couleur dominante ; couleurs fonctionnelles discrètes pour succès / erreur / avertissement.
- Typographie : **Plus Jakarta Sans** (titres), **Inter** (interface et textes), chargées de façon performante avec repli.
- Logo à créer : symbole géométrique original (connexion, échange, convergence, campus ouvert, transmission), référence abstraite au C possible ; livrables : symbole, logotype, horizontal, compact, icône d'app, monochrome, fond clair et foncé, règles de protection et taille minimale, SVG propres.
- Interdits visuels : dégradés multicolores, violet et cyan « signature IA », verre translucide partout, ombres excessives, cartes arrondies répétées sans hiérarchie, surcharge, bordeaux en fond de tous les écrans, template SaaS interchangeable, symboles éducatifs génériques (livre + toque + ampoule + réseau de points), carte d'Afrique décorative, clichés panafricains, particules, sphères, 3D décorative, curseurs personnalisés, scroll-jacking, intro longue.
- Ton : contemporain, humain, précis, professionnel. Messages pinnés : hero « Bloqué sur un cours ? Trouve quelqu'un qui peut t'aider. » + « CAMPUUS connecte les étudiants d'Afrique francophone pour apprendre ensemble, échanger leurs connaissances et progresser sans frontières. » ; CTA « Rejoindre CAMPUUS » / « Découvrir comment ça marche » ; clôture « Le prochain étudiant qui peut t'aider est peut-être à quelques clics. »
- Crédit studio (décidé le 9 oct. 2026) : mention discrète « conçu par MÉTHODE AURA » en pied de page ; commits signés MÉTHODE AURA, sans attribution d'IA.

## Evidence on Hand

- Brief maître du client (collé dans la conversation le 9 oct. 2026), repris ici.
- Aucun logo, aucune photo, aucune donnée réelle, aucun utilisateur, aucun partenaire, aucun chiffre. Tout contenu de démonstration (étudiants, établissements comme lieux, chapitres, conversations, groupes) est fictif, authoré à pleine fidélité et signalé comme tel dans l'application.

## Product Principles

1. **Le chapitre d'abord.** Toute recherche part d'un blocage précis ; l'interface montre le chapitre avant la personne.
2. **La disponibilité est une information de premier rang.** On montre qui peut aider maintenant, pas seulement qui sait.
3. **Honnêteté de stade.** Phase de conception assumée ; aucune preuve inventée ; les mécanismes non implémentés sont dits « envisagés ».
4. **Le téléphone est l'écran principal.** Chaque écran est conçu d'abord à 390 px, léger, utilisable d'une main.
5. **Prêt pour le réel.** Données, services et composants séparés pour brancher une API sans réécrire l'interface.

## Accessibility & Inclusion

Contrastes vérifiés (Cool Horizon jamais en petit texte sur Ivory Mist), focus visibles, formulaires utilisables au clavier, labels accessibles, erreurs compréhensibles, zones tactiles ≥ 44 px, prefers-reduced-motion respecté avec version réduite des animations, écrans étroits pris en charge, médias légers.
