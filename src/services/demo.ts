/* Implémentation de démonstration de CampuusApi : données fictives + stockage local, latence simulée. */
import type { CampuusApi, SearchQuery, SearchResult } from "./api";
import { getState, setState } from "./store";
import { CHAPTERS, GROUPS, ME_ID, STUDENTS, chapter, institution, student, subject } from "../data/mock";
import type { HelpRequest, Message, Student } from "../data/types";

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
const uid = (p: string) => `${p}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
const now = () => new Date().toISOString();

const fold = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

const availabilityRank: Record<Student["availability"], number> = { now: 0, tonight: 1, weekend: 2, off: 3 };

export function me(): Student {
  return { ...student(ME_ID), ...getState().meOverrides };
}

export function searchSync(query: SearchQuery): SearchResult[] {
  const q = fold(query.q ?? "").trim();
  const self = me();
  const terms = q.split(/\s+/).filter(Boolean);
  const chaptersMatching = q
    ? CHAPTERS.filter((c) => {
        const hay = fold(`${c.name} ${subject(c.subjectId).name} ${subject(c.subjectId).field}`);
        return terms.every((t) => hay.includes(t));
      }).map((c) => c.id)
    : [];
  const results: SearchResult[] = [];
  for (const s of STUDENTS) {
    if (s.id === ME_ID) continue;
    if (query.field && s.field !== query.field) continue;
    if (query.level && s.level !== query.level) continue;
    if (query.country && s.country !== query.country) continue;
    if (query.institutionId && s.institutionId !== query.institutionId) continue;
    if (query.availability && s.availability !== query.availability) continue;
    if (query.subjectId && !s.masters.some((m) => chapter(m).subjectId === query.subjectId)) continue;
    if (query.chapterId && !s.masters.includes(query.chapterId)) continue;

    let matched = s.masters.filter((m) => chaptersMatching.includes(m));
    if (q && matched.length === 0) {
      const hay = fold(`${s.pseudo} ${s.showName ? s.name : ""} ${s.field} ${institution(s.institutionId).name} ${institution(s.institutionId).city} ${s.bio}`);
      if (!terms.every((t) => hay.includes(t))) continue;
    }
    if (query.chapterId) matched = [query.chapterId];
    const sameInstitution = s.institutionId === self.institutionId;
    const sameCountry = s.country === self.country;
    let score = matched.length * 40 + (3 - availabilityRank[s.availability]) * 12 + (sameInstitution ? 18 : sameCountry ? 8 : 0) + (s.field === self.field ? 10 : 0) + Math.min(s.helped, 20) / 2;
    if (q && matched.length === 0) score -= 30;
    results.push({ student: s, matchedChapters: matched, score, sameInstitution, sameCountry });
  }
  const sort = query.sort ?? "pertinence";
  results.sort((a, b) => {
    if (sort === "disponibilite") return availabilityRank[a.student.availability] - availabilityRank[b.student.availability] || b.score - a.score;
    if (sort === "proximite") return Number(b.sameInstitution) - Number(a.sameInstitution) || Number(b.sameCountry) - Number(a.sameCountry) || b.score - a.score;
    if (sort === "aides") return b.student.helped - a.student.helped;
    return b.score - a.score;
  });
  return results;
}

export const demoApi: CampuusApi = {
  async me() { await wait(120); return me(); },
  async updateMe(patch) {
    await wait(300);
    setState((s) => ({ ...s, meOverrides: { ...s.meOverrides, ...patch } }));
    return me();
  },
  async searchStudents(query) { await wait(380); return searchSync(query); },
  async getStudent(id) { await wait(160); return id === ME_ID ? me() : STUDENTS.find((s) => s.id === id); },
  async listRequests() { await wait(200); return [...getState().requests].sort((a, b) => b.createdAt.localeCompare(a.createdAt)); },
  async sendHelpRequest(input) {
    await wait(700);
    const req: HelpRequest = { id: uid("r"), fromId: ME_ID, status: "envoyee", createdAt: now(), ...input };
    setState((s) => ({ ...s, requests: [req, ...s.requests] }));
    // La démo fait vivre la demande : l'autre étudiant « reçoit » puis répond.
    const to = student(input.toId);
    setTimeout(() => setState((s) => ({ ...s, requests: s.requests.map((r) => (r.id === req.id ? { ...r, status: "en_attente" } : r)) })), 2500);
    setTimeout(() => {
      const accepted = to.availability !== "off";
      setState((s) => ({
        ...s,
        requests: s.requests.map((r) => (r.id === req.id ? { ...r, status: accepted ? "acceptee" : "refusee" } : r)),
        notifications: [{ id: uid("n"), kind: "demande", text: accepted ? `${to.pseudo} a accepté ta demande sur « ${chapter(input.chapterId).name} ».` : `${to.pseudo} n'est pas disponible cette semaine pour « ${chapter(input.chapterId).name} ».`, at: now(), read: false, to: "/app/demandes" }, ...s.notifications],
        conversations: accepted && !s.conversations.some((c) => c.participantIds.includes(to.id))
          ? [{ id: `c-${to.id}`, participantIds: [ME_ID, to.id], messages: [{ id: uid("m"), fromId: to.id, text: `Salut, j'ai accepté ta demande sur « ${chapter(input.chapterId).name} ». Dis-moi ce qui bloque exactement et on avance.`, at: now(), status: "recu" }] }, ...s.conversations]
          : s.conversations,
      }));
    }, 9000);
    return req;
  },
  async answerRequest(id, status) {
    await wait(300);
    setState((s) => ({ ...s, requests: s.requests.map((r) => (r.id === id ? { ...r, status } : r)) }));
    return getState().requests.find((r) => r.id === id)!;
  },
  async listConversations() { await wait(180); return getState().conversations; },
  async getConversation(id) { await wait(160); return getState().conversations.find((c) => c.id === id); },
  async sendMessage(conversationId, text, attachment) {
    const msg: Message = { id: uid("m"), fromId: ME_ID, text, at: now(), status: "envoi", attachment };
    setState((s) => ({ ...s, conversations: s.conversations.map((c) => (c.id === conversationId ? { ...c, messages: [...c.messages, msg] } : c)) }));
    await wait(500);
    const mark = (status: Message["status"]) => setState((s) => ({ ...s, conversations: s.conversations.map((c) => (c.id === conversationId ? { ...c, messages: c.messages.map((m) => (m.id === msg.id ? { ...m, status } : m)) } : c)) }));
    mark("envoye");
    setTimeout(() => mark("recu"), 1200);
    setTimeout(() => mark("lu"), 3200);
    return { ...msg, status: "envoye" };
  },
  async reportConversation(id) {
    await wait(300);
    setState((s) => ({ ...s, conversations: s.conversations.map((c) => (c.id === id ? { ...c, reported: true } : c)) }));
  },
  async blockConversation(id, blocked) {
    await wait(300);
    setState((s) => ({ ...s, conversations: s.conversations.map((c) => (c.id === id ? { ...c, blocked } : c)) }));
  },
  async listGroups() {
    await wait(220);
    const joined = getState().joinedGroups;
    return GROUPS.map((g) => ({ ...g, memberIds: joined.includes(g.id) ? Array.from(new Set([...g.memberIds, ME_ID])) : g.memberIds.filter((m) => m !== ME_ID) }));
  },
  async joinGroup(id, join) {
    await wait(350);
    setState((s) => ({ ...s, joinedGroups: join ? Array.from(new Set([...s.joinedGroups, id])) : s.joinedGroups.filter((g) => g !== id) }));
    const g = GROUPS.find((x) => x.id === id)!;
    return { ...g, memberIds: join ? Array.from(new Set([...g.memberIds, ME_ID])) : g.memberIds.filter((m) => m !== ME_ID) };
  },
  async listNotifications() { await wait(150); return getState().notifications; },
  async markNotificationsRead(ids) {
    setState((s) => ({ ...s, notifications: s.notifications.map((n) => (!ids || ids.includes(n.id) ? { ...n, read: true } : n)) }));
  },
  async signupPilot(input) {
    await wait(800);
    setState((s) => ({ ...s, pilotSignups: [...s.pilotSignups, input] }));
  },
  async contactPartner(input) {
    await wait(800);
    setState((s) => ({ ...s, partnerContacts: [...s.partnerContacts, input] }));
  },
};
