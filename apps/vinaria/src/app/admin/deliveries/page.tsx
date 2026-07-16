import { deliveryProviders } from "@/services/delivery";

export default function AdminDeliveriesPage() {
  return (
    <>
      <header className="admin-header"><div><span className="eyebrow">Logistique</span><h1>Livraisons</h1><p>Une couche d’abstraction prête à recevoir les transporteurs sans contaminer le flow commande.</p></div></header>
      <div className="card-grid admin-cards">
        {Object.values(deliveryProviders).map((provider) => {
          const active = provider.id === "manual";
          return <article className="admin-card" key={provider.id}><span className={`status-badge ${active ? "status-confirmed" : "status-created"}`}>{active ? "Actif" : "Placeholder"}</span><h2>{provider.name}</h2><p>{active ? "Génère les informations et consignes nécessaires à l’organisation manuelle." : "Interface prête ; aucune intégration transporteur n’est activée."}</p></article>;
        })}
      </div>
    </>
  );
}
