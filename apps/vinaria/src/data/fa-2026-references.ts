import type { WineProduct } from "@/types";

type FaWineRow = {
  name: string;
  producer?: string;
  color: WineProduct["color"];
  appellation: string;
  region: string;
  country: string;
  htvaCents: number;
  tvacCents: number;
  bottleSizeMl?: number;
  vintage?: number;
  grapes?: string[];
  culinaryTags?: string[];
  styleTags?: string[];
  servingTemperature?: string;
};

export const fa2026Rows: FaWineRow[] = [
  { name: "Pays d’Oc « Les Bons Plants » blanc 2025", color: "white", appellation: "Pays d’Oc", region: "Languedoc", country: "France", htvaCents: 702, tvacCents: 850, vintage: 2025, grapes: ["Sauvignon blanc"] },
  { name: "Sauvignon Pays d’Oc Cuvée Hippocampe 2023", color: "white", appellation: "Pays d’Oc", region: "Languedoc", country: "France", htvaCents: 909, tvacCents: 1100, vintage: 2023, grapes: ["Sauvignon blanc"] },
  { name: "Chardonnay Fût de Chêne 2023-2025", color: "white", appellation: "Pays d’Oc", region: "Languedoc", country: "France", htvaCents: 992, tvacCents: 1200, grapes: ["Chardonnay"] },
  { name: "Picpoul de Pinet 2023", color: "white", appellation: "Picpoul de Pinet", region: "Languedoc", country: "France", htvaCents: 992, tvacCents: 1200, vintage: 2023, grapes: ["Piquepoul"] },
  { name: "Antchoubi Chenin-Chardonnay BIO 2023", color: "white", appellation: "Vin de France", region: "Sud", country: "France", htvaCents: 1240, tvacCents: 1500, vintage: 2023, grapes: ["Chenin", "Chardonnay"], styleTags: ["bio", "frais", "souple"] },
  { name: "La Trace blanc 2024", color: "white", appellation: "Languedoc", region: "Languedoc", country: "France", htvaCents: 1570, tvacCents: 1900, vintage: 2024 },
  { name: "Vacqueyras Cuvée Cornélius blanc 2025", color: "white", appellation: "Vacqueyras", region: "Rhône", country: "France", htvaCents: 1818, tvacCents: 2200, vintage: 2025, grapes: ["Grenache blanc", "Roussanne"] },
  { name: "Muscat de Beaumes de Venise Médaille d’Or 2024", color: "dessert", appellation: "Muscat de Beaumes-de-Venise", region: "Rhône", country: "France", htvaCents: 1983, tvacCents: 2400, vintage: 2024, grapes: ["Muscat"], bottleSizeMl: 750 },
  { name: "Châteauneuf-du-Pape blanc 2023", color: "white", appellation: "Châteauneuf-du-Pape", region: "Rhône", country: "France", htvaCents: 4545, tvacCents: 5500, vintage: 2023, grapes: ["Grenache blanc", "Roussanne"] },
  { name: "Condrieu Lys d’Or 2023", color: "white", appellation: "Condrieu", region: "Rhône septentrional", country: "France", htvaCents: 5620, tvacCents: 6800, vintage: 2023, grapes: ["Viognier"] },
  { name: "Château Roumieu Cuvée Prestige Sauternes 2007", color: "dessert", appellation: "Sauternes", region: "Bordeaux", country: "France", htvaCents: 3719, tvacCents: 4500, vintage: 2007, grapes: ["Sémillon", "Sauvignon blanc"] },
  { name: "Pouilly-Fumé « Les Moulins à Vent » 2023", color: "white", appellation: "Pouilly-Fumé", region: "Loire", country: "France", htvaCents: 1818, tvacCents: 2200, vintage: 2023, grapes: ["Sauvignon blanc"] },
  { name: "Sancerre Les Fontenelles 2021", color: "white", appellation: "Sancerre", region: "Loire", country: "France", htvaCents: 1818, tvacCents: 2200, vintage: 2021, grapes: ["Sauvignon blanc"] },
  { name: "Riesling 2024", color: "white", appellation: "Alsace", region: "Alsace", country: "France", htvaCents: 1240, tvacCents: 1500, vintage: 2024, grapes: ["Riesling"] },
  { name: "Pinot Gris 2024", color: "white", appellation: "Alsace", region: "Alsace", country: "France", htvaCents: 1240, tvacCents: 1500, vintage: 2024, grapes: ["Pinot Gris"] },
  { name: "Gewürztraminer 2024", color: "white", appellation: "Alsace", region: "Alsace", country: "France", htvaCents: 1818, tvacCents: 2200, vintage: 2024, grapes: ["Gewürztraminer"] },
  { name: "Gewürztraminer Vendanges Tardives 50cl 2024", color: "dessert", appellation: "Alsace Vendanges Tardives", region: "Alsace", country: "France", htvaCents: 3223, tvacCents: 3900, vintage: 2024, bottleSizeMl: 500, grapes: ["Gewürztraminer"] },
  { name: "Bourgogne Mâcon Les Charmes 2023", color: "white", appellation: "Mâcon", region: "Bourgogne", country: "France", htvaCents: 1570, tvacCents: 1900, vintage: 2023, grapes: ["Chardonnay"] },
  { name: "Bourgogne Tasteviné 2022", color: "white", appellation: "Bourgogne", region: "Bourgogne", country: "France", htvaCents: 1570, tvacCents: 1900, vintage: 2022, grapes: ["Chardonnay"] },
  { name: "Chablis 2020", color: "white", appellation: "Chablis", region: "Bourgogne", country: "France", htvaCents: 2397, tvacCents: 2900, vintage: 2020, grapes: ["Chardonnay"] },
  { name: "Hautes Côtes de Beaune Vieilles Vignes blanc 2023", color: "white", appellation: "Hautes-Côtes de Beaune", region: "Bourgogne", country: "France", htvaCents: 2893, tvacCents: 3500, vintage: 2023, grapes: ["Chardonnay"] },
  { name: "Rully Saint-Jacques 2022-2023", color: "white", appellation: "Rully", region: "Bourgogne", country: "France", htvaCents: 3223, tvacCents: 3900, grapes: ["Chardonnay"] },
  { name: "Auxey-Duresses blanc 2022", color: "white", appellation: "Auxey-Duresses", region: "Bourgogne", country: "France", htvaCents: 3223, tvacCents: 3900, vintage: 2022, grapes: ["Chardonnay"] },
  { name: "Pernand-Vergelesses blanc 2020", color: "white", appellation: "Pernand-Vergelesses", region: "Bourgogne", country: "France", htvaCents: 3719, tvacCents: 4500, vintage: 2020, grapes: ["Chardonnay"] },
  { name: "Auxey-Duresses 1er Cru blanc 2022", color: "white", appellation: "Auxey-Duresses Premier Cru", region: "Bourgogne", country: "France", htvaCents: 4050, tvacCents: 4900, vintage: 2022, grapes: ["Chardonnay"] },
  { name: "Chablis 1er Cru 2022", color: "white", appellation: "Chablis Premier Cru", region: "Bourgogne", country: "France", htvaCents: 4545, tvacCents: 5500, vintage: 2022, grapes: ["Chardonnay"] },
  { name: "Meursault 2022-2023", color: "white", appellation: "Meursault", region: "Bourgogne", country: "France", htvaCents: 6198, tvacCents: 7500, grapes: ["Chardonnay"] },
  { name: "Meursault Goutte d’Or / Les Charmes / Poruzot 2023", color: "white", appellation: "Meursault Premier Cru", region: "Bourgogne", country: "France", htvaCents: 9917, tvacCents: 12000, vintage: 2023, grapes: ["Chardonnay"] },
  { name: "Grillo 2024", color: "white", appellation: "Sicilia", region: "Sicile", country: "Italie", htvaCents: 702, tvacCents: 850, vintage: 2024, grapes: ["Grillo"] },
  { name: "Friulano des Doges de Venise 2024", color: "white", appellation: "Friuli", region: "Frioul", country: "Italie", htvaCents: 1219, tvacCents: 1475, vintage: 2024, grapes: ["Friulano"] },
  { name: "Chardonnay des Doges de Venise 2023", color: "white", appellation: "Veneto", region: "Vénétie", country: "Italie", htvaCents: 1219, tvacCents: 1475, vintage: 2023, grapes: ["Chardonnay"] },
  { name: "Pinot Grigio des Doges de Venise 2023", color: "white", appellation: "Veneto", region: "Vénétie", country: "Italie", htvaCents: 1219, tvacCents: 1475, vintage: 2023, grapes: ["Pinot Grigio"] },
  { name: "Collavini bianco 2023", color: "white", appellation: "Friuli", region: "Frioul", country: "Italie", htvaCents: 1322, tvacCents: 1600, vintage: 2023 },

  { name: "Pinot Noir d’Alsace 2024", color: "red", appellation: "Alsace", region: "Alsace", country: "France", htvaCents: 1219, tvacCents: 1475, vintage: 2024, grapes: ["Pinot Noir"], servingTemperature: "14–16 °C" },
  { name: "St-Nicolas-de-Bourgueil BIO 2024", color: "red", appellation: "Saint-Nicolas-de-Bourgueil", region: "Loire", country: "France", htvaCents: 1240, tvacCents: 1500, vintage: 2024, grapes: ["Cabernet Franc"], styleTags: ["bio", "frais", "fruité"], servingTemperature: "14–16 °C" },
  { name: "Pays d’Oc « Les Bons Plants » rouge 2023", color: "red", appellation: "Pays d’Oc", region: "Languedoc", country: "France", htvaCents: 702, tvacCents: 850, vintage: 2023 },
  { name: "Le Vieux Chai Fronton 2022", color: "red", appellation: "Fronton", region: "Sud-Ouest", country: "France", htvaCents: 1570, tvacCents: 1900, vintage: 2022, grapes: ["Négrette"] },
  { name: "La Trace Languedoc 2023", color: "red", appellation: "Languedoc", region: "Languedoc", country: "France", htvaCents: 1818, tvacCents: 2200, vintage: 2023, grapes: ["Syrah", "Grenache"] },
  { name: "St-Nicolas-de-Bourgueil BIO L’Éclosion 2022", color: "red", appellation: "Saint-Nicolas-de-Bourgueil", region: "Loire", country: "France", htvaCents: 1983, tvacCents: 2400, vintage: 2022, grapes: ["Cabernet Franc"], styleTags: ["bio", "frais", "élégant"] },
  { name: "Côtes du Rhône Villages Camille 2022-2023", color: "red", appellation: "Côtes du Rhône Villages", region: "Rhône", country: "France", htvaCents: 1157, tvacCents: 1400, grapes: ["Grenache", "Syrah"] },
  { name: "Beaumes de Venise rouge 2023", color: "red", appellation: "Beaumes-de-Venise", region: "Rhône", country: "France", htvaCents: 1653, tvacCents: 2000, vintage: 2023, grapes: ["Grenache", "Syrah"] },
  { name: "Côtes du Rhône Villages Combe Latour 2022", color: "red", appellation: "Côtes du Rhône Villages", region: "Rhône", country: "France", htvaCents: 1818, tvacCents: 2200, vintage: 2022, grapes: ["Grenache", "Syrah"] },
  { name: "Vacqueyras Cuvée Cornélius rouge 2023", color: "red", appellation: "Vacqueyras", region: "Rhône", country: "France", htvaCents: 1818, tvacCents: 2200, vintage: 2023, grapes: ["Grenache", "Syrah"] },
  { name: "Crozes-Hermitage 2023", color: "red", appellation: "Crozes-Hermitage", region: "Rhône septentrional", country: "France", htvaCents: 1983, tvacCents: 2400, vintage: 2023, grapes: ["Syrah"] },
  { name: "Beaumes de Venise Cuvée Hommage 2020", color: "red", appellation: "Beaumes-de-Venise", region: "Rhône", country: "France", htvaCents: 2066, tvacCents: 2500, vintage: 2020, grapes: ["Grenache", "Syrah"] },
  { name: "St Joseph Semaska 2023", color: "red", appellation: "Saint-Joseph", region: "Rhône septentrional", country: "France", htvaCents: 3223, tvacCents: 3900, vintage: 2023, grapes: ["Syrah"] },
  { name: "St Joseph Malleval 2023", color: "red", appellation: "Saint-Joseph", region: "Rhône septentrional", country: "France", htvaCents: 3719, tvacCents: 4500, vintage: 2023, grapes: ["Syrah"] },
  { name: "Châteauneuf-du-Pape BIO 2022", color: "red", appellation: "Châteauneuf-du-Pape", region: "Rhône", country: "France", htvaCents: 4050, tvacCents: 4900, vintage: 2022, grapes: ["Grenache", "Syrah", "Mourvèdre"], styleTags: ["bio", "garde", "structuré"] },
  { name: "Côte-Rôtie Château Montlys 2023", color: "red", appellation: "Côte-Rôtie", region: "Rhône septentrional", country: "France", htvaCents: 7355, tvacCents: 8900, vintage: 2023, grapes: ["Syrah"] },
  { name: "Châteauneuf-du-Pape Latour Magnum 2017", color: "red", appellation: "Châteauneuf-du-Pape", region: "Rhône", country: "France", htvaCents: 9091, tvacCents: 11000, vintage: 2017, bottleSizeMl: 1500, grapes: ["Grenache", "Syrah", "Mourvèdre"] },
  { name: "Côte-Rôtie Château Montlys Magnum 2023", color: "red", appellation: "Côte-Rôtie", region: "Rhône septentrional", country: "France", htvaCents: 15702, tvacCents: 19000, vintage: 2023, bottleSizeMl: 1500, grapes: ["Syrah"] },
  { name: "Bourgogne Dubuet-Monthélie 2023", color: "red", appellation: "Bourgogne", region: "Bourgogne", country: "France", htvaCents: 2066, tvacCents: 2500, vintage: 2023, grapes: ["Pinot Noir"] },
  { name: "Hautes Côtes de Beaune Vieilles Vignes rouge 2023", color: "red", appellation: "Hautes-Côtes de Beaune", region: "Bourgogne", country: "France", htvaCents: 2645, tvacCents: 3200, vintage: 2023, grapes: ["Pinot Noir"] },
  { name: "Santenay Vieilles Vignes 2020", color: "red", appellation: "Santenay", region: "Bourgogne", country: "France", htvaCents: 2893, tvacCents: 3500, vintage: 2020, grapes: ["Pinot Noir"] },
  { name: "Auxey-Duresses Les Hautés 2022", color: "red", appellation: "Auxey-Duresses", region: "Bourgogne", country: "France", htvaCents: 2893, tvacCents: 3500, vintage: 2022, grapes: ["Pinot Noir"] },
  { name: "Mercurey « Champ Roin » 2022-2023", color: "red", appellation: "Mercurey", region: "Bourgogne", country: "France", htvaCents: 3223, tvacCents: 3900, grapes: ["Pinot Noir"] },
  { name: "Monthélie Les Longènes 2023", color: "red", appellation: "Monthélie", region: "Bourgogne", country: "France", htvaCents: 3471, tvacCents: 4200, vintage: 2023, grapes: ["Pinot Noir"] },
  { name: "Pernand-Vergelesses 1er Cru Les Vergelesses 2020", color: "red", appellation: "Pernand-Vergelesses Premier Cru", region: "Bourgogne", country: "France", htvaCents: 4050, tvacCents: 4900, vintage: 2020, grapes: ["Pinot Noir"] },
  { name: "Savigny-lès-Beaune 1er Cru Serpentières 2020-2022", color: "red", appellation: "Savigny-lès-Beaune Premier Cru", region: "Bourgogne", country: "France", htvaCents: 4545, tvacCents: 5500, grapes: ["Pinot Noir"] },
  { name: "Pommard Les Noizons 2020", color: "red", appellation: "Pommard", region: "Bourgogne", country: "France", htvaCents: 4876, tvacCents: 5900, vintage: 2020, grapes: ["Pinot Noir"] },
  { name: "Monthélie 1er Cru 2022-2023", color: "red", appellation: "Monthélie Premier Cru", region: "Bourgogne", country: "France", htvaCents: 4876, tvacCents: 5900, grapes: ["Pinot Noir"] },
  { name: "Beaune 1er Cru 2019-2020", color: "red", appellation: "Beaune Premier Cru", region: "Bourgogne", country: "France", htvaCents: 5702, tvacCents: 6900, grapes: ["Pinot Noir"] },
  { name: "Aloxe-Corton 2022-2023", color: "red", appellation: "Aloxe-Corton", region: "Bourgogne", country: "France", htvaCents: 5702, tvacCents: 6900, grapes: ["Pinot Noir"] },
  { name: "Volnay 2022", color: "red", appellation: "Volnay", region: "Bourgogne", country: "France", htvaCents: 6198, tvacCents: 7500, vintage: 2022, grapes: ["Pinot Noir"] },
  { name: "Nuits-Saint-Georges 2023", color: "red", appellation: "Nuits-Saint-Georges", region: "Bourgogne", country: "France", htvaCents: 6198, tvacCents: 7500, vintage: 2023, grapes: ["Pinot Noir"] },
  { name: "Gevrey-Chambertin Les Evocelles 2022", color: "red", appellation: "Gevrey-Chambertin", region: "Bourgogne", country: "France", htvaCents: 7851, tvacCents: 9500, vintage: 2022, grapes: ["Pinot Noir"] },
  { name: "Gevrey-Chambertin Creux Brouillard 2023", color: "red", appellation: "Gevrey-Chambertin", region: "Bourgogne", country: "France", htvaCents: 7851, tvacCents: 9500, vintage: 2023, grapes: ["Pinot Noir"] },
  { name: "Volnay 1er Cru 2020", color: "red", appellation: "Volnay Premier Cru", region: "Bourgogne", country: "France", htvaCents: 9917, tvacCents: 12000, vintage: 2020, grapes: ["Pinot Noir"] },
  { name: "Gevrey-Chambertin 1er Cru Les Corbeaux 2020", color: "red", appellation: "Gevrey-Chambertin Premier Cru", region: "Bourgogne", country: "France", htvaCents: 11157, tvacCents: 13500, vintage: 2020, grapes: ["Pinot Noir"] },
  { name: "Charmes-Chambertin Grand Cru 2019", color: "red", appellation: "Charmes-Chambertin Grand Cru", region: "Bourgogne", country: "France", htvaCents: 22727, tvacCents: 27500, vintage: 2019, grapes: ["Pinot Noir"] },
  { name: "Château Monconseil Vieilles Vignes 2020", color: "red", appellation: "Blaye Côtes de Bordeaux", region: "Bordeaux", country: "France", htvaCents: 1157, tvacCents: 1400, vintage: 2020 },
  { name: "Château Magondeau Cuvée M 100% Merlot 2021", color: "red", appellation: "Fronsac", region: "Bordeaux", country: "France", htvaCents: 1240, tvacCents: 1500, vintage: 2021, grapes: ["Merlot"] },
  { name: "Château La Faurie Lalande de Pomerol 2019", color: "red", appellation: "Lalande-de-Pomerol", region: "Bordeaux", country: "France", htvaCents: 1818, tvacCents: 2200, vintage: 2019 },
  { name: "Château Monconseil Magnum Médaille d’Or 2019", color: "red", appellation: "Blaye Côtes de Bordeaux", region: "Bordeaux", country: "France", htvaCents: 2231, tvacCents: 2700, vintage: 2019, bottleSizeMl: 1500 },
  { name: "Château La Croix d’Armens St Emilion Grand Cru 2020-2022", color: "red", appellation: "Saint-Émilion Grand Cru", region: "Bordeaux", country: "France", htvaCents: 2397, tvacCents: 2900 },
  { name: "Château La Haye Saint-Estèphe 2020", color: "red", appellation: "Saint-Estèphe", region: "Bordeaux", country: "France", htvaCents: 2397, tvacCents: 2900, vintage: 2020 },
  { name: "Château Gazin Rocquencourt Pessac-Léognan 2016", color: "red", appellation: "Pessac-Léognan", region: "Bordeaux", country: "France", htvaCents: 2645, tvacCents: 3200, vintage: 2016 },
  { name: "Château La Croix d’Armens Cuvée Madeleine 2020", color: "red", appellation: "Saint-Émilion Grand Cru", region: "Bordeaux", country: "France", htvaCents: 3719, tvacCents: 4500, vintage: 2020 },
  { name: "Château Gazin-Rocquencourt Magnum 2016", color: "red", appellation: "Pessac-Léognan", region: "Bordeaux", country: "France", htvaCents: 5372, tvacCents: 6500, vintage: 2016, bottleSizeMl: 1500 },
  { name: "Nero d’Avola Sicile 2024", color: "red", appellation: "Sicilia", region: "Sicile", country: "Italie", htvaCents: 702, tvacCents: 850, vintage: 2024, grapes: ["Nero d’Avola"] },
  { name: "Malbec Argentina 2024", color: "red", appellation: "Mendoza", region: "Mendoza", country: "Argentine", htvaCents: 806, tvacCents: 975, vintage: 2024, grapes: ["Malbec"] },
  { name: "Primitivo Puglia bio 2023", color: "red", appellation: "Puglia", region: "Pouilles", country: "Italie", htvaCents: 992, tvacCents: 1200, vintage: 2023, grapes: ["Primitivo"], styleTags: ["bio", "solaire", "gourmand"] },
  { name: "Negroamaro Puglia bio 2023", color: "red", appellation: "Puglia", region: "Pouilles", country: "Italie", htvaCents: 992, tvacCents: 1200, vintage: 2023, grapes: ["Negroamaro"], styleTags: ["bio", "solaire", "souple"] },
  { name: "Rosso Veneto Nemm 2021", color: "red", appellation: "Veneto", region: "Vénétie", country: "Italie", htvaCents: 1219, tvacCents: 1475, vintage: 2021 },
  { name: "More Collavini 2022", color: "red", appellation: "Friuli", region: "Frioul", country: "Italie", htvaCents: 1322, tvacCents: 1600, vintage: 2022 },
  { name: "Montefalco Rosso bio 2020", color: "red", appellation: "Montefalco Rosso", region: "Ombrie", country: "Italie", htvaCents: 1570, tvacCents: 1900, vintage: 2020, grapes: ["Sangiovese", "Sagrantino"], styleTags: ["bio", "structuré", "épicé"] },
  { name: "Ribera del Duero Crianza Lecco 2020", color: "red", appellation: "Ribera del Duero", region: "Castille-et-León", country: "Espagne", htvaCents: 1570, tvacCents: 1900, vintage: 2020, grapes: ["Tempranillo"] },
  { name: "Valpolicella Ripasso 2021", color: "red", appellation: "Valpolicella Ripasso", region: "Vénétie", country: "Italie", htvaCents: 1983, tvacCents: 2400, vintage: 2021, grapes: ["Corvina", "Rondinella"] },
  { name: "Merlot Redmont 2019", color: "red", appellation: "Columbia Valley", region: "Washington", country: "États-Unis", htvaCents: 2066, tvacCents: 2500, vintage: 2019, grapes: ["Merlot"] },
  { name: "Nebbiolo d’Alba 2023", color: "red", appellation: "Nebbiolo d’Alba", region: "Piémont", country: "Italie", htvaCents: 2231, tvacCents: 2700, vintage: 2023, grapes: ["Nebbiolo"] },
  { name: "Ribera del Duero Lecco Magnum 2020", color: "red", appellation: "Ribera del Duero", region: "Castille-et-León", country: "Espagne", htvaCents: 3223, tvacCents: 3900, vintage: 2020, bottleSizeMl: 1500, grapes: ["Tempranillo"] },
  { name: "Moro 2020", color: "red", appellation: "Veneto", region: "Vénétie", country: "Italie", htvaCents: 3223, tvacCents: 3900, vintage: 2020, styleTags: ["raisins séchés", "intense", "velouté"] },
  { name: "Barbera d’Alba Lodali Lorens 2022", color: "red", appellation: "Barbera d’Alba", region: "Piémont", country: "Italie", htvaCents: 3471, tvacCents: 4200, vintage: 2022, grapes: ["Barbera"] },
  { name: "Brunello di Montalcino Maté bio 2020", color: "red", appellation: "Brunello di Montalcino", region: "Toscane", country: "Italie", htvaCents: 4050, tvacCents: 4900, vintage: 2020, grapes: ["Sangiovese"], styleTags: ["bio", "garde", "prestige"] },
  { name: "Barolo Ambrogio 2021", color: "red", appellation: "Barolo", region: "Piémont", country: "Italie", htvaCents: 4876, tvacCents: 5900, vintage: 2021, grapes: ["Nebbiolo"] },

  { name: "Pays d’Oc « Les Bons Plants » rosé 2024-2025", color: "rose", appellation: "Pays d’Oc", region: "Languedoc", country: "France", htvaCents: 702, tvacCents: 850, grapes: ["Cinsault", "Grenache"], servingTemperature: "8–10 °C" },
  { name: "Rosato 2024", color: "rose", appellation: "Italie", region: "Italie", country: "Italie", htvaCents: 702, tvacCents: 850, vintage: 2024, servingTemperature: "8–10 °C" },
  { name: "Nouveau Duo Cinsault-Grenache 2024", color: "rose", appellation: "Pays d’Oc", region: "Languedoc", country: "France", htvaCents: 992, tvacCents: 1200, vintage: 2024, grapes: ["Cinsault", "Grenache"], servingTemperature: "8–10 °C" },
  { name: "Côtes de Provence rosé « Madam » 2023", color: "rose", appellation: "Côtes de Provence", region: "Provence", country: "France", htvaCents: 1219, tvacCents: 1475, vintage: 2023, servingTemperature: "8–10 °C" },

  { name: "Pouilly-Fumé demi-bouteille 2023", color: "white", appellation: "Pouilly-Fumé", region: "Loire", country: "France", htvaCents: 1149, tvacCents: 1390, vintage: 2023, bottleSizeMl: 375, grapes: ["Sauvignon blanc"] },
  { name: "Sancerre demi-bouteille 2021", color: "white", appellation: "Sancerre", region: "Loire", country: "France", htvaCents: 1149, tvacCents: 1390, vintage: 2021, bottleSizeMl: 375, grapes: ["Sauvignon blanc"] },
  { name: "Château Monconseil Blaye demi-bouteille 2021", color: "red", appellation: "Blaye Côtes de Bordeaux", region: "Bordeaux", country: "France", htvaCents: 579, tvacCents: 700, vintage: 2021, bottleSizeMl: 375 },
  { name: "Nero d’Avola bio demi-bouteille 2022", color: "red", appellation: "Sicilia", region: "Sicile", country: "Italie", htvaCents: 579, tvacCents: 700, vintage: 2022, bottleSizeMl: 375, grapes: ["Nero d’Avola"], styleTags: ["bio", "fruité", "souple"] },

  { name: "Les bulles de Chamdor", color: "sparkling", appellation: "Vin mousseux", region: "France", country: "France", htvaCents: 579, tvacCents: 700, grapes: ["Assemblage"], servingTemperature: "6–8 °C" },
  { name: "Spumante Arcobello 8,5%", color: "sparkling", appellation: "Spumante", region: "Italie", country: "Italie", htvaCents: 744, tvacCents: 900, grapes: ["Assemblage"], servingTemperature: "6–8 °C" },
  { name: "Cava Red Edition", color: "sparkling", appellation: "Cava", region: "Catalogne", country: "Espagne", htvaCents: 1129, tvacCents: 1400, grapes: ["Macabeu", "Xarel-lo", "Parellada"], servingTemperature: "6–8 °C" },
  { name: "Franciacorta Milledi 2020 blanc de blanc", color: "sparkling", appellation: "Franciacorta", region: "Lombardie", country: "Italie", htvaCents: 3719, tvacCents: 4500, vintage: 2020, grapes: ["Chardonnay"], servingTemperature: "6–8 °C" },
  { name: "Champagne Comtesse de Gussac", color: "sparkling", appellation: "Champagne", region: "Champagne", country: "France", htvaCents: 2397, tvacCents: 2900, grapes: ["Chardonnay", "Pinot Noir", "Meunier"], servingTemperature: "6–8 °C" },
  { name: "Champagne Comtesse de Gussac rosé", color: "sparkling", appellation: "Champagne Rosé", region: "Champagne", country: "France", htvaCents: 3273, tvacCents: 3900, grapes: ["Chardonnay", "Pinot Noir", "Meunier"], servingTemperature: "6–8 °C", styleTags: ["rosé", "festif", "frais"] },
  { name: "Champagne Gruet blanc de blanc", color: "sparkling", appellation: "Champagne Blanc de Blancs", region: "Champagne", country: "France", htvaCents: 3223, tvacCents: 3900, grapes: ["Chardonnay"], servingTemperature: "6–8 °C" },
  { name: "Champagne Esterlin Cuvée Éclat demi-bouteille", color: "sparkling", appellation: "Champagne", region: "Champagne", country: "France", htvaCents: 1653, tvacCents: 2000, bottleSizeMl: 375, grapes: ["Chardonnay", "Pinot Noir", "Meunier"], servingTemperature: "6–8 °C" },
  { name: "Champagne Esterlin Brut Nature Millésimé 2009", color: "sparkling", appellation: "Champagne Brut Nature", region: "Champagne", country: "France", htvaCents: 4793, tvacCents: 5800, vintage: 2009, servingTemperature: "6–8 °C" },
  { name: "Champagne Esterlin Prestige Cléo blanc de blanc 2010", color: "sparkling", appellation: "Champagne Blanc de Blancs", region: "Champagne", country: "France", htvaCents: 5372, tvacCents: 6500, vintage: 2010, grapes: ["Chardonnay"], servingTemperature: "6–8 °C" },
  { name: "Champagne Esterlin Nature millésimé avec coffret 4 verres", color: "sparkling", appellation: "Champagne", region: "Champagne", country: "France", htvaCents: 7851, tvacCents: 9500, servingTemperature: "6–8 °C" },
];

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 72);
}

