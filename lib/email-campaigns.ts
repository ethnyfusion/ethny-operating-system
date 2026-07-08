import type { ComponentType } from "react";
import BrandStoryEmail from "@/emails/campaigns/BrandStoryEmail";
import ChefPartnersAnnouncement from "@/emails/campaigns/ChefPartnersAnnouncement";
import ClientReactivationEmail1 from "@/emails/campaigns/ClientReactivationEmail1";
import ClientReactivationEmail2 from "@/emails/campaigns/ClientReactivationEmail2";
import ClientReactivationEmail3 from "@/emails/campaigns/ClientReactivationEmail3";
import CookingClassesEmail from "@/emails/campaigns/CookingClassesEmail";
import EventCateringEmail from "@/emails/campaigns/EventCateringEmail";
import GiftCardEmail from "@/emails/campaigns/GiftCardEmail";
import NewWebsiteAnnouncement from "@/emails/campaigns/NewWebsiteAnnouncement";
import PrivateChefExperience from "@/emails/campaigns/PrivateChefExperience";
import QuoteFollowUpEmail from "@/emails/campaigns/QuoteFollowUpEmail";
import ReviewRequestEmail from "@/emails/campaigns/ReviewRequestEmail";
import SeasonalMenuEmail from "@/emails/campaigns/SeasonalMenuEmail";

export type CampaignStatus = "draft" | "ready" | "archived";

export type EmailCampaign = {
  id: string;
  internalName: string;
  defaultSubject: string;
  previewText: string;
  Template: ComponentType;
  recommendedSegment: string;
  businessObjective: string;
  primaryCta: string;
  status: CampaignStatus;
};

