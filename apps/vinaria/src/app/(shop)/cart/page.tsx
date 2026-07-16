import { CartView } from "@/components/cart-view";
import { PageHero } from "@/components/page-hero";

export const metadata = { title: "Panier" } as const;

export default function CartPage() {
  return (
    <>
      <PageHero eyebrow="Votre sélection" title="Le panier, sans précipitation." />
      <section className="content-section"><div className="shell"><CartView /></div></section>
    </>
  );
}
