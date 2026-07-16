import type { WineProduct } from "@/types";

type ImageFocus = NonNullable<WineProduct["imageFocus"]>;

type RedWineRow = {
  name: string;
  producer: string;
  appellation: string;
  region: string;
  country: string;
  priceCents: number;
  image: string;
  imageFocus: ImageFocus;
  grapes?: string[];
  culinaryTags?: string[];
  styleTags?: string[];
  servingTemperature?: string;
  vintage?: number;
};

const redRows: RedWineRow[] = [
  { name: "1725 – Cabernet Sauvignon", producer: "Barton et Guestier", appellation: "Vin de France", region: "France", country: "France", priceCents: 687, image: "/wines/catalogue-red-001.png", imageFocus: "left", grapes: ["Cabernet Sauvignon"] },
  { name: "1725 – Merlot", producer: "Barton & Guestier", appellation: "Vin de France", region: "France", country: "France", priceCents: 687, image: "/wines/catalogue-red-001.png", imageFocus: "center", grapes: ["Merlot"] },
  { name: "Aglianico – Terre Borboniche", producer: "Domus Vini", appellation: "Beneventano", region: "Campanie", country: "Italie", priceCents: 786, image: "/wines/catalogue-red-001.png", imageFocus: "right", grapes: ["Aglianico"] },
  { name: "Amiral de Beychevelle", producer: "Château Beychevelle", appellation: "Saint-Julien", region: "Bordeaux", country: "France", priceCents: 4059, image: "/wines/catalogue-red-004.png", imageFocus: "left" },
  { name: "Anjou Vieilles Vignes « Château des Rochettes »", producer: "Château des Rochettes", appellation: "Anjou", region: "Loire", country: "France", priceCents: 992, image: "/wines/catalogue-red-004.png", imageFocus: "center", grapes: ["Cabernet Franc"] },
  { name: "Ballade de La Pointe", producer: "Château La Pointe", appellation: "Pomerol", region: "Bordeaux", country: "France", priceCents: 2965, image: "/wines/catalogue-red-004.png", imageFocus: "right" },
  { name: "Bandol", producer: "Château Guilhem Tournier", appellation: "Bandol", region: "Provence", country: "France", priceCents: 2072, image: "/wines/catalogue-red-005.png", imageFocus: "left", grapes: ["Mourvèdre", "Grenache", "Syrah"] },
  { name: "Barbera d’Asti « Tre Roveri »", producer: "Pico Maccario", appellation: "Barbera d’Asti", region: "Piémont", country: "Italie", priceCents: 1857, image: "/wines/catalogue-red-005.png", imageFocus: "center", grapes: ["Barbera"] },
  { name: "Barbera – Stella Rossa", producer: "Marco Bonfante", appellation: "Barbera d’Asti", region: "Piémont", country: "Italie", priceCents: 1070, image: "/wines/catalogue-red-005.png", imageFocus: "right", grapes: ["Barbera"] },
  { name: "Bardolino Rouge Classico « Ca’Delle Rose »", producer: "Domus Vini", appellation: "Bardolino Classico", region: "Vénétie", country: "Italie", priceCents: 740, image: "/wines/catalogue-red-006.png", imageFocus: "left", grapes: ["Corvina", "Rondinella"] },
  { name: "Barolo Bussia", producer: "Marco Bonfante", appellation: "Barolo", region: "Piémont", country: "Italie", priceCents: 4372, image: "/wines/catalogue-red-006.png", imageFocus: "center", grapes: ["Nebbiolo"] },
  { name: "Baron de Brane", producer: "Château Brane Cantenac", appellation: "Margaux", region: "Bordeaux", country: "France", priceCents: 3667, image: "/wines/catalogue-red-006.png", imageFocus: "right" },
  { name: "Baron d’Estours du Château Saint-Fort", producer: "Château Tour Saint-Fort", appellation: "Saint-Estèphe", region: "Bordeaux", country: "France", priceCents: 1772, image: "/wines/catalogue-red-008.png", imageFocus: "left" },
  { name: "Beaumes de Venise « Terres Jaunes »", producer: "Domaine La Ferme Saint Martin", appellation: "Beaumes-de-Venise", region: "Rhône", country: "France", priceCents: 1196, image: "/wines/catalogue-red-008.png", imageFocus: "center", grapes: ["Grenache", "Syrah"] },
  { name: "Beaune 1er Cru « Les Chouacheux »", producer: "Domaine Billard Père & Fils", appellation: "Beaune Premier Cru", region: "Bourgogne", country: "France", priceCents: 3712, image: "/wines/catalogue-red-008.png", imageFocus: "right", grapes: ["Pinot Noir"] },
  { name: "Borgonero – Toscana", producer: "Borgo Scopeto", appellation: "Toscana", region: "Toscane", country: "Italie", priceCents: 1367, image: "/wines/catalogue-red-009.png", imageFocus: "left", grapes: ["Sangiovese", "Merlot"] },
  { name: "Bourgogne Côtes d’Auxerre – Domaine Verret", producer: "Domaine Verret", appellation: "Bourgogne Côtes d’Auxerre", region: "Bourgogne", country: "France", priceCents: 1669, image: "/wines/catalogue-red-009.png", imageFocus: "center", grapes: ["Pinot Noir"] },
  { name: "Bourgogne Pinot Noir", producer: "Domaine Chapelle", appellation: "Bourgogne", region: "Bourgogne", country: "France", priceCents: 2159, image: "/wines/catalogue-red-009.png", imageFocus: "right", grapes: ["Pinot Noir"] },
  { name: "Bourgogne Pinot Noir « Buxy »", producer: "Caves de Buxy", appellation: "Bourgogne", region: "Bourgogne", country: "France", priceCents: 1241, image: "/wines/catalogue-red-010.png", imageFocus: "left", grapes: ["Pinot Noir"] },
  { name: "Bourgogne Pinot Noir « Côte d’Or »", producer: "Domaine de la Choupette", appellation: "Bourgogne Côte d’Or", region: "Bourgogne", country: "France", priceCents: 2553, image: "/wines/catalogue-red-010.png", imageFocus: "center", grapes: ["Pinot Noir"] },
  { name: "Bourgueil « Cuvée des Alouettes »", producer: "Thierry Boucard", appellation: "Bourgueil", region: "Loire", country: "France", priceCents: 868, image: "/wines/catalogue-red-010.png", imageFocus: "right", grapes: ["Cabernet Franc"] },
  { name: "Brunel de la Gardine", producer: "Brunel Père & Fils", appellation: "Côtes du Rhône", region: "Rhône", country: "France", priceCents: 891, image: "/wines/catalogue-red-011.png", imageFocus: "right", grapes: ["Grenache", "Syrah"] },
  { name: "Brunello di Montalcino – Caparzo", producer: "Caparzo", appellation: "Brunello di Montalcino", region: "Toscane", country: "Italie", priceCents: 3146, image: "/wines/catalogue-red-012.png", imageFocus: "left", grapes: ["Sangiovese"] },
  { name: "Brunello di Montalcino « San Polino »", producer: "San Polino", appellation: "Brunello di Montalcino", region: "Toscane", country: "Italie", priceCents: 5086, image: "/wines/catalogue-red-012.png", imageFocus: "center", grapes: ["Sangiovese"] },
  { name: "Brunello di Montalcino Riserva « San Polino »", producer: "San Polino", appellation: "Brunello di Montalcino Riserva", region: "Toscane", country: "Italie", priceCents: 8641, image: "/wines/catalogue-red-012.png", imageFocus: "right", grapes: ["Sangiovese"] },
  { name: "Cabernet-Sauvignon « Conti d’Arco »", producer: "Conti d’Arco", appellation: "Trentino", region: "Trentin", country: "Italie", priceCents: 883, image: "/wines/catalogue-red-013.png", imageFocus: "left", grapes: ["Cabernet Sauvignon"] },
  { name: "Cabernet Sauvignon « Terre Piane »", producer: "Ornella Bellia", appellation: "Veneto", region: "Vénétie", country: "Italie", priceCents: 780, image: "/wines/catalogue-red-013.png", imageFocus: "center", grapes: ["Cabernet Sauvignon"] },
  { name: "Cahors – Pur Plaisir", producer: "Château Haut-Monplaisir", appellation: "Cahors", region: "Sud-Ouest", country: "France", priceCents: 2996, image: "/wines/catalogue-red-013.png", imageFocus: "right", grapes: ["Malbec"] },
  { name: "Caiarossa", producer: "Caiarossa", appellation: "Toscana", region: "Toscane", country: "Italie", priceCents: 6523, image: "/wines/catalogue-red-014.png", imageFocus: "left", grapes: ["Sangiovese", "Merlot", "Syrah"] },
  { name: "Cairanne « La Brunote »", producer: "Domaine Alary", appellation: "Cairanne", region: "Rhône", country: "France", priceCents: 1167, image: "/wines/catalogue-red-014.png", imageFocus: "center", grapes: ["Grenache", "Syrah"] },
  { name: "Camp Del Gal – Domaine La Croix Belle", producer: "Domaine La Croix Belle", appellation: "Pays d’Oc", region: "Languedoc", country: "France", priceCents: 840, image: "/wines/catalogue-red-014.png", imageFocus: "right", grapes: ["Syrah", "Grenache"] },
  { name: "Candela Classic", producer: "Candela", appellation: "Vin rouge", region: "Méditerranée", country: "France", priceCents: 738, image: "/wines/catalogue-red-015.png", imageFocus: "left" },
  { name: "Cannonau di Sardegna", producer: "OJE-Sequi", appellation: "Cannonau di Sardegna", region: "Sardaigne", country: "Italie", priceCents: 1345, image: "/wines/catalogue-red-015.png", imageFocus: "center", grapes: ["Cannonau"] },
  { name: "Caringole – Domaine La Croix Belle", producer: "Domaine La Croix Belle", appellation: "Pays d’Oc", region: "Languedoc", country: "France", priceCents: 671, image: "/wines/catalogue-red-015.png", imageFocus: "right", grapes: ["Syrah", "Grenache"] },
  { name: "Chambolle Musigny « Les Condemennes »", producer: "Misset", appellation: "Chambolle-Musigny", region: "Bourgogne", country: "France", priceCents: 4293, image: "/wines/catalogue-red-016.png", imageFocus: "left", grapes: ["Pinot Noir"] },
  { name: "Champs aux Fruits", producer: "Domaine Sauzet", appellation: "Bourgogne", region: "Bourgogne", country: "France", priceCents: 1181, image: "/wines/catalogue-red-016.png", imageFocus: "center", grapes: ["Pinot Noir"] },
  { name: "Chassagne Montrachet « La Platière »", producer: "Domaine de la Choupette", appellation: "Chassagne-Montrachet", region: "Bourgogne", country: "France", priceCents: 4124, image: "/wines/catalogue-red-016.png", imageFocus: "right", grapes: ["Pinot Noir"] },
  { name: "Chassagne Montrachet « Morichots »", producer: "Domaine Billard Père & Fils", appellation: "Chassagne-Montrachet", region: "Bourgogne", country: "France", priceCents: 3623, image: "/wines/catalogue-red-017.png", imageFocus: "left", grapes: ["Pinot Noir"] },
  { name: "Château Beaubois « Cuvée Expression »", producer: "Château Beaubois", appellation: "Costières de Nîmes", region: "Rhône", country: "France", priceCents: 828, image: "/wines/catalogue-red-017.png", imageFocus: "center", grapes: ["Syrah", "Grenache"] },
  { name: "Château Beaubois « Élégance »", producer: "Château Beaubois", appellation: "Costières de Nîmes", region: "Rhône", country: "France", priceCents: 1131, image: "/wines/catalogue-red-017.png", imageFocus: "right", grapes: ["Syrah", "Grenache"] },
  { name: "Château Beaubois Rouge Denim", producer: "Château Beaubois", appellation: "Costières de Nîmes", region: "Rhône", country: "France", priceCents: 1627, image: "/wines/catalogue-red-018.png", imageFocus: "left", grapes: ["Syrah", "Grenache"] },
  { name: "Château Bon Baron – Pinot Noir", producer: "Château Bon Baron", appellation: "Belgique", region: "Wallonie", country: "Belgique", priceCents: 2402, image: "/wines/catalogue-red-018.png", imageFocus: "center", grapes: ["Pinot Noir"] },
  { name: "Château Bouscassé – Madiran", producer: "Alain Brumont", appellation: "Madiran", region: "Sud-Ouest", country: "France", priceCents: 1952, image: "/wines/catalogue-red-018.png", imageFocus: "right", grapes: ["Tannat", "Cabernet Franc"] },
  { name: "Château Bouscaut – Cru Classé – Rouge", producer: "Château Bouscaut", appellation: "Pessac-Léognan", region: "Bordeaux", country: "France", priceCents: 3965, image: "/wines/catalogue-red-019.png", imageFocus: "left" },
  { name: "Château Boyd Cantenac", producer: "Château Boyd Cantenac", appellation: "Margaux", region: "Bordeaux", country: "France", priceCents: 4632, image: "/wines/catalogue-red-019.png", imageFocus: "center" },
  { name: "Château Buisson-Redon", producer: "Seze", appellation: "Bordeaux", region: "Bordeaux", country: "France", priceCents: 786, image: "/wines/catalogue-red-019.png", imageFocus: "right" },
  { name: "Château Camus", producer: "Larriaut", appellation: "Graves", region: "Bordeaux", country: "France", priceCents: 1051, image: "/wines/catalogue-red-020.png", imageFocus: "left" },
  { name: "Château Canon La Gaffelière", producer: "Château Canon La Gaffelière", appellation: "Saint-Émilion Grand Cru", region: "Bordeaux", country: "France", priceCents: 1175, image: "/wines/catalogue-red-020.png", imageFocus: "center" },
  { name: "Château Carbonnieux – Grand Cru Classé", producer: "Château Carbonnieux", appellation: "Pessac-Léognan", region: "Bordeaux", country: "France", priceCents: 4398, image: "/wines/catalogue-red-020.png", imageFocus: "right" },
  { name: "Château Chasse-Spleen", producer: "Château Chasse-Spleen", appellation: "Moulis-en-Médoc", region: "Bordeaux", country: "France", priceCents: 4233, image: "/wines/catalogue-red-021.png", imageFocus: "left" },
  { name: "Château Cordet", producer: "Château Monbrison", appellation: "Margaux", region: "Bordeaux", country: "France", priceCents: 2572, image: "/wines/catalogue-red-021.png", imageFocus: "center" },
  { name: "Château Correnson « Réserve Spéciale »", producer: "Peyre", appellation: "Côtes du Rhône", region: "Rhône", country: "France", priceCents: 921, image: "/wines/catalogue-red-021.png", imageFocus: "right", grapes: ["Grenache", "Syrah"] },
  { name: "Château Crabitey", producer: "Larriaut", appellation: "Graves", region: "Bordeaux", country: "France", priceCents: 1491, image: "/wines/catalogue-red-022.png", imageFocus: "left" },
  { name: "Château Croix Cardinale", producer: "Famille Decoster", appellation: "Saint-Émilion Grand Cru", region: "Bordeaux", country: "France", priceCents: 3248, image: "/wines/catalogue-red-022.png", imageFocus: "center" },
  { name: "Château Crusquet-Sabourin", producer: "Sabourin", appellation: "Blaye Côtes de Bordeaux", region: "Bordeaux", country: "France", priceCents: 953, image: "/wines/catalogue-red-022.png", imageFocus: "right" },
  { name: "Château de Fieuzal – Cru Classé de Graves", producer: "Château de Fieuzal", appellation: "Pessac-Léognan", region: "Bordeaux", country: "France", priceCents: 4992, image: "/wines/catalogue-red-023.png", imageFocus: "left" },
  { name: "Château de Lancyre « Pic Saint-Loup »", producer: "Château de Lancyre", appellation: "Pic Saint-Loup", region: "Languedoc", country: "France", priceCents: 1532, image: "/wines/catalogue-red-023.png", imageFocus: "center", grapes: ["Syrah", "Grenache"] },
  { name: "Château de L’Aubrade", producer: "Lobre", appellation: "Bordeaux", region: "Bordeaux", country: "France", priceCents: 719, image: "/wines/catalogue-red-023.png", imageFocus: "right" },
  { name: "Château de Montfrin", producer: "Château de Montfrin", appellation: "Côtes du Rhône", region: "Rhône", country: "France", priceCents: 885, image: "/wines/catalogue-red-024.png", imageFocus: "left", grapes: ["Grenache", "Syrah"] },
  { name: "Château des Granges d’Or – Médoc", producer: "Château des Granges d’Or", appellation: "Médoc", region: "Bordeaux", country: "France", priceCents: 986, image: "/wines/catalogue-red-024.png", imageFocus: "center" },
  { name: "Château des Moines", producer: "Darnajou", appellation: "Lalande-de-Pomerol", region: "Bordeaux", country: "France", priceCents: 1471, image: "/wines/catalogue-red-024.png", imageFocus: "right" },
  { name: "Château du Glana", producer: "Château du Glana", appellation: "Saint-Julien", region: "Bordeaux", country: "France", priceCents: 2887, image: "/wines/catalogue-red-025.png", imageFocus: "left" },
  { name: "Château Duluc de Branaire-Ducru", producer: "Château Branaire-Ducru", appellation: "Saint-Julien", region: "Bordeaux", country: "France", priceCents: 3337, image: "/wines/catalogue-red-025.png", imageFocus: "center" },
  { name: "Château Duplessis", producer: "Château Duplessis", appellation: "Moulis-en-Médoc", region: "Bordeaux", country: "France", priceCents: 2196, image: "/wines/catalogue-red-025.png", imageFocus: "right" },
  { name: "Château Durfort Vivens – Le Plateau", producer: "Château Durfort Vivens", appellation: "Margaux", region: "Bordeaux", country: "France", priceCents: 3896, image: "/wines/catalogue-red-026.png", imageFocus: "left" },
  { name: "Château Fleur Cardinale", producer: "Château Fleur Cardinale", appellation: "Saint-Émilion Grand Cru", region: "Bordeaux", country: "France", priceCents: 5284, image: "/wines/catalogue-red-026.png", imageFocus: "center" },
  { name: "Château Fonsalade – Saint-Chinian", producer: "Château Fonsalade", appellation: "Saint-Chinian", region: "Languedoc", country: "France", priceCents: 1357, image: "/wines/catalogue-red-026.png", imageFocus: "right", grapes: ["Syrah", "Grenache"] },
  { name: "Château Grand Ormeau", producer: "Château Grand Ormeau", appellation: "Lalande-de-Pomerol", region: "Bordeaux", country: "France", priceCents: 2251, image: "/wines/catalogue-red-027.png", imageFocus: "left" },
  { name: "Château Grand Pey Lescours", producer: "Escure", appellation: "Saint-Émilion Grand Cru", region: "Bordeaux", country: "France", priceCents: 1915, image: "/wines/catalogue-red-027.png", imageFocus: "center" },
  { name: "Château Grand-Puy Ducasse", producer: "Château Grand-Puy Ducasse", appellation: "Pauillac", region: "Bordeaux", country: "France", priceCents: 3902, image: "/wines/catalogue-red-027.png", imageFocus: "right" },
  { name: "Château Haut-Monplaisir – Cahors Tradition", producer: "Château Haut-Monplaisir", appellation: "Cahors", region: "Sud-Ouest", country: "France", priceCents: 1225, image: "/wines/catalogue-red-028.png", imageFocus: "left", grapes: ["Malbec"] },
  { name: "Château Ksara – Réserve du Couvent", producer: "Château Ksara", appellation: "Vallée de la Bekaa", region: "Bekaa", country: "Liban", priceCents: 1107, image: "/wines/catalogue-red-028.png", imageFocus: "center", grapes: ["Cabernet Sauvignon", "Syrah"] },
  { name: "Château Labégorce", producer: "Château Labégorce", appellation: "Margaux", region: "Bordeaux", country: "France", priceCents: 4192, image: "/wines/catalogue-red-028.png", imageFocus: "right" },
  { name: "Château Lacoste Borie", producer: "Château Lacoste Borie", appellation: "Pauillac", region: "Bordeaux", country: "France", priceCents: 3588, image: "/wines/catalogue-red-029.png", imageFocus: "left" },
  { name: "Château La Gorce – Cru Bourgeois", producer: "Fabre", appellation: "Médoc", region: "Bordeaux", country: "France", priceCents: 1168, image: "/wines/catalogue-red-029.png", imageFocus: "center" },
  { name: "Château Lagrange", producer: "Château Lagrange", appellation: "Saint-Julien", region: "Bordeaux", country: "France", priceCents: 5701, image: "/wines/catalogue-red-029.png", imageFocus: "right" },
  { name: "Château La Lagune", producer: "Château La Lagune", appellation: "Haut-Médoc", region: "Bordeaux", country: "France", priceCents: 4928, image: "/wines/catalogue-red-030.png", imageFocus: "left" },
  { name: "Château Lalande Borie", producer: "Château Lalande Borie", appellation: "Saint-Julien", region: "Bordeaux", country: "France", priceCents: 3685, image: "/wines/catalogue-red-030.png", imageFocus: "center" },
  { name: "Château Lamothe Bouscaut Rouge", producer: "Château Lamothe Bouscaut", appellation: "Pessac-Léognan", region: "Bordeaux", country: "France", priceCents: 2401, image: "/wines/catalogue-red-030.png", imageFocus: "right" },
  { name: "Château la Petite Tour de Bessan", producer: "Château la Petite Tour de Bessan", appellation: "Margaux", region: "Bordeaux", country: "France", priceCents: 2170, image: "/wines/catalogue-red-031.png", imageFocus: "left" },
  { name: "Château La Pointe", producer: "Château La Pointe", appellation: "Pomerol", region: "Bordeaux", country: "France", priceCents: 5376, image: "/wines/catalogue-red-031.png", imageFocus: "center" },
  { name: "Château le Fagé – Bergerac", producer: "Château Le Fagé", appellation: "Bergerac", region: "Sud-Ouest", country: "France", priceCents: 998, image: "/wines/catalogue-red-031.png", imageFocus: "right", grapes: ["Merlot", "Cabernet Sauvignon"] },
  { name: "Château Le Fagé « Cuvée Prestige »", producer: "Château Le Fagé", appellation: "Bergerac", region: "Sud-Ouest", country: "France", priceCents: 1352, image: "/wines/catalogue-red-032.png", imageFocus: "left", grapes: ["Merlot", "Cabernet Sauvignon"] },
  { name: "Château Le Raz – Bergerac", producer: "Château le Raz", appellation: "Bergerac", region: "Sud-Ouest", country: "France", priceCents: 707, image: "/wines/catalogue-red-032.png", imageFocus: "center", grapes: ["Merlot", "Cabernet Sauvignon"] },
  { name: "Château « Les Pâques »", producer: "Martin Père et Fils", appellation: "Côtes de Bordeaux", region: "Bordeaux", country: "France", priceCents: 804, image: "/wines/catalogue-red-032.png", imageFocus: "right" },
  { name: "Château le Thil", producer: "Bossuet", appellation: "Bordeaux", region: "Bordeaux", country: "France", priceCents: 947, image: "/wines/catalogue-red-033.png", imageFocus: "left" },
  { name: "Château Malescasse – Cru Bourgeois", producer: "Château Malescasse", appellation: "Haut-Médoc", region: "Bordeaux", country: "France", priceCents: 2534, image: "/wines/catalogue-red-033.png", imageFocus: "center" },
  { name: "Château Mayne-Vieil", producer: "Seze", appellation: "Fronsac", region: "Bordeaux", country: "France", priceCents: 1056, image: "/wines/catalogue-red-033.png", imageFocus: "right" },
  { name: "Château Mayne Vieil « Cuvée Aliénor »", producer: "Seze", appellation: "Fronsac", region: "Bordeaux", country: "France", priceCents: 1482, image: "/wines/catalogue-red-034.png", imageFocus: "left" },
  { name: "Château Mondazur", producer: "Château Mondazur", appellation: "Bordeaux", region: "Bordeaux", country: "France", priceCents: 1434, image: "/wines/catalogue-red-034.png", imageFocus: "center" },
  { name: "Château Mondesir", producer: "Château Mondesir", appellation: "Bordeaux", region: "Bordeaux", country: "France", priceCents: 1198, image: "/wines/catalogue-red-034.png", imageFocus: "right" },
  { name: "Château Montaiguillon", producer: "Château Montaiguillon", appellation: "Montagne-Saint-Émilion", region: "Bordeaux", country: "France", priceCents: 1386, image: "/wines/catalogue-red-035.png", imageFocus: "left" },
  { name: "Château Montus – Madiran", producer: "Alain Brumont", appellation: "Madiran", region: "Sud-Ouest", country: "France", priceCents: 3418, image: "/wines/catalogue-red-035.png", imageFocus: "center", grapes: ["Tannat"] },
  { name: "Château Mornag", producer: "Château Mornag", appellation: "Tunisie", region: "Mornag", country: "Tunisie", priceCents: 678, image: "/wines/catalogue-red-035.png", imageFocus: "right" },
  { name: "Châteauneuf-du-Pape « Château de la Gardine »", producer: "Château la Gardine", appellation: "Châteauneuf-du-Pape", region: "Rhône", country: "France", priceCents: 3721, image: "/wines/catalogue-red-036.png", imageFocus: "left", grapes: ["Grenache", "Syrah", "Mourvèdre"] },
  { name: "Châteauneuf Rouge Vieilles Vignes", producer: "Alain Jaume", appellation: "Châteauneuf-du-Pape", region: "Rhône", country: "France", priceCents: 2738, image: "/wines/catalogue-red-036.png", imageFocus: "center", grapes: ["Grenache", "Syrah", "Mourvèdre"] },
  { name: "Château Palais Cardinal « La Réserve »", producer: "Jackline et Jean Louis Texier", appellation: "Saint-Émilion Grand Cru", region: "Bordeaux", country: "France", priceCents: 1808, image: "/wines/catalogue-red-036.png", imageFocus: "right" },
  { name: "Château Petit Bocq", producer: "Lagneaux", appellation: "Saint-Estèphe", region: "Bordeaux", country: "France", priceCents: 2401, image: "/wines/catalogue-red-037.png", imageFocus: "left" },
  { name: "Château Petit Cheval 2018", producer: "Château Cheval Blanc", appellation: "Saint-Émilion", region: "Bordeaux", country: "France", priceCents: 23582, image: "/wines/catalogue-red-037.png", imageFocus: "center", vintage: 2018, styleTags: ["prestige", "garde", "profond"] },
  { name: "Château Phélan Ségur", producer: "Château Phélan Ségur", appellation: "Saint-Estèphe", region: "Bordeaux", country: "France", priceCents: 5883, image: "/wines/catalogue-red-037.png", imageFocus: "right" },
  { name: "Château Pierrail", producer: "Demonchaud", appellation: "Bordeaux Supérieur", region: "Bordeaux", country: "France", priceCents: 1217, image: "/wines/catalogue-red-038.png", imageFocus: "left" },
  { name: "Château Piganeau", producer: "Vignobles Brunot", appellation: "Saint-Émilion Grand Cru", region: "Bordeaux", country: "France", priceCents: 1843, image: "/wines/catalogue-red-038.png", imageFocus: "center" },
  { name: "Château Prieuré-Lichine – Grand Cru Classé", producer: "Château Prieuré-Lichine", appellation: "Margaux", region: "Bordeaux", country: "France", priceCents: 5524, image: "/wines/catalogue-red-038.png", imageFocus: "right" },
  { name: "Château Puy Castera – Cru Bourgeois", producer: "Mares", appellation: "Haut-Médoc", region: "Bordeaux", country: "France", priceCents: 1234, image: "/wines/catalogue-red-039.png", imageFocus: "left" },
  { name: "Château Roselane 1er Cru « Les Coteaux de l’Atlas »", producer: "Château Roselane", appellation: "Les Coteaux de l’Atlas", region: "Meknès", country: "Maroc", priceCents: 2021, image: "/wines/catalogue-red-039.png", imageFocus: "center" },
  { name: "Château Rouquette sur Mer « Henry Lapierre »", producer: "Château Rouquette sur Mer", appellation: "La Clape", region: "Languedoc", country: "France", priceCents: 1834, image: "/wines/catalogue-red-039.png", imageFocus: "right", grapes: ["Syrah", "Grenache"] },
  { name: "Château Rouquette sur Mer « L’Esprit Terroir »", producer: "Château Rouquette sur Mer", appellation: "La Clape", region: "Languedoc", country: "France", priceCents: 1034, image: "/wines/catalogue-red-040.png", imageFocus: "left", grapes: ["Syrah", "Grenache"] },
  { name: "Château Saint-Bonnet", producer: "Château Saint-Bonnet", appellation: "Médoc", region: "Bordeaux", country: "France", priceCents: 999, image: "/wines/catalogue-red-040.png", imageFocus: "center" },
  { name: "Château Saransot-Dupré", producer: "Château Saransot-Dupré", appellation: "Listrac-Médoc", region: "Bordeaux", country: "France", priceCents: 1532, image: "/wines/catalogue-red-040.png", imageFocus: "right" },
  { name: "Château Smith Haut Lafitte 2016", producer: "Château Smith Haut Lafitte", appellation: "Pessac-Léognan", region: "Bordeaux", country: "France", priceCents: 16009, image: "/wines/catalogue-red-041.png", imageFocus: "left", vintage: 2016, styleTags: ["prestige", "garde", "profond"] },
  { name: "Château Ste Michelle – Merlot", producer: "Château Ste Michelle", appellation: "Columbia Valley", region: "Washington", country: "États-Unis", priceCents: 1361, image: "/wines/catalogue-red-041.png", imageFocus: "center", grapes: ["Merlot"] },
  { name: "Château St Estève – Corbières", producer: "Château St Estève", appellation: "Corbières", region: "Languedoc", country: "France", priceCents: 937, image: "/wines/catalogue-red-041.png", imageFocus: "right", grapes: ["Carignan", "Syrah", "Grenache"] },
  { name: "Château St Estève – Henri de Monfreid", producer: "Château St Estève", appellation: "Corbières", region: "Languedoc", country: "France", priceCents: 1312, image: "/wines/catalogue-red-042.png", imageFocus: "left", grapes: ["Carignan", "Syrah", "Grenache"] },
  { name: "Château Taffard de Blaignan", producer: "Château Taffard de Blaignan", appellation: "Médoc", region: "Bordeaux", country: "France", priceCents: 1441, image: "/wines/catalogue-red-042.png", imageFocus: "center" },
  { name: "Château Tour de Grenet", producer: "Brunot & Fils", appellation: "Lussac-Saint-Émilion", region: "Bordeaux", country: "France", priceCents: 1289, image: "/wines/catalogue-red-042.png", imageFocus: "right" },
];

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 64);
}

