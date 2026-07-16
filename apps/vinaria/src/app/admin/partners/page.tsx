import { partners } from "@/data/partners";

export default function AdminPartnersPage() {
  return (
    <>
      <header className="admin-header"><div><span className="eyebrow">Réseau cavistes</span><h1>Partenaires</h1><p>Coordonnées, délais de préparation et périmètre opérationnel.</p></div><button className="primary-button">Ajouter</button></header>
      <div className="card-grid admin-cards">
        {partners.map((partner) => <article className="admin-card" key={partner.id}><span className="status-badge status-confirmed">Actif</span><h2>{partner.name}</h2><p>{partner.contactName}</p><dl><div><dt>Email</dt><dd>{partner.email}</dd></div><div><dt>Délai cible</dt><dd>{partner.leadTimeHours} h</dd></div><div><dt>Préparation</dt><dd>{partner.preparationAddress.city}</dd></div></dl><small>{partner.internalNote}</small></article>)}
      </div>
    </>
  );
}
