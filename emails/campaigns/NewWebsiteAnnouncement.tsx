import { Heading, Text } from "@react-email/components";
import { EthnyCTA } from "../components/EthnyCTA";
import { EthnyHero } from "../components/EthnyHero";
import { EthnySection } from "../components/EthnySection";
import { EthnyServiceCard } from "../components/EthnyServiceCard";
import { EthnySignature } from "../components/EthnySignature";
import { EthnyMarketingLayout } from "../layouts/EthnyMarketingLayout";
import { ethnyServices } from "../data/services";
import { emailBrand, emailVariables } from "../tokens/email-brand";
import { emailColors } from "../tokens/email-colors";
import { emailTypography } from "../tokens/email-typography";

export default function NewWebsiteAnnouncement() {
  return (
    <EthnyMarketingLayout
      preview="Le nouveau site Ethny facilite les demandes privees, evenements et experiences sur mesure."
      eyebrow="Nouveau site"
    >
      <EthnyHero
        eyebrow="Nouvelle experience en ligne"
        title="Le nouveau site Ethny est en ligne"
        intro={`Bonjour ${emailVariables.firstName}, le site Ethny Nomad Cuisine a ete repense pour presenter plus clairement les experiences privees, les evenements et les demandes sur mesure.`}
        image={emailBrand.assets.heroWebsite}
        ctaHref={emailVariables.websiteLink}
        ctaLabel="Decouvrir le site"
      />
      <EthnySection>
        <Heading style={headingStyle}>Ce qui change</Heading>
        <Text style={bodyStyle}>
          La navigation est plus simple, les services sont mieux separes et les
          demandes d'evenement prive peuvent etre preparees avec davantage de
          clarte avant l'echange humain.
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
          title="Un evenement a imaginer ?"
          text="Vous pouvez deja transmettre les premieres informations. La disponibilite et le devis seront toujours valides humainement."
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

const headingStyle = {
  color: emailColors.forestDeep,
  fontFamily: emailTypography.title,
  fontSize: 30,
  lineHeight: "34px",
  margin: "0 0 12px",
};

const bodyStyle = {
  color: "rgba(42, 42, 42, 0.78)",
  fontFamily: emailTypography.body,
  fontSize: 16,
  lineHeight: "25px",
  margin: "0 0 20px",
};
