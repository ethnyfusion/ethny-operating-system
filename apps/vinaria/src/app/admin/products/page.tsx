import { wines } from "@/data/wines";
import { formatMoney } from "@/lib/money";

export default function AdminProductsPage() {
  return (
    <>
      <header className="admin-header"><div><span className="eyebrow">Catalogue curaté</span><h1>Produits</h1><p>Ethny garde la main sur la sélection, les prix, le stock affiché et les accords.</p></div><button className="primary-button">Ajouter un vin</button></header>
      <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Vin</th><th>SKU</th><th>Type</th><th>Prix client</th><th>Coût</th><th>Marge brute</th><th>Stock</th></tr></thead><tbody>
        {wines.map((wine) => {
          const margin = Math.round(((wine.priceCents - wine.costPriceCents) / wine.priceCents) * 100);
          return <tr key={wine.id}><td><strong>{wine.name}</strong><small>{wine.producer} · {wine.region}</small></td><td>{wine.sku}</td><td>{wine.color}</td><td>{formatMoney(wine.priceCents)}</td><td>{formatMoney(wine.costPriceCents)}</td><td>{margin}%</td><td><span className={`status-badge status-${wine.stockStatus}`}>{wine.stockQuantity ?? "—"}</span></td></tr>;
        })}
      </tbody></table></div>
    </>
  );
}
