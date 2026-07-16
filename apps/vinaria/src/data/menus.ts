export interface EthnyMenu {
  id: string;
  name: string;
  season: string;
  description: string;
  dishes: { name: string; tags: string[] }[];
}

export const ethnyMenus: EthnyMenu[] = [
  {
    id: "menu-printemps",
    name: "Menu Éclosion",
    season: "Printemps · Été",
    description: "Un menu vif et végétal, traversé d’agrumes et de notes marines.",
    dishes: [
      { name: "Ceviche de bar aux agrumes", tags: ["poisson", "agrumes", "iode"] },
      { name: "Volaille fermière, petits pois et jus au thym", tags: ["volaille", "herbes", "vegetal"] },
      { name: "Fraise, basilic et crème légère", tags: ["fruits", "dessert", "cremeux"] },
    ],
  },
  {
    id: "menu-automne",
    name: "Menu Sous-bois",
    season: "Automne · Hiver",
    description: "Des textures enveloppantes, les champignons, la truffe et les jus corsés.",
    dishes: [
      { name: "Œuf parfait, champignons et truffe", tags: ["champignons", "terre", "cremeux"] },
      { name: "Canard rôti, betterave et jus réduit", tags: ["canard", "terre", "fruits rouges"] },
      { name: "Chocolat noir et noisette", tags: ["chocolat", "dessert"] },
    ],
  },
  {
    id: "menu-celebration",
    name: "Menu Célébration",
    season: "Édition festive",
    description: "Une table d’exception pensée pour les moments qui comptent.",
    dishes: [
      { name: "Homard, agrumes et beurre noisette", tags: ["homard", "agrumes", "cremeux"] },
      { name: "Filet de bœuf, truffe et pommes fondantes", tags: ["boeuf", "terre", "champignons"] },
      { name: "Poire, chocolat et épices douces", tags: ["chocolat", "fruits", "epices"] },
    ],
  },
];
