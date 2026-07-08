export type CampaignCategory =
  | "marketing"
  | "newsletter"
  | "reactivation"
  | "transactional"
  | "commercial";

export const emailCampaigns = [
  {
    id: "new-website-announcement",
    file: "NewWebsiteAnnouncement.tsx",
    category: "marketing",
    subject: "Le nouveau site Ethny est en ligne",
    objective:
      "Annoncer la nouvelle navigation et faciliter les demandes d'evenements prives.",
  },
  {
    id: "brand-story",
    file: "BrandStoryEmail.tsx",
    category: "newsletter",
    subject: "L'histoire derriere Ethny Nomad Cuisine",
    objective: "Raconter la marque, les influences et l'approche humaine.",
  },
  {
    id: "private-chef",
    file: "PrivateChefExperience.tsx",
    category: "marketing",
    subject: "Une experience chef privee, chez vous",
    objective: "Presenter l'experience private chef premium.",
  },
  {
    id: "event-catering",
    file: "EventCateringEmail.tsx",
    category: "marketing",
    subject: "Traiteur evenementiel sur mesure",
    objective: "Mettre en avant les evenements prives et corporate.",
  },
  {
    id: "cooking-classes",
    file: "CookingClassesEmail.tsx",
    category: "marketing",
    subject: "Cours de cuisine et ateliers prives",
    objective: "Presenter les cours, ateliers prives et formations.",
  },
  {
    id: "chef-partners",
    file: "ChefPartnersAnnouncement.tsx",
    category: "marketing",
    subject: "Ethny pour les lieux, gites et partenaires",
    objective: "Structurer une annonce partenaires chef.",
  },
  {
    id: "reactivation-1",
    file: "ClientReactivationEmail1.tsx",
    category: "reactivation",
    subject: "Un mot d'Ethny Nomad Cuisine",
    objective: "Reprendre contact avec douceur.",
  },
  {
    id: "reactivation-2",
    file: "ClientReactivationEmail2.tsx",
    category: "reactivation",
    subject: "Une prochaine table a imaginer ?",
    objective: "Relancer avec un angle service.",
  },
  {
    id: "reactivation-3",
    file: "ClientReactivationEmail3.tsx",
    category: "reactivation",
    subject: "Restons en contact",
    objective: "Dernier rappel cordial sans pression.",
  },
  {
    id: "review-request",
    file: "ReviewRequestEmail.tsx",
    category: "transactional",
    subject: "Merci pour votre confiance",
    objective: "Demander un avis Google apres prestation.",
  },
  {
    id: "quote-follow-up",
    file: "QuoteFollowUpEmail.tsx",
    category: "commercial",
    subject: "Votre proposition Ethny",
    objective: "Relancer un prospect ayant recu une proposition.",
  },
  {
    id: "seasonal-menu",
    file: "SeasonalMenuEmail.tsx",
    category: "newsletter",
    subject: "Inspirations de saison",
    objective: "Presenter une inspiration menu sans prix final.",
  },
  {
    id: "gift-card",
    file: "GiftCardEmail.tsx",
    category: "marketing",
    subject: "Offrir une experience Ethny",
    objective: "Presenter une carte cadeau ou experience a offrir.",
  },
] as const;
