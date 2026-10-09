/* Modèle de données CAMPUUS. Toutes les données de démonstration (src/data/mock.ts) sont fictives. */

export type CountryCode = "GA" | "CM" | "CG" | "CD" | "TD" | "SN" | "CI" | "BJ";
export interface Country { code: CountryCode; name: string; city: string }

export interface Institution { id: string; name: string; short: string; city: string; country: CountryCode }

export type Level = "L1" | "L2" | "L3" | "M1" | "M2";
export const LEVELS: Level[] = ["L1", "L2", "L3", "M1", "M2"];

export interface Subject { id: string; name: string; field: string }
export interface Chapter { id: string; subjectId: string; name: string }

/** Disponibilité déclarée : maintenant, ce soir, ce week-end, indisponible. */
export type Availability = "now" | "tonight" | "weekend" | "off";
/** Créneau libre : jour 0 (lundi) → 5 (samedi), heure de début 8 → 20. */
export interface Slot { day: number; hour: number }

export interface Student {
  id: string;
  pseudo: string;
  name: string;
  /** L'étudiant choisit d'afficher son nom complet ou seulement son pseudonyme. */
  showName: boolean;
  /** L'établissement et le pays ne s'affichent que si l'étudiant l'accepte. */
  showInstitution: boolean;
  initials: string;
  /** Teinte de l'avatar : les deux encres de la marque, ou leur mélange. */
  hue: "bordeaux" | "horizon" | "mix";
  country: CountryCode;
  institutionId: string;
  field: string;
  level: Level;
  bio: string;
  /** Chapitres que l'étudiant se déclare capable d'expliquer. */
  masters: string[];
  /** Matières qu'il suit cette année. */
  follows: string[];
  availability: Availability;
  slots: Slot[];
  languages: string[];
  /** Données de démonstration : nombre d'aides données dans la démo, jamais un score. */
  helped: number;
  joined: string;
}

export type RequestKind = "comprendre" | "exercice" | "revision" | "methode";
export type RequestStatus = "envoyee" | "en_attente" | "acceptee" | "refusee" | "expiree";
export interface HelpRequest {
  id: string;
  fromId: string;
  toId: string;
  subjectId: string;
  chapterId: string;
  kind: RequestKind;
  message: string;
  attachment?: string;
  status: RequestStatus;
  createdAt: string;
  slot?: Slot;
}

export type MessageStatus = "envoi" | "envoye" | "recu" | "lu";
export interface Message { id: string; fromId: string; text: string; at: string; status: MessageStatus; attachment?: string }
export interface Conversation { id: string; participantIds: string[]; messages: Message[]; blocked?: boolean; reported?: boolean }

export interface StudyGroup {
  id: string;
  name: string;
  subjectId?: string;
  field: string;
  goal: string;
  description: string;
  memberIds: string[];
  lastActivity: string;
  activity: { by: string; text: string; at: string }[];
  institutionIds: string[];
}

export type NotificationKind = "demande" | "message" | "groupe" | "disponibilite" | "systeme";
export interface Notification { id: string; kind: NotificationKind; text: string; at: string; read: boolean; to: string }

export interface Resource { id: string; title: string; type: "pdf" | "lien" | "notes"; byId: string; subjectId: string; chapterId?: string; at: string }

export interface PilotSignup { name: string; email: string; institution: string; field: string; level: Level | ""; country: CountryCode; role: "aide" | "aider" | "les-deux"; at: string }
export interface PartnerContact { org: string; name: string; email: string; kind: "etablissement" | "investisseur" | "autre"; message: string; at: string }
