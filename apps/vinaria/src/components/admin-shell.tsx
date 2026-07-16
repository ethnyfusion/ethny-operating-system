import Link from "next/link";
import type { ReactNode } from "react";
import { BrandMark } from "./brand-mark";

const links = [
  ["/admin/products", "Produits"],
  ["/admin/orders", "Commandes"],
  ["/admin/partners", "Partenaires"],
  ["/admin/deliveries", "Livraisons"],
  ["/admin/margins", "Marges"],
  ["/admin/settings", "Réglages"],
];

export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <Link href="/"><BrandMark /></Link>
        <span className="admin-label">Pilotage Ethny</span>
        <nav>
          {links.map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}
        </nav>
        <Link className="back-site" href="/">← Voir le site</Link>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}
