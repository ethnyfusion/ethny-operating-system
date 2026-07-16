import { CatalogueClient } from "@/components/catalogue-client";
import { PageHero } from "@/components/page-hero";

export const metadata = { title: "La sélection" } as const;

export default function CataloguePage() {
  return (
    <>
      <PageHero eyebrow="La cave Vinaria" title="Peu de références. Beaucoup de raisons.">
        <p>La cave est visible pour comprendre l’univers Vinaria, mais la commande reste une expérience d’accord : prix global, sélection courte, validation caviste.</p>
      </PageHero>
      <section className="content-section"><div className="shell"><CatalogueClient /></div></section>
    </>
  );
}