function inferGrapes(row: RedWineRow): string[] {
  if (row.grapes?.length) return row.grapes;

  const text = `${row.name} ${row.appellation} ${row.region}`.toLowerCase();
  if (text.includes("merlot")) return ["Merlot"];
  if (text.includes("cabernet")) return ["Cabernet Sauvignon"];
  if (text.includes("malbec") || text.includes("cahors")) return ["Malbec"];
  if (text.includes("madiran")) return ["Tannat"];
  if (text.includes("pinot") || text.includes("bourgogne") || text.includes("beaune") || text.includes("chambolle") || text.includes("chassagne") || text.includes("aloxe")) return ["Pinot Noir"];
  if (text.includes("brouilly")) return ["Gamay"];
  if (text.includes("bourgueil") || text.includes("anjou")) return ["Cabernet Franc"];
  if (text.includes("barolo")) return ["Nebbiolo"];
  if (text.includes("barbera")) return ["Barbera"];
  if (text.includes("brunello") || text.includes("toscana")) return ["Sangiovese"];
  if (text.includes("aglianico")) return ["Aglianico"];
  if (text.includes("cannonau")) return ["Cannonau"];
  if (text.includes("rhône") || text.includes("cairanne") || text.includes("châteauneuf") || text.includes("costières") || text.includes("languedoc") || text.includes("corbières")) return ["Grenache", "Syrah"];
  return ["Cabernet Sauvignon", "Merlot"];
}

