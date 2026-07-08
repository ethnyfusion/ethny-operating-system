import { Text } from "@react-email/components";
import { EthnyCTA } from "../components/EthnyCTA";
import { EthnySection } from "../components/EthnySection";
import { EthnySignature } from "../components/EthnySignature";
import { EthnyTransactionalLayout } from "../layouts/EthnyTransactionalLayout";
import { emailVariables } from "../tokens/email-brand";
import { emailColors } from "../tokens/email-colors";
import { emailTypography } from "../tokens/email-typography";

export default function QuoteFollowUpEmail() {
  return (
    <EthnyTransactionalLayout preview="Un suivi cordial concernant votre proposition Ethny.">
      <EthnySection background="cream">
        <Text style={eyebrowStyle}>Suivi de proposition</Text>
        <Text style={titleStyle}>Votre proposition Ethny</Text>
        <Text style={bodyStyle}>
          Bonjour {emailVariables.firstName}, je me permets de revenir vers vous
          au sujet de la proposition pour {emailVariables.eventType}
          {` du ${emailVariables.eventDate}`}.
        </Text>
        <Text style={bodyStyle}>
          Si certains points doivent etre ajustes, menu, service, vaisselle,
          accord vin ou format, je peux retravailler la proposition pour qu'elle
          corresponde mieux a votre besoin.
        </Text>
      </EthnySection>
      <EthnySection>
        <EthnyCTA
          title="Relire ou ajuster la proposition"
          text="La date reste a confirmer selon disponibilite et validation humaine."
          href={emailVariables.quoteLink}
          label="Voir la proposition"
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
