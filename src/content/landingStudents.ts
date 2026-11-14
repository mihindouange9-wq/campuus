/* Les quatre étudiants fictifs montrés dans les maquettes de la page d'accueil : mêmes valeurs que dans
   src/data/mock.ts, recopiées ici pour que l'accueil ne charge pas tout le jeu de données de l'application. */
import type { Student } from "../data/types";

type Shown = Pick<Student, "id" | "pseudo" | "initials" | "hue" | "field" | "level" | "availability">;

const SHOWN: Record<string, Shown> = {
  aicha: { id: "aicha", pseudo: "Aïcha N.", initials: "AN", hue: "horizon", field: "Finance", level: "M1", availability: "tonight" },
  loic: { id: "loic", pseudo: "Loïc O.", initials: "LO", hue: "mix", field: "Économie", level: "L3", availability: "now" },
  nadege: { id: "nadege", pseudo: "Nadège K.", initials: "NK", hue: "horizon", field: "Finance", level: "M2", availability: "tonight" },
  fatou: { id: "fatou", pseudo: "Fatou D.", initials: "FD", hue: "mix", field: "Informatique", level: "L3", availability: "now" },
};

export const student = (id: string) => SHOWN[id];
