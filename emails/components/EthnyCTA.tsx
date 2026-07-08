import { Heading, Section, Text } from "@react-email/components";
import { emailColors } from "../tokens/email-colors";
import { emailSpacing } from "../tokens/email-spacing";
import { emailTypography } from "../tokens/email-typography";
import { EthnyButton } from "./EthnyButton";

type EthnyCTAProps = {
  title: string;
  text: string;
  href: string;
  label: string;
};

export function EthnyCTA({ title, text, href, label }: EthnyCTAProps) {
  return (
    <Section
      style={{
        backgroundColor: emailColors.forestDeep,
        borderRadius: emailSpacing.radiusCard,
        padding: "28px 24px",
        textAlign: "center",
      }}
    >
      <Heading
        as="h2"
        style={{
          color: emailColors.cream,
          fontFamily: emailTypography.title,
          fontSize: 28,
          fontWeight: 600,
          lineHeight: "32px",
          margin: "0 0 10px",
        }}
      >
        {title}
      </Heading>
      <Text
        style={{
          color: "rgba(242, 235, 220, 0.82)",
          fontFamily: emailTypography.body,
          fontSize: 15,
          lineHeight: "24px",
          margin: "0 0 22px",
        }}
      >
        {text}
      </Text>
      <EthnyButton href={href} variant="light">
        {label}
      </EthnyButton>
    </Section>
  );
}
