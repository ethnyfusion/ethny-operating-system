import { formatMoney } from "@/lib/money";
import type { Order } from "@/types";
import { emailLayout, type EmailTemplate } from "./types";

export function ethnyNotificationEmail(order: Order): EmailTemplate {
  const preview = `Nouvelle commande ${order.reference} à valider.`;
  return {
    subject: `[Vinaria] Nouvelle commande ${order.reference}`,
    preview,
    html: emailLayout(
      "Nouvelle commande à orchestrer",
      `<p><strong>${order.reference}</strong> · ${order.items.reduce((sum, item) => sum + item.quantity, 0)} bouteilles · ${formatMoney(order.totalCents)}</p>
       <p>Action : vérifier la disponibilité, confirmer la marge puis envoyer le bon de préparation au partenaire.</p>`,
      preview,
    ),
    text: `${preview} Total ${formatMoney(order.totalCents)}. Vérifier disponibilité et marge.`,
  };
}
