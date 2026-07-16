import { PageHero } from "@/components/page-hero";
import { PairingExperience } from "@/components/pairing-experience";

export const metadata = { title: "Accord libre" } as const;

export default function PairingPage() {
  return (
    <>
      <PageHero eyebrow="Accord libre" title="Votre menu. Notre regard.">
        <p>Décrivez le repas, l’ambiance et vos préférences. Vinaria compose une sélection curatée, dimensionnée pour vos invités.</p>
      </PageHero>
      <section className="content-section"><div className="shell"><PairingExperience source="free" /></div></section>
    </>
  );
}
