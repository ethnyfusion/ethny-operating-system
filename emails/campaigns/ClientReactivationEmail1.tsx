import { Text } from "@react-email/components";
import { EthnyCTA } from "../components/EthnyCTA";
import { EthnyHero } from "../components/EthnyHero";
import { EthnySection } from "../components/EthnySection";
import { EthnySignature } from "../components/EthnySignature";
import { EthnyNewsletterLayout } from "../layouts/EthnyNewsletterLayout";
import { emailBrand, emailVariables } from "../tokens/email-brand";
import { emailTypography } from "../tokens/email-typography";

export default function ClientReactivationEmail1() {
  return (
    <EthnyNewsletterLayout preview="Un message simple pour reprendre contact avec Ethny Nomad Cuisine.">
      <EthnyHero
        eyebrow="Un mot d'Ethny"
        title="J'espere que vous allez bien"
        intro={`Bonjour ${emailVariables.firstName}, je me permets de vous envoyer un petit mot depuis notre dernier contact avec Ethny Nomad Cuisine.`}
        image={emailBrand.assets.heroStory}
      />
      <EthnySection>
        <Text style={bodyStyle}>
          Si vous envisagez un nouveau moment autour de la table, un diner prive,
          un anniversaire, un evenement d'entreprise ou simplement une idee a
          explorer, je serais ravi de vous accompagner.
        </Text>
        <Text style={bodyStyle}>
          Il n'y a aucune urgence : l'objectif est surtout de rester en contact
          et de vous rappeler que les experiences peuvent etre construites sur
          mesure.
        </Text>
      </EthnySection>
      <EthnySection background="cream">
        <EthnyCTA
          title="Une idee a preparer ?"
          text="Quelques informations suffisent pour ouvrir la discussion."
          href={emailVariables.bookingLink}
          label="Envoyer une demande"
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
  margin: "0 0 16px",
};
