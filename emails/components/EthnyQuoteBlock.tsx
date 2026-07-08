import { Section, Text } from "@react-email/components";
import { emailColors } from "../tokens/email-colors";
import { emailSpacing } from "../tokens/email-spacing";
import { emailTypography } from "../tokens/email-typography";

type EthnyQuoteBlockProps = {
  quote: string;
  author?: string;
};

export function EthnyQuoteBlock({ quote, author }: EthnyQuoteBlockProps) {
  return (
    <Section
      style={{
        backgroundColor: emailColors.softForest,
        borderLeft: `3px solid ${emailColors.sage}`,
        borderRadius: emailSpacing.radiusMedium,
        padding: "22px 24px",
      }}
    >
      <Text
        style={{
          color: emailColors.forestDeep,
          fontFamily: emailTypography.title,
          fontSize: 25,
          fontStyle: "italic",
          lineHeight: "31px",
          margin: "0 0 10px",
        }}
      >
        {quote}
      </Text>
      {author ? (
        <Text
          style={{
            color: emailColors.sage,
            fontFamily: emailTypography.body,
            fontSize: 13,
            lineHeight: "20px",
            margin: 0,
          }}
        >
          {author}
        </Text>
      ) : null}
    </Section>
  );
}
