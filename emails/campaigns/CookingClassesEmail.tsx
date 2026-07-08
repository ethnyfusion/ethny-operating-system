import { EthnyCTA } from "../components/EthnyCTA";
import { EthnyHero } from "../components/EthnyHero";
import { EthnySection } from "../components/EthnySection";
import { EthnyServiceCard } from "../components/EthnyServiceCard";
import { EthnySignature } from "../components/EthnySignature";
import { EthnyMarketingLayout } from "../layouts/EthnyMarketingLayout";
import { emailBrand, emailVariables } from "../tokens/email-brand";

export default function CookingClassesEmail() {
  return (
    <EthnyMarketingLayout
      preview="Cours de cuisine, ateliers prives et formations autour des gestes et des influences Ethny."
      eyebrow="Cours de cuisine"
    >
      <EthnyHero
        eyebrow="Ateliers et transmission"
        title="Cuisiner, comprendre, partager"
        intro={`Bonjour ${emailVariables.firstName}, les cours Ethny sont concus comme des moments vivants : apprendre des gestes, comprendre les produits et repartir avec une experience concrete.`}
        image={emailBrand.assets.heroClasses}
        ctaHref={emailVariables.bookingLink}
        ctaLabel="Imaginer un atelier"
      />
      <EthnySection>
        <EthnyServiceCard
          icon={emailBrand.assets.classIcon}
          title="Ateliers prives"
          text="Pour particuliers, groupes, entreprises ou lieux d'accueil qui souhaitent proposer une experience culinaire humaine."
        />
        <EthnyServiceCard
          icon={emailBrand.assets.chefIcon}
          title="Approche pedagogique"
          text="Gestes techniques, organisation, dressage, cuisson, assaisonnement et influences nomades selon le niveau du groupe."
        />
      </EthnySection>
      <EthnySection background="cream">
        <EthnyCTA
          title="Creer un cours sur mesure"
          text="Le format se precise selon le lieu, la duree, le nombre de participants et le theme souhaite."
          href={emailVariables.quoteLink}
          label="Demander une proposition"
        />
      </EthnySection>
      <EthnySection>
        <EthnySignature />
      </EthnySection>
    </EthnyMarketingLayout>
  );
}
