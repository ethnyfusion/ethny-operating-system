import type {
  Delivery,
  DeliveryProvider,
  DeliveryQuote,
  DeliveryRequest,
  DeliveryStatus,
} from "@/types";

export class ManualDeliveryProvider implements DeliveryProvider {
  readonly id = "manual";
  readonly name = "Organisation manuelle Ethny";

  async getQuote(): Promise<DeliveryQuote> {
    return {
      provider: this.id,
      available: true,
      message: "Le coût est validé manuellement par l’équipe Ethny.",
    };
  }

  async createDelivery({ order, partner, requestedDate }: DeliveryRequest): Promise<Delivery> {
    const now = new Date().toISOString();
    return {
      id: `delivery-${order.id}`,
      orderId: order.id,
      provider: this.id,
      status: "requested",
      pickupAddress: partner.preparationAddress,
      deliveryAddress: order.customer.deliveryAddress,
      contactName: `${order.customer.firstName} ${order.customer.lastName}`,
      contactPhone: order.customer.phone,
      requestedDate,
      manualInstructions: [
        `Confirmer l’enlèvement auprès de ${partner.contactName}.`,
        `Vérifier les ${order.items.reduce((sum, item) => sum + item.quantity, 0)} bouteilles et le bon VIN ${order.reference}.`,
        "Transmettre au client le créneau confirmé sans communiquer de données superflues.",
      ],
      createdAt: now,
      updatedAt: now,
    };
  }

  async getStatus(delivery: Delivery): Promise<DeliveryStatus> {
    return delivery.status;
  }
}

abstract class PlaceholderDeliveryProvider implements DeliveryProvider {
  abstract readonly id: string;
  abstract readonly name: string;

  async getQuote(): Promise<DeliveryQuote> {
    return {
      provider: this.id,
      available: false,
      message: `${this.name} est prévu pour une version ultérieure.`,
    };
  }

  async createDelivery(): Promise<Delivery> {
    throw new Error(`Le provider ${this.id} n’est pas encore activé.`);
  }

  async getStatus(delivery: Delivery): Promise<DeliveryStatus> {
    return delivery.status;
  }
}

export class BpostProvider extends PlaceholderDeliveryProvider {
  readonly id = "bpost";
  readonly name = "bpost";
}

export class PostNLProvider extends PlaceholderDeliveryProvider {
  readonly id = "postnl";
  readonly name = "PostNL";
}

export class DPDProvider extends PlaceholderDeliveryProvider {
  readonly id = "dpd";
  readonly name = "DPD";
}
