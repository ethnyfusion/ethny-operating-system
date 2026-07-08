export const demoVariables = {
  "{{firstName}}": "Camille",
  "{{lastName}}": "Dupont",
  "{{serviceInterest}}": "chef a domicile",
  "{{eventDate}}": "18 octobre 2026",
  "{{eventType}}": "diner prive",
  "{{bookingLink}}": "https://ethnyfusion.be/demander-une-proposition",
  "{{websiteLink}}": "https://ethnyfusion.be",
  "{{quoteLink}}": "https://ethnyfusion.be/devis/exemple",
  "{{reviewLink}}": "https://g.page/r/example/review",
  "{{unsubscribeLink}}": "https://ethnyfusion.be/unsubscribe/example",
} as const;

export function hydrateDemoVariables(html: string) {
  return Object.entries(demoVariables).reduce(
    (nextHtml, [token, value]) => nextHtml.split(token).join(value),
    html,
  );
}

export function useLocalPreviewAssets(html: string) {
  return html.split("https://ethnyfusion.be/").join("/email-assets/");
}
