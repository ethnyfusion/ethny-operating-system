import { Section, Text } from "@react-email/components";
import { emailColors } from "../tokens/email-colors";
import { emailSpacing } from "../tokens/email-spacing";
import { emailTypography } from "../tokens/email-typography";

type EthnyMenuBlockProps = {
  title: string;
  intro?: string;
  items: string[];
  note?: string;
};

export function EthnyMenuBlock({ title, intro, items, note }: EthnyMenuBlockProps) {
  return (
    <Section
      style={{
        border: `1px solid ${emailColors.line}`,
        borderRadius: emailSpacing.radiusCard,
        padding: "24px",
      }}
    >
      <Text
        style={{
          color: emailColors.forestDeep,
          fontFamily: emailTypography.title,
          fontSize: 28,
          lineHeight: "32px",
          margin: "0 0 8px",
        }}
      >
        {title}
      </Text>
      {intro ? (
        <Text
          style={{
            color: "rgba(42, 42, 42, 0.76)",
            fontFamily: emailTypography.body,
            fontSize: 14,
            lineHeight: "22px",
            margin: "0 0 16px",
          }}
        >
          {intro}
        </Text>
      ) : null}
      {items.map((item) => (
        <Text
          key={item}
          style={{
            borderTop: `1px solid ${emailColors.line}`,
            color: emailColors.anthracite,
            fontFamily: emailTypography.body,
            fontSize: 14,
            lineHeight: "21px",
            margin: 0,
            padding: "11px 0",
          }}
        >
          {item}
        </Text>
      ))}
      {note ? (
        <Text
          style={{
            color: emailColors.sage,
            fontFamily: emailTypography.body,
            fontSize: 12,
            lineHeight: "18px",
            margin: "10px 0 0",
          }}
        >
          {note}
        </Text>
      ) : null}
    </Section>
  );
}
