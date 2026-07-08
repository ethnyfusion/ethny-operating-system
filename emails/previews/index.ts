import { emailCampaigns } from "../data/campaigns";

export const emailPreviewIndex = [
  ...emailCampaigns.map((campaign) => ({
    ...campaign,
    path: `emails/campaigns/${campaign.file}`,
  })),
  {
    id: "template-starter",
    file: "TemplateStarter.tsx",
    category: "template",
    subject: "Template de depart Ethny",
    objective: "Base locale pour creer une nouvelle campagne.",
    path: "emails/campaigns/TemplateStarter.tsx",
  },
];

export const previewCommand = "npm run dev";
export const reactEmailPreviewCommand = "npm run email:dev";
