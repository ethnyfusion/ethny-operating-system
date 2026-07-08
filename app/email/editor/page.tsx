import { EmailHtmlEditor } from "./EmailHtmlEditor";
import {
  isAdminAuthenticated,
  isLocalAdminBypassEnabled,
} from "@/lib/admin-auth";
import { emailCampaignRegistry } from "@/lib/email-campaigns";
import { renderCampaignEmail } from "@/lib/email-renderer";

type EmailEditorPageProps = {
  searchParams?: {
    campaignId?: string;
  };
};

export const metadata = {
  title: "Editeur HTML Email Ethny",
};

export default async function EmailEditorPage({
  searchParams,
}: EmailEditorPageProps) {
  const localAdminBypass = isLocalAdminBypassEnabled();
  const adminReady = Boolean(process.env.ADMIN_SECRET) || localAdminBypass;
  const authenticated = isAdminAuthenticated();

  if (!adminReady) {
    return <SimpleNotice title="ADMIN_SECRET manquant" />;
  }

  if (!authenticated) {
    return (
      <SimpleNotice
        title="Acces securise"
        text="Connectez-vous depuis le dashboard avant d'ouvrir l'editeur HTML."
        href="/email"
        label="Ouvrir le dashboard"
      />
    );
  }

  const campaigns = emailCampaignRegistry.map((campaign) => ({
    id: campaign.id,
    internalName: campaign.internalName,
    defaultSubject: campaign.defaultSubject,
    status: campaign.status,
  }));
  const renderedCampaigns = await Promise.all(
    emailCampaignRegistry.map(async (campaign) => {
      const rendered = await renderCampaignEmail(campaign.id, {
        firstName: "Reginald",
        websiteLink: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
        unsubscribeLink: "https://ethny.be/unsubscribe",
      });

      return [
        campaign.id,
        {
          html: rendered.html,
          subject: rendered.subject,
        },
      ] as const;
    }),
  );

  return (
    <EmailHtmlEditor
      campaigns={campaigns}
      initialTemplates={Object.fromEntries(renderedCampaigns)}
      initialCampaignId={searchParams?.campaignId}
    />
  );
}

function SimpleNotice({
  title,
  text = "Configuration requise pour acceder a cette page.",
  href,
  label,
}: {
  title: string;
  text?: string;
  href?: string;
  label?: string;
}) {
  return (
    <main
      style={{
        background: "#f5efe4",
        color: "#18382c",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        minHeight: "100vh",
        padding: 28,
      }}
    >
      <section
        style={{
          background: "#fffaf2",
          border: "1px solid #ded2bf",
          borderRadius: 12,
          margin: "80px auto 0",
          maxWidth: 560,
          padding: 30,
        }}
      >
        <h1 style={{ margin: "0 0 10px" }}>{title}</h1>
        <p style={{ lineHeight: "24px", margin: 0 }}>{text}</p>
        {href && label ? (
          <a
            href={href}
            style={{
              background: "#18382c",
              borderRadius: 10,
              color: "#fffaf2",
              display: "inline-flex",
              fontWeight: 800,
              marginTop: 20,
              padding: "12px 14px",
              textDecoration: "none",
            }}
          >
            {label}
          </a>
        ) : null}
      </section>
    </main>
  );
}
