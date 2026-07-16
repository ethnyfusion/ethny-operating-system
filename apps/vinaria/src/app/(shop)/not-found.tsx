import Link from "next/link";

export default function ShopNotFound() {
  return (
    <section className="confirmation-section">
      <div className="confirmation-card">
        <span className="eyebrow">404</span>
        <h1>Cette bouteille n’est pas dans notre cave.</h1>
        <Link className="primary-button" href="/">Retour à l’accueil</Link>
      </div>
    </section>
  );
}
