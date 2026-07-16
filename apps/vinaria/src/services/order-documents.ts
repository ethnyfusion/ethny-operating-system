import { formatMoney } from "@/lib/money";
import type { Delivery, Order, Partner } from "@/types";

export interface OperationalDocument {
  title: string;
  reference: string;
  generatedAt: string;
  sections: { heading: string; lines: string[] }[];
}

const itemLines = (order: Order) =>
  order.items.map(
    (item) =>
      `${item.quantity} × ${item.name} (${item.producer}) — ${formatMoney(item.unitPriceCents)}`,
  );

export function createInternalPurchaseOrder(order: Order): OperationalDocument {
  return {
    title: "Bon de commande interne Ethny",
    reference: order.reference,
    generatedAt: new Date().toISOString(),
    sections: [
      { heading: "Commande", lines: itemLines(order) },
      {
        heading: "Montants",
        lines: [
          `Sous-total : ${formatMoney(order.subtotalCents)}`,
          `Livraison : ${formatMoney(order.deliveryFeeCents)}`,
          `Total : ${formatMoney(order.totalCents)}`,
        ],
      },
      { heading: "Exploitation", lines: [`Statut : ${order.status}`, `Partenaire : ${order.partnerId}`] },
    ],
  };
}

export function createPartnerPreparationSlip(
  order: Order,
  partner: Partner,
): OperationalDocument {
  return {
    title: "Bon de préparation caviste",
    reference: order.reference,
    generatedAt: new Date().toISOString(),
    sections: [
      { heading: "À préparer", lines: itemLines(order) },
      {
        heading: "Contrôle",
        lines: [
          "Vérifier millésime, état des bouteilles et quantité.",
          "Ne pas joindre de prix fournisseur au colis.",
          `Confirmer la disponibilité à Vinaria via ${partner.email}.`,
        ],
      },
    ],
  };
}

export function createDeliverySlip(order: Order, delivery: Delivery): OperationalDocument {
  const address = delivery.deliveryAddress;
  return {
    title: "Bon de livraison",
    reference: order.reference,
    generatedAt: new Date().toISOString(),
    sections: [
      { heading: "Colis", lines: itemLines(order).map((line) => line.split(" — ")[0]) },
      {
        heading: "Livraison",
        lines: [
          delivery.contactName,
          address.line1,
          `${address.postalCode} ${address.city} · ${address.country}`,
          `Provider : ${delivery.provider}`,
        ],
      },
    ],
  };
}
