/*
 * Données de démonstration CAMPUUS. Tout est fictif : les étudiants, leurs propos, les groupes, les conversations.
 * Les établissements sont des lieux réels utilisés comme décor, jamais des partenaires.
 */
import type { Chapter, Conversation, Country, HelpRequest, Institution, Notification, Resource, Student, StudyGroup, Subject } from "./types";

export const COUNTRIES: Country[] = [
  { code: "GA", name: "Gabon", city: "Libreville" },
  { code: "CM", name: "Cameroun", city: "Douala" },
  { code: "CG", name: "Congo", city: "Brazzaville" },
  { code: "CD", name: "RD Congo", city: "Kinshasa" },
  { code: "TD", name: "Tchad", city: "N'Djamena" },
  { code: "SN", name: "Sénégal", city: "Dakar" },
  { code: "CI", name: "Côte d'Ivoire", city: "Abidjan" },
  { code: "BJ", name: "Bénin", city: "Cotonou" },
];
export const countryName = (code: string) => COUNTRIES.find((c) => c.code === code)?.name ?? code;

export const INSTITUTIONS: Institution[] = [
  { id: "uob", name: "Université Omar Bongo", short: "UOB", city: "Libreville", country: "GA" },
  { id: "ustm", name: "Université des Sciences et Techniques de Masuku", short: "USTM", city: "Franceville", country: "GA" },
  { id: "inseg", name: "Institut national des sciences de gestion", short: "INSG", city: "Libreville", country: "GA" },
  { id: "ept", name: "École polytechnique de Masuku", short: "EPM", city: "Franceville", country: "GA" },
  { id: "udla", name: "Université de Douala", short: "UDla", city: "Douala", country: "CM" },
  { id: "uy1", name: "Université de Yaoundé I", short: "UY1", city: "Yaoundé", country: "CM" },
  { id: "umng", name: "Université Marien Ngouabi", short: "UMNG", city: "Brazzaville", country: "CG" },
  { id: "unikin", name: "Université de Kinshasa", short: "UNIKIN", city: "Kinshasa", country: "CD" },
  { id: "ucad", name: "Université Cheikh Anta Diop", short: "UCAD", city: "Dakar", country: "SN" },
  { id: "ufhb", name: "Université Félix Houphouët-Boigny", short: "UFHB", city: "Abidjan", country: "CI" },
];
export const institution = (id: string) => INSTITUTIONS.find((i) => i.id === id)!;

export const FIELDS = ["Finance", "Économie", "Gestion", "Droit", "Informatique", "Mathématiques", "Génie civil", "Médecine", "Chimie", "Lettres"];

export const SUBJECTS: Subject[] = [
  { id: "mathfi", name: "Mathématiques financières", field: "Finance" },
  { id: "compta", name: "Comptabilité générale", field: "Gestion" },
  { id: "micro", name: "Microéconomie", field: "Économie" },
  { id: "stats", name: "Statistiques", field: "Mathématiques" },
  { id: "algo", name: "Algorithmique", field: "Informatique" },
  { id: "bdd", name: "Bases de données", field: "Informatique" },
  { id: "droitobl", name: "Droit des obligations", field: "Droit" },
  { id: "rdm", name: "Résistance des matériaux", field: "Génie civil" },
  { id: "anat", name: "Anatomie", field: "Médecine" },
  { id: "chimorg", name: "Chimie organique", field: "Chimie" },
  { id: "analyse", name: "Analyse", field: "Mathématiques" },
  { id: "macro", name: "Macroéconomie", field: "Économie" },
];
export const subject = (id: string) => SUBJECTS.find((s) => s.id === id)!;