function inferProducer(row: FaWineRow) {
  if (row.producer) return row.producer;
  if (row.name.startsWith("Château ")) return row.name.split(/ 20| 19| -| «| Cuvée| Magnum| rouge| blanc/i)[0];
  if (row.name.includes("Esterlin")) return "Champagne Esterlin";
  if (row.name.includes("Comtesse de Gussac")) return "Comtesse de Gussac";
  if (row.name.includes("Gruet")) return "Champagne Gruet";
  if (row.name.includes("Collavini")) return "Collavini";
  if (row.name.includes("Lecco")) return "Lecco";
  if (row.name.includes("Bons Plants")) return "Les Bons Plants";
  return row.name.split(" 20")[0].split(" «")[0];
}

function inferGrapes(row: FaWineRow) {
  if (row.grapes?.length) return row.grapes;
  if (row.color === "sparkling") return ["Assemblage"];
  if (row.color === "white") return ["Chardonnay"];
  if (row.color === "rose") return ["Grenache", "Cinsault"];
  const text = `${row.name} ${row.appellation} ${row.region}`.toLowerCase();
  if (text.includes("merlot")) return ["Merlot"];
  if (text.includes("pinot") || text.includes("bourgogne") || text.includes("beaune") || text.includes("volnay") || text.includes("gevrey") || text.includes("pommard") || text.includes("aloxe") || text.includes("nuits")) return ["Pinot Noir"];
  if (text.includes("cahors") || text.includes("malbec")) return ["Malbec"];
  if (text.includes("madiran")) return ["Tannat"];
  if (text.includes("syrah") || text.includes("rhône") || text.includes("languedoc") || text.includes("corbières")) return ["Syrah", "Grenache"];
  if (text.includes("nebbiolo") || text.includes("barolo")) return ["Nebbiolo"];
  if (text.includes("barbera")) return ["Barbera"];
  return ["Cabernet Sauvignon", "Merlot"];
}

