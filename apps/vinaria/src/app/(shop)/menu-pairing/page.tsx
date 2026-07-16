import { PageHero } from "@/components/page-hero";
import { PairingExperience } from "@/components/pairing-experience";

export const metadata = { title: "Accord pour un menu Ethny" } as const;

export default function MenuPairingPage() {
  return (
    <>
      <PageHero eyebrow="Client Ethny" title="Votre menu est déjà le point de départ.">
        <p>Collez le menu reçu ou en cours de création avec Ethny. Vinaria calcule une sélection cohérente, puis le caviste valide la disponibilité sous 24 h.</p>
      </PageHero>
      <section className="content-section"><div className="shell"><PairingExperience source="ethny_menu" /></div></section>
    </>
  );
}