export const CHAPTERS: Chapter[] = [
  { id: "van", subjectId: "mathfi", name: "Actualisation et valeur actuelle nette" },
  { id: "annuites", subjectId: "mathfi", name: "Annuités et emprunts indivis" },
  { id: "tri", subjectId: "mathfi", name: "Taux de rendement interne" },
  { id: "bilan", subjectId: "compta", name: "Bilan et compte de résultat" },
  { id: "amort", subjectId: "compta", name: "Amortissements et provisions" },
  { id: "elasticite", subjectId: "micro", name: "Élasticités et équilibre du consommateur" },
  { id: "marche", subjectId: "micro", name: "Équilibre de marché et surplus" },
  { id: "regression", subjectId: "stats", name: "Régression linéaire simple" },
  { id: "tests", subjectId: "stats", name: "Tests d'hypothèses" },
  { id: "recursivite", subjectId: "algo", name: "Récursivité" },
  { id: "tri-algo", subjectId: "algo", name: "Algorithmes de tri" },
  { id: "sql", subjectId: "bdd", name: "Requêtes SQL et jointures" },
  { id: "normalisation", subjectId: "bdd", name: "Normalisation des schémas" },
  { id: "contrat", subjectId: "droitobl", name: "Formation du contrat" },
  { id: "responsabilite", subjectId: "droitobl", name: "Responsabilité civile" },
  { id: "flexion", subjectId: "rdm", name: "Flexion des poutres" },
  { id: "torsion", subjectId: "rdm", name: "Torsion et cisaillement" },
  { id: "osteo", subjectId: "anat", name: "Ostéologie du membre supérieur" },
  { id: "alcanes", subjectId: "chimorg", name: "Alcanes et alcènes" },
  { id: "suites", subjectId: "analyse", name: "Suites et séries numériques" },
  { id: "is-lm", subjectId: "macro", name: "Modèle IS-LM" },
];
export const chapter = (id: string) => CHAPTERS.find((c) => c.id === id)!;

/** L'étudiant connecté dans la démo. */
export const ME_ID = "me";

