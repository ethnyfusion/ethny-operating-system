import { EthnyCTA } from "../components/EthnyCTA";
import { EthnyHero } from "../components/EthnyHero";
import { EthnySection } from "../components/EthnySection";
import { EthnyServiceCard } from "../components/EthnyServiceCard";
import { EthnySignature } from "../components/EthnySignature";
import { EthnyMarketingLayout } from "../layouts/EthnyMarketingLayout";
import { emailBrand, emailVariables } from "../tokens/email-brand";

export default function EventCateringEmail() {
  return (
    <EthnyMarketingLayout
      preview="Cocktails, diners, anniversaires, mariages et evenements corporate avec une cuisine sur mesure."
      eyebrow="Traiteur evenementiel"
    >
      <EthnyHero
        eyebrow="Evenements prives et corporate"
        title="Une reception claire, elegante et bien rythmee"
        intro={`Bonjour ${emailVariables.firstName}, pour votre ${emailVariables.eventType}, Ethny peut construire une proposition adaptee au lieu, au nombre d'invites et au niveau de service attendu.`}
        image={emailBrand.assets.heroCatering}
        ctaHref={emailVariables.quoteLink}
        ctaLabel="Demander un devis"
      />
      <EthnySection>
        <EthnyServiceCard
          icon={emailBrand.assets.eventIcon}
          title="Formats possibles"
          text="Cocktail dinatoire, buffet soigne, diner assis, reception d'entreprise, anniversaire, mariage ou moment prive."
        />
        <EthnyServiceCard
          icon={emailBrand.assets.quoteIcon}
          title="Options utiles"
          text="Accord vin, aperitif, service, vaisselle et materiel peuvent etre ajoutes sans pression, selon le besoin reel de l'evenement."
        />
      </EthnySection>
      <EthnySection background="cream">
        <EthnyCTA
          title="Structurer votre reception"
          text="Envoyez les informations connues. Le prix final et la disponibilite restent valides humainement."
          href={emailVariables.bookingLink}
          label="Envoyer une demande"
        />
      </EthnySection>
      <EthnySection>
        <EthnySignature />
      </EthnySection>
    </EthnyMarketingLayout>
  );
}
