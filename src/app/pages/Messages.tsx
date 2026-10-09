import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Check, CheckCheck, Clock, Flag, MoreHorizontal, Paperclip, Send, ShieldBan, FileText } from "lucide-react";
import { Avatar, Button, ButtonLink, Empty, relative } from "../../components/ui";
import { api } from "../../services/api";
import { useDemo } from "../../services/store";
import { toast } from "../../services/toast";
import { STUDENTS, student } from "../../data/mock";
import type { Message } from "../../data/types";

const Tick = ({ status }: { status: Message["status"] }) =>
  status === "envoi" ? <Clock size={12} aria-label="Envoi en cours" /> : status === "envoye" ? <Check size={12} aria-label="Envoyé" /> : status === "recu" ? <CheckCheck size={12} aria-label="Reçu" /> : <CheckCheck size={12} aria-label="Lu" style={{ color: "var(--horizon)" }} />;

export function Component() {
  const { id } = useParams();
  const navigate = useNavigate();
  const conversations = useDemo((s) => s.conversations);
  const conv = conversations.find((c) => c.id === id);
  const other = conv ? student(conv.participantIds.find((p) => p !== "me")!) : id?.startsWith("c-") ? STUDENTS.find((s) => s.id === id.slice(2)) : undefined;
  const [text, setText] = useState("");
  const [attachment, setAttachment] = useState<string | undefined>();
  const [menu, setMenu] = useState(false);
  const [confirmBlock, setConfirmBlock] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  useEffect(() => { document.title = other ? `${other.pseudo} — Messages — CAMPUUS` : "Messages — CAMPUUS"; }, [other]);
  useEffect(() => { listRef.current?.scrollTo({ top: listRef.current.scrollHeight }); }, [conv?.messages.length, id]);
  useEffect(() => {
    // Les messages reçus passent « lus » quand la conversation est ouverte.
    if (!conv) return;
    const unread = conv.messages.filter((m) => m.fromId !== "me" && m.status !== "lu");
    if (unread.length) api().markNotificationsRead(); // la démo n'a pas de lecture par message : on marque la conversation lue côté notifications
  }, [conv?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  async function send(e?: FormEvent) {
    e?.preventDefault();
    const body = text.trim();
    if (!body && !attachment) return;
    if (!conv && other) {
      // Nouvelle conversation ouverte depuis un profil : la démo la crée au premier message.
      const { setState } = await import("../../services/store");
      setState((s) => ({ ...s, conversations: [{ id: `c-${other.id}`, participantIds: ["me", other.id], messages: [] }, ...s.conversations] }));
    }
    setText(""); setAttachment(undefined);
    await api().sendMessage(`c-${other!.id}`, body || attachment!, attachment);
  }
  const onKey = (e: KeyboardEvent<HTMLTextAreaElement>) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } };

  async function block(blocked: boolean) {
    if (!conv) return;
    await api().blockConversation(conv.id, blocked);
    setConfirmBlock(false); setMenu(false);
    toast(blocked ? `${other!.pseudo} est bloqué. Il ne peut plus t'écrire (démo).` : `${other!.pseudo} est débloqué.`);
  }
  async function report() {
    if (!conv) return;
    await api().reportConversation(conv.id);
    setMenu(false);
    toast("Signalement enregistré dans la démo. Une équipe de modération le traiterait dans la version finale.");
  }

  const online = (s: { availability: string }) => s.availability === "now";

  return (
    <div className="screen">
      <div className="screen__head">
        <div>
          <h1>Messages</h1>
          <p>Une conversation par mise en relation.</p>
        </div>
      </div>
      {conversations.length === 0 && !other ? (
        <Empty title="Aucune conversation pour l'instant." text="Elle s'ouvre quand une demande d'aide est acceptée, ou depuis le profil d'un étudiant." action={<ButtonLink to="/app/trouver" variant="secondary" size="sm">Trouver un étudiant</ButtonLink>} />
      ) : (
        <div className={`messages ${other ? "messages--thread" : "messages--list"}`}>
          <ul className="convs" aria-label="Conversations">
            {conversations.map((c) => {
              const o = student(c.participantIds.find((p) => p !== "me")!);
              const last = c.messages[c.messages.length - 1];
              const unread = c.messages.filter((m) => m.fromId !== "me" && m.status !== "lu").length;
              return (
                <li key={c.id}>
                  <Link to={`/app/messages/${c.id}`} className={`conv${c.id === id ? " conv--active" : ""}`} aria-current={c.id === id ? "page" : undefined}>
                    <Avatar student={o} size={40} />
                    <span className="conv__name"><i className={`presence${online(o) ? "" : " presence--off"}`} aria-hidden="true" />{o.pseudo}{c.blocked ? <span className="tag" style={{ fontSize: "0.6875rem" }}>bloqué</span> : null}</span>
                    {last ? <span className="conv__at">{relative(last.at)}</span> : null}
                    <span className="conv__last">{last ? (last.attachment ? <><Paperclip size={12} aria-hidden="true" style={{ verticalAlign: "-2px", marginRight: 4 }} />{last.attachment.split(" · ")[0]}</> : last.text) : "Nouvelle conversation"}</span>
                    {unread && c.id !== id ? <span className="badge conv__unread">{unread}</span> : null}
                  </Link>
                </li>
              );
            })}
          </ul>

          {other ? (
            <section className="thread" aria-label={`Conversation avec ${other.pseudo}`}>
              <header className="thread__head">
                <Button variant="ghost" size="sm" className="thread__back" aria-label="Retour aux conversations" onClick={() => navigate("/app/messages")}><ArrowLeft size={18} /></Button>
                <Link to={`/app/etudiants/${other.id}`}><Avatar student={other} size={40} /></Link>
                <div style={{ flex: 1 }}>
                  <b>{other.pseudo}</b>
                  <small><i className={`presence${online(other) ? "" : " presence--off"}`} aria-hidden="true" />{online(other) ? "En ligne" : "Hors ligne"} · {other.field} · {other.level}</small>
                </div>
                <div className="menu">
                  <Button variant="ghost" size="sm" aria-haspopup="menu" aria-expanded={menu} aria-label="Actions de la conversation" onClick={() => setMenu((m) => !m)}><MoreHorizontal size={18} /></Button>
                  {menu ? (
                    <div className="menu__list" role="menu">
                      <button type="button" role="menuitem" onClick={report}><Flag size={16} /> Signaler cette conversation</button>
                      {conv?.blocked ? <button type="button" role="menuitem" onClick={() => block(false)}><ShieldBan size={16} /> Débloquer {other.pseudo}</button> : <button type="button" role="menuitem" className="danger" onClick={() => { setConfirmBlock(true); setMenu(false); }}><ShieldBan size={16} /> Bloquer {other.pseudo}</button>}
                    </div>
                  ) : null}
                </div>
              </header>
              {conv?.reported ? <p className="thread__notice">Conversation signalée (démo). Dans la version finale, la modération examine le signalement.</p> : null}
              {confirmBlock ? (
                <div className="thread__blocked" role="alertdialog" aria-label="Confirmer le blocage">
                  <span>Bloquer {other.pseudo} ? Il ne pourra plus t'écrire ni te demander de l'aide.</span>
                  <span style={{ display: "flex", gap: "0.5rem" }}><Button size="sm" onClick={() => block(true)}>Bloquer</Button><Button size="sm" variant="ghost" onClick={() => setConfirmBlock(false)}>Annuler</Button></span>
                </div>
              ) : null}
              <div className="thread__list" ref={listRef}>
                {!conv || conv.messages.length === 0 ? <p className="muted" style={{ textAlign: "center", padding: "2rem 0" }}>Dis bonjour à {other.pseudo} et précise ce qui bloque.</p> : null}
                {conv?.messages.map((m) => (
                  <div key={m.id} className={`bubble${m.fromId === "me" ? " bubble--me" : ""}`}>
                    {m.attachment ? <span className="bubble__file"><FileText size={14} />{m.attachment}</span> : <span>{m.text}</span>}
                    <span className="bubble__meta"><time dateTime={m.at}>{relative(m.at)}</time>{m.fromId === "me" ? <Tick status={m.status} /> : null}</span>
                  </div>
                ))}
              </div>
              {conv?.blocked ? (
                <div className="thread__blocked"><span>Tu as bloqué {other.pseudo}.</span><Button size="sm" variant="secondary" onClick={() => block(false)}>Débloquer</Button></div>
              ) : (
                <form className="composer" onSubmit={send}>
                  <label className="btn btn--ghost btn--sm" htmlFor="msg-file" aria-label="Joindre un fichier"><Paperclip size={18} /><input id="msg-file" type="file" style={{ position: "absolute", width: 1, height: 1, opacity: 0 }} onChange={(e) => { const f = e.target.files?.[0]; if (f) setAttachment(`${f.name} · ${Math.max(1, Math.round(f.size / 1024))} ko`); }} /></label>
                  <div style={{ flex: 1, display: "grid", gap: "0.3rem" }}>
                    {attachment ? <span className="attach__name"><Paperclip size={12} />{attachment}<button type="button" onClick={() => setAttachment(undefined)} aria-label="Retirer">×</button></span> : null}
                    <textarea className="input" value={text} onChange={(e) => setText(e.target.value)} onKeyDown={onKey} placeholder={`Écrire à ${other.pseudo}…`} aria-label="Message" rows={1} />
                  </div>
                  <Button type="submit" size="sm" aria-label="Envoyer" disabled={!text.trim() && !attachment}><Send size={16} /></Button>
                </form>
              )}
            </section>
          ) : (
            <section className="thread" aria-label="Aucune conversation ouverte" style={{ alignContent: "center", justifyItems: "center", color: "var(--fg-muted)", padding: "2rem" }}>
              <p>Choisis une conversation.</p>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
