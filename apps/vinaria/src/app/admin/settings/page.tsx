export default function AdminSettingsPage() {
  return (
    <>
      <header className="admin-header"><div><span className="eyebrow">Configuration</span><h1>Réglages</h1><p>Paramètres métier et garde-fous du MVP.</p></div><button className="primary-button">Enregistrer</button></header>
      <div className="settings-grid">
        <section className="form-card"><h2>Commande</h2><label className="field"><span>Minimum Belgique</span><input defaultValue="75,00 €" /></label><label className="field"><span>Minimum Pays-Bas</span><input defaultValue="100,00 €" /></label><label className="field"><span>Email opérations</span><input defaultValue="orders@ethny.be" /></label></section>
        <section className="form-card"><h2>Données & conformité</h2><label className="field"><span>Durée de conservation</span><select defaultValue="365"><option value="365">365 jours</option><option value="730">730 jours</option></select></label><p className="settings-copy">Le consentement marketing reste séparé. Les données de carte ne sont jamais stockées par Vinaria. Les fonctions d’export et suppression sont prévues dans le contrat de service.</p></section>
      </div>
    </>
  );
}
