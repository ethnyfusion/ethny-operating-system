"use client";

import Link from "next/link";
import { ArrowRight, ShoppingBag, Trash2, Truck } from "lucide-react";
import { wines } from "@/data/wines";
import { useCart } from "./cart-provider";
import { SelectedWineCard } from "./selected-wine-card";

export function CartView() {
  const { items, bottleCount, updateQuantity, removeItem, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="empty-state">
        <ShoppingBag size={42} />
        <h2>Votre sélection attend son premier accord.</h2>
        <p>Partez d’un menu réel ou décrivez librement votre repas. La disponibilité sera confirmée par le caviste.</p>
        <div className="button-row">
          <Link className="primary-button" href="/pairing">Créer un accord</Link>
          <Link className="secondary-button" href="/catalogue">Voir la sélection</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-layout">
      <section className="cart-items">
        <div className="section-title">
          <h2>{bottleCount} bouteille{bottleCount > 1 ? "s" : ""} conseillée{bottleCount > 1 ? "s" : ""}</h2>
          <button type="button" className="quiet-button" onClick={clearCart}>
            <Trash2 size={15} /> Vider
          </button>
        </div>
        <div className="selection-card-grid">
          {items.map((item) => (
            <SelectedWineCard
              key={item.productId}
              item={item}
              wine={wines.find((wine) => wine.id === item.productId)}
              onQuantityChange={(quantity) => updateQuantity(item.productId, quantity)}
              onRemove={() => removeItem(item.productId)}
            />
          ))}
        </div>
      </section>

      <aside className="order-summary">
        <span className="eyebrow">Récapitulatif</span>
        <h2>Votre demande</h2>
        <dl>
          <div><dt>Sélection</dt><dd>{items.length} accord{items.length > 1 ? "s" : ""}</dd></div>
          <div><dt>Quantité</dt><dd>{bottleCount} bouteille{bottleCount > 1 ? "s" : ""}</dd></div>
          <div className="summary-total"><dt>Statut</dt><dd>À valider</dd></div>
        </dl>
        <p><Truck size={16} /> Aucun paiement maintenant : Vinaria confirme stock, substitutions éventuelles et lien de paiement sous 24 h.</p>
        <Link className="primary-button full-button" href="/checkout">
          Envoyer ma demande <ArrowRight size={17} />
        </Link>
      </aside>
    </div>
  );
}
