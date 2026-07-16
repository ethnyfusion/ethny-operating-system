import Link from "next/link";
import { BrandMark } from "./brand-mark";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <BrandMark />
          <p>Une expérience d’accords mets-vins curatée et orchestrée par Ethny.</p>
        </div>
        <div>
          <strong>Expérience</strong>
          <Link href="/pairing">Accord libre</Link>
          <Link href="/menu-pairing">Menu Ethny</Link>
          <Link href="/tracking">Suivre une commande</Link>
          <a href="https://www.ethnyfusion.be" target="_blank" rel="noreferrer">Ethny Fusion</a>
        </div>
        <div>
          <strong>La promesse</strong>
          <p>Sélection humaine</p>
          <p>Budget piloté en interne, sans catalogue marchand</p>
          <p>Validation caviste sous 24 h</p>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} Ethny</span>
        <span>Vente réservée aux personnes majeures · L’abus d’alcool est dangereux pour la santé.</span>
      </div>
    </footer>
  );
}