export const STUDENTS: Student[] = [
  {
    id: ME_ID, pseudo: "Kevin M.", name: "Kevin Moussavou", showName: true, showInstitution: true, initials: "KM", hue: "bordeaux",
    country: "GA", institutionId: "inseg", field: "Finance", level: "L3",
    bio: "Troisième année de finance à l'INSG. À l'aise en comptabilité, je bloque sur les maths financières depuis la rentrée.",
    masters: ["bilan", "amort"], follows: ["mathfi", "compta", "micro", "stats"], availability: "tonight",
    slots: [{ day: 0, hour: 18 }, { day: 1, hour: 18 }, { day: 3, hour: 19 }, { day: 5, hour: 10 }], languages: ["Français", "Anglais"], helped: 3, joined: "2026-09-02",
  },
  {
    id: "aicha", pseudo: "Aïcha N.", name: "Aïcha Nguema", showName: true, showInstitution: true, initials: "AN", hue: "horizon",
    country: "GA", institutionId: "ustm", field: "Finance", level: "M1",
    bio: "Master 1 à l'USTM. J'ai eu 17 en maths financières l'an dernier, j'explique volontiers l'actualisation avec des exemples concrets.",
    masters: ["van", "annuites", "tri", "regression"], follows: ["mathfi", "stats", "macro"], availability: "tonight",
    slots: [{ day: 1, hour: 19 }, { day: 3, hour: 19 }, { day: 3, hour: 20 }, { day: 5, hour: 9 }], languages: ["Français"], helped: 14, joined: "2026-08-20",
  },
  {
    id: "loic", pseudo: "Loïc O.", name: "Loïc Obame", showName: false, showInstitution: true, initials: "LO", hue: "mix",
    country: "GA", institutionId: "uob", field: "Économie", level: "L3",
    bio: "Économie à l'UOB. Je révise souvent à la bibliothèque le week-end, la VAN et les élasticités n'ont plus de secret.",
    masters: ["van", "elasticite", "marche"], follows: ["micro", "macro", "mathfi"], availability: "now",
    slots: [{ day: 0, hour: 17 }, { day: 2, hour: 14 }, { day: 3, hour: 17 }, { day: 5, hour: 10 }, { day: 5, hour: 11 }], languages: ["Français", "Fang"], helped: 9, joined: "2026-09-10",
  },
  {
    id: "nadege", pseudo: "Nadège K.", name: "Nadège Kamga", showName: true, showInstitution: true, initials: "NK", hue: "horizon",
    country: "CM", institutionId: "udla", field: "Finance", level: "M2",
    bio: "Master 2 finance à Douala. J'anime un groupe de révision en maths financières depuis deux ans.",
    masters: ["van", "annuites", "tri", "is-lm"], follows: ["mathfi", "macro"], availability: "tonight",
    slots: [{ day: 1, hour: 20 }, { day: 3, hour: 19 }, { day: 4, hour: 18 }, { day: 5, hour: 15 }], languages: ["Français", "Anglais"], helped: 22, joined: "2026-08-15",
  },
  {
    id: "samuel", pseudo: "Samuel E.", name: "Samuel Essono", showName: true, showInstitution: true, initials: "SE", hue: "bordeaux",
    country: "GA", institutionId: "ept", field: "Génie civil", level: "M1",
    bio: "Polytech Masuku. Résistance des matériaux et analyse : je préfère expliquer au tableau, en visio ou en salle.",
    masters: ["flexion", "torsion", "suites"], follows: ["rdm", "analyse"], availability: "weekend",
    slots: [{ day: 5, hour: 9 }, { day: 5, hour: 10 }, { day: 5, hour: 14 }], languages: ["Français"], helped: 6, joined: "2026-09-04",
  },
  {
    id: "fatou", pseudo: "Fatou D.", name: "Fatou Diallo", showName: true, showInstitution: false, initials: "FD", hue: "mix",
    country: "SN", institutionId: "ucad", field: "Informatique", level: "L3",
    bio: "Licence informatique à Dakar. Récursivité, tris, SQL : j'aime trouver l'exemple qui fait comprendre.",
    masters: ["recursivite", "tri-algo", "sql", "normalisation"], follows: ["algo", "bdd", "stats"], availability: "now",
    slots: [{ day: 0, hour: 20 }, { day: 2, hour: 19 }, { day: 2, hour: 20 }, { day: 4, hour: 19 }], languages: ["Français", "Wolof", "Anglais"], helped: 31, joined: "2026-08-12",
  },
  {
    id: "christian", pseudo: "Christian B.", name: "Christian Bouanga", showName: true, showInstitution: true, initials: "CB", hue: "horizon",
    country: "CG", institutionId: "umng", field: "Droit", level: "M1",
    bio: "Droit privé à Marien Ngouabi. Formation du contrat, responsabilité : je relis vos fiches et je corrige la méthode.",
    masters: ["contrat", "responsabilite"], follows: ["droitobl"], availability: "tonight",
    slots: [{ day: 1, hour: 19 }, { day: 2, hour: 19 }, { day: 4, hour: 20 }], languages: ["Français", "Lingala"], helped: 11, joined: "2026-09-01",
  },
  {
    id: "grace", pseudo: "Grâce M.", name: "Grâce Mbatchi", showName: false, showInstitution: true, initials: "GM", hue: "bordeaux",
    country: "GA", institutionId: "uob", field: "Médecine", level: "L2",
    bio: "Deuxième année de médecine. Anatomie et chimie organique, en échange d'un coup de main en statistiques.",
    masters: ["osteo", "alcanes"], follows: ["anat", "chimorg", "stats"], availability: "off",
    slots: [{ day: 5, hour: 16 }], languages: ["Français"], helped: 4, joined: "2026-09-18",
  },
  {
    id: "junior", pseudo: "Junior T.", name: "Junior Tchoumi", showName: true, showInstitution: true, initials: "JT", hue: "mix",
    country: "CM", institutionId: "uy1", field: "Mathématiques", level: "M2",
    bio: "Master de maths à Yaoundé. Analyse, statistiques, régression : je donne des cours particuliers depuis trois ans.",
    masters: ["suites", "regression", "tests", "van"], follows: ["analyse", "stats"], availability: "now",
    slots: [{ day: 0, hour: 19 }, { day: 1, hour: 19 }, { day: 2, hour: 19 }, { day: 3, hour: 19 }, { day: 4, hour: 19 }], languages: ["Français", "Anglais"], helped: 40, joined: "2026-08-10",
  },
  {
    id: "marie", pseudo: "Marie-Claire O.", name: "Marie-Claire Ondo", showName: true, showInstitution: true, initials: "MO", hue: "horizon",
    country: "GA", institutionId: "inseg", field: "Gestion", level: "L3",
    bio: "Gestion à l'INSG, même promo que beaucoup d'entre vous. Comptabilité et amortissements, le soir après 18 h.",
    masters: ["bilan", "amort"], follows: ["compta", "mathfi"], availability: "tonight",
    slots: [{ day: 0, hour: 18 }, { day: 2, hour: 18 }, { day: 3, hour: 18 }], languages: ["Français"], helped: 7, joined: "2026-09-12",
  },
  {
    id: "patrick", pseudo: "Patrick L.", name: "Patrick Lumumba", showName: false, showInstitution: true, initials: "PL", hue: "bordeaux",
    country: "CD", institutionId: "unikin", field: "Économie", level: "M1",
    bio: "Économie à Kinshasa. IS-LM, macro, et je cherche quelqu'un pour les bases de données.",
    masters: ["is-lm", "marche"], follows: ["macro", "bdd"], availability: "weekend",
    slots: [{ day: 5, hour: 10 }, { day: 5, hour: 11 }, { day: 5, hour: 15 }], languages: ["Français", "Lingala"], helped: 5, joined: "2026-09-20",
  },
  {
    id: "awa", pseudo: "Awa C.", name: "Awa Coulibaly", showName: true, showInstitution: true, initials: "AC", hue: "mix",
    country: "CI", institutionId: "ufhb", field: "Chimie", level: "L3",
    bio: "Chimie à Abidjan. Alcanes, alcènes, mécanismes réactionnels : je dessine tout, ça aide.",
    masters: ["alcanes"], follows: ["chimorg", "analyse"], availability: "tonight",
    slots: [{ day: 1, hour: 18 }, { day: 3, hour: 18 }, { day: 4, hour: 18 }], languages: ["Français", "Dioula"], helped: 8, joined: "2026-09-08",
  },
  {
    id: "yannick", pseudo: "Yannick N.", name: "Yannick Ndong", showName: true, showInstitution: true, initials: "YN", hue: "horizon",
    country: "GA", institutionId: "ustm", field: "Informatique", level: "L2",
    bio: "Informatique à l'USTM. Je bloque sur les jointures SQL mais je peux aider en algorithmique de L1.",
    masters: ["recursivite"], follows: ["algo", "bdd", "analyse"], availability: "now",
    slots: [{ day: 0, hour: 16 }, { day: 2, hour: 16 }, { day: 4, hour: 16 }], languages: ["Français"], helped: 2, joined: "2026-09-25",
  },
];
export const student = (id: string) => STUDENTS.find((s) => s.id === id)!;

