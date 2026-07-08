import { Img, Link, Section, Text } from "@react-email/components";
import { assetUrl, emailBrand, emailVariables } from "../tokens/email-brand";
import { emailColors } from "../tokens/email-colors";
import { emailSpacing } from "../tokens/email-spacing";
import { emailTypography } from "../tokens/email-typography";

type EmailHeaderProps = {
  variant?: "light" | "dark";
  eyebrow?: string;
};

export function EmailHeader({
  variant = "light",
  eyebrow = "Ethny Nomad Cuisine",
}: EmailHeaderProps) {
  const isDark = variant === "dark";

  return (
    <Section
      style={{
        backgroundColor: isDark ? emailColors.forestDeep : emailColors.cream,
        padding: `${emailSpacing.card}px ${emailSpacing.pageX}px 18px`,
        textAlign: "center",
      }}
    >
      <Link href={emailVariables.websiteLink}>
        <Img
          src={assetUrl(isDark ? emailBrand.assets.logoLight : emailBrand.assets.logoDark)}
          alt="Ethny Nomad Cuisine"
          width="190"
          style={{ margin: "0 auto 14px" }}
        />
      </Link>
      <Text
        style={{
          color: isDark ? emailColors.cream : emailColors.sage,
          fontFamily: emailTypography.body,
          fontSize: emailTypography.sizes.eyebrow,
          fontWeight: 500,
          letterSpacing: "1.8px",
          lineHeight: "18px",
          margin: 0,
          textTransform: "uppercase",
        }}
      >
        {eyebrow}
      </Text>
    </Section>
  );
}
