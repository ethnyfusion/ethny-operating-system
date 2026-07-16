import { AdminOrdersClient } from "@/components/admin-orders-client";
import { demoOrders } from "@/data/demo-orders";
import { formatMoney } from "@/lib/money";

export default function AdminOrdersPage() {
  return (
    <>
      <header className="admin-header"><div><span className="eyebrow">Exploitation</span><h1>Commandes</h1><p>Du panier client à la livraison, avec validation humaine à chaque point sensible.</p></div><button className="primary-button">Exporter</button></header>
      <div className="metric-grid">
        <article><span>À traiter</span><strong>1</strong><small>commande ouverte</small></article>
        <article><span>CA démonstration</span><strong>{formatMoney(demoOrders.reduce((sum, order) => sum + order.totalCents, 0))}</strong><small>hors commandes locales</small></article>
        <article><span>Préparation</span><strong>48 h</strong><small>délai partenaire cible</small></article>
      </div>
      <AdminOrdersClient />
    </>
  );
}
