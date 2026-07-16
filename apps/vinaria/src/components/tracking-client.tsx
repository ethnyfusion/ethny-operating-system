"use client";

import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { demoOrders } from "@/data/demo-orders";
import type { Order, OrderStatus } from "@/types";

const labels: Record<OrderStatus, string> = {
  demande_recue: "Demande reçue",
  en_validation_caviste: "En validation caviste",
  validee: "Sélection validée",
  payee: "Paiement reçu",
  en_preparation: "En préparation",
  prete: "Prête",
  en_livraison: "En livraison",
  livree: "Livrée",
  cloturee: "Clôturée",
  expiree: "Expirée",
  annulee: "Annulée",
  orientee_expert: "Orientée spécialiste",
  litige: "Litige ouvert",
};

export function TrackingClient() {
  const params = useSearchParams();
  const [reference, setReference] = useState(params.get("reference") ?? "");
  const [order, setOrder] = useState<Order | null>(null);
  const [searched, setSearched] = useState(false);

  function findOrder(value: string) {
    const local = JSON.parse(window.localStorage.getItem("vinaria-orders-v1") ?? "[]") as Order[];
    const found = [...local, ...demoOrders].find(
      (candidate) => candidate.reference.toLowerCase() === value.trim().toLowerCase(),
    );
    setOrder(found ?? null);
    setSearched(true);
  }

  useEffect(() => {
    const initial = params.get("reference");
    if (!initial) return;
    queueMicrotask(() => findOrder(initial));
  // Query parameters only seed the initial lookup.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function submit(event: FormEvent) {
    event.preventDefault();
    findOrder(reference);
  }

  return (
    <div className="tracking-panel">
      <form className="tracking-search" onSubmit={submit}>
        <label className="field">
          <span>Référence de commande</span>
          <input value={reference} onChange={(event) => setReference(event.target.value)} placeholder="VIN-260709-A7C2" required />
        </label>
        <button className="primary-button"><Search size={17} /> Rechercher</button>
      </form>
      {searched && !order && (
        <div className="notice">Cette référence n’a pas été trouvée. Vérifiez l’email de confirmation ou contactez Vinaria.</div>
      )}
      {order && (
        <section className="tracking-result">
          <div className="tracking-heading">
            <div><span className="eyebrow">Commande {order.reference}</span><h2>{labels[order.status]}</h2></div>
            <span className={`status-badge status-${order.status}`}>{labels[order.status]}</span>
          </div>
          <div className="timeline">
            {order.statusHistory.map((event, index) => (
              <div className="timeline-item" key={`${event.status}-${event.at}`}>
                <span>{index + 1}</span>
                <div><strong>{labels[event.status]}</strong><small>{new Date(event.at).toLocaleString("fr-BE")}</small>{event.publicNote && <p>{event.publicNote}</p>}</div>
              </div>
            ))}
          </div>
        </section>
      )}
      <p className="demo-hint">Pour la démonstration : <button type="button" onClick={() => { setReference("VIN-260709-A7C2"); findOrder("VIN-260709-A7C2"); }}>VIN-260709-A7C2</button></p>
    </div>
  );
}
