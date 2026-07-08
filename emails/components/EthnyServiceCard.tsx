import { Column, Img, Row, Section, Text } from "@react-email/components";
import { assetUrl } from "../tokens/email-brand";
import { emailColors } from "../tokens/email-colors";
import { emailSpacing } from "../tokens/email-spacing";
import { emailTypography } from "../tokens/email-typography";

type EthnyServiceCardProps = {
  icon?: string;
  title: string;
  text: string;
};

export function EthnyServiceCard({ icon, title, text }: EthnyServiceCardProps) {
  return (
    <Section
      style={{
        border: `1px solid ${emailColors.line}`,
        borderRadius: emailSpacing.radiusCard,
        padding: "18px",
      }}
    >
      <Row>
        {icon ? (
          <Column style={{ width: 44, verticalAlign: "top" }}>
            <Img src={assetUrl(icon)} alt="" width="28" height="28" />
          </Column>
        ) : null}
        <Column>
          <Text
            style={{
              color: emailColors.forestDeep,
              fontFamily: emailTypography.title,
              fontSize: 21,
              lineHeight: "25px",
              margin: "0 0 6px",
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              color: "rgba(42, 42, 42, 0.76)",
              fontFamily: emailTypography.body,
              fontSize: 14,
              lineHeight: "22px",
              margin: 0,
            }}
          >
            {text}
          </Text>
        </Column>
      </Row>
    </Section>
  );
}
