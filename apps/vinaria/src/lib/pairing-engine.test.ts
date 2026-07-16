import { describe, expect, it } from "vitest";
import { recommendPairings } from "./pairing-engine";

describe("recommendPairings", () => {
  it("returns two to four curated recommendations with quantities", () => {
    const results = recommendPairings({
      source: "free",
      dishes: ["Bar rôti aux agrumes"],
      guests: 12,
      mealType: "dinner",
      budget: "prestige",
      preferences: ["mineral"],
      excludedTags: [],
      preferredColors: ["white"],
      culinaryTags: ["poisson", "agrumes"],
    });

    expect(results.length).toBeGreaterThanOrEqual(2);
    expect(results.length).toBeLessThanOrEqual(4);
    expect(results[0].wine.color).toBe("white");
    expect(results.every((result) => result.recommendedQuantity >= 1)).toBe(true);
  });
});
