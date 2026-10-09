/* Textes du site public CAMPUUS (français). Les textes de l'application sont dans les écrans, près de leur logique. */

export const nav = {
  links: [
    { href: "/#fonctionnement", label: "Comment ça marche" },
    { href: "/#fonctionnalites", label: "Fonctionnalités" },
    { href: "/#confiance", label: "Confiance" },
    { href: "/partenaires", label: "Partenaires" },
  ],
  demo: "Voir la démo",
  join: "Rejoindre CAMPUUS",
};

export const hero = {
  title: ["Bloqué sur un cours ?", "Trouve quelqu'un qui peut t'aider."],
  lead: "CAMPUUS connecte les étudiants d'Afrique francophone pour apprendre ensemble, échanger leurs connaissances et progresser sans frontières.",
  search: "Actualisation et VAN",
  searchPlaceholder: "Une matière, un chapitre…",
  cta: "Rejoindre CAMPUUS",
  secondary: "Découvrir comment ça marche",
  demo: "Voir la démo",
  demoNote: "profil fictif, données de démonstration",
  legend: { course: "Tes cours", free: "Étudiants disponibles pour ce chapitre", sheet: "Ta demande d'aide" },
};

export const problem = {
  title: "La veille d'un partiel, la bonne personne existe. Tu ne sais pas qui c'est.",
  lead: "Un étudiant en finance bloque sur un chapitre de mathématiques financières. Quelqu'un, dans sa promo ou dans une autre université, l'a compris il y a trois mois. Entre les deux : rien.",
  points: [
    { title: "L'information est dispersée", text: "Les réponses utiles sont enfouies dans des conversations de groupe, entre deux messages sans rapport." },
    { title: "Personne ne sait qui est compétent", text: "On connaît les noms, pas les chapitres que chacun maîtrise vraiment." },
    { title: "Les autres établissements sont hors de portée", text: "L'étudiant qui pourrait expliquer étudie à Franceville, à Douala ou à Dakar, et personne ne le connaît." },
    { title: "L'aide n'arrive pas au bon moment", text: "Quand on bloque, c'est le soir ou le week-end. Il faut savoir qui est libre, maintenant." },
  ],
  chat: {
    name: "L3 Finance · groupe de promo",
    messages: [
      { from: "Lionel", text: "Qqn a le planning des TD de demain ?", at: "20:41" },
      { from: "Sandra", text: "Il est dans le groupe de l'année dernière je crois", at: "20:43" },
      { from: "Kevin", text: "Quelqu'un a compris le chapitre 4 (actualisation, VAN) ? Je suis perdu", at: "20:52", me: true },
      { from: "Lionel", text: "Pas moi 😅", at: "20:53" },
      { from: "Bénédicte", text: "Le prof a dit que le partiel c'est jeudi ou vendredi ?", at: "21:10" },
      { from: "Sandra", text: "jeudi", at: "21:11" },
      { from: "Franck", text: "Qui vient au match demain ?", at: "21:30" },
    ],
    note: "Sans réponse",
    caption: "Conversation fictive, données de démonstration",
  },
};

export const how = {
  title: "Trois gestes, et quelqu'un t'explique.",
  steps: [
    { title: "Recherche une matière ou un chapitre", text: "Tape le nom du chapitre qui bloque. Pas la matière entière : le chapitre.", screen: "search" },
    { title: "Découvre les étudiants pertinents et disponibles", text: "Dans ton établissement ou ailleurs, triés par pertinence et par disponibilité réelle.", screen: "results" },
    { title: "Demande de l'aide et commence à échanger", text: "Une demande claire, un créneau, une conversation. L'autre accepte, refuse ou propose un autre moment.", screen: "request" },
  ],
};