function inferCulinaryTags(row: RedWineRow): string[] {
  if (row.culinaryTags?.length) return row.culinaryTags;

  const text = `${row.name} ${row.appellation} ${row.region}`.toLowerCase();
  if (text.includes("pinot") || text.includes("bourgogne") || text.includes("beaune") || text.includes("chambolle") || text.includes("chassagne")) {
    return ["volaille", "canard", "champignons", "fromage"];
  }
  if (text.includes("brouilly") || text.includes("bardolino") || text.includes("barbera") || text.includes("cannonau") || text.includes("caringole")) {
    return ["aperitif", "charcuterie", "volaille", "fromage"];
  }
  if (text.includes("madiran") || text.includes("cahors") || text.includes("bandol") || text.includes("châteauneuf")) {
    return ["boeuf", "agneau", "canard", "fromage"];
  }
  return ["boeuf", "canard", "champignons", "fromage"];
}

function inferStyleTags(row: RedWineRow): string[] {
  if (row.styleTags?.length) return row.styleTags;
  if (row.priceCents >= 4500) return ["prestige", "garde", "structuré"];

  const text = `${row.name} ${row.appellation} ${row.region}`.toLowerCase();
  if (text.includes("bourgogne") || text.includes("pinot") || text.includes("brouilly")) return ["élégant", "fruité", "soyeux"];
  if (text.includes("rhône") || text.includes("madiran") || text.includes("cahors") || text.includes("bandol")) return ["solaire", "épicé", "structuré"];
  return ["classique", "structuré", "gourmand"];
}