export const REQUESTS: HelpRequest[] = [
  { id: "r1", fromId: ME_ID, toId: "nadege", subjectId: "mathfi", chapterId: "annuites", kind: "exercice", message: "Je n'arrive pas à construire le tableau d'amortissement de l'exercice 4 (emprunt indivis, annuités constantes).", status: "acceptee", createdAt: "2026-10-06T19:10:00", slot: { day: 1, hour: 20 } },
  { id: "r2", fromId: ME_ID, toId: "loic", subjectId: "micro", chapterId: "elasticite", kind: "comprendre", message: "Je confonds élasticité-prix et élasticité croisée, un exemple concret m'aiderait.", status: "en_attente", createdAt: "2026-10-08T21:40:00" },
  { id: "r3", fromId: "marie", toId: ME_ID, subjectId: "compta", chapterId: "amort", kind: "revision", message: "Tu pourrais me réexpliquer l'amortissement dégressif avant le partiel de jeudi ?", status: "envoyee", createdAt: "2026-10-09T08:15:00" },
  { id: "r4", fromId: ME_ID, toId: "junior", subjectId: "stats", chapterId: "regression", kind: "methode", message: "Comment interpréter le coefficient de détermination dans un rapport ?", status: "expiree", createdAt: "2026-09-28T18:00:00" },
  { id: "r5", fromId: "yannick", toId: ME_ID, subjectId: "compta", chapterId: "bilan", kind: "comprendre", message: "Je ne comprends pas pourquoi le bilan doit être équilibré.", status: "refusee", createdAt: "2026-10-02T12:00:00" },
];

