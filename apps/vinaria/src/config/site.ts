export const siteConfig = {
  name: "Vinaria",
  signature: "La cave par Ethny",
  description: "Accords mets-vins curatés, commandés et livrés par Ethny.",
  locale: "fr-BE",
  currency: "EUR",
  serviceArea: ["BE", "NL"] as const,
  contactEmail: "vinaria@ethny.be",
  minimumOrderCents: { BE: 7500, NL: 10000 },
  deliveryFeeCents: { BE: 1200, NL: 1900 },
  freeDeliveryFromCents: { BE: 12500, NL: 17500 },
};
