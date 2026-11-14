/* Branche la couche de données de démonstration. Importé par les écrans qui en ont besoin (application,
   Rejoindre, Partenaires) : la page d'accueil ne la charge pas. */
import { setApi } from "./api";
import { demoApi } from "./demo";

setApi(demoApi);
