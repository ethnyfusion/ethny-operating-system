import { Heading, Img, Section, Text } from "@react-email/components";
import { assetUrl } from "../tokens/email-brand";
import { emailColors } from "../tokens/email-colors";
import { emailSpacing } from "../tokens/email-spacing";
import { emailTypography } from "../tokens/email-typography";
import { EthnyButton } from "./EthnyButton";

type EthnyHeroProps = {
  eyebrow?: string;
  title: string;
  intro: string;
  image?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function EthnyHero({
  eyebrow,
  title,
  intro,
  image,
  ctaLabel,
  ctaHref,
}: EthnyHeroProps) {
  return (
    <Section style={{ backgroundColor: emailColors.cream }}>
      {image ? (
        <Img
          src={assetUrl(image)}
          alt=""
          width="640"
          height="300"
          style={{
            display: "block",
            height: 300,
            objectFit: "cover",
            width: "100%",
          }}
        />
      ) : null}
      <Section style={{ padding: `34px ${emailSpacing.pageX}px 38px` }}>
        {eyebrow ? (
          <Text
            style={{
              color: emailColors.sage,
              fontFamily: emailTypography.body,
              fontSize: emailTypography.sizes.eyebrow,
              fontWeight: 600,
              letterSpacing: "1.8px",
              lineHeight: "18px",
              margin: "0 0 13px",
              textTransform: "uppercase",
            }}
          >
            {eyebrow}
          </Text>
        ) : null}
        <Heading
          as="h1"
          style={{
            color: emailColors.forestDeep,
            fontFamily: emailTypography.title,
            fontSize: emailTypography.sizes.h1,
            fontWeight: 600,
            letterSpacing: 0,
            lineHeight: emailTypography.lineHeights.title,
            margin: "0 0 16px",
          }}
        >
          {title}
        </Heading>
        <Text
          style={{
            color: "rgba(42, 42, 42, 0.78)",
            fontFamily: emailTypography.body,
            fontSize: emailTypography.sizes.body,
            lineHeight: emailTypography.lineHeights.body,
            margin: ctaHref && ctaLabel ? "0 0 24px" : 0,
          }}
        >
          {intro}
        </Text>
        {ctaHref && ctaLabel ? (
          <EthnyButton href={ctaHref}>{ctaLabel}</EthnyButton>
        ) : null}
      </Section>
    </Section>
  );
}
