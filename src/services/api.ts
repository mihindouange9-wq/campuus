/*
 * Interface de services CAMPUUS. L'implémentation de démonstration (demo.ts) lit les données fictives et le stockage
 * local du navigateur. Pour brancher un backend réel, fournir une autre implémentation de `CampuusApi` à `setApi`.
 */
import type { Conversation, HelpRequest, Message, Notification, PartnerContact, PilotSignup, Slot, Student, StudyGroup } from "../data/types";

export interface SearchQuery {
  q?: string;
  field?: string;
  subjectId?: string;
  chapterId?: string;
  level?: string;
  country?: string;
  institutionId?: string;
  availability?: string;
  sort?: "pertinence" | "disponibilite" | "proximite" | "aides";
}

export interface SearchResult { student: Student; matchedChapters: string[]; score: number; sameInstitution: boolean; sameCountry: boolean }

export interface NewHelpRequest { toId: string; subjectId: string; chapterId: string; kind: HelpRequest["kind"]; message: string; attachment?: string; slot?: Slot }

export interface CampuusApi {
  me(): Promise<Student>;
  updateMe(patch: Partial<Student>): Promise<Student>;
  searchStudents(query: SearchQuery): Promise<SearchResult[]>;
  getStudent(id: string): Promise<Student | undefined>;
  listRequests(): Promise<HelpRequest[]>;
  sendHelpRequest(input: NewHelpRequest): Promise<HelpRequest>;
  answerRequest(id: string, status: "acceptee" | "refusee"): Promise<HelpRequest>;
  listConversations(): Promise<Conversation[]>;
  getConversation(id: string): Promise<Conversation | undefined>;
  sendMessage(conversationId: string, text: string, attachment?: string): Promise<Message>;
  reportConversation(id: string): Promise<void>;
  blockConversation(id: string, blocked: boolean): Promise<void>;
  listGroups(): Promise<StudyGroup[]>;
  joinGroup(id: string, join: boolean): Promise<StudyGroup>;
  listNotifications(): Promise<Notification[]>;
  markNotificationsRead(ids?: string[]): Promise<void>;
  signupPilot(input: PilotSignup): Promise<void>;
  contactPartner(input: PartnerContact): Promise<void>;
}

let current: CampuusApi | null = null;
export const setApi = (api: CampuusApi) => { current = api; };
export const api = (): CampuusApi => {
  if (!current) throw new Error("Aucune implémentation de CampuusApi n'est enregistrée.");
  return current;
};
