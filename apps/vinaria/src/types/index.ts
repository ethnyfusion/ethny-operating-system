export type WineColor = "red" | "white" | "rose" | "sparkling" | "dessert";
export type StockStatus = "in_stock" | "low_stock" | "out_of_stock";

export interface WineProduct {
  id: string;
  sku: string;
  name: string;
  producer: string;
  appellation: string;
  region: string;
  country: string;
  vintage?: number;
  color: WineColor;
  grapes: string[];
  culinaryTags: string[];
  styleTags: string[];
  description: string;
  storytelling?: string;
  servingTemperature: string;
  bottleSizeMl: number;
  priceCents: number;
  costPriceCents: number;
  taxRate: number;
  available: boolean;
  stockStatus: StockStatus;
  stockQuantity?: number;
  partnerId: string;
  image?: string;
  imageFocus?: "left" | "center" | "right";
}

export type PairingSource = "ethny_menu" | "free";
export type MealType = "aperitif" | "lunch" | "dinner" | "celebration";
export type BudgetLevel = "discovery" | "prestige" | "exception";

export interface PairingRequest {
  source: PairingSource;
  menuId?: string;
  dishes: string[];
  guests: number;
  mealType: MealType;
  budget: BudgetLevel;
  preferences: string[];
  excludedTags: string[];
  preferredColors: WineColor[];
  culinaryTags: string[];
}

export interface PairingRecommendation {
  wine: WineProduct;
  score: number;
  explanation: string;
  recommendedQuantity: number;
  estimatedTotalCents: number;
  matchedTags: string[];
}

export interface CartItem {
  productId: string;
  name: string;
  producer: string;
  unitPriceCents: number;
  quantity: number;
  pairingNote?: string;
  serviceLabel?: string;
  storytelling?: string;
}

export interface Cart {
  id: string;
  items: CartItem[];
  currency: "EUR";
  updatedAt: string;
}

export interface Address {
  line1: string;
  line2?: string;
  postalCode: string;
  city: string;
  country: "BE" | "NL";
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  deliveryAddress: Address;
  preferredLanguage: "fr" | "nl" | "en";
  ageConfirmed: boolean;
  termsAcceptedAt: string;
  privacyAcceptedAt: string;
  marketingConsent: boolean;
  marketingConsentAt?: string;
}

export const ORDER_STATUSES = [
  "demande_recue",
  "en_validation_caviste",
  "validee",
  "payee",
  "en_preparation",
  "prete",
  "en_livraison",
  "livree",
  "cloturee",
  "expiree",
  "annulee",
  "orientee_expert",
  "litige",
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export interface OrderStatusEvent {
  status: OrderStatus;
  at: string;
  publicNote?: string;
  internalNote?: string;
}

export interface Order {
  id: string;
  reference: string;
  customer: Customer;
  items: CartItem[];
  status: OrderStatus;
  statusHistory: OrderStatusEvent[];
  subtotalCents: number;
  deliveryFeeCents: number;
  totalCents: number;
  currency: "EUR";
  paymentMode: "manual" | "stripe_link";
  paymentReference?: string;
  stripePaymentLinkExpiresAt?: string;
  deliveryId?: string;
  partnerId: string;
  customerNote?: string;
  eventDate?: string;
  mealType?: MealType;
  formula?: Extract<BudgetLevel, "discovery" | "prestige">;
  serviceCount?: 3 | 4 | 5 | 6;
  marginSnapshot?: {
    revenueExVatCents: number;
    bottleCostCents: number;
    packagingCents: number;
    deliveryCostCents: number;
    netMarginCents: number;
    netMarginRate: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ExpertLead {
  id: string;
  reason: "short_notice" | "outside_zone" | "low_confidence" | "allergy_consent_missing" | "custom_pairing";
  source: PairingSource;
  requestedAt: string;
  firstName?: string;
  city?: string;
  eventDate?: string;
  message: string;
}

export interface Partner {
  id: string;
  name: string;
  contactName: string;
  email: string;
  phone?: string;
  preparationAddress: Address;
  active: boolean;
  leadTimeHours: number;
  internalNote?: string;
}

export type DeliveryStatus =
  | "draft"
  | "requested"
  | "scheduled"
  | "picked_up"
  | "in_transit"
  | "delivered"
  | "failed";

export interface Delivery {
  id: string;
  orderId: string;
  provider: string;
  status: DeliveryStatus;
  pickupAddress: Address;
  deliveryAddress: Address;
  contactName: string;
  contactPhone?: string;
  requestedDate?: string;
  scheduledWindow?: string;
  trackingReference?: string;
  manualInstructions?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface DeliveryQuote {
  provider: string;
  available: boolean;
  priceCents?: number;
  estimatedDays?: number;
  message?: string;
}

export interface DeliveryRequest {
  order: Order;
  partner: Partner;
  requestedDate?: string;
}

export interface DeliveryProvider {
  readonly id: string;
  readonly name: string;
  getQuote(request: DeliveryRequest): Promise<DeliveryQuote>;
  createDelivery(request: DeliveryRequest): Promise<Delivery>;
  getStatus(delivery: Delivery): Promise<DeliveryStatus>;
}
