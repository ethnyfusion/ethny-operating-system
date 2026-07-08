export type EmailSegment = {
  id: string;
  label: string;
  description: string;
  probableSource: "Notion" | "CSV" | "Resend Audience" | "n8n";
  crmTags: string[];
};

export const emailSegments = [
  {
    id: "all-clients",
    label: "Tous les clients",
    description: "Clients connus ayant deja interagi avec Ethny.",
    probableSource: "Notion",
    crmTags: ["client", "ethny"],
  },
  {
    id: "former-clients",
    label: "Anciens clients",
    description: "Clients a recontacter avec une approche douce.",
    probableSource: "Notion",
    crmTags: ["client", "reactivation"],
  },
  {
    id: "prospects",
    label: "Prospects",
    description: "Demandes entrantes non encore converties.",
    probableSource: "CSV",
    crmTags: ["prospect"],
  },
  {
    id: "private-chef",
    label: "Chef a domicile",
    description: "Contacts interesses par une experience chef prive.",
    probableSource: "Notion",
    crmTags: ["chef-a-domicile", "private-chef"],
  },
  {
    id: "event-catering",
    label: "Traiteur evenementiel",
    description: "Contacts lies aux receptions, anniversaires et corporate.",
    probableSource: "Notion",
    crmTags: ["traiteur", "event-catering"],
  },
  {
    id: "cooking-classes",
    label: "Cours de cuisine",
    description: "Contacts interesses par ateliers, cours ou formations.",
    probableSource: "CSV",
    crmTags: ["cours", "atelier"],
  },
  {
    id: "wedding",
    label: "Mariage",
    description: "Demandes mariage et evenements familiaux premium.",
    probableSource: "Notion",
    crmTags: ["mariage"],
  },
  {
    id: "vip-clients",
    label: "Clients VIP",
    description: "Clients fideles ou comptes a forte valeur.",
    probableSource: "Notion",
    crmTags: ["vip", "client-premium"],
  },
  {
    id: "newsletter",
    label: "Newsletter",
    description: "Audience opt-in pour storytelling et inspirations.",
    probableSource: "Resend Audience",
    crmTags: ["newsletter", "opt-in"],
  },
  {
    id: "quote-not-confirmed",
    label: "Devis non confirme",
    description: "Prospects ayant recu une proposition sans confirmation.",
    probableSource: "n8n",
    crmTags: ["devis-envoye", "a-relancer"],
  },
] satisfies EmailSegment[];

export function getEmailSegment(segmentId: string) {
  return emailSegments.find((segment) => segment.id === segmentId);
}
