import { Img, Section, Text } from "@react-email/components";
import { assetUrl } from "../tokens/email-brand";
import { emailColors } from "../tokens/email-colors";
import { emailSpacing } from "../tokens/email-spacing";
import { emailTypography } from "../tokens/email-typography";

type EthnyImageBlockProps = {
  src: string;
  alt: string;
  caption?: string;
};

export function EthnyImageBlock({ src, alt, caption }: EthnyImageBlockProps) {
  return (
    <Section>
      <Img
        src={assetUrl(src)}
        alt={alt}
        width="592"
        style={{
          borderRadius: emailSpacing.radiusCard,
          display: "block",
          height: "auto",
          width: "100%",
        }}
      />
      {caption ? (
        <Text
          style={{
            color: emailColors.sage,
            fontFamily: emailTypography.body,
            fontSize: 12,
            lineHeight: "18px",
            margin: "10px 0 0",
            textAlign: "center",
          }}
        >
          {caption}
        </Text>
      ) : null}
    </Section>
  );
}
