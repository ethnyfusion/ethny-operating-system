import { Section, Text } from "@react-email/components";
import { emailBrand } from "../tokens/email-brand";
import { emailColors } from "../tokens/email-colors";
import { emailTypography } from "../tokens/email-typography";

type EthnySignatureProps = {
  closing?: string;
};

export function EthnySignature({
  closing = "Avec plaisir,",
}: EthnySignatureProps) {
  return (
    <Section style={{ paddingTop: 6 }}>
      <Text
        style={{
          color: "rgba(42, 42, 42, 0.78)",
          fontFamily: emailTypography.body,
          fontSize: 16,
          lineHeight: "25px",
          margin: "0 0 10px",
        }}
      >
        {closing}
      </Text>
      <Text
        style={{
          color: emailColors.forestDeep,
          fontFamily: emailTypography.title,
          fontSize: 22,
          lineHeight: "26px",
          margin: 0,
        }}
      >
        {emailBrand.chefName}
      </Text>
      <Text
        style={{
          color: emailColors.sage,
          fontFamily: emailTypography.body,
          fontSize: 13,
          lineHeight: "20px",
          margin: "3px 0 0",
        }}
      >
        {emailBrand.name}
      </Text>
    </Section>
  );
}
