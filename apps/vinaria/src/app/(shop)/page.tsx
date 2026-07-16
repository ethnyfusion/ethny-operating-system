import Link from "next/link";
import { ArrowRight, ChefHat, PackageCheck, Sparkles } from "lucide-react";
import { WineCard } from "@/components/wine-card";
import { wines } from "@/data/wines";

const steps = [
  { icon: ChefHat, number: "01", title: "Votre table", text: "Partez d’un menu Ethny ou racontez-nous librement ce que vous cuisinez." },
  { icon: Sparkles, number: "02", title: "Notre accord", text: "Vinaria croise l’assiette avec une cave volontairement limitée, puis garde la main sur l’accord." },
  { icon: PackageCheck, number: "03", title: "La validation", text: "Le caviste confirme la disponibilité sous 24 h. Ethny orchestre ensuite paiement, préparation et livraison." },
];

export default function HomePage() {
  return (
    <>
      <section className="home-hero">
        <div className="hero-orbit orbit-one" />
        <div className="hero-orbit orbit-two" />
        <div className="shell hero-grid">
          <div className="hero-content">
            <span className="eyebrow">Accords mets-vins · Curatés par Ethny</span>
            <h1>Le vin juste.<br /><em>Pour votre table.</em></h1>
            <p>Une expérience indépendante et personnelle pour transformer un menu en accord mets-vins validé humainement, sans marketplace, sans achat bouteille à l’unité, sans hasard.</p>
            <div className="button-row">
              <Link href="/menu-pairing" className="primary-button">J’ai déjà mon menu <ArrowRight size={17} /></Link>
              <Link href="/pairing" className="secondary-button">Créer un accord libre</Link>
            </div>
            <div className="trust-line">
              <span><strong>24 h</strong> validation caviste</span>
              <span><strong>Accord</strong> sélection curatée</span>
            </div>
          </div>
          <div className="hero-art note-art" aria-hidden="true">
            <div className="hero-note-card">
              <span className="eyebrow">Note d’accord</span>
              <h2>Menu reçu</h2>
              <div className="hero-note-list">
                <span>01 · Bar rôti, agrumes, herbes</span>
                <span>02 · Volaille, jus court, champignons</span>
                <span>03 · Poire, vanille, praliné</span>
              </div>
              <div className="hero-note-footer">
                <strong>4 services · 12 convives</strong>
                <small>sélection confirmée sous 24 h</small>
              </div>
            </div>
            <div className="hero-cave-slip">
              <small>Cave partenaire</small>
              <strong>François-Alain</strong>
              <span>importateur-caviste · Wavre</span>
            </div>
          </div>
        </div>
      </section>

      <section className="manifesto-section">
        <div className="shell manifesto-grid">
          <span className="eyebrow">Notre parti pris</span>
          <blockquote>« Moins de choix.<br />Plus de justesse. »</blockquote>
          <p>Nous ne vous envoyons pas dans un rayon infini. Vinaria vend une expérience d’accord, pas des bouteilles isolées. Le budget est piloté en interne, la sélection reste courte, et le caviste valide avant confirmation.</p>
        </div>
      </section>

      <section className="process-section">
        <div className="shell">
          <div className="section-heading split">
            <div><span className="eyebrow">L’expérience</span><h2>De l’assiette à la cave,<br />en trois gestes.</h2></div>
            <p>Une recommandation claire, une quantité réaliste et un parcours de commande suivi humainement.</p>
          </div>
          <div className="step-grid">
            {steps.map((step) => (
              <article key={step.number}>
                <div><step.icon /><span>{step.number}</span></div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="selection-section">
        <div className="shell">
          <div className="section-heading split">
            <div><span className="eyebrow">Extraits de cave</span><h2>Une sélection courte.<br />Chaque accord compte.</h2></div>
            <Link href="/catalogue" className="text-link">Explorer la sélection <ArrowRight size={16} /></Link>
          </div>
          <div className="wine-grid featured-wines">
            {wines.slice(0, 3).map((wine) => <WineCard key={wine.id} wine={wine} />)}
          </div>
        </div>
      </section>

      <section className="home-cta">
        <div className="shell">
          <span className="eyebrow">Votre prochain dîner</span>
          <h2>On choisit les vins ?</h2>
          <p>Deux minutes pour nous parler de la table. Quelques secondes pour découvrir les accords.</p>
          <Link href="/pairing" className="light-button">Commencer l’accord <ArrowRight size={17} /></Link>
        </div>
      </section>
    </>
  );
}