function inferDescription(row: RedWineRow) {
  const grapes = inferGrapes(row).slice(0, 2).join(", ");
  return `Un rouge ${row.region.toLowerCase()} sélectionné pour les accords Vinaria : ${grapes}, matière nette et lecture gastronomique directe.`;
}

export const redWineReferences: WineProduct[] = redRows.map((row, index) => ({
  id: `wine-red-${slugify(row.name)}`,
  sku: `VIN-RGE-${String(index + 1).padStart(3, "0")}`,
  name: row.name,
  producer: row.producer,
  appellation: row.appellation,
  region: row.region,
  country: row.country,
  vintage: row.vintage,
  color: "red",
  grapes: inferGrapes(row),
  culinaryTags: inferCulinaryTags(row),
  styleTags: inferStyleTags(row),
  description: inferDescription(row),
  storytelling: `${row.producer} rejoint la cave Vinaria comme repère rouge curaté pour des accords premium, simples à expliquer au client.`,
  servingTemperature: row.servingTemperature ?? "16–18 °C",
  bottleSizeMl: 750,
  priceCents: row.priceCents,
  costPriceCents: Math.round(row.priceCents * 0.62),
  taxRate: 21,
  available: true,
  stockStatus: "in_stock",
  stockQuantity: 12,
  partnerId: "partner-francois-alain",
  image: row.image,
  imageFocus: row.imageFocus,
}));
