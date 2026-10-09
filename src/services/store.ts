/*
 * État de session de la démonstration, persisté dans le stockage local du navigateur (clé campuus-demo).
 * Ce n'est pas une base de données : c'est la mémoire de la démo sur cet appareil. `resetDemo` efface tout.
 */
import { useSyncExternalStore } from "react";
import type { Conversation, HelpRequest, Notification, PartnerContact, PilotSignup, Student } from "../data/types";
import { CONVERSATIONS, GROUPS, ME_ID, NOTIFICATIONS, REQUESTS } from "../data/mock";

export interface DemoState {
  version: 1;
  meOverrides: Partial<Student>;
  requests: HelpRequest[];
  conversations: Conversation[];
  notifications: Notification[];
  joinedGroups: string[];
  pilotSignups: PilotSignup[];
  partnerContacts: PartnerContact[];
}

const KEY = "campuus-demo";
const initial = (): DemoState => ({
  version: 1,
  meOverrides: {},
  requests: structuredClone(REQUESTS),
  conversations: structuredClone(CONVERSATIONS),
  notifications: structuredClone(NOTIFICATIONS),
  joinedGroups: GROUPS.filter((g) => g.memberIds.includes(ME_ID)).map((g) => g.id),
  pilotSignups: [],
  partnerContacts: [],
});

let state: DemoState = load();
const listeners = new Set<() => void>();

function load(): DemoState {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as DemoState;
      if (parsed.version === 1) return { ...initial(), ...parsed };
    }
  } catch { /* stockage indisponible : la démo vit en mémoire */ }
  return initial();
}

function persist() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* quota ou navigation privée : on continue en mémoire */ }
}

export const getState = () => state;
export function setState(update: (s: DemoState) => DemoState) {
  state = update(state);
  persist();
  listeners.forEach((l) => l());
}
export function resetDemo() {
  state = initial();
  try { localStorage.removeItem(KEY); } catch { /* ignoré */ }
  listeners.forEach((l) => l());
}
const subscribe = (l: () => void) => { listeners.add(l); return () => { listeners.delete(l); }; };

/** Lecture réactive d'une tranche de l'état de démo. */
export function useDemo<T>(select: (s: DemoState) => T): T {
  return useSyncExternalStore(subscribe, () => select(state), () => select(state));
}