function inferCulinaryTags(row: FaWineRow) {
  if (row.culinaryTags?.length) return row.culinaryTags;
  if (row.color === "sparkling") return ["aperitif", "crustaces", "celebration", "poisson"];
  if (row.color === "white") return ["poisson", "crustaces", "volaille", "aperitif"];
  if (row.color === "rose") return ["aperitif", "volaille", "salade", "epices"];
  if (row.color === "dessert") return ["dessert", "fromage", "fruits", "sucre"];
  const text = `${row.name} ${row.appellation} ${row.region}`.toLowerCase();
  if (text.includes("pinot") || text.includes("bourgogne") || text.includes("beaujolais")) return ["volaille", "canard", "champignons", "fromage"];
  if (text.includes("rhône") || text.includes("madiran") || text.includes("cahors") || text.includes("fronton")) return ["boeuf", "agneau", "canard", "fromage"];
  return ["boeuf", "canard", "champignons", "fromage"];
}

function inferStyleTags(row: FaWineRow) {
  if (row.styleTags?.length) return row.styleTags;
  if (row.color === "sparkling") return ["effervescent", "festif", "frais"];
  if (row.color === "white") return ["frais", "gastronomique", "sec"];
  if (row.color === "rose") return ["frais", "estival", "léger"];
  if (row.color === "dessert") return ["moelleux", "gourmand", "sucré"];
  if (row.tvacCents >= 5900) return ["prestige", "garde", "structuré"];
  return ["classique", "gourmand", "accord"];
}