export const CONVERSATIONS: Conversation[] = [
  {
    id: "c-nadege", participantIds: [ME_ID, "nadege"], messages: [
      { id: "m1", fromId: "nadege", text: "Salut Kevin, j'ai vu ta demande sur les annuités. Mardi 20 h ça te va ?", at: "2026-10-06T19:32:00", status: "lu" },
      { id: "m2", fromId: ME_ID, text: "Parfait, merci ! J'ai l'énoncé de l'exercice 4, je te l'envoie.", at: "2026-10-06T19:35:00", status: "lu" },
      { id: "m3", fromId: ME_ID, text: "Exercice-4-emprunt.pdf", at: "2026-10-06T19:36:00", status: "lu", attachment: "Exercice-4-emprunt.pdf · 212 ko" },
      { id: "m4", fromId: "nadege", text: "Reçu. Commence par poser l'annuité constante a = C × i / (1 − (1+i)^−n), on construira le tableau ligne par ligne mardi.", at: "2026-10-06T20:02:00", status: "lu" },
      { id: "m5", fromId: "nadege", text: "Je suis en ligne ce soir si tu veux déjà vérifier ta première ligne.", at: "2026-10-09T18:05:00", status: "recu" },
    ],
  },
  {
    id: "c-marie", participantIds: [ME_ID, "marie"], messages: [
      { id: "m6", fromId: "marie", text: "Kevin, tu es dispo avant jeudi pour l'amortissement dégressif ?", at: "2026-10-09T08:16:00", status: "recu" },
    ],
  },
  {
    id: "c-fatou", participantIds: [ME_ID, "fatou"], messages: [
      { id: "m7", fromId: ME_ID, text: "Bonjour Fatou, je t'ai trouvée via le groupe SQL. Est-ce que tu expliques aussi les jointures externes ?", at: "2026-10-03T21:10:00", status: "lu" },
      { id: "m8", fromId: "fatou", text: "Oui ! Le plus simple : dessine les deux tables côte à côte, on fait ça mercredi 19 h si tu veux.", at: "2026-10-03T21:40:00", status: "lu" },
    ],
  },
];

export const GROUPS: StudyGroup[] = [
  { id: "g1", name: "Maths fi avant le partiel", subjectId: "mathfi", field: "Finance", goal: "Partiel du 23 octobre", description: "Un exercice par soir sur l'actualisation, les annuités et le TRI. Correction en commun le lendemain.", memberIds: ["aicha", "nadege", "loic", ME_ID, "marie"], lastActivity: "2026-10-09T18:20:00", institutionIds: ["ustm", "udla", "uob", "inseg"], activity: [{ by: "aicha", text: "a partagé Fiche-actualisation.pdf", at: "2026-10-09T18:20:00" }, { by: "nadege", text: "a proposé l'exercice du soir : VAN d'un projet à 3 flux", at: "2026-10-08T20:05:00" }] },
  { id: "g2", name: "SQL sans douleur", subjectId: "bdd", field: "Informatique", goal: "Comprendre les jointures", description: "Pour celles et ceux qui bloquent sur les jointures et la normalisation. Schémas dessinés, requêtes testées ensemble.", memberIds: ["fatou", "yannick", "patrick"], lastActivity: "2026-10-08T19:50:00", institutionIds: ["ucad", "ustm", "unikin"], activity: [{ by: "fatou", text: "a répondu à Yannick sur LEFT JOIN vs INNER JOIN", at: "2026-10-08T19:50:00" }] },
  { id: "g3", name: "Binômes de révision L3 économie", subjectId: "micro", field: "Économie", goal: "Trouver un binôme", description: "Microéconomie et macroéconomie de L3 : on se trouve un binôme par chapitre et on s'interroge mutuellement.", memberIds: ["loic", "patrick"], lastActivity: "2026-10-07T17:30:00", institutionIds: ["uob", "unikin"], activity: [{ by: "loic", text: "cherche un binôme pour IS-LM", at: "2026-10-07T17:30:00" }] },
  { id: "g4", name: "RDM Masuku", subjectId: "rdm", field: "Génie civil", goal: "Séances du samedi", description: "Résistance des matériaux, le samedi matin à la bibliothèque de Masuku ou en visio.", memberIds: ["samuel"], lastActivity: "2026-10-04T10:00:00", institutionIds: ["ept"], activity: [{ by: "samuel", text: "a créé le groupe", at: "2026-10-04T10:00:00" }] },
  { id: "g5", name: "Méthodo droit des obligations", subjectId: "droitobl", field: "Droit", goal: "Cas pratiques", description: "Un cas pratique par semaine, corrigé à plusieurs. Ouvert à tous les niveaux.", memberIds: ["christian"], lastActivity: "2026-10-05T20:15:00", institutionIds: ["umng"], activity: [{ by: "christian", text: "a publié le cas pratique de la semaine", at: "2026-10-05T20:15:00" }] },
];

