export type EmailVariables = {
  firstName: string;
  lastName: string;
  serviceInterest: string;
  eventDate: string;
  eventType: string;
  bookingLink: string;
  websiteLink: string;
  quoteLink: string;
  reviewLink: string;
  unsubscribeLink: string;
};

export const defaultEmailVariables: EmailVariables = {
  firstName: "Reginald",
  lastName: "Smit",
  serviceInterest: "chef a domicile",
  eventDate: "date a confirmer",
  eventType: "evenement prive",
  bookingLink: "https://ethnyfusion.be/demander-une-proposition",
  websiteLink: "https://ethnyfusion.be",
  quoteLink: "https://ethnyfusion.be/devis",
  reviewLink: "https://g.page/r/example/review",
  unsubscribeLink: "https://ethnyfusion.be/unsubscribe",
};

export type EmailVariableInput = Partial<Record<keyof EmailVariables, string | undefined>>;

export function resolveEmailVariables(
  variables: EmailVariableInput = {},
): EmailVariables {
  return {
    ...defaultEmailVariables,
    ...Object.fromEntries(
      Object.entries(variables).filter(([, value]) => typeof value === "string"),
    ),
  };
}

export function replaceEmailVariables(
  content: string,
  variables: EmailVariables,
) {
  return Object.entries(variables).reduce(
    (nextContent, [key, value]) =>
      nextContent.split(`{{${key}}}`).join(value || ""),
    content,
  );
}
