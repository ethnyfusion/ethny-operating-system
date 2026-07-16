import type { Order } from "@/types";
import { emailLayout, type EmailTemplate } from "./types";

export function availabilityIssueEmail(order: Order, unavailableWine: string): EmailTemplate {
  const preview = `Un ajustement est nécessaire pour ${order.reference}.`;
  return {
    subject: `Vinaria · disponibilité à confirmer ${order.reference}`,
    preview,
    html: emailLayout(
      "Nous affinons votre sélection.",
      `<p>Bonjour ${order.customer.firstName},</p><p><strong>${unavailableWine}</strong> n’est momentanément plus disponible. Notre équipe cherche une alternative de même niveau et vous la soumettra avant toute modification de prix.</p>`,
      preview,
    ),
    text: `${preview} ${unavailableWine} est indisponible. Une alternative vous sera soumise avant modification.`,
  };
}