export const match = {
  title: "La mise en relation se lit dans les créneaux.",
  lead: "CAMPUUS rapproche les étudiants selon la matière, le chapitre, la filière, le niveau, l'établissement, le pays et les disponibilités. Le résultat n'est pas un pourcentage : c'est un créneau où vous êtes libres tous les deux.",
  criteria: ["Matière et chapitre", "Filière et niveau", "Établissement et pays", "Disponibilité", "Langues et affinités"],
  left: { title: "Kevin · Libreville", sub: "INSG · L3 Finance · bloque sur l'actualisation" },
  right: { title: "Nadège · Douala", sub: "Université de Douala · M2 Finance · explique l'actualisation" },
  common: { title: "Créneaux communs", sub: "Jeudi 19 h et samedi 15 h · même fuseau horaire" },
  note: "Cas transfrontalier Gabon ↔ Cameroun, données de démonstration. CAMPUUS est en phase pilote : le réseau se construit, établissement par établissement.",
};

export const features = {
  title: "Ce que tu trouves dans CAMPUUS.",
  items: [
    { id: "search", title: "Recherche académique", text: "Par mots-clés, filière, matière, chapitre, niveau, pays, établissement et disponibilité. Les résultats se filtrent et se trient sans rechargement." },
    { id: "profiles", title: "Profils étudiants", text: "Pseudonyme ou nom, filière, niveau, chapitres maîtrisés, langues. Chacun choisit ce qu'il affiche." },
    { id: "availability", title: "Statut de disponibilité", text: "Maintenant, ce soir, ce week-end ou indisponible. Et les créneaux libres de la semaine." },
    { id: "requests", title: "Demandes d'aide", text: "Matière, chapitre, nature du blocage, message, pièce jointe. Puis un état clair : envoyée, en attente, acceptée, refusée, expirée." },
    { id: "messages", title: "Messagerie", text: "Une conversation par mise en relation, avec l'historique, les pièces jointes, l'état d'envoi et les actions de signalement." },
    { id: "groups", title: "Groupes d'étude", text: "Par matière, filière ou objectif de révision : membres, description, dernières activités, un bouton pour rejoindre." },
    { id: "resources", title: "Partage de ressources", text: "Fiches, exercices corrigés, liens utiles, rattachés à un chapitre et partagés dans un groupe." },
    { id: "discover", title: "Découverte au-delà de ton établissement", text: "Des étudiants d'autres universités, d'autres villes et d'autres pays francophones, dans la même filière ou dans une filière complémentaire." },
  ],
};

export const panafrican = {
  title: "Mêmes soirées, mêmes révisions, d'une capitale à l'autre.",
  lead: "De Libreville à Douala, de Brazzaville à Kinshasa, les étudiants révisent aux mêmes heures. CAMPUUS commence au Gabon et s'ouvre, établissement par établissement, à l'Afrique centrale puis à l'Afrique francophone.",
  cities: [
    { name: "Libreville", country: "Gabon", offset: 0, pilot: true },
    { name: "Franceville", country: "Gabon", offset: 0, pilot: true },
    { name: "Douala", country: "Cameroun", offset: 0 },
    { name: "Yaoundé", country: "Cameroun", offset: 0 },
    { name: "Brazzaville", country: "Congo", offset: 0 },
    { name: "Kinshasa", country: "RD Congo", offset: 0 },
    { name: "N'Djamena", country: "Tchad", offset: 0 },
    { name: "Dakar", country: "Sénégal", offset: -1 },
    { name: "Abidjan", country: "Côte d'Ivoire", offset: -1 },
  ],
  legend: { pilot: "Phase pilote", next: "Ouverture envisagée", band: "Heures de révision partagées (19 h à 22 h, heure de Libreville)" },
  note: "Aucun réseau de cette taille n'existe encore : cette grille montre l'ambition, pas une communauté active.",
};

