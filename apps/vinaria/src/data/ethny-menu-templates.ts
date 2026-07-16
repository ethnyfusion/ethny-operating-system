import type { MealType } from "@/types";

export interface EthnyCourseChoice {
  name: string;
  detail: string;
}

export interface EthnyCourseTemplate {
  label: string;
  choices: EthnyCourseChoice[];
}

export interface EthnyMenuTemplate {
  id: string;
  title: string;
  tag: string;
  subtitle: string;
  servicesLabel: string;
  servicesCount: 3 | 4 | 5 | 6;
  recommendedMealType: MealType;
  defaultStyle: string;
  text: string;
  note: string;
  courses: EthnyCourseTemplate[];
}

export const ethnyMenuTemplates: EthnyMenuTemplate[] = [
  {
    id: "jardin-vegetal",
    title: "Jardin Végétal",
    tag: "Végétarien · 4 services",
    subtitle: "Le végétal comme territoire d’exploration",
    servicesLabel: "4 services · sans viande ni poisson",
    servicesCount: 4,
    recommendedMealType: "dinner",
    defaultStyle: "Végétal",
    text: "Légumes laqués, herbes fraîches et équilibre entre France, Asie et Brésil.",
    note: "Menu 100 % sans viande ni poisson. Allergies intégrées dès la conception. Adaptable en 3 services.",
    courses: [
      {
        label: "Amuse-bouche",
        choices: [
          { name: "Mini tatin de légumes rôtis", detail: "Crumble de noisettes torréfiées, réduction de balsamique." },
          { name: "Ceviche de mangue et avocat", detail: "Herbes fraîches, huile de sésame grillé." },
          { name: "Choux pâtissier salé", detail: "Mousse de tomates, mascarpone, piment doux fumé." },
        ],
      },
      {
        label: "Entrée",
        choices: [
          { name: "Ravioli de carottes au curcuma", detail: "Bouillon carotte, lait de coco, gingembre, oignons acidulés." },
          { name: "Raviole d’aubergine au miso", detail: "Jus miso riche et parfumé, oignons marinés." },
          { name: "Pastèque grillée, feta", detail: "Olive noire, herbes fraîches, citron confit." },
        ],
      },
      {
        label: "Plat",
        choices: [
          { name: "Aubergines laquées au miso & sésame", detail: "Mousseline de patate douce, chips de légumes." },
          { name: "Risotto de saison, parmesan & herbes", detail: "Légumes rôtis, huile d’herbes, graines torréfiées." },
        ],
      },
      {
        label: "Dessert",
        choices: [
          { name: "Pavlova aux fruits de saison", detail: "Biscuit amande, ganache chocolat blanc romarin, agrumes." },
          { name: "Le Vanille Caramel", detail: "Ganache vanille, sablé amandes, pommes caramélisées." },
        ],
      },
    ],
  },
  {
    id: "fusion-signature",
    title: "Fusion Signature",
    tag: "Fusion Asiatique · 5 services",
    subtitle: "Quand Paris dialogue avec Tokyo",
    servicesLabel: "5 services · accord vins disponible",
    servicesCount: 5,
    recommendedMealType: "dinner",
    defaultStyle: "Fusion Ethny",
    text: "Précision française, umami, yuzu, bouillons profonds et lecture gastronomique du voyage.",
    note: "Accord vins Découverte ou Prestige disponible. Allergies prises en charge. Adaptable en 4 services.",
    courses: [
      {
        label: "Amuse-bouche",
        choices: [
          { name: "Tartelette tartare de bœuf à l’asiatique", detail: "Radis daikon, tartuffata, citronnelle, galanga." },
          { name: "Chips de riz, gambas rôties", detail: "Laquage miel gingembre, soja, citron vert." },
        ],
      },
      {
        label: "Entrée",
        choices: [
          { name: "Sashimi de thon", detail: "Légumes de saison, huile yuzu, condiment maison, sauce umami." },
          { name: "Saumon gravlax", detail: "Crème sure, légumes marinés, huile de poireau." },
        ],
      },
      {
        label: "Plat",
        choices: [
          { name: "Picanha de bœuf", detail: "Jus façon teriyaki, purée au foin, légumes de saison." },
          { name: "Filet de canard", detail: "Purée de saison, sauce vin rouge réduit et sirop de Liège." },
          { name: "Carré d’agneau rôti aux herbes", detail: "Carottes glacées, fenouil rôti à l’orange, légumes." },
        ],
      },
      {
        label: "Pré-dessert",
        choices: [
          { name: "Fraîcheur yuzu et herbes", detail: "Transition acidulée, texture légère et agrumes." },
        ],
      },
      {
        label: "Dessert",
        choices: [
          { name: "Le Framboisier Pistache", detail: "Biscuit pistache, insert framboise, crémeux pistache." },
          { name: "Tiramisu revisité", detail: "Mascarpone, chocolat blanc, café Corica Guatemala." },
        ],
      },
    ],
  },
  {
    id: "mariage-premium",
    title: "Mariage Premium",
    tag: "Grand format · 6 services",
    subtitle: "Le plus beau repas de votre vie",
    servicesLabel: "6 services · mariages & événements",
    servicesCount: 6,
    recommendedMealType: "celebration",
    defaultStyle: "Cuisine française",
    text: "Menu conçu pour les grandes occasions, du cocktail au dessert, avec service structuré.",
    note: "Menu composé à quatre mains avec vous. Accord vins Prestige recommandé.",
    courses: [
      { label: "Amuse-bouche", choices: [{ name: "Choux pâtissier", detail: "Mousse de champignons, parmesan, oignons marinés." }] },
      { label: "Entrée froide", choices: [{ name: "Saumon gravlax", detail: "Crème sure, légumes marinés, huile de poireau." }] },
      { label: "Entrée chaude", choices: [{ name: "Ravioli de langoustine", detail: "Bouillon flambé au gin, ail, gingembre, citronnelle." }] },
      { label: "Plat poisson", choices: [{ name: "Filet de bar grillé", detail: "Sauce moqueca, lait de coco, tomate, patate douce." }] },
      { label: "Plat viande", choices: [{ name: "Carré d’agneau rôti aux herbes", detail: "Carottes glacées, fenouil rôti, légumes de saison." }] },
      { label: "Dessert", choices: [{ name: "Pavlova aux fruits de saison", detail: "Biscuit amande, ganache chocolat blanc romarin, meringue." }] },
    ],
  },
  {
    id: "menu-decouverte",
    title: "Menu Découverte",
    tag: "Carte blanche · 5 services",
    subtitle: "Selon l’inspiration du chef",
    servicesLabel: "5 services · carte blanche",
    servicesCount: 5,
    recommendedMealType: "dinner",
    defaultStyle: "Fusion Ethny",
    text: "Proposition selon le marché, la saison et l’inspiration du chef.",
    note: "Menu susceptible d’évoluer selon le marché. Allergies et préférences à communiquer.",
    courses: [
      { label: "Amuse-bouche", choices: [{ name: "Carte blanche du marché", detail: "Bouchée entre fraîcheur, acidité et texture." }] },
      { label: "Entrée", choices: [{ name: "Entrée fraîche selon le marché", detail: "Poisson, végétal ou crustacé, huile d’herbes." }] },
      { label: "Ravioli signature", choices: [{ name: "Ravioli signature du chef", detail: "Farce du moment, bouillon parfumé, gingembre ou jus court." }] },
      { label: "Plat", choices: [{ name: "Poisson noble ou viande de caractère", detail: "Garniture de saison, touche fusion selon inspiration." }] },
      { label: "Dessert", choices: [{ name: "Dessert signature surprise", detail: "Création du chef selon la saison." }] },
    ],
  },
  {
    id: "menu-bistronomy",
    title: "Menu Bistronomy",
    tag: "Bistronomie · 4 services",
    subtitle: "La gastronomie sans la distance",
    servicesLabel: "4 services · esprit bistro-gastronomique",
    servicesCount: 4,
    recommendedMealType: "dinner",
    defaultStyle: "Cuisine française",
    text: "Produits du marché, gestes précis, partage naturel et cuisine gastronomique sans distance.",
    note: "Idéal pour repas en famille ou entre amis. Option végétarienne disponible.",
    courses: [
      { label: "Amuse-bouche", choices: [{ name: "Chips de riz, gambas rôties", detail: "Laquage miel gingembre, soja, citron vert." }] },
      { label: "Entrée", choices: [{ name: "Saumon gravlax", detail: "Crème sure, légumes marinés, huile de poireau." }] },
      { label: "Plat", choices: [{ name: "Filet de canard", detail: "Purée de saison, sauce vin rouge réduit, sirop de Liège." }] },
      { label: "Dessert", choices: [{ name: "Snickers revisité", detail: "Caramel beurre salé, chocolat noir, biscuit noisettes." }] },
    ],
  },
];
