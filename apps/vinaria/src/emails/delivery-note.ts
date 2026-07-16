import type { Delivery, Order } from "@/types";
import { emailLayout, type EmailTemplate } from "./types";

export function deliveryNoteEmail(order: Order, delivery: Delivery): EmailTemplate {
  const preview = `Livraison à organiser pour ${order.reference}.`;
  const address = delivery.deliveryAddress;
  return {
    subject: `Bon de livraison · ${order.reference}`,
    preview,
    html: emailLayout(
      "Livraison à organiser",
      `<p><strong>${delivery.contactName}</strong><br>${address.line1}<br>${address.postalCode} ${address.city} · ${address.country}</p><p>${order.items.reduce((sum, item) => sum + item.quantity, 0)} bouteilles · remise à une personne majeure.</p>`,
      preview,
    ),
    text: `${preview} ${delivery.contactName}, ${address.line1}, ${address.postalCode} ${address.city}.`,
  };
}
