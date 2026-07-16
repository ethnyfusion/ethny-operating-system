"use client";

import { useEffect, useState } from "react";
import { demoOrders } from "@/data/demo-orders";
import { formatMoney } from "@/lib/money";
import type { Order } from "@/types";

export function AdminOrdersClient() {
  const [orders, setOrders] = useState<Order[]>(demoOrders);

  useEffect(() => {
    let active = true;
    queueMicrotask(() => {
      if (!active) return;
      const local = JSON.parse(window.localStorage.getItem("vinaria-orders-v1") ?? "[]") as Order[];
      setOrders([...local, ...demoOrders]);
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="admin-table-wrap">
      <table className="admin-table">
        <thead><tr><th>Référence</th><th>Client</th><th>Articles</th><th>Total</th><th>Statut</th><th>Créée</th></tr></thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td><strong>{order.reference}</strong></td>
              <td>{order.customer.firstName} {order.customer.lastName}<small>{order.customer.deliveryAddress.city}</small></td>
              <td>{order.items.reduce((sum, item) => sum + item.quantity, 0)} bt.</td>
              <td>{formatMoney(order.totalCents)}</td>
              <td><span className={`status-badge status-${order.status}`}>{order.status.replaceAll("_", " ")}</span></td>
              <td>{new Date(order.createdAt).toLocaleDateString("fr-BE")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
