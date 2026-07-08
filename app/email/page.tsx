import type { CSSProperties, ReactNode } from "react";
import {
  isAdminAuthenticated,
  isLocalAdminBypassEnabled,
} from "@/lib/admin-auth";
import { emailCampaignRegistry } from "@/lib/email-campaigns";
import { getEmailSegment } from "@/lib/email-segments";
import { emailColors } from "@/emails/tokens/email-colors";
import { emailTypography } from "@/emails/tokens/email-typography";

type EmailDashboardPageProps = {
  searchParams?: {
    campaignId?: string;
    error?: string;
    sent?: string;
    id?: string;
    message?: string;
  };
};

export const metadata = {
  title: "Ethny Email Dashboard",
};

export default function EmailDashboardPage({
  searchParams,
}: EmailDashboardPageProps) {
  const localAdminBypass = isLocalAdminBypassEnabled();
  const adminReady = Boolean(process.env.ADMIN_SECRET) || localAdminBypass;
  const authenticated = isAdminAuthenticated();

  if (!adminReady) {
    return (
      <Shell>
        <SetupNotice />
      </Shell>
    );
  }

  if (!authenticated) {
    return (
      <Shell>
        <Login error={searchParams?.error} />
      </Shell>
    );
  }

  const selectedCampaign =
    emailCampaignRegistry.find(
      (campaign) => campaign.id === searchParams?.campaignId,
    ) ?? emailCampaignRegistry[0];

  const testEmail = process.env.RESEND_TEST_EMAIL ?? "";

  return (
    <Shell>
      <header style={styles.header}>
        <div>
          <p style={styles.eyebrow}>Ethny Operating System</p>
          <h1 style={styles.title}>Ethny Email Dashboard</h1>
          <p style={styles.subtitle}>
            Gestion interne des campagnes email, previews et envois test Resend.
          </p>
        </div>
        <form action="/api/admin/logout" method="post">
          <div style={styles.headerActions}>
            <a href="/email/editor" style={styles.secondaryLink}>
              Editeur HTML
            </a>
            <button type="submit" style={styles.secondaryButton}>
              Fermer la session
            </button>
          </div>
        </form>
      </header>

      <StatusMessage searchParams={searchParams} />
      {localAdminBypass ? <LocalDevNotice /> : null}

      <section style={styles.grid}>
        <div style={styles.listPanel}>
          <div style={styles.panelHeader}>
            <div>
              <p style={styles.eyebrow}>Campagnes</p>
              <h2 style={styles.sectionTitle}>Templates disponibles</h2>
            </div>
            <span style={styles.count}>{emailCampaignRegistry.length}</span>
          </div>

          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Campagne</th>
                  <th style={styles.th}>Statut</th>
                  <th style={styles.th}>Sujet</th>
                  <th style={styles.th}>Segment</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {emailCampaignRegistry.map((campaign) => {
                  const segment = getEmailSegment(campaign.recommendedSegment);

                  return (
                    <tr key={campaign.id}>
                      <td style={styles.tdStrong}>{campaign.internalName}</td>
                      <td style={styles.td}>
                        <span
                          style={{
                            ...styles.status,
                            ...(campaign.status === "ready"
                              ? styles.statusReady
                              : styles.statusDraft),
                          }}
                        >
                          {campaign.status}
                        </span>
                      </td>
                      <td style={styles.td}>{campaign.defaultSubject}</td>
                      <td style={styles.td}>{segment?.label ?? campaign.recommendedSegment}</td>
                      <td style={styles.actions}>
                        <a
                          href={`/email?campaignId=${campaign.id}`}
                          style={styles.linkButton}
                        >
                          Preview
                        </a>
                        <a
                          href={`/email/editor?campaignId=${campaign.id}`}
                          style={styles.linkButton}
                        >
                          Editer HTML
                        </a>
                        <form action="/api/email/send-test-admin" method="post">
                          <input type="hidden" name="campaignId" value={campaign.id} />
                          <input type="hidden" name="to" value={testEmail} />
                          <input type="hidden" name="firstName" value="Reginald" />
                          <button type="submit" style={styles.smallButton}>
                            Envoyer test
                          </button>
                        </form>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <aside style={styles.previewPanel}>
          <div style={styles.panelHeader}>
            <div>
              <p style={styles.eyebrow}>Preview</p>
              <h2 style={styles.sectionTitle}>{selectedCampaign.internalName}</h2>
            </div>
            <span style={styles.status}>{selectedCampaign.status}</span>
          </div>

          <dl style={styles.metaList}>
            <div>
              <dt>Sujet</dt>
              <dd>{selectedCampaign.defaultSubject}</dd>
            </div>
            <div>
              <dt>Objectif</dt>
              <dd>{selectedCampaign.businessObjective}</dd>
            </div>
            <div>
              <dt>CTA</dt>
              <dd>{selectedCampaign.primaryCta}</dd>
            </div>
          </dl>

          <iframe
            title={`Preview ${selectedCampaign.internalName}`}
            src={`/api/email/preview-html?campaignId=${selectedCampaign.id}`}
            style={styles.iframe}
          />
        </aside>
      </section>
    </Shell>
  );
}

function Shell({ children }: { children: ReactNode }) {
  return (
    <main style={styles.shell}>
      <div style={styles.logoRow}>
        <img
          src="/email-assets/logo/ethny-logo-cercle-brise-horizontal.svg"
          alt="Ethny Nomad Cuisine"
          style={styles.logo}
        />
      </div>
      {children}
    </main>
  );
}

function Login({ error }: { error?: string }) {
  return (
    <section style={styles.loginPanel}>
      <p style={styles.eyebrow}>Acces securise</p>
      <h1 style={styles.title}>Ethny Email Dashboard</h1>
      <p style={styles.subtitle}>
        Entrez le secret admin pour acceder aux previews et aux envois test.
      </p>
      {error === "invalid" ? (
        <p style={styles.error}>Secret admin invalide.</p>
      ) : null}
      <form action="/api/admin/login" method="post" style={styles.loginForm}>
        <label style={styles.label}>
          ADMIN_SECRET
          <input
            name="adminSecret"
            type="password"
            autoComplete="current-password"
            required
            style={styles.input}
          />
        </label>
        <button type="submit" style={styles.primaryButton}>
          Entrer
        </button>
      </form>
    </section>
  );
}

function SetupNotice() {
  return (
    <section style={styles.loginPanel}>
      <p style={styles.eyebrow}>Configuration requise</p>
      <h1 style={styles.title}>ADMIN_SECRET manquant</h1>
      <p style={styles.subtitle}>
        Ajoutez `ADMIN_SECRET` dans Vercel et dans `.env.local` pour activer le
        dashboard email. Aucun secret n'est affiche cote client.
      </p>
    </section>
  );
}

function LocalDevNotice() {
  return (
    <p style={styles.localNotice}>
      Mode local : acces admin ouvert pour tester. En production, ADMIN_SECRET
      reste obligatoire.
    </p>
  );
}

function StatusMessage({ searchParams }: EmailDashboardPageProps) {
  if (searchParams?.sent === "1") {
    return (
      <p style={styles.success}>
        Email test envoye. ID Resend : {searchParams.id || "recu"}.
      </p>
    );
  }

  if (!searchParams?.error) {
    return null;
  }

  const message =
    searchParams.message ?? "Action impossible. Verifiez la configuration Resend.";

  return <p style={styles.error}>{message}</p>;
}

const styles: Record<string, CSSProperties> = {
  shell: {
    background: emailColors.cream,
    color: emailColors.anthracite,
    fontFamily: emailTypography.body,
    minHeight: "100vh",
    padding: "28px",
  },
  logoRow: {
    margin: "0 auto 24px",
    maxWidth: 1320,
  },
  logo: {
    display: "block",
    width: 190,
  },
  header: {
    alignItems: "end",
    display: "flex",
    gap: 24,
    justifyContent: "space-between",
    margin: "0 auto 24px",
    maxWidth: 1320,
  },
  headerActions: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "flex-end",
  },
  eyebrow: {
    color: emailColors.sage,
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: 1.8,
    lineHeight: "18px",
    margin: "0 0 10px",
    textTransform: "uppercase",
  },
  title: {
    color: emailColors.forestDeep,
    fontFamily: emailTypography.title,
    fontSize: 48,
    fontWeight: 600,
    letterSpacing: 0,
    lineHeight: 1,
    margin: "0 0 10px",
  },
  subtitle: {
    color: "rgba(42, 42, 42, 0.72)",
    fontSize: 16,
    lineHeight: "25px",
    margin: 0,
  },
  grid: {
    display: "grid",
    gap: 22,
    gridTemplateColumns: "minmax(0, 1.12fr) minmax(390px, 0.88fr)",
    margin: "0 auto",
    maxWidth: 1320,
  },
  listPanel: {
    background: emailColors.white,
    border: `1px solid ${emailColors.line}`,
    borderRadius: 14,
    overflow: "hidden",
  },
  previewPanel: {
    background: emailColors.white,
    border: `1px solid ${emailColors.line}`,
    borderRadius: 14,
    padding: 22,
  },
  panelHeader: {
    alignItems: "center",
    borderBottom: `1px solid ${emailColors.line}`,
    display: "flex",
    justifyContent: "space-between",
    padding: 22,
  },
  sectionTitle: {
    color: emailColors.forestDeep,
    fontFamily: emailTypography.title,
    fontSize: 30,
    fontWeight: 600,
    letterSpacing: 0,
    lineHeight: "34px",
    margin: 0,
  },
  count: {
    color: emailColors.forestDeep,
    fontFamily: emailTypography.title,
    fontSize: 34,
  },
  tableWrap: {
    overflowX: "auto",
  },
  table: {
    borderCollapse: "collapse",
    width: "100%",
  },
  th: {
    borderBottom: `1px solid ${emailColors.line}`,
    color: emailColors.sage,
    fontSize: 12,
    letterSpacing: 1.2,
    padding: "14px 16px",
    textAlign: "left",
    textTransform: "uppercase",
  },
  td: {
    borderBottom: `1px solid ${emailColors.line}`,
    color: "rgba(42, 42, 42, 0.74)",
    fontSize: 14,
    lineHeight: "21px",
    padding: "15px 16px",
    verticalAlign: "top",
  },
  tdStrong: {
    borderBottom: `1px solid ${emailColors.line}`,
    color: emailColors.forestDeep,
    fontSize: 14,
    fontWeight: 700,
    lineHeight: "21px",
    padding: "15px 16px",
    verticalAlign: "top",
  },
  actions: {
    borderBottom: `1px solid ${emailColors.line}`,
    display: "flex",
    gap: 8,
    padding: "12px 16px",
    verticalAlign: "top",
  },
  status: {
    border: `1px solid ${emailColors.line}`,
    borderRadius: 6,
    color: emailColors.forestDeep,
    display: "inline-flex",
    fontSize: 12,
    fontWeight: 700,
    lineHeight: "18px",
    padding: "4px 8px",
    textTransform: "uppercase",
  },
  statusReady: {
    background: emailColors.softSage,
  },
  statusDraft: {
    background: emailColors.cream,
  },
  linkButton: {
    border: `1px solid ${emailColors.forest}`,
    borderRadius: 10,
    color: emailColors.forestDeep,
    display: "inline-flex",
    fontSize: 13,
    fontWeight: 700,
    padding: "9px 11px",
    textDecoration: "none",
  },
  smallButton: {
    background: emailColors.forestDeep,
    border: 0,
    borderRadius: 10,
    color: emailColors.cream,
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 700,
    padding: "10px 12px",
  },
  primaryButton: {
    background: emailColors.forestDeep,
    border: 0,
    borderRadius: 10,
    color: emailColors.cream,
    cursor: "pointer",
    fontSize: 15,
    fontWeight: 700,
    padding: "14px 18px",
  },
  secondaryButton: {
    background: "transparent",
    border: `1px solid ${emailColors.forest}`,
    borderRadius: 10,
    color: emailColors.forestDeep,
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 700,
    padding: "12px 16px",
  },
  secondaryLink: {
    background: "transparent",
    border: `1px solid ${emailColors.forest}`,
    borderRadius: 10,
    color: emailColors.forestDeep,
    display: "inline-flex",
    fontSize: 14,
    fontWeight: 700,
    padding: "12px 16px",
    textDecoration: "none",
  },
  iframe: {
    background: emailColors.cream,
    border: `1px solid ${emailColors.line}`,
    borderRadius: 14,
    height: 760,
    width: "100%",
  },
  metaList: {
    display: "grid",
    gap: 12,
    margin: "18px 0",
  },
  loginPanel: {
    background: emailColors.white,
    border: `1px solid ${emailColors.line}`,
    borderRadius: 14,
    margin: "80px auto 0",
    maxWidth: 560,
    padding: 32,
  },
  loginForm: {
    display: "grid",
    gap: 16,
    marginTop: 24,
  },
  label: {
    color: emailColors.forestDeep,
    display: "grid",
    fontSize: 13,
    fontWeight: 700,
    gap: 8,
  },
  input: {
    border: `1px solid ${emailColors.line}`,
    borderRadius: 10,
    color: emailColors.anthracite,
    font: "inherit",
    padding: "13px 14px",
  },
  success: {
    background: emailColors.softSage,
    border: `1px solid ${emailColors.sage}`,
    borderRadius: 10,
    color: emailColors.forestDeep,
    margin: "0 auto 18px",
    maxWidth: 1320,
    padding: "12px 14px",
  },
  localNotice: {
    background: "rgba(47, 109, 85, 0.10)",
    border: `1px solid ${emailColors.softSage}`,
    borderRadius: 10,
    color: emailColors.forestDeep,
    fontSize: 14,
    lineHeight: "21px",
    margin: "0 auto 18px",
    maxWidth: 1320,
    padding: "12px 14px",
  },
  error: {
    background: "#fff3f0",
    border: "1px solid #d8a093",
    borderRadius: 10,
    color: "#8a3324",
    margin: "0 auto 18px",
    maxWidth: 1320,
    padding: "12px 14px",
  },
};