export const trust = {
  title: "Une communauté qui se protège.",
  lead: "CAMPUUS est en phase de conception. Voici ce que l'interface de démonstration contient déjà, et ce qui est envisagé pour le lancement.",
  items: [
    { title: "Profils étudiants", text: "Chacun choisit d'afficher son nom ou un pseudonyme, et s'il montre son établissement.", state: "demo" },
    { title: "Signalement et blocage", text: "Depuis toute conversation, signaler un comportement ou bloquer une personne.", state: "demo" },
    { title: "Règles de communauté", text: "Une charte courte : respect, entraide, pas de démarchage, pas de triche aux examens.", state: "envisage" },
    { title: "Contrôle des contenus", text: "Revue des signalements et retrait des contenus inappropriés par une équipe de modération.", state: "envisage" },
    { title: "Vérification du statut étudiant", text: "Rattachement à un établissement par adresse institutionnelle ou justificatif.", state: "envisage" },
  ],
  states: { demo: "Dans la démo", envisage: "Envisagé" },
  note: "Rien de ce qui est marqué « envisagé » n'est opérationnel aujourd'hui.",
};

export const final = {
  title: "Le prochain étudiant qui peut t'aider est peut-être à quelques clics.",
  text: "Rejoins la communauté pilote au Gabon. Tu seras parmi les premiers à chercher, à aider et à construire le réseau.",
  cta: "Rejoindre CAMPUUS",
  demo: "Ouvrir la démo",
};

export const footer = {
  about: "CAMPUUS est une plateforme d'entraide académique née au Gabon : trouver l'étudiant qui peut t'expliquer un chapitre précis, dans ton établissement ou dans un autre pays francophone.",
  columns: [
    { title: "Produit", links: [{ label: "Comment ça marche", href: "/#fonctionnement" }, { label: "Fonctionnalités", href: "/#fonctionnalites" }, { label: "Confiance et communauté", href: "/#confiance" }, { label: "Voir la démo", href: "/app" }] },
    { title: "CAMPUUS", links: [{ label: "Partenaires et investisseurs", href: "/partenaires" }, { label: "Rejoindre la communauté pilote", href: "/rejoindre" }] },
    { title: "Légal", links: [{ label: "Confidentialité", soon: true }, { label: "Conditions d'utilisation", soon: true }, { label: "Contact", soon: true }] },
    { title: "Réseaux", links: [{ label: "Instagram", soon: true }, { label: "LinkedIn", soon: true }, { label: "WhatsApp", soon: true }] },
  ],
  soon: "Bientôt",
  stage: "Phase de conception · Gabon, 2026",
  credit: "Conçu et réalisé par MÉTHODE AURA",
  partner: {
    label: "En partenariat avec",
    title: "MÉTHODE AURA, studio de marque et de produit.",
    text: "Identité CAMPUUS, site public et application de démonstration : conception et réalisation. Du concept à l’impact.",
  },
};

