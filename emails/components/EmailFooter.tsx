import { Link, Section, Text } from "@react-email/components";
import { emailBrand, emailVariables } from "../tokens/email-brand";
import { emailColors } from "../tokens/email-colors";
import { emailSpacing } from "../tokens/email-spacing";
import { emailTypography } from "../tokens/email-typography";
import { EthnyDivider } from "./EthnyDivider";

export function EmailFooter() {
  return (
    <Section
      style={{
        backgroundColor: emailColors.forestDeep,
        padding: `${emailSpacing.card}px ${emailSpacing.pageX}px 30px`,
        textAlign: "center",
      }}
    >
      <EthnyDivider tone="dark" />
      <Text
        style={{
          color: emailColors.cream,
          fontFamily: emailTypography.title,
          fontSize: 22,
          lineHeight: "26px",
          margin: "22px 0 6px",
        }}
      >
        {emailBrand.name}
      </Text>
      <Text
        style={{
          color: "rgba(242, 235, 220, 0.78)",
          fontFamily: emailTypography.body,
          fontSize: 13,
          lineHeight: "21px",
          margin: "0 0 14px",
        }}
      >
        Chef prive, traiteur evenementiel, cours de cuisine et experiences
        gastronomiques nomades.
      </Text>
      <Text
        style={{
          color: "rgba(242, 235, 220, 0.7)",
          fontFamily: emailTypography.body,
          fontSize: 12,
          lineHeight: "20px",
          margin: 0,
        }}
      >
        Vous recevez cet email car vous avez ete en contact avec Ethny Nomad
        Cuisine.{" "}
        <Link
          href={emailVariables.unsubscribeLink}
          style={{ color: emailColors.cream, textDecoration: "underline" }}
        >
          Se desinscrire
        </Link>
      </Text>
    </Section>
  );
}
