import type { Customer, Order } from "@/types";

export interface CustomerDataRepository {
  findCustomer(customerId: string): Promise<Customer | null>;
  findOrdersByCustomer(customerId: string): Promise<Order[]>;
  anonymizeOrders(customerId: string): Promise<number>;
  deleteCustomer(customerId: string): Promise<void>;
}

export async function exportCustomerData(
  customerId: string,
  repository: CustomerDataRepository,
) {
  const customer = await repository.findCustomer(customerId);
  if (!customer) throw new Error("Client introuvable.");
  const orders = await repository.findOrdersByCustomer(customerId);
  return {
    exportedAt: new Date().toISOString(),
    customer,
    orders,
  };
}

export async function deleteCustomerData(
  customerId: string,
  repository: CustomerDataRepository,
) {
  const anonymizedOrders = await repository.anonymizeOrders(customerId);
  await repository.deleteCustomer(customerId);
  return { deletedCustomerId: customerId, anonymizedOrders };
}
