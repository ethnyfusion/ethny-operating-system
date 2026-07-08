import { Button } from "@react-email/components";
import { emailColors } from "../tokens/email-colors";
import { emailSpacing } from "../tokens/email-spacing";
import { emailTypography } from "../tokens/email-typography";

type EthnyButtonProps = {
  href: string;
  children: string;
  variant?: "primary" | "light" | "outline";
};

export function EthnyButton({
  href,
  children,
  variant = "primary",
}: EthnyButtonProps) {
  const isLight = variant === "light";
  const isOutline = variant === "outline";

  return (
    <Button
      href={href}
      style={{
        backgroundColor: isOutline
          ? "transparent"
          : isLight
            ? emailColors.cream
            : emailColors.forestDeep,
        border: `1px solid ${isOutline ? emailColors.forest : "transparent"}`,
        borderRadius: emailSpacing.radiusButton,
        color: isLight || isOutline ? emailColors.forestDeep : emailColors.cream,
        fontFamily: emailTypography.body,
        fontSize: 15,
        fontWeight: 500,
        lineHeight: "20px",
        padding: "14px 22px",
        textDecoration: "none",
      }}
    >
      {children}
    </Button>
  );
}
