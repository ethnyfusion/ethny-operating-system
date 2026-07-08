import { Hr } from "@react-email/components";
import { emailColors } from "../tokens/email-colors";

type EthnyDividerProps = {
  tone?: "light" | "dark";
};

export function EthnyDivider({ tone = "light" }: EthnyDividerProps) {
  return (
    <Hr
      style={{
        borderColor:
          tone === "dark" ? "rgba(242, 235, 220, 0.28)" : emailColors.line,
        borderStyle: "solid",
        borderWidth: "1px 0 0",
        margin: "0",
      }}
    />
  );
}
