"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { dynamicVariables } from "@/emails/data/emailVariables";
import { emailColors } from "@/emails/tokens/email-colors";

type CampaignOption = {
  id: string;
  internalName: string;
  defaultSubject: string;
  status: string;
};

type TemplateDraft = {
  html: string;
  subject: string;
};

type EmailHtmlEditorProps = {
  campaigns: CampaignOption[];
  initialTemplates: Record<string, TemplateDraft>;
  initialCampaignId?: string;
};

export function EmailHtmlEditor({
  campaigns,
  initialTemplates,
  initialCampaignId,
}: EmailHtmlEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const draftInputRef = useRef<HTMLInputElement>(null);
  const [campaignId, setCampaignId] = useState(
    initialCampaignId ?? campaigns[0]?.id ?? "",
  );
  const firstTemplate = initialTemplates[initialCampaignId ?? campaigns[0]?.id ?? ""];
  const [html, setHtml] = useState(firstTemplate?.html ?? "");
  const [subject, setSubject] = useState(firstTemplate?.subject ?? "");
  const [view, setView] = useState<"split" | "preview" | "html">("split");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const selectedCampaign = useMemo(
    () => campaigns.find((campaign) => campaign.id === campaignId),
    [campaignId, campaigns],
  );

  const editorBlocks = useMemo(() => getEditorBlocks(), []);
  const colorTokens = useMemo(
    () => Object.entries(emailColors).map(([name, value]) => ({ name, value })),
    [],
  );
  const draftKey = `ethny-email-editor:${campaignId}`;

  function loadTemplate(nextCampaignId = campaignId, forceTemplate = false) {
    if (!nextCampaignId) {
      return;
    }

    if (!forceTemplate && typeof window !== "undefined") {
      const savedDraft = window.localStorage.getItem(
        `ethny-email-editor:${nextCampaignId}`,
      );

      if (savedDraft) {
        try {
          const parsed = JSON.parse(savedDraft) as TemplateDraft;
          setHtml(parsed.html);
          setSubject(parsed.subject);
          setMessage("Brouillon local restaure automatiquement.");
          return;
        } catch {
          window.localStorage.removeItem(`ethny-email-editor:${nextCampaignId}`);
        }
      }
    }

    const nextTemplate = initialTemplates[nextCampaignId];

    if (!nextTemplate) {
      setHtml("");
      setSubject("");
      setMessage("Template introuvable pour cette campagne.");
      return;
    }

    setHtml(nextTemplate.html);
    setSubject(nextTemplate.subject);
    setMessage("Template charge. Vous pouvez modifier le HTML a gauche.");
  }

  useEffect(() => {
    loadTemplate(campaignId);
  }, [campaignId]);

  useEffect(() => {
    if (!campaignId || !html) {
      return;
    }

    window.localStorage.setItem(
      draftKey,
      JSON.stringify({
        html,
        subject,
      }),
    );
  }, [campaignId, draftKey, html, subject]);

  function insertText(value: string) {
    const textarea = textareaRef.current;

    if (!textarea) {
      setHtml((currentHtml) => `${currentHtml}\n${value}`);
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const nextHtml = `${html.slice(0, start)}${value}${html.slice(end)}`;
    setHtml(nextHtml);
    setMessage("Element ajoute au brouillon.");

    requestAnimationFrame(() => {
      textarea.focus();
      textarea.selectionStart = start + value.length;
      textarea.selectionEnd = start + value.length;
    });
  }

  function exportDraft() {
    const draft = JSON.stringify(
      {
        campaignId,
        subject,
        html,
        exportedAt: new Date().toISOString(),
      },
      null,
      2,
    );
    const blob = new Blob([draft], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${campaignId || "ethny-email"}-draft.json`;
    link.click();
    URL.revokeObjectURL(url);
    setMessage("Brouillon JSON exporte.");
  }

  function importDraft(file: File | undefined) {
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as Partial<
          TemplateDraft & { campaignId: string }
        >;

        if (!parsed.html || !parsed.subject) {
          throw new Error("Brouillon incomplet.");
        }

        if (parsed.campaignId && campaigns.some((item) => item.id === parsed.campaignId)) {
          setCampaignId(parsed.campaignId);
        }

        setHtml(parsed.html);
        setSubject(parsed.subject);
        setMessage("Brouillon JSON importe.");
      } catch (error) {
        setMessage(error instanceof Error ? error.message : "Import impossible.");
      }
    };
    reader.readAsText(file);
  }

  async function sendHtmlTest() {
    setSending(true);
    setMessage("Envoi du test HTML en cours...");

    try {
      const response = await fetch("/api/email/send-html-test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          campaignId,
          subject,
          html,
        }),
      });
      const result = (await response.json()) as {
        ok?: boolean;
        id?: string;
        error?: string;
      };

      if (!response.ok || !result.ok) {
        throw new Error(result.error ?? "Envoi test impossible.");
      }

      setMessage(`Email test envoye depuis le brouillon. ID Resend : ${result.id ?? "recu"}.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Envoi test impossible.");
    } finally {
      setSending(false);
    }
  }

  async function copyHtml() {
    await navigator.clipboard.writeText(html);
    setMessage("HTML copie dans le presse-papiers.");
  }

  async function copySubject() {
    await navigator.clipboard.writeText(subject);
    setMessage("Sujet copie dans le presse-papiers.");
  }

  function downloadHtml() {
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${campaignId || "ethny-email"}.html`;
    link.click();
    URL.revokeObjectURL(url);
    setMessage("Fichier HTML telecharge.");
  }

  return (
    <section style={styles.shell}>
      <header style={styles.header}>
        <div>
          <p style={styles.eyebrow}>Ethny Email Dashboard</p>
          <h1 style={styles.title}>Editeur HTML</h1>
          <p style={styles.subtitle}>
            Modifiez le HTML dans une vue simple, avec preview live a cote. Les
            changements restent locaux jusqu'a copie ou telechargement.
          </p>
        </div>
        <a href="/email" style={styles.secondaryLink}>
          Retour dashboard
        </a>
      </header>

      <div style={styles.toolbar}>
        <label style={styles.label}>
          Campagne
          <select
            value={campaignId}
            onChange={(event) => setCampaignId(event.target.value)}
            style={styles.select}
          >
            {campaigns.map((campaign) => (
              <option key={campaign.id} value={campaign.id}>
                {campaign.internalName}
              </option>
            ))}
          </select>
        </label>

        <label style={styles.labelWide}>
          Sujet
          <input
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            style={styles.input}
          />
        </label>

        <div style={styles.meta}>
          <span style={styles.status}>{selectedCampaign?.status ?? "draft"}</span>
          <span>{selectedCampaign?.id}</span>
        </div>

        <div style={styles.segmented}>
          <button
            type="button"
            onClick={() => setView("split")}
            style={view === "split" ? styles.segmentActive : styles.segment}
          >
            Split
          </button>
          <button
            type="button"
            onClick={() => setView("preview")}
            style={view === "preview" ? styles.segmentActive : styles.segment}
          >
            Preview
          </button>
          <button
            type="button"
            onClick={() => setView("html")}
            style={view === "html" ? styles.segmentActive : styles.segment}
          >
            HTML
          </button>
        </div>

        <button
          type="button"
          onClick={() => loadTemplate(campaignId, true)}
          style={styles.button}
        >
          Recharger
        </button>
        <button type="button" onClick={copySubject} style={styles.button}>
          Copier sujet
        </button>
        <button type="button" onClick={copyHtml} style={styles.primaryButton}>
          Copier HTML
        </button>
        <button type="button" onClick={downloadHtml} style={styles.button}>
          Telecharger
        </button>
        <button type="button" onClick={exportDraft} style={styles.button}>
          Export JSON
        </button>
        <input
          ref={draftInputRef}
          type="file"
          accept="application/json,.json"
          onChange={(event) => importDraft(event.target.files?.[0])}
          style={styles.hiddenInput}
        />
        <button
          type="button"
          onClick={() => draftInputRef.current?.click()}
          style={styles.button}
        >
          Import JSON
        </button>
        <button
          type="button"
          onClick={sendHtmlTest}
          disabled={sending}
          style={sending ? styles.disabledButton : styles.primaryButton}
        >
          {sending ? "Envoi..." : "Envoyer test"}
        </button>
      </div>

      {message ? <p style={styles.notice}>{message}</p> : null}

      <div style={styles.library}>
        <section style={styles.libraryPanel}>
          <div style={styles.panelHeader}>
            <strong>Variables dynamiques</strong>
            <span>CRM / n8n / Resend</span>
          </div>
          <div style={styles.pillGrid}>
            {dynamicVariables.map((variable) => (
              <button
                key={variable}
                type="button"
                onClick={() => insertText(variable)}
                style={styles.pillButton}
              >
                {variable}
              </button>
            ))}
          </div>
        </section>

        <section style={styles.libraryPanel}>
          <div style={styles.panelHeader}>
            <strong>Nuances Ethny</strong>
            <span>Charte email</span>
          </div>
          <div style={styles.swatchGrid}>
            {colorTokens.map((color) => (
              <button
                key={color.name}
                type="button"
                onClick={() => insertText(color.value)}
                title={`${color.name} ${color.value}`}
                style={styles.swatchButton}
              >
                <span
                  style={{
                    ...styles.swatch,
                    background: color.value,
                  }}
                />
                {color.name}
              </button>
            ))}
          </div>
        </section>

        <section style={styles.libraryPanelWide}>
          <div style={styles.panelHeader}>
            <strong>Elements premium</strong>
            <span>Cliquer pour inserer</span>
          </div>
          <div style={styles.blockGrid}>
            {editorBlocks.map((block) => (
              <button
                key={block.id}
                type="button"
                onClick={() => insertText(block.html)}
                style={styles.blockButton}
              >
                <strong>{block.label}</strong>
                <span>{block.description}</span>
              </button>
            ))}
          </div>
        </section>
      </div>

      <div
        style={{
          ...styles.workspace,
          ...(view === "split" ? styles.workspaceSplit : styles.workspaceSingle),
        }}
      >
        {view !== "preview" ? (
          <section style={styles.panel}>
            <div style={styles.panelHeader}>
              <strong>HTML modifiable</strong>
              <span>{html.length.toLocaleString("fr-BE")} caracteres</span>
            </div>
            <textarea
              ref={textareaRef}
              value={html}
              onChange={(event) => {
                setHtml(event.target.value);
                setMessage("Brouillon local modifie.");
              }}
              spellCheck={false}
              style={styles.textarea}
            />
          </section>
        ) : null}

        {view !== "html" ? (
          <section style={styles.panel}>
            <div style={styles.panelHeader}>
              <strong>Preview live</strong>
              <span>Rendu navigateur</span>
            </div>
            <iframe
              title="Preview live email"
              srcDoc={html}
              sandbox=""
              style={styles.iframe}
            />
          </section>
        ) : null}
      </div>
    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  shell: {
    background: "#f5efe4",
    color: "#18382c",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    minHeight: "100vh",
    padding: 28,
  },
  header: {
    alignItems: "end",
    display: "flex",
    gap: 24,
    justifyContent: "space-between",
    margin: "0 auto 20px",
    maxWidth: 1480,
  },
  eyebrow: {
    color: "#667c62",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: 1.6,
    margin: "0 0 10px",
    textTransform: "uppercase",
  },
  title: {
    fontSize: 42,
    lineHeight: 1,
    margin: "0 0 10px",
  },
  subtitle: {
    color: "rgba(42, 42, 42, 0.72)",
    fontSize: 16,
    lineHeight: "24px",
    margin: 0,
    maxWidth: 760,
  },
  toolbar: {
    alignItems: "end",
    background: "#fffaf2",
    border: "1px solid #ded2bf",
    borderRadius: 12,
    display: "flex",
    flexWrap: "wrap",
    gap: 12,
    margin: "0 auto 16px",
    maxWidth: 1480,
    padding: 16,
  },
  label: {
    display: "grid",
    gap: 6,
    minWidth: 240,
    fontSize: 12,
    fontWeight: 700,
    textTransform: "uppercase",
  },
  labelWide: {
    display: "grid",
    flex: "1 1 360px",
    gap: 6,
    minWidth: 280,
    fontSize: 12,
    fontWeight: 700,
    textTransform: "uppercase",
  },
  select: {
    border: "1px solid #ded2bf",
    borderRadius: 8,
    color: "#18382c",
    font: "inherit",
    padding: "11px 12px",
  },
  input: {
    border: "1px solid #ded2bf",
    borderRadius: 8,
    color: "#18382c",
    font: "inherit",
    padding: "11px 12px",
  },
  meta: {
    color: "rgba(42, 42, 42, 0.72)",
    display: "grid",
    gap: 6,
    minWidth: 160,
  },
  status: {
    border: "1px solid #b8c7ad",
    borderRadius: 6,
    color: "#18382c",
    display: "inline-flex",
    fontSize: 12,
    fontWeight: 800,
    padding: "4px 8px",
    textTransform: "uppercase",
    width: "fit-content",
  },
  segmented: {
    border: "1px solid #18382c",
    borderRadius: 10,
    display: "inline-flex",
    overflow: "hidden",
  },
  segment: {
    background: "transparent",
    border: 0,
    color: "#18382c",
    cursor: "pointer",
    fontWeight: 800,
    padding: "11px 12px",
  },
  segmentActive: {
    background: "#18382c",
    border: 0,
    color: "#fffaf2",
    cursor: "pointer",
    fontWeight: 800,
    padding: "11px 12px",
  },
  button: {
    background: "transparent",
    border: "1px solid #18382c",
    borderRadius: 10,
    color: "#18382c",
    cursor: "pointer",
    fontWeight: 800,
    padding: "12px 14px",
  },
  primaryButton: {
    background: "#18382c",
    border: "1px solid #18382c",
    borderRadius: 10,
    color: "#fffaf2",
    cursor: "pointer",
    fontWeight: 800,
    padding: "12px 14px",
  },
  disabledButton: {
    background: "#8d928a",
    border: "1px solid #8d928a",
    borderRadius: 10,
    color: "#fffaf2",
    cursor: "not-allowed",
    fontWeight: 800,
    padding: "12px 14px",
  },
  hiddenInput: {
    display: "none",
  },
  secondaryLink: {
    border: "1px solid #18382c",
    borderRadius: 10,
    color: "#18382c",
    fontWeight: 800,
    padding: "12px 14px",
    textDecoration: "none",
    whiteSpace: "nowrap",
  },
  notice: {
    background: "rgba(47, 109, 85, 0.10)",
    border: "1px solid #b8c7ad",
    borderRadius: 10,
    margin: "0 auto 16px",
    maxWidth: 1480,
    padding: "12px 14px",
  },
  library: {
    display: "grid",
    gap: 14,
    gridTemplateColumns: "minmax(240px, 0.65fr) minmax(240px, 0.65fr) minmax(320px, 1.2fr)",
    margin: "0 auto 16px",
    maxWidth: 1480,
  },
  libraryPanel: {
    background: "#fffaf2",
    border: "1px solid #ded2bf",
    borderRadius: 12,
    overflow: "hidden",
  },
  libraryPanelWide: {
    background: "#fffaf2",
    border: "1px solid #ded2bf",
    borderRadius: 12,
    overflow: "hidden",
  },
  pillGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    padding: 12,
  },
  pillButton: {
    background: "#eef3ef",
    border: "1px solid #b8c7ad",
    borderRadius: 8,
    color: "#18382c",
    cursor: "pointer",
    fontFamily:
      '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
    fontSize: 12,
    fontWeight: 800,
    padding: "8px 9px",
  },
  swatchGrid: {
    display: "grid",
    gap: 8,
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    padding: 12,
  },
  swatchButton: {
    alignItems: "center",
    background: "#fffaf2",
    border: "1px solid #ded2bf",
    borderRadius: 8,
    color: "#18382c",
    cursor: "pointer",
    display: "flex",
    fontSize: 12,
    fontWeight: 800,
    gap: 8,
    padding: 8,
    textAlign: "left",
  },
  swatch: {
    border: "1px solid rgba(28, 59, 52, 0.18)",
    borderRadius: 999,
    display: "inline-block",
    height: 18,
    width: 18,
  },
  blockGrid: {
    display: "grid",
    gap: 8,
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    padding: 12,
  },
  blockButton: {
    background: "#f5efe4",
    border: "1px solid #ded2bf",
    borderRadius: 8,
    color: "#18382c",
    cursor: "pointer",
    display: "grid",
    gap: 4,
    padding: 10,
    textAlign: "left",
  },
  workspace: {
    margin: "0 auto",
    maxWidth: 1480,
  },
  workspaceSplit: {
    display: "grid",
    gap: 14,
    gridTemplateColumns: "minmax(0, 0.92fr) minmax(420px, 1.08fr)",
  },
  workspaceSingle: {
    display: "block",
  },
  panel: {
    background: "#fffaf2",
    border: "1px solid #ded2bf",
    borderRadius: 12,
    overflow: "hidden",
  },
  panelHeader: {
    alignItems: "center",
    borderBottom: "1px solid #ded2bf",
    color: "#18382c",
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 14px",
  },
  iframe: {
    background: "#f5efe4",
    border: 0,
    height: "76vh",
    width: "100%",
  },
  textarea: {
    background: "#10251f",
    border: 0,
    boxSizing: "border-box",
    color: "#fffaf2",
    display: "block",
    fontFamily:
      '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
    fontSize: 13,
    height: "76vh",
    lineHeight: "20px",
    outline: "none",
    padding: 16,
    resize: "vertical",
    width: "100%",
  },
};

function getEditorBlocks() {
  return [
    {
      id: "hero-premium",
      label: "Hero premium",
      description: "Titre, texte et CTA principal.",
      html: `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#1C3B34;border-radius:18px;margin:0 0 24px;">
  <tr>
    <td style="padding:34px 30px;">
      <p style="color:#C9C5BB;font-family:Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:1.8px;margin:0 0 12px;text-transform:uppercase;">Experience Ethny</p>
      <h1 style="color:#FFFFFE;font-family:Georgia,serif;font-size:34px;line-height:39px;margin:0 0 14px;">Un moment culinaire a imaginer ensemble</h1>
      <p style="color:#F2EBDC;font-family:Arial,sans-serif;font-size:16px;line-height:25px;margin:0 0 22px;">Bonjour {{firstName}}, une cuisine nomade, personnelle et soignee pour votre prochain moment.</p>
      <a href="{{bookingLink}}" style="background:#F2EBDC;border-radius:999px;color:#1C3B34;display:inline-block;font-family:Arial,sans-serif;font-size:14px;font-weight:700;padding:13px 20px;text-decoration:none;">Demander une proposition</a>
    </td>
  </tr>
</table>`,
    },
    {
      id: "storytelling",
      label: "Storytelling",
      description: "Bloc humain et artisanal.",
      html: `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FFFFFE;border:1px solid #DED8CA;border-radius:14px;margin:0 0 22px;">
  <tr>
    <td style="padding:26px;">
      <p style="color:#5E8D7A;font-family:Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:1.6px;margin:0 0 10px;text-transform:uppercase;">Approche</p>
      <h2 style="color:#1C3B34;font-family:Georgia,serif;font-size:26px;line-height:31px;margin:0 0 12px;">Une cuisine francaise ouverte sur le monde</h2>
      <p style="color:#2A2A2A;font-family:Arial,sans-serif;font-size:15px;line-height:24px;margin:0;">Chaque menu part d'un echange humain : le lieu, la saison, les invites, le rythme du service et les influences qui donnent du relief a la table.</p>
    </td>
  </tr>
</table>`,
    },
    {
      id: "service-card",
      label: "Carte service",
      description: "Chef prive, traiteur ou cours.",
      html: `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#EEF3EF;border:1px solid #DED8CA;border-radius:14px;margin:0 0 14px;">
  <tr>
    <td style="padding:20px 22px;">
      <h3 style="color:#1C3B34;font-family:Georgia,serif;font-size:22px;line-height:27px;margin:0 0 8px;">{{serviceInterest}}</h3>
      <p style="color:#2A2A2A;font-family:Arial,sans-serif;font-size:15px;line-height:23px;margin:0;">Une proposition sur mesure, adaptee a votre lieu, votre rythme et votre type d'evenement.</p>
    </td>
  </tr>
</table>`,
    },
    {
      id: "menu-block",
      label: "Menu elegant",
      description: "3 lignes menu de saison.",
      html: `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FFFFFE;border:1px solid #DED8CA;border-radius:14px;margin:0 0 22px;">
  <tr>
    <td style="padding:24px;">
      <h2 style="color:#1C3B34;font-family:Georgia,serif;font-size:25px;line-height:30px;margin:0 0 16px;">Inspiration de menu</h2>
      <p style="border-bottom:1px solid #DED8CA;color:#2A2A2A;font-family:Arial,sans-serif;font-size:15px;line-height:23px;margin:0;padding:0 0 10px;">Entree vegetale de saison, herbes fraiches, condiment maison</p>
      <p style="border-bottom:1px solid #DED8CA;color:#2A2A2A;font-family:Arial,sans-serif;font-size:15px;line-height:23px;margin:0;padding:10px 0;">Plat signature aux influences nomades, jus court et garniture soignee</p>
      <p style="color:#2A2A2A;font-family:Arial,sans-serif;font-size:15px;line-height:23px;margin:0;padding:10px 0 0;">Dessert delicat, fruit, texture croquante et note parfumee</p>
    </td>
  </tr>
</table>`,
    },
    {
      id: "quote",
      label: "Citation chef",
      description: "Parole de Reginald.",
      html: `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F2EBDC;border-left:4px solid #5E8D7A;margin:0 0 22px;">
  <tr>
    <td style="padding:22px 24px;">
      <p style="color:#1C3B34;font-family:Georgia,serif;font-size:22px;line-height:31px;margin:0 0 12px;">"Une belle table commence toujours par une ecoute sincere."</p>
      <p style="color:#5E8D7A;font-family:Arial,sans-serif;font-size:13px;font-weight:700;letter-spacing:1px;margin:0;text-transform:uppercase;">Chef Reginald Smit</p>
    </td>
  </tr>
</table>`,
    },
    {
      id: "testimonial",
      label: "Avis client",
      description: "Bloc testimonial premium.",
      html: `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FFFFFE;border:1px solid #DED8CA;border-radius:14px;margin:0 0 22px;">
  <tr>
    <td style="padding:24px;">
      <p style="color:#1C3B34;font-family:Georgia,serif;font-size:21px;line-height:30px;margin:0 0 12px;">"Un service attentionne, une cuisine genereuse et une presence tres professionnelle."</p>
      <p style="color:#5E8D7A;font-family:Arial,sans-serif;font-size:13px;font-weight:700;margin:0;">Client Ethny</p>
    </td>
  </tr>
</table>`,
    },
    {
      id: "cta",
      label: "CTA premium",
      description: "Bouton proposition.",
      html: `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#E3ECE6;border-radius:16px;margin:0 0 22px;">
  <tr>
    <td align="center" style="padding:28px 24px;">
      <h2 style="color:#1C3B34;font-family:Georgia,serif;font-size:26px;line-height:31px;margin:0 0 10px;">Un evenement a preparer ?</h2>
      <p style="color:#2A2A2A;font-family:Arial,sans-serif;font-size:15px;line-height:23px;margin:0 0 18px;">Transmettez les premieres informations. La disponibilite et le devis seront toujours confirmes humainement.</p>
      <a href="{{quoteLink}}" style="background:#1C3B34;border-radius:999px;color:#FFFFFE;display:inline-block;font-family:Arial,sans-serif;font-size:14px;font-weight:700;padding:13px 20px;text-decoration:none;">Voir la proposition</a>
    </td>
  </tr>
</table>`,
    },
    {
      id: "divider",
      label: "Separateur",
      description: "Respiration graphique.",
      html: `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;">
  <tr>
    <td style="border-top:1px solid #DED8CA;font-size:1px;line-height:1px;">&nbsp;</td>
  </tr>
</table>`,
    },
  ];
}