export const NOTIFICATIONS: Notification[] = [
  { id: "n1", kind: "message", text: "Nadège K. t'a écrit : « Je suis en ligne ce soir si tu veux déjà vérifier ta première ligne. »", at: "2026-10-09T18:05:00", read: false, to: "/app/messages/c-nadege" },
  { id: "n2", kind: "demande", text: "Marie-Claire O. te demande de l'aide sur « Amortissements et provisions ».", at: "2026-10-09T08:15:00", read: false, to: "/app/demandes" },
  { id: "n3", kind: "groupe", text: "Aïcha N. a partagé une fiche dans « Maths fi avant le partiel ».", at: "2026-10-09T18:20:00", read: false, to: "/app/groupes/g1" },
  { id: "n4", kind: "disponibilite", text: "Loïc O. est disponible maintenant pour « Élasticités et équilibre du consommateur ».", at: "2026-10-09T17:50:00", read: true, to: "/app/etudiants/loic" },
  { id: "n5", kind: "demande", text: "Nadège K. a accepté ta demande sur « Annuités et emprunts indivis ». Rendez-vous mardi 20 h.", at: "2026-10-06T19:30:00", read: true, to: "/app/demandes" },
  { id: "n6", kind: "systeme", text: "Ta demande à Junior T. sur « Régression linéaire simple » a expiré sans réponse. Tu peux la renvoyer ou chercher quelqu'un d'autre.", at: "2026-10-01T18:00:00", read: true, to: "/app/demandes" },
];

export const RESOURCES: Resource[] = [
  { id: "res1", title: "Fiche-actualisation.pdf", type: "pdf", byId: "aicha", subjectId: "mathfi", chapterId: "van", at: "2026-10-09T18:20:00" },
  { id: "res2", title: "Tableau d'amortissement : modèle de calcul", type: "notes", byId: "nadege", subjectId: "mathfi", chapterId: "annuites", at: "2026-10-07T21:00:00" },
  { id: "res3", title: "Jointures SQL expliquées avec deux tables", type: "lien", byId: "fatou", subjectId: "bdd", chapterId: "sql", at: "2026-10-08T19:55:00" },
  { id: "res4", title: "Cas pratique n° 6 : formation du contrat", type: "pdf", byId: "christian", subjectId: "droitobl", chapterId: "contrat", at: "2026-10-05T20:15:00" },
];

export const DAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
export const DAYS_LONG = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
export const HOURS = Array.from({ length: 13 }, (_, i) => 8 + i); // 8 h → 20 h

export const AVAILABILITY_LABEL: Record<Student["availability"], string> = { now: "Disponible maintenant", tonight: "Disponible ce soir", weekend: "Disponible ce week-end", off: "Indisponible cette semaine" };
export const REQUEST_STATUS_LABEL: Record<HelpRequest["status"], string> = { envoyee: "Envoyée", en_attente: "En attente", acceptee: "Acceptée", refusee: "Refusée", expiree: "Expirée" };
export const REQUEST_KIND_LABEL: Record<HelpRequest["kind"], string> = { comprendre: "Je ne comprends pas le cours", exercice: "Je bloque sur un exercice", revision: "Je révise avant un examen", methode: "Je cherche la bonne méthode" };