export const partners = {
  title: "Un réseau d'entraide académique qui commence au Gabon.",
  lead: "Cette page s'adresse aux établissements et aux partenaires qui veulent comprendre CAMPUUS avant son lancement : le problème, la solution, le parcours, l'ambition et la façon dont nous comptons avancer.",
  stage: "CAMPUUS est en phase de conception. Aucun chiffre d'usage, aucun partenariat signé et aucun revenu ne figure ici : il n'y en a pas encore.",
  sections: [
    { id: "vision", title: "Vision", text: "Chaque étudiant d'Afrique francophone doit pouvoir trouver, en quelques minutes, quelqu'un qui lui explique ce qu'il ne comprend pas. Pas un cours en ligne de plus : une personne, disponible, qui a compris le même chapitre dans la même langue." },
    { id: "probleme", title: "Le problème adressé", text: "L'entraide existe déjà, mais elle est invisible : enfermée dans des groupes de messagerie, limitée à la promo, dépendante du hasard. Les compétences d'un campus, et de tous les campus francophones, ne sont ni visibles ni accessibles au bon moment." },
    { id: "utilisateurs", title: "Les utilisateurs ciblés", text: "D'abord les étudiants de licence et de master au Gabon, majoritairement sur smartphone. Ensuite leurs établissements, qui gagnent un outil d'entraide entre promotions et entre campus. À terme, les étudiants d'Afrique centrale et francophone." },
    { id: "parcours", title: "Le parcours principal", text: "Rechercher un chapitre, découvrir les étudiants pertinents et disponibles, envoyer une demande d'aide, échanger. Autour : groupes d'étude, partage de ressources, découverte d'autres établissements." },
    { id: "positionnement", title: "Positionnement", text: "Ni réseau social généraliste, ni plateforme de cours. L'unité de recherche est le chapitre ; l'unité de réponse est un étudiant disponible. CAMPUUS rend visible ce que les campus savent déjà." },
  ],
  expansion: {
    title: "Ambition géographique et lancement progressif",
    steps: [
      { title: "Maintenant : un pilote au Gabon", text: "Libreville et Franceville, quelques établissements, une communauté restreinte pour apprendre vite.", state: "now" },
      { title: "Ensuite : l’Afrique centrale", text: "Cameroun, Congo, RD Congo, Tchad : mêmes horaires, mêmes programmes pour l'essentiel, même langue d'enseignement.", state: "next" },
      { title: "Plus tard : l’Afrique francophone", text: "Sénégal, Côte d'Ivoire, Bénin et au-delà, puis les autres marchés francophones pertinents.", state: "later" },
    ],
  },
  monetization: {
    title: "Pistes de monétisation envisagées",
    text: "Aucune n'est décidée. Elles sont présentées pour discussion.",
    items: [
      { title: "Gratuit pour les étudiants", text: "La recherche, les demandes d'aide et les groupes restent gratuits : c'est la condition du réseau." },
      { title: "Offres pour les établissements", text: "Espace de l'établissement, suivi de l'entraide entre promotions, outils pour les responsables pédagogiques." },
      { title: "Partenariats", text: "Organismes de bourses, éditeurs de ressources pédagogiques, opérateurs télécoms pour l'accès à moindre coût." },
      { title: "Services optionnels", text: "Mise en avant d'un profil, sessions encadrées, à étudier seulement si elles servent l'entraide." },
    ],
  },
  roadmap: {
    title: "Prochaines étapes produit",
    items: ["Terminer le frontend de démonstration (ce site et l'application)", "Brancher un backend réel : comptes, recherche, messagerie", "Ouvrir un pilote avec deux ou trois établissements au Gabon", "Mesurer ce qui compte : demandes envoyées, demandes acceptées, temps avant la première réponse", "Ajouter la version anglaise de l'interface"],
  },
  form: {
    title: "Parler avec nous",
    text: "Établissement, investisseur, partenaire potentiel : laissez-nous un message. Dans cette démonstration, le message est enregistré sur votre appareil uniquement.",
    org: "Organisation",
    name: "Votre nom",
    email: "Adresse e-mail",
    kind: "Vous êtes",
    kinds: [{ value: "etablissement", label: "Un établissement" }, { value: "investisseur", label: "Un investisseur" }, { value: "autre", label: "Autre partenaire" }],
    message: "Votre message",
    submit: "Envoyer le message",
    success: "Message enregistré. Dans la version finale, l'équipe CAMPUUS vous répondra par e-mail.",
  },
};

export const join = {
  title: "Rejoins la communauté pilote.",
  lead: "CAMPUUS ouvre d'abord au Gabon avec un petit groupe d'étudiants. Laisse-nous tes informations : tu seras prévenu à l'ouverture. Dans cette démonstration, le formulaire est enregistré sur ton appareil uniquement.",
  fields: { name: "Prénom ou pseudonyme", email: "Adresse e-mail", country: "Pays", institution: "Établissement", field: "Filière", level: "Niveau", role: "Tu veux…" },
  roles: [{ value: "aide", label: "Trouver de l'aide" }, { value: "aider", label: "Aider d'autres étudiants" }, { value: "les-deux", label: "Les deux" }],
  consent: "J'accepte d'être contacté à l'ouverture du pilote.",
  submit: "Rejoindre la liste pilote",
  success: { title: "Tu es sur la liste.", text: "Merci ! En attendant l'ouverture, tu peux explorer la démonstration avec un profil fictif.", cta: "Ouvrir la démo" },
};
