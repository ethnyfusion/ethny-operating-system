import { Section } from "@react-email/components";
import type { CSSProperties, ReactNode } from "react";
import { emailColors } from "../tokens/email-colors";
import { emailSpacing } from "../tokens/email-spacing";

type EthnySectionProps = {
  children: ReactNode;
  background?: "cream" | "white" | "soft" | "green";
  style?: CSSProperties;
};

export function EthnySection({
  children,
  background = "white",
  style,
}: EthnySectionProps) {
  const backgroundColor =
    background === "green"
      ? emailColors.forestDeep
      : background === "cream"
        ? emailColors.cream
        : background === "soft"
          ? emailColors.softForest
          : emailColors.white;

  return (
    <Section
      style={{
        backgroundColor,
        padding: `${emailSpacing.sectionY}px ${emailSpacing.pageX}px`,
        ...style,
      }}
    >
      {children}
    </Section>
  );
}
