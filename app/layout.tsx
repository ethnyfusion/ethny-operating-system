import type { ReactNode } from "react";

export const metadata = {
  title: "Ethny Email Dashboard",
  description:
    "Dashboard interne pour campagnes, previews et tests email Ethny Nomad Cuisine.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
