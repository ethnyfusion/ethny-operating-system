import {
  BpostProvider,
  DPDProvider,
  ManualDeliveryProvider,
  PostNLProvider,
} from "./providers";

export const deliveryProviders = {
  manual: new ManualDeliveryProvider(),
  bpost: new BpostProvider(),
  postnl: new PostNLProvider(),
  dpd: new DPDProvider(),
};

export type DeliveryProviderId = keyof typeof deliveryProviders;

export function getDeliveryProvider(id: DeliveryProviderId = "manual") {
  return deliveryProviders[id];
}
