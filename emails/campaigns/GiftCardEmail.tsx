import { Text } from "@react-email/components";
import { EthnyCTA } from "../components/EthnyCTA";
import { EthnyHero } from "../components/EthnyHero";
import { EthnySection } from "../components/EthnySection";
import { EthnyServiceCard } from "../components/EthnyServiceCard";
import { EthnySignature } from "../components/EthnySignature";
import { EthnyMarketingLayout } from "../layouts/EthnyMarketingLayout";
import { emailBrand, emailVariables } from "../tokens/email-brand";
import { emailTypography } from "../tokens/email-typography";

export default function GiftCardEmail() {
  return (
    <EthnyMarketingLayout
      preview="Offrir une experience Ethny a construire sur mesure."
      eyebrow="Experience a offrir"
    >
      <EthnyHero
        eyebrow="Carte cadeau"
        title="Offrir une experience culinaire"
        intro={`Bonjour ${emailVariables.firstName}, une experience Ethny peut aussi s'offrir : diner prive, cours de cuisine ou moment sur mesure a imaginer avec le beneficiaire.`}
        image={emailBrand.assets.heroPrivateChef}
        ctaHref={emailVariables.quoteLink}
        ctaLabel="Demander les possibilites"
      />
      <EthnySection>
        <EthnyServiceCard
          icon={emailBrand.assets.chefIcon}
          title="Un cadeau vivant"
          text="L'experience peut etre definie comme une enveloppe, un format ou une intention, puis ajustee apres echange."
        />
        <Text style={bodyStyle}>
          Le montant, la date, le menu et les conditions doivent rester valides
          avant emission finale. L'objectif est d'offrir un cadre elegant, pas
          une promesse automatique.
        </Text>
      </EthnySection>
      <EthnySection background="cream">
        <EthnyCTA
          title="Preparer un cadeau"
          text="Une proposition claire peut etre preparee selon l'occasion et le niveau d'accompagnement souhaite."
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
  margin: "18px 0 0",
};
