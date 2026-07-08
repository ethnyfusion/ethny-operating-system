import BrandStoryEmail from "../../emails/campaigns/BrandStoryEmail";
import ChefPartnersAnnouncement from "../../emails/campaigns/ChefPartnersAnnouncement";
import ClientReactivationEmail1 from "../../emails/campaigns/ClientReactivationEmail1";
import ClientReactivationEmail2 from "../../emails/campaigns/ClientReactivationEmail2";
import ClientReactivationEmail3 from "../../emails/campaigns/ClientReactivationEmail3";
import CookingClassesEmail from "../../emails/campaigns/CookingClassesEmail";
import EventCateringEmail from "../../emails/campaigns/EventCateringEmail";
import GiftCardEmail from "../../emails/campaigns/GiftCardEmail";
import NewWebsiteAnnouncement from "../../emails/campaigns/NewWebsiteAnnouncement";
import PrivateChefExperience from "../../emails/campaigns/PrivateChefExperience";
import QuoteFollowUpEmail from "../../emails/campaigns/QuoteFollowUpEmail";
import ReviewRequestEmail from "../../emails/campaigns/ReviewRequestEmail";
import SeasonalMenuEmail from "../../emails/campaigns/SeasonalMenuEmail";
import TemplateStarter from "../../emails/campaigns/TemplateStarter";
import { emailCampaigns } from "../../emails/data/campaigns";

export type EmailPreviewItem = {
  id: string;
  label: string;
  category: string;
  subject: string;
  objective: string;
  Component: () => JSX.Element;
};

const campaignComponents = {
  "new-website-announcement": NewWebsiteAnnouncement,
  "brand-story": BrandStoryEmail,
  "private-chef": PrivateChefExperience,
  "event-catering": EventCateringEmail,
  "cooking-classes": CookingClassesEmail,
  "chef-partners": ChefPartnersAnnouncement,
  "reactivation-1": ClientReactivationEmail1,
  "reactivation-2": ClientReactivationEmail2,
  "reactivation-3": ClientReactivationEmail3,
  "review-request": ReviewRequestEmail,
  "quote-follow-up": QuoteFollowUpEmail,
  "seasonal-menu": SeasonalMenuEmail,
  "gift-card": GiftCardEmail,
} satisfies Record<string, () => JSX.Element>;

export const emailPreviewRegistry: EmailPreviewItem[] = [
  ...emailCampaigns.map((campaign) => ({
    id: campaign.id,
    label: campaign.file.replace(".tsx", ""),
    category: campaign.category,
    subject: campaign.subject,
    objective: campaign.objective,
    Component: campaignComponents[campaign.id],
  })),
  {
    id: "template-starter",
    label: "TemplateStarter",
    category: "template",
    subject: "Template de depart Ethny",
    objective: "Base locale pour creer une nouvelle campagne.",
    Component: TemplateStarter,
  },
];
