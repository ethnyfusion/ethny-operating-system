import { siteConfig } from "@/config/site";
import type { CartItem, Customer, Order } from "@/types";

export function calculateDeliveryFee(subtotalCents: number, country: "BE" | "NL") {
  return subtotalCents >= siteConfig.freeDeliveryFromCents[country]
    ? 0
    : siteConfig.deliveryFeeCents[country];
}

export function createOrder(input: {
  customer: Customer;
  items: CartItem[];
  customerNote?: string;
}): Order {
  const now = new Date().toISOString();
  const subtotalCents = input.items.reduce(
    (sum, item) => sum + item.unitPriceCents * item.quantity,
    0,
  );
  const deliveryFeeCents = calculateDeliveryFee(
    subtotalCents,
    input.customer.deliveryAddress.country,
  );
  const suffix = globalThis.crypto?.randomUUID?.().slice(0, 4).toUpperCase() ?? "DEMO";
  const date = now.slice(2, 10).replaceAll("-", "");
  const reference = `VIN-${date}-${suffix}`;

  return {
    id: globalThis.crypto?.randomUUID?.() ?? reference,
    reference,
    customer: input.customer,
    items: input.items,
    status: "demande_recue",
    statusHistory: [{ status: "demande_recue", at: now, publicNote: "Demande reçue par Vinaria. Confirmation sous 24 h." }],
    subtotalCents,
    deliveryFeeCents,
    totalCents: subtotalCents + deliveryFeeCents,
    currency: "EUR",
    paymentMode: "manual",
    partnerId: "partner-francois-alain",
    customerNote: input.customerNote,
    createdAt: now,
    updatedAt: now,
  };
}
