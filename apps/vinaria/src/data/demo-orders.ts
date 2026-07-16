import type { Order } from "@/types";

export const demoOrders: Order[] = [
  {
    id: "demo-order-1",
    reference: "VIN-260709-A7C2",
    customer: {
      id: "demo-customer",
      firstName: "Claire",
      lastName: "Martin",
      email: "claire@example.com",
      deliveryAddress: {
        line1: "12 rue des Saisons",
        postalCode: "1050",
        city: "Bruxelles",
        country: "BE",
      },
      preferredLanguage: "fr",
      ageConfirmed: true,
      termsAcceptedAt: "2026-07-09T08:20:00.000Z",
      privacyAcceptedAt: "2026-07-09T08:20:00.000Z",
      marketingConsent: false,
    },
    items: [
      {
        productId: "wine-chablis-montmain",
        name: "Chablis 1er Cru Montmain",
        producer: "Domaine Pinson",
        unitPriceCents: 4650,
        quantity: 2,
        serviceLabel: "Entrée",
        pairingNote: "Accord validé sur poisson délicat, agrumes et beurre blanc.",
      },
    ],
    status: "en_preparation",
    statusHistory: [
      { status: "demande_recue", at: "2026-07-09T08:20:00.000Z", publicNote: "Demande reçue. Confirmation sous 24 h." },
      { status: "en_validation_caviste", at: "2026-07-09T08:40:00.000Z", publicNote: "La sélection est transmise au caviste partenaire." },
      { status: "validee", at: "2026-07-09T09:30:00.000Z", publicNote: "Disponibilité confirmée. Lien de paiement envoyé." },
      { status: "payee", at: "2026-07-09T09:45:00.000Z", publicNote: "Paiement reçu." },
      { status: "en_preparation", at: "2026-07-09T10:00:00.000Z", publicNote: "Bon de préparation envoyé au caviste." },
    ],
    subtotalCents: 9300,
    deliveryFeeCents: 1200,
    totalCents: 10500,
    currency: "EUR",
    paymentMode: "manual",
    partnerId: "partner-francois-alain",
    createdAt: "2026-07-09T08:20:00.000Z",
    updatedAt: "2026-07-09T10:00:00.000Z",
  },
];
