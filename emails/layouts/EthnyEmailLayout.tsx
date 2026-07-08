import {
  Body,
  Container,
  Head,
  Html,
  Preview,
} from "@react-email/components";
import type { ReactNode } from "react";
import { EmailFooter } from "../components/EmailFooter";
import { EmailHeader } from "../components/EmailHeader";
import { emailBrand } from "../tokens/email-brand";
import { emailColors } from "../tokens/email-colors";
import { emailSpacing } from "../tokens/email-spacing";
import { emailTypography } from "../tokens/email-typography";

type EthnyEmailLayoutProps = {
  children: ReactNode;
  preview?: string;
  headerVariant?: "light" | "dark";
  headerEyebrow?: string;
};

export function EthnyEmailLayout({
  children,
  preview = emailBrand.defaultPreheader,
  headerVariant = "light",
  headerEyebrow,
}: EthnyEmailLayoutProps) {
  return (
    <Html lang="fr">
      <Head>
        <title>{emailBrand.name}</title>
      </Head>
      <Preview>{preview}</Preview>
      <Body
        style={{
          backgroundColor: emailColors.cream,
          color: emailColors.anthracite,
          fontFamily: emailTypography.body,
          margin: 0,
          padding: "28px 0",
        }}
      >
        <Container
          style={{
            backgroundColor: emailColors.white,
            border: `1px solid ${emailColors.line}`,
            borderRadius: emailSpacing.radiusCard,
            margin: "0 auto",
            maxWidth: emailSpacing.maxWidth,
            overflow: "hidden",
            width: "100%",
          }}
        >
          <EmailHeader variant={headerVariant} eyebrow={headerEyebrow} />
          {children}
          <EmailFooter />
        </Container>
      </Body>
    </Html>
  );
}
