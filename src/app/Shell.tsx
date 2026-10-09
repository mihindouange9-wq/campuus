import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { Bell, Home, Search, Inbox, MessageSquare, Users, UserRound, RotateCcw, ExternalLink } from "lucide-react";
import { Mark } from "../brand/Logo";
import { Avatar } from "../components/ui";
import { useDemo, resetDemo } from "../services/store";
import { me } from "../services/demo";
import { useToasts } from "../services/toast";
import "./app.css";

const NAV = [
  { to: "/app", label: "Accueil", icon: Home, end: true },
  { to: "/app/trouver", label: "Trouver un étudiant", short: "Trouver", icon: Search },
  { to: "/app/demandes", label: "Demandes d'aide", short: "Demandes", icon: Inbox },
  { to: "/app/messages", label: "Messages", icon: MessageSquare },
  { to: "/app/groupes", label: "Groupes d'étude", short: "Groupes", icon: Users },
  { to: "/app/notifications", label: "Notifications", icon: Bell, desktopOnly: true },
  { to: "/app/profil", label: "Mon profil", short: "Profil", icon: UserRound, desktopOnly: true },
];

export default function Shell() {
  const location = useLocation();
  const unread = useDemo((s) => s.notifications.filter((n) => !n.read).length);
  const unreadMessages = useDemo((s) => s.conversations.reduce((acc, c) => acc + c.messages.filter((m) => m.fromId !== "me" && m.status !== "lu").length, 0));
  const pendingReceived = useDemo((s) => s.requests.filter((r) => r.toId === "me" && r.status === "envoyee").length);
  const overrides = useDemo((s) => s.meOverrides);
  const self = { ...me(), ...overrides };
  const toasts = useToasts();
  const [confirmReset, setConfirmReset] = useState(false);
  useEffect(() => { window.scrollTo(0, 0); }, [location.pathname]);

  const badge = (to: string) => (to === "/app/notifications" ? unread : to === "/app/messages" ? unreadMessages : to === "/app/demandes" ? pendingReceived : 0);

  return (
    <div className="app">
      <div className="demo-bar" data-tone="horizon" role="note">
        <span><b>Démonstration</b> · profil fictif de {self.pseudo} · données enregistrées sur cet appareil seulement</span>
        <span className="demo-bar__actions">
          {confirmReset ? (
            <>
              <span>Effacer les données de la démo ?</span>
              <button type="button" className="demo-bar__btn" onClick={() => { resetDemo(); setConfirmReset(false); }}>Oui, effacer</button>
              <button type="button" className="demo-bar__btn" onClick={() => setConfirmReset(false)}>Annuler</button>
            </>
          ) : (
            <button type="button" className="demo-bar__btn" onClick={() => setConfirmReset(true)}><RotateCcw size={13} /> Réinitialiser</button>
          )}
          <Link to="/" className="demo-bar__btn"><ExternalLink size={13} /> Site</Link>
        </span>
      </div>

      <header className="app-top">
        <Link to="/app" className="app-top__brand" aria-label="CAMPUUS, accueil de l'application"><Mark size={26} /><span>CAMPUUS</span></Link>
        <div className="app-top__right">
          <NavLink to="/app/notifications" className="app-top__icon" aria-label={`Notifications${unread ? `, ${unread} non lues` : ""}`}>
            <Bell size={20} />
            {unread ? <span className="badge">{unread}</span> : null}
          </NavLink>
          <NavLink to="/app/profil" className="app-top__me" aria-label="Mon profil"><Avatar student={self} size={32} /></NavLink>
        </div>
      </header>

      <aside className="app-side" aria-label="Navigation de l'application">
        <Link to="/app" className="app-side__brand" aria-label="CAMPUUS, accueil de l'application"><Mark size={28} /><span>CAMPUUS</span></Link>
        <nav className="app-nav">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.end} className={({ isActive }) => `app-nav__item${isActive ? " app-nav__item--active" : ""}`}>
              <n.icon size={18} aria-hidden="true" />
              <span>{n.label}</span>
              {badge(n.to) ? <span className="badge">{badge(n.to)}</span> : null}
            </NavLink>
          ))}
        </nav>
        <div className="app-side__me">
          <Avatar student={self} size={36} />
          <span><b>{self.pseudo}</b><span>{self.field} · {self.level}</span></span>
        </div>
      </aside>

      <main className="app-main" id="contenu">
        <Outlet />
      </main>

      <nav className="app-tabs" aria-label="Navigation principale">
        {NAV.filter((n) => !n.desktopOnly).map((n) => (
          <NavLink key={n.to} to={n.to} end={n.end} className={({ isActive }) => `app-tabs__item${isActive ? " app-tabs__item--active" : ""}`}>
            <n.icon size={20} aria-hidden="true" />
            <span>{n.short ?? n.label}</span>
            {badge(n.to) ? <span className="badge">{badge(n.to)}</span> : null}
          </NavLink>
        ))}
      </nav>

      <div className="toasts" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className="toast">
            <span>{t.text}</span>
            {t.to ? <Link to={t.to}>Voir</Link> : null}
          </div>
        ))}
      </div>
    </div>
  );
}
