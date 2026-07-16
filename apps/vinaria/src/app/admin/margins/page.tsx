import { wines } from "@/data/wines";
import { formatMoney } from "@/lib/money";

export default function AdminMarginsPage() {
  const retail = wines.reduce((sum, wine) => sum + wine.priceCents, 0);
  const cost = wines.reduce((sum, wine) => sum + wine.costPriceCents, 0);
  return (
    <>
      <header className="admin-header"><div><span className="eyebrow">Pilotage financier</span><h1>Marges</h1><p>Vue simple sur la marge catalogue. Les taxes et coûts logistiques restent à consolider avant production.</p></div></header>
      <div className="metric-grid"><article><span>Prix moyen</span><strong>{formatMoney(retail / wines.length)}</strong></article><article><span>Marge brute moyenne</span><strong>{Math.round(((retail - cost) / retail) * 100)}%</strong></article><article><span>Références</span><strong>{wines.length}</strong></article></div>
      <div className="notice">MVP : ces chiffres utilisent les coûts de démonstration du catalogue local. Ils ne constituent pas une comptabilité.</div>
    </>
  );
}