export const emailCampaignRegistry = [
  {
    id: "new-website-announcement",
    internalName: "Nouveau site Ethny",
    defaultSubject: "Le nouveau site Ethny est en ligne",
    previewText:
      "Une navigation plus claire pour preparer vos evenements prives et experiences sur mesure.",
    Template: NewWebsiteAnnouncement,
    recommendedSegment: "newsletter",
    businessObjective:
      "Annoncer le nouveau site et simplifier les demandes d'evenements prives.",
    primaryCta: "Decouvrir le site",
    status: "ready",
  },
  {
    id: "brand-story",
    internalName: "Storytelling Ethny",
    defaultSubject: "L'histoire derriere Ethny Nomad Cuisine",
    previewText:
      "Une cuisine francaise ouverte sur le monde, humaine et artisanale.",
    Template: BrandStoryEmail,
    recommendedSegment: "newsletter",
    businessObjective:
      "Renforcer le lien marque autour de l'approche humaine et fusion.",
    primaryCta: "Lire l'histoire",
    status: "ready",
  },
  {
    id: "private-chef-experience",
    internalName: "Chef a domicile",
    defaultSubject: "Une experience chef privee, chez vous",
    previewText:
      "Une table soignee, un menu adapte et la presence du chef pour vos invites.",
    Template: PrivateChefExperience,
    recommendedSegment: "private-chef",
    businessObjective: "Presenter l'experience private chef premium.",
    primaryCta: "Verifier la disponibilite",
    status: "ready",
  },
  {
    id: "event-catering",
    internalName: "Traiteur evenementiel",
    defaultSubject: "Traiteur evenementiel sur mesure",
    previewText:
      "Cocktails, diners, anniversaires, mariages et evenements corporate.",
    Template: EventCateringEmail,
    recommendedSegment: "event-catering",
    businessObjective:
      "Mettre en avant les formats prives, mariages et corporate.",
    primaryCta: "Demander un devis",
    status: "ready",
  },
  {
    id: "cooking-classes",
    internalName: "Cours de cuisine",
    defaultSubject: "Cours de cuisine et ateliers prives",
    previewText:
      "Des ateliers vivants autour des gestes, produits et influences Ethny.",
    Template: CookingClassesEmail,
    recommendedSegment: "cooking-classes",
    businessObjective: "Presenter les cours, ateliers prives et formations.",
    primaryCta: "Imaginer un atelier",
    status: "ready",
  },
  {
    id: "chef-partners-announcement",
    internalName: "Annonce partenaires chef",
    defaultSubject: "Ethny pour les lieux, gites et partenaires",
    previewText:
      "Une experience chef pour lieux premium, gites et prescripteurs.",
    Template: ChefPartnersAnnouncement,
    recommendedSegment: "prospects",
    businessObjective: "Ouvrir des conversations partenaires qualifiees.",
    primaryCta: "Planifier un echange",
    status: "draft",
  },
  {
    id: "client-reactivation-1",
    internalName: "Reactivation anciens clients 1",
    defaultSubject: "Un mot d'Ethny Nomad Cuisine",
    previewText: "Un message simple pour reprendre contact sans pression.",
    Template: ClientReactivationEmail1,
    recommendedSegment: "former-clients",
    businessObjective: "Reprendre contact avec les anciens clients.",
    primaryCta: "Envoyer une demande",
    status: "ready",
  },
  {
    id: "client-reactivation-2",
    internalName: "Reactivation anciens clients 2",
    defaultSubject: "Une prochaine table a imaginer ?",
    previewText: "Quelques formats Ethny a imaginer pour une prochaine occasion.",
    Template: ClientReactivationEmail2,
    recommendedSegment: "former-clients",
    businessObjective: "Relancer avec un angle service et inspiration.",
    primaryCta: "Verifier une possibilite",
    status: "ready",
  },
  {
    id: "client-reactivation-3",
    internalName: "Reactivation anciens clients 3",
    defaultSubject: "Restons en contact",
    previewText: "Dernier message de reprise de contact, cordial et sans pression.",
    Template: ClientReactivationEmail3,
    recommendedSegment: "former-clients",
    businessObjective: "Clore la sequence de relance avec elegance.",
    primaryCta: "Revoir les experiences",
    status: "ready",
  },
  {
    id: "review-request",
    internalName: "Demande d'avis client",
    defaultSubject: "Merci pour votre confiance",
    previewText: "Votre avis aide Ethny a continuer a grandir.",
    Template: ReviewRequestEmail,
    recommendedSegment: "all-clients",
    businessObjective: "Collecter un avis Google apres prestation.",
    primaryCta: "Laisser un avis Google",
    status: "ready",
  },
  {
    id: "quote-follow-up",
    internalName: "Relance devis",
    defaultSubject: "Votre proposition Ethny",
    previewText: "Un suivi cordial concernant votre proposition Ethny.",
    Template: QuoteFollowUpEmail,
    recommendedSegment: "quote-not-confirmed",
    businessObjective: "Relancer un prospect ayant recu une proposition.",
    primaryCta: "Voir la proposition",
    status: "ready",
  },
  {
    id: "seasonal-menu",
    internalName: "Menu de saison",
    defaultSubject: "Inspirations de saison",
    previewText: "Une inspiration de saison pour imaginer une prochaine table.",
    Template: SeasonalMenuEmail,
    recommendedSegment: "newsletter",
    businessObjective: "Nourrir la newsletter sans annoncer de prix final.",
    primaryCta: "Demander un menu",
    status: "draft",
  },
  {
    id: "gift-card",
    internalName: "Carte cadeau",
    defaultSubject: "Offrir une experience Ethny",
    previewText: "Offrir une experience culinaire a construire sur mesure.",
    Template: GiftCardEmail,
    recommendedSegment: "newsletter",
    businessObjective: "Presenter une experience Ethny a offrir.",
    primaryCta: "Demander les possibilites",
    status: "draft",
  },
] satisfies EmailCampaign[];

export type EmailCampaignId = (typeof emailCampaignRegistry)[number]["id"];

export function getEmailCampaign(campaignId: string) {
  return emailCampaignRegistry.find((campaign) => campaign.id === campaignId);
}
