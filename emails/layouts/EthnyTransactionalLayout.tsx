import type { ReactNode } from "react";
import { EthnyEmailLayout } from "./EthnyEmailLayout";

type EthnyTransactionalLayoutProps = {
  children: ReactNode;
  preview: string;
};

export function EthnyTransactionalLayout({
  children,
  preview,
}: EthnyTransactionalLayoutProps) {
  return (
    <EthnyEmailLayout
      preview={preview}
      headerVariant="light"
      headerEyebrow="Suivi Ethny"
    >
      {children}
    </EthnyEmailLayout>
  );
}
