import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Bell, Inbox, MessageSquare, Users, Clock } from "lucide-react";
import { Button, Empty, relative } from "../../components/ui";
import { api } from "../../services/api";
import { useDemo } from "../../services/store";
import type { Notification } from "../../data/types";

const ICON: Record<Notification["kind"], typeof Bell> = { demande: Inbox, message: MessageSquare, groupe: Users, disponibilite: Clock, systeme: Bell };

export function Component() {
  const notifications = useDemo((s) => s.notifications);
  useEffect(() => { document.title = "Notifications — CAMPUUS"; }, []);
  const unread = notifications.filter((n) => !n.read);
  const sorted = [...notifications].sort((a, b) => b.at.localeCompare(a.at));
  const day = (iso: string) => { const d = new Date(iso); const t = new Date(); if (d.toDateString() === t.toDateString()) return "Aujourd'hui"; t.setDate(t.getDate() - 1); if (d.toDateString() === t.toDateString()) return "Hier"; return d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" }); };
  let lastDay = "";

  return (
    <div className="screen">
      <div className="screen__head">
        <div>
          <h1>Notifications</h1>
          <p>{unread.length ? `${unread.length} non lue${unread.length > 1 ? "s" : ""}.` : "Tu es à jour."}</p>
        </div>
        {unread.length ? <Button variant="secondary" size="sm" onClick={() => api().markNotificationsRead()}>Tout marquer comme lu</Button> : null}
      </div>
      {sorted.length === 0 ? <Empty title="Aucune notification." text="Tu seras prévenu ici des demandes d'aide, des messages et de l'activité de tes groupes." /> : (
        <ul className="notifs">
          {sorted.map((n) => {
            const I = ICON[n.kind];
            const d = day(n.at);
            const head = d !== lastDay ? <li className="notif__day" aria-hidden="true">{d}</li> : null;
            lastDay = d;
            return (
              <>
                {head}
                <li key={n.id}>
                  <Link to={n.to} className={`notif${n.read ? "" : " notif--unread"}`} onClick={() => api().markNotificationsRead([n.id])}>
                    <span className="notif__icon"><I size={16} aria-hidden="true" /></span>
                    <span className="notif__text">{n.text}</span>
                    <span className="notif__at">{relative(n.at)}</span>
                  </Link>
                </li>
              </>
            );
          })}
        </ul>
      )}
    </div>
  );
}
