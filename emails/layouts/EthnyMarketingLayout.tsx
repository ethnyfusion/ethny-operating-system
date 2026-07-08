import type { ReactNode } from "react";
import { EthnyEmailLayout } from "./EthnyEmailLayout";

type EthnyMarketingLayoutProps = {
  children: ReactNode;
  preview: string;
  eyebrow?: string;
};

export function EthnyMarketingLayout({
  children,
  preview,
  eyebrow = "Experience Ethny",
}: EthnyMarketingLayoutProps) {
  return (
    <EthnyEmailLayout
      preview={preview}
      headerVariant="dark"
      headerEyebrow={eyebrow}
    >
      {children}
    </EthnyEmailLayout>
  );
}
