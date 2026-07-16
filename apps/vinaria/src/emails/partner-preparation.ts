import type { Order, Partner } from "@/types";
import { emailLayout, type EmailTemplate } from "./types";

export function partnerPreparationEmail(order: Order, partner: Partner): EmailTemplate {
  const preview = `Préparation demandée pour ${order.reference}.`;
  const items = order.items.map((item) => `<li>${item.quantity} × ${item.name}</li>`).join("");
  return {
    subject: `Bon de préparation · ${order.reference}`,
    preview,
    html: emailLayout(
      "Préparation caviste",
      `<p>Bonjour ${partner.contactName},</p><p>Merci de confirmer la disponibilité puis de préparer :</p><ul>${items}</ul><p>Ne joindre aucun prix fournisseur au colis. Référence à reporter : <strong>${order.reference}</strong>.</p>`,
      preview,
    ),
    text: `${preview} ${order.items.map((item) => `${item.quantity} x ${item.name}`).join(", ")}.`,
  };
}
