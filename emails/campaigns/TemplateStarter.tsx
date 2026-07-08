import { Text } from "@react-email/components";
import { EthnyCTA } from "../components/EthnyCTA";
import { EthnyHero } from "../components/EthnyHero";
import { EthnySection } from "../components/EthnySection";
import { EthnySignature } from "../components/EthnySignature";
import { EthnyMarketingLayout } from "../layouts/EthnyMarketingLayout";
import { emailBrand, emailVariables } from "../tokens/email-brand";
import { emailTypography } from "../tokens/email-typography";

export default function TemplateStarter() {
  return (
    <EthnyMarketingLayout
      preview="Template de depart pour une nouvelle campagne Ethny."
      eyebrow="Template"
    >
      <EthnyHero
        eyebrow="Sourcil de campagne"
        title="Titre de campagne Ethny"
        intro={`Bonjour ${emailVariables.firstName}, ajoutez ici une introduction courte, humaine et claire.`}
        image={emailBrand.assets.heroPrivateChef}
        ctaHref={emailVariables.websiteLink}
        ctaLabel="CTA principal"
      />
      <EthnySection>
        <Text style={bodyStyle}>
          Premier bloc de contenu. Garder des phrases courtes, une promesse
          prudente et une valeur concrete pour le lecteur.
        </Text>
        <Text style={bodyStyle}>
          Deuxieme bloc. Ne jamais confirmer automatiquement une disponibilite,
          une reservation ou un prix final.
        </Text>
      </EthnySection>
      <EthnySection background="cream">
        <EthnyCTA
          title="Titre du bloc CTA"
          text="Texte court du CTA avec une action claire."
          href={emailVariables.bookingLink}
          label="Demander une proposition"
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
  margin: "0 0 16px",
};
