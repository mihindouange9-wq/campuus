import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "@fontsource-variable/plus-jakarta-sans/wght.css";
import "@fontsource-variable/inter/wght.css";
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/components.css";
import "./styles/motion.css";
import { setApi } from "./services/api";
import { demoApi } from "./services/demo";
import Landing from "./pages/Landing";

setApi(demoApi);

const Shell = lazy(() => import("./app/Shell"));
const loading = <div className="app-loading" aria-live="polite">Chargement de l'espace CAMPUUS…</div>;

const router = createBrowserRouter([
  { path: "/", element: <Landing /> },
  { path: "/partenaires", lazy: () => import("./pages/Partners") },
  { path: "/rejoindre", lazy: () => import("./pages/Join") },
  {
    path: "/app",
    element: <Suspense fallback={loading}><Shell /></Suspense>,
    children: [
      { index: true, lazy: () => import("./app/pages/Home") },
      { path: "trouver", lazy: () => import("./app/pages/Search") },
      { path: "etudiants/:id", lazy: () => import("./app/pages/StudentProfile") },
      { path: "demandes", lazy: () => import("./app/pages/Requests") },
      { path: "demandes/nouvelle", lazy: () => import("./app/pages/NewRequest") },
      { path: "messages", lazy: () => import("./app/pages/Messages") },
      { path: "messages/:id", lazy: () => import("./app/pages/Messages") },
      { path: "groupes", lazy: () => import("./app/pages/Groups") },
      { path: "groupes/:id", lazy: () => import("./app/pages/GroupDetail") },
      { path: "notifications", lazy: () => import("./app/pages/Notifications") },
      { path: "profil", lazy: () => import("./app/pages/Profile") },
    ],
  },
  { path: "*", lazy: () => import("./pages/NotFound") },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
