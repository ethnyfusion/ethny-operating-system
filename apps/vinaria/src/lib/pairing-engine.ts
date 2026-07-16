import { wines as defaultCatalogue } from "@/data/wines";
import type {
  BudgetLevel,
  PairingRecommendation,
  PairingRequest,
  WineProduct,
} from "@/types";

const budgetCaps: Record<BudgetLevel, number> = {
  discovery: 3600,
  prestige: 5500,
  exception: Number.POSITIVE_INFINITY,
};

const synonyms: Record<string, string[]> = {
  poisson: ["poisson", "iode", "crustaces", "coquillages", "homard"],
  viande: ["boeuf", "agneau", "canard", "veau", "gibier", "volaille"],
  vegetarien: ["vegetal", "champignons", "terre", "herbes"],
  epice: ["epices", "aromatique"],
  dessert: ["dessert", "sucre", "chocolat", "fruits"],
};

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function expandedTags(request: PairingRequest) {
  const raw = [...request.culinaryTags, ...request.preferences, ...request.dishes];
  const normalized = raw.map(normalize);
  const expanded = new Set(normalized);

  normalized.forEach((tag) => {
    Object.entries(synonyms).forEach(([group, values]) => {
      if (tag.includes(group) || values.some((value) => tag.includes(value))) {
        values.forEach((value) => expanded.add(value));
      }
    });
  });

  return expanded;
}

function bottleQuantity(guests: number, recommendationCount: number) {
  const servingsPerBottle = 6;
  const glassesPerGuestPerService = 1.5;
  const servicesCovered = Math.max(1, recommendationCount);
  return Math.max(1, Math.ceil((guests * glassesPerGuestPerService) / (servingsPerBottle * servicesCovered)));
}

export function recommendPairings(
  request: PairingRequest,
  catalogue: WineProduct[] = defaultCatalogue,
): PairingRecommendation[] {
  const requestedTags = expandedTags(request);
  const excluded = request.excludedTags.map(normalize);
  const cap = budgetCaps[request.budget];

  const scored = catalogue
    .filter((wine) => wine.available && wine.stockStatus !== "out_of_stock")
    .filter((wine) => !excluded.some((tag) => wine.culinaryTags.map(normalize).includes(tag)))
    .map((wine) => {
      const wineTags = [...wine.culinaryTags, ...wine.styleTags].map(normalize);
      const matchedTags = wineTags.filter((tag) =>
        [...requestedTags].some((requested) => requested.includes(tag) || tag.includes(requested)),
      );
      let score = matchedTags.length * 12;

      if (request.preferredColors.includes(wine.color)) score += 18;
      if (wine.priceCents <= cap) score += 10;
      else score -= Math.min(20, Math.ceil((wine.priceCents - cap) / 500) * 4);
      if (request.mealType === "aperitif" && ["white", "sparkling", "rose"].includes(wine.color)) score += 8;
      if (request.mealType === "celebration" && wine.color === "sparkling") score += 9;
      if (wine.stockStatus === "low_stock") score -= 2;

      return { wine, score, matchedTags: [...new Set(matchedTags)].slice(0, 3) };
    })
    .sort((a, b) => b.score - a.score || a.wine.priceCents - b.wine.priceCents)
    .slice(0, Math.min(4, Math.max(2, catalogue.length)));

  return scored.map(({ wine, score, matchedTags }, _, all) => {
    const quantity = bottleQuantity(request.guests, all.length);
    const tags = matchedTags.length ? matchedTags.join(", ") : wine.styleTags.slice(0, 2).join(", ");
    return {
      wine,
      score,
      matchedTags,
      recommendedQuantity: quantity,
      estimatedTotalCents: quantity * wine.priceCents,
      explanation: `${wine.name} prolonge le repas par son profil ${tags}. Sa structure reste juste pour ${request.guests} convive${request.guests > 1 ? "s" : ""}.`,
    };
  });
}
