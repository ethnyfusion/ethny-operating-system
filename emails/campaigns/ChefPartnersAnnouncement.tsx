import { Text } from "@react-email/components";
import { EthnyCTA } from "../components/EthnyCTA";
import { EthnyHero } from "../components/EthnyHero";
import { EthnySection } from "../components/EthnySection";
import { EthnyServiceCard } from "../components/EthnyServiceCard";
import { EthnySignature } from "../components/EthnySignature";
import { EthnyMarketingLayout } from "../layouts/EthnyMarketingLayout";
import { emailBrand, emailVariables } from "../tokens/email-brand";
import { emailTypography } from "../tokens/email-typography";

export default function ChefPartnersAnnouncement() {
  return (
    <EthnyMarketingLayout
      preview="Une proposition pour gites de luxe, lieux prives, conciergeries et partenaires evenementiels."
      eyebrow="Partenaires"
    >
      <EthnyHero
        eyebrow="Lieux, gites et prescripteurs"
        title="Une experience chef pour vos clients"
        intro={`Bonjour ${emailVariables.firstName}, Ethny peut accompagner vos clients avec une cuisine sur mesure, une presence professionnelle et une communication claire avant l'evenement.`}
        image={emailBrand.assets.heroPrivateChef}
        ctaHref={emailVariables.websiteLink}
        ctaLabel="Voir les experiences"
      />
      <EthnySection>
        <EthnyServiceCard
          icon={emailBrand.assets.eventIcon}
          title="Pour les sejours et evenements"
          text="Diners prives, anniversaires, retraites, seminaires, moments familiaux ou receptions dans des lieux premium."
        />
        <Text style={bodyStyle}>
          La collaboration peut etre preparee simplement : perimetre, niveau de
          service, type de demandes, delais de reponse et methode de
          qualification.
        </Text>
      </EthnySection>
      <EthnySection background="cream">
        <EthnyCTA
          title="Echanger sur un partenariat"
          text="Aucune automatisation n'est lancee : le premier contact reste humain et qualifie."
          href={emailVariables.bookingLink}
          label="Planifier un echange"
        />
      </EthnySection>
      <EthnySection>
        <EthnySignature />
      </EthnySection>
    </EthnyMarketingLayout>
  );
}

const bodyStyle = {
  color: "rgba(42, 42, 42, 0.78)",
  fontFamily: emailTypography.body,
  fontSize: 16,
  lineHeight: "25px",
  margin: "18px 0 0",
};
