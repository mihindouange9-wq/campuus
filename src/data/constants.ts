/* Constantes d'interface partagées par le site public et l'application (aucune donnée de démonstration ici,
   pour que la page d'accueil n'embarque pas le jeu de données de l'application). */
import type { HelpRequest, Student } from "./types";

export const DAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
export const DAYS_LONG = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
export const HOURS = Array.from({ length: 13 }, (_, i) => 8 + i); // 8 h → 20 h

export const AVAILABILITY_LABEL: Record<Student["availability"], string> = { now: "Disponible maintenant", tonight: "Disponible ce soir", weekend: "Disponible ce week-end", off: "Indisponible cette semaine" };
export const REQUEST_STATUS_LABEL: Record<HelpRequest["status"], string> = { envoyee: "Envoyée", en_attente: "En attente", acceptee: "Acceptée", refusee: "Refusée", expiree: "Expirée" };
