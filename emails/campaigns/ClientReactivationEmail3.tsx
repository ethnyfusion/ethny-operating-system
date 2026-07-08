import { Text } from "@react-email/components";
import { EthnyCTA } from "../components/EthnyCTA";
import { EthnyHero } from "../components/EthnyHero";
import { EthnySection } from "../components/EthnySection";
import { EthnySignature } from "../components/EthnySignature";
import { EthnyNewsletterLayout } from "../layouts/EthnyNewsletterLayout";
import { emailBrand, emailVariables } from "../tokens/email-brand";
import { emailTypography } from "../tokens/email-typography";

export default function ClientReactivationEmail3() {
  return (
    <EthnyNewsletterLayout preview="Dernier message de reprise de contact, cordial et sans pression.">
      <EthnyHero
        eyebrow="Restons en contact"
        title="Je vous laisse revenir vers moi au bon moment"
        intro={`Bonjour ${emailVariables.firstName}, je ne souhaite pas vous solliciter inutilement. Je vous laisse simplement ce dernier message pour garder le lien avec Ethny.`}
        image={emailBrand.assets.heroPrivateChef}
      />
      <EthnySection>
        <Text style={bodyStyle}>
          Si une occasion se presente plus tard, je serai ravi d'en parler avec
          vous et de construire une proposition claire, adaptee au lieu et aux
          invites.
        </Text>
      </EthnySection>
      <EthnySection background="cream">
        <EthnyCTA
          title="Garder le lien"
          text="Vous pouvez revenir vers Ethny quand le moment sera juste pour vous."
          href={emailVariables.websiteLink}
          label="Revoir les experiences"
        />
      </EthnySection>
      <EthnySection>
        <EthnySignature closing="Bien cordialement," />
      </EthnySection>
    </EthnyNewsletterLayout>
  );
}

const bodyStyle = {
  color: "rgba(42, 42, 42, 0.78)",
  fontFamily: emailTypography.body,
  fontSize: 16,
  lineHeight: "25px",
  margin: 0,
};