function descriptionFor(row: FaWineRow) {
  const type = row.color === "sparkling" ? "effervescent" : row.color === "rose" ? "rosé" : row.color === "dessert" ? "vin doux" : row.color === "white" ? "blanc" : "rouge";
  return `Référence ${type} issue du catalogue François-Alain 2026, prête pour une sélection Vinaria curatée.`;
}

export const fa2026WineReferences: WineProduct[] = fa2026Rows.map((row, index) => ({
  id: `wine-fa2026-${slugify(row.name)}`,
  sku: `FA26-${String(index + 1).padStart(3, "0")}`,
  name: row.name,
  producer: inferProducer(row),
  appellation: row.appellation,
  region: row.region,
  country: row.country,
  vintage: row.vintage,
  color: row.color,
  grapes: inferGrapes(row),
  culinaryTags: inferCulinaryTags(row),
  styleTags: inferStyleTags(row),
  description: descriptionFor(row),
  storytelling: "Sélection reprise du Catalogue FA 2026, avec prix TVAC affiché côté client et base HTVA conservée pour le pilotage interne.",
  servingTemperature: row.servingTemperature ?? (row.color === "white" || row.color === "rose" || row.color === "sparkling" ? "8–10 °C" : "16–18 °C"),
  bottleSizeMl: row.bottleSizeMl ?? 750,
  priceCents: row.tvacCents,
  costPriceCents: row.htvaCents,
  taxRate: 21,
  available: true,
  stockStatus: "in_stock",
  stockQuantity: 12,
  partnerId: "partner-francois-alain",
}));

