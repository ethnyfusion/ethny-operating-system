"use client";

import Link from "next/link";
import { ArrowLeft, Check, LockKeyhole, Truck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { siteConfig } from "@/config/site";
import { createOrder } from "@/lib/order";
import type { Customer, Order } from "@/types";
import { useCart } from "./cart-provider";

const orderStorageKey = "vinaria-orders-v1";

export function CheckoutForm() {
  const router = useRouter();
  const { items, subtotalCents, clearCart } = useCart();
  const [country, setCountry] = useState<"BE" | "NL">("BE");
  const [submitting, setSubmitting] = useState(false);
  const minimum = siteConfig.minimumOrderCents[country];

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (subtotalCents < minimum || items.length === 0) return;
    setSubmitting(true);
    const data = new FormData(event.currentTarget);
    const now = new Date().toISOString();
    const customer: Customer = {
      id: globalThis.crypto.randomUUID(),
      firstName: String(data.get("firstName")),
      lastName: String(data.get("lastName")),
      email: String(data.get("email")),
      phone: String(data.get("phone") || "") || undefined,
      deliveryAddress: {
        line1: String(data.get("address")),
        line2: String(data.get("address2") || "") || undefined,
        postalCode: String(data.get("postalCode")),
        city: String(data.get("city")),
        country,
      },
      preferredLanguage: "fr",
      ageConfirmed: data.get("age") === "on",
      termsAcceptedAt: now,
      privacyAcceptedAt: now,
      marketingConsent: data.get("marketing") === "on",
      marketingConsentAt: data.get("marketing") === "on" ? now : undefined,
    };
    const order = createOrder({
      customer,
      items,
      customerNote: String(data.get("note") || "") || undefined,
    });
    const existing = JSON.parse(window.localStorage.getItem(orderStorageKey) ?? "[]") as Order[];
    window.localStorage.setItem(orderStorageKey, JSON.stringify([order, ...existing]));
    window.localStorage.setItem("vinaria-last-order", JSON.stringify(order));
    clearCart();
    router.push(`/confirmation?reference=${encodeURIComponent(order.reference)}`);
  }

  if (items.length === 0) {
    return (
      <div className="empty-state compact">
        <h2>Votre panier est vide.</h2>
        <Link className="primary-button" href="/catalogue">Retour à la sélection</Link>
      </div>
    );
  }

  return (
    <form className="checkout-layout" onSubmit={submit}>
      <section className="checkout-fields">
        <Link href="/cart" className="back-link"><ArrowLeft size={16} /> Retour au panier</Link>
        <div className="form-card">
          <span className="eyebrow">01 · Contact</span>
          <h2>À qui préparons-nous cette sélection ?</h2>
          <div className="form-row two">
            <label className="field"><span>Prénom</span><input name="firstName" required autoComplete="given-name" /></label>
            <label className="field"><span>Nom</span><input name="lastName" required autoComplete="family-name" /></label>
          </div>
          <div className="form-row two">
            <label className="field"><span>Email</span><input name="email" type="email" required autoComplete="email" /></label>
            <label className="field"><span>Téléphone</span><input name="phone" type="tel" autoComplete="tel" /></label>
          </div>
        </div>
        <div className="form-card">
          <span className="eyebrow">02 · Livraison</span>
          <h2>Où livrer votre sélection après validation ?</h2>
          <label className="field"><span>Adresse</span><input name="address" required autoComplete="address-line1" /></label>
          <label className="field"><span>Complément <small>optionnel</small></span><input name="address2" autoComplete="address-line2" /></label>
          <div className="form-row three">
            <label className="field"><span>Code postal</span><input name="postalCode" required autoComplete="postal-code" /></label>
            <label className="field"><span>Ville</span><input name="city" required autoComplete="address-level2" /></label>
            <label className="field">
              <span>Pays</span>
              <select value={country} onChange={(event) => setCountry(event.target.value as "BE" | "NL")}>
                <option value="BE">Belgique</option>
                <option value="NL">Pays-Bas</option>
              </select>
            </label>
          </div>
          <label className="field"><span>Instructions <small>optionnel</small></span><textarea name="note" rows={3} /></label>
        </div>
        <div className="form-card consents">
          <span className="eyebrow">03 · Vos accords</span>
          <h2>Consentements</h2>
          <label><input name="age" type="checkbox" required /> <span>Je confirme avoir 18 ans ou plus.</span></label>
          <label><input name="terms" type="checkbox" required /> <span>J’accepte les CGV et la politique de confidentialité.</span></label>
          <label><input name="marketing" type="checkbox" /> <span>Je souhaite recevoir les nouvelles Vinaria. <small>Facultatif et révocable.</small></span></label>
          <p><LockKeyhole size={15} /> Vinaria ne stocke aucune donnée de carte. Le règlement sera activé via un prestataire certifié.</p>
        </div>
      </section>
      <aside className="order-summary checkout-summary">
        <span className="eyebrow">Demande</span>
        <h2>Votre sélection</h2>
        <ul>
          {items.map((item) => (
            <li key={item.productId}><span>{item.quantity} × {item.name}</span><strong>accord proposé</strong></li>
          ))}
        </ul>
        {subtotalCents < minimum && (
          <p className="form-error">Le minimum de commande n’est pas encore atteint pour ce pays.</p>
        )}
        <button className="primary-button full-button" disabled={submitting || subtotalCents < minimum}>
          {submitting ? "Envoi…" : "Envoyer ma demande"} <Check size={17} />
        </button>
        <p><Truck size={16} /> Vous recevrez la confirmation caviste et le lien de paiement sous 24 h.</p>
      </aside>
    </form>
  );
}
