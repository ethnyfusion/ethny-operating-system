import { Text } from "@react-email/components";
import { EthnyCTA } from "../components/EthnyCTA";
import { EthnySection } from "../components/EthnySection";
import { EthnySignature } from "../components/EthnySignature";
import { EthnyTransactionalLayout } from "../layouts/EthnyTransactionalLayout";
import { emailVariables } from "../tokens/email-brand";
import { emailColors } from "../tokens/email-colors";
import { emailTypography } from "../tokens/email-typography";

export default function ReviewRequestEmail() {
  return (
    <EthnyTransactionalLayout preview="Merci pour votre confiance. Votre avis aide Ethny a continuer a grandir.">
      <EthnySection background="cream">
        <Text style={eyebrowStyle}>Merci</Text>
        <Text style={titleStyle}>Votre retour compte beaucoup</Text>
        <Text style={bodyStyle}>
          Bonjour {emailVariables.firstName}, merci encore pour votre confiance
          lors de {emailVariables.eventType}. J'espere que ce moment vous a
          laisse un beau souvenir.
        </Text>
        <Text style={bodyStyle}>
          Si vous avez quelques instants, un avis Google aide beaucoup Ethny a
          faire connaitre cette approche humaine, soignee et sur mesure.
        </Text>
      </EthnySection>
      <EthnySection>
        <EthnyCTA
          title="Partager votre experience"
          text="Votre avis peut rester court. L'essentiel est qu'il soit sincere et personnel."
          href={emailVariables.reviewLink}
          label="Laisser un avis Google"
        />
      </EthnySection>
      <EthnySection>
        <EthnySignature />
      </EthnySection>
    </EthnyTransactionalLayout>
  );
}

const eyebrowStyle = {
  color: emailColors.sage,
  fontFamily: emailTypography.body,
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: "1.8px",
  lineHeight: "18px",
  margin: "0 0 12px",
  textTransform: "uppercase" as const,
};

const titleStyle = {
  color: emailColors.forestDeep,
  fontFamily: emailTypography.title,
  fontSize: 36,
  lineHeight: "40px",
  margin: "0 0 16px",
};

const bodyStyle = {
  color: "rgba(42, 42, 42, 0.78)",
  fontFamily: emailTypography.body,
  fontSize: 16,
  lineHeight: "25px",
  margin: "0 0 16px",
};
