import { formatMoney } from "@/lib/money";
import type { Order } from "@/types";
import { emailLayout, type EmailTemplate } from "./types";

export function customerConfirmationEmail(order: Order): EmailTemplate {
  const preview = `Votre demande ${order.reference} a bien été reçue.`;
  const lines = order.items
    .map((item) => `<li>${item.quantity} × ${item.name}</li>`)
    .join("");
  return {
    subject: `Vinaria · confirmation ${order.reference}`,
    preview,
    html: emailLayout(
      "Votre sélection est entre de bonnes mains.",
      `<p>Bonjour ${order.customer.firstName},</p>
       <p>Nous avons bien reçu votre commande <strong>${order.reference}</strong>. L’équipe Ethny confirme maintenant les disponibilités avec le caviste.</p>
       <ul>${lines}</ul>
       <p><strong>Total estimé : ${formatMoney(order.totalCents)}</strong></p>
       <p>Nous vous écrirons à chaque étape utile, sans vous noyer sous les notifications.</p>`,
      preview,
    ),
    text: `Bonjour ${order.customer.firstName}, votre commande ${order.reference} a été reçue. Total estimé : ${formatMoney(order.totalCents)}.`,
  };
}
