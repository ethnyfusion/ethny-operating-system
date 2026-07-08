import { Text } from "@react-email/components";
import { EthnyCTA } from "../components/EthnyCTA";
import { EthnyHero } from "../components/EthnyHero";
import { EthnySection } from "../components/EthnySection";
import { EthnyServiceCard } from "../components/EthnyServiceCard";
import { EthnySignature } from "../components/EthnySignature";
import { EthnyNewsletterLayout } from "../layouts/EthnyNewsletterLayout";
import { ethnyServices } from "../data/services";
import { emailBrand, emailVariables } from "../tokens/email-brand";
import { emailTypography } from "../tokens/email-typography";

export default function ClientReactivationEmail2() {
  return (
    <EthnyNewsletterLayout preview="Quelques formats Ethny a imaginer pour une prochaine occasion.">
      <EthnyHero
        eyebrow="Inspiration"
        title="Une prochaine table a imaginer ?"
        intro={`Bonjour ${emailVariables.firstName}, certaines occasions gagnent a etre preparees calmement : une table familiale, un moment prive, un atelier ou une reception plus structuree.`}
        image={emailBrand.assets.heroSeasonal}
      />
      <EthnySection>
        <Text style={bodyStyle}>
          Voici quelques formats que nous pouvons adapter selon le lieu, la
          saison et le niveau de service souhaite.
        </Text>
        {ethnyServices.slice(0, 3).map((service) => (
          <EthnyServiceCard
            key={service.id}
            icon={service.icon}
            title={service.title}
            text={service.summary}
          />
        ))}
      </EthnySection>
      <EthnySection background="cream">
        <EthnyCTA
          title="En parler simplement"
          text="Une premiere demande ne confirme ni date ni reservation : elle permet de verifier le cadre."
          href={emailVariables.bookingLink}
          label="Verifier une possibilite"
        />
      </EthnySection>
      <EthnySection>
        <EthnySignature />
      </EthnySection>
    </EthnyNewsletterLayout>
  );
}

const bodyStyle = {
  color: "rgba(42, 42, 42, 0.78)",
  fontFamily: emailTypography.body,
  fontSize: 16,
  lineHeight: "25px",
  margin: "0 0 20px",
};
