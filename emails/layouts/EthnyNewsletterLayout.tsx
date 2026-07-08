import type { ReactNode } from "react";
import { EthnyEmailLayout } from "./EthnyEmailLayout";

type EthnyNewsletterLayoutProps = {
  children: ReactNode;
  preview: string;
};

export function EthnyNewsletterLayout({
  children,
  preview,
}: EthnyNewsletterLayoutProps) {
  return (
    <EthnyEmailLayout
      preview={preview}
      headerVariant="light"
      headerEyebrow="Lettre Ethny"
    >
      {children}
    </EthnyEmailLayout>
  );
}
