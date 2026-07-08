import { Section, Text } from "@react-email/components";
import { emailColors } from "../tokens/email-colors";
import { emailSpacing } from "../tokens/email-spacing";
import { emailTypography } from "../tokens/email-typography";

type EthnyTestimonialBlockProps = {
  quote: string;
  clientName: string;
  context?: string;
};

export function EthnyTestimonialBlock({
  quote,
  clientName,
  context,
}: EthnyTestimonialBlockProps) {
  return (
    <Section
      style={{
        backgroundColor: emailColors.cream,
        border: `1px solid ${emailColors.line}`,
        borderRadius: emailSpacing.radiusCard,
        padding: "24px",
      }}
    >
      <Text
        style={{
          color: emailColors.forestDeep,
          fontFamily: emailTypography.title,
          fontSize: 26,
          fontStyle: "italic",
          lineHeight: "32px",
          margin: "0 0 14px",
        }}
      >
        "{quote}"
      </Text>
      <Text
        style={{
          color: emailColors.anthracite,
          fontFamily: emailTypography.body,
          fontSize: 13,
          fontWeight: 600,
          lineHeight: "20px",
          margin: 0,
        }}
      >
        {clientName}
      </Text>
      {context ? (
        <Text
          style={{
            color: emailColors.sage,
            fontFamily: emailTypography.body,
            fontSize: 12,
            lineHeight: "18px",
            margin: "2px 0 0",
          }}
        >
          {context}
        </Text>
      ) : null}
    </Section>
  );
}
