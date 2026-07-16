import type { Partner } from "@/types";

export const partners: Partner[] = [
  {
    id: "partner-francois-alain",
    name: "François Alain · Vins & Sélection",
    contactName: "François Alain",
    email: "preparation@example.be",
    phone: "+32 2 000 00 00",
    preparationAddress: {
      line1: "Adresse caviste à configurer",
      postalCode: "1000",
      city: "Bruxelles",
      country: "BE",
    },
    active: true,
    leadTimeHours: 48,
    internalNote: "Coordonnées de démonstration — à remplacer avant production.",
  },
];
