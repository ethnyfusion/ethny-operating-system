import { CheckoutForm } from "@/components/checkout-form";
import { PageHero } from "@/components/page-hero";

export const metadata = { title: "Envoyer la demande" } as const;

export default function CheckoutPage() {
  return (
    <>
      <PageHero eyebrow="Demande d’accord" title="Quelques détails, puis nous prenons le relais." />
      <section className="content-section"><div className="shell"><CheckoutForm /></div></section>
    </>
  );
}
