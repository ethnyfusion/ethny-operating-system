import type { Order } from "@/types";
import { emailLayout, type EmailTemplate } from "./types";

export function orderReadyEmail(order: Order): EmailTemplate {
  const preview = `Votre commande ${order.reference} est prête.`;
  return {
    subject: `Votre commande Vinaria est prête · ${order.reference}`,
    preview,
    html: emailLayout(
      "Votre commande est prête.",
      `<p>Bonjour ${order.customer.firstName},</p><p>Votre sélection a été contrôlée et emballée. Nous organisons maintenant sa livraison et vous transmettrons le créneau confirmé.</p>`,
      preview,
    ),
    text: `${preview} Nous organisons maintenant sa livraison.`,
  };
}
