export const dynamicVariables = [
  "{{firstName}}",
  "{{lastName}}",
  "{{serviceInterest}}",
  "{{eventDate}}",
  "{{eventType}}",
  "{{bookingLink}}",
  "{{websiteLink}}",
  "{{quoteLink}}",
  "{{reviewLink}}",
  "{{unsubscribeLink}}",
] as const;

export type DynamicVariable = (typeof dynamicVariables)[number];

export const variableUsage = {
  "{{firstName}}": "Prenom du contact.",
  "{{lastName}}": "Nom du contact.",
  "{{serviceInterest}}": "Service indique ou interesse.",
  "{{eventDate}}": "Date d'evenement demandee, si connue.",
  "{{eventType}}": "Type d'evenement ou contexte.",
  "{{bookingLink}}": "Lien vers demande de disponibilite ou formulaire.",
  "{{websiteLink}}": "Lien du site Ethny.",
  "{{quoteLink}}": "Lien vers proposition ou demande de devis.",
  "{{reviewLink}}": "Lien Google Business Profile pour deposer un avis.",
  "{{unsubscribeLink}}": "Lien de desinscription requis pour les campagnes.",
} as const;
