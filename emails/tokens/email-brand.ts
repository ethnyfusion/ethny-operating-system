export const emailVariables = {
  firstName: "{{firstName}}",
  lastName: "{{lastName}}",
  serviceInterest: "{{serviceInterest}}",
  eventDate: "{{eventDate}}",
  eventType: "{{eventType}}",
  bookingLink: "{{bookingLink}}",
  websiteLink: "{{websiteLink}}",
  quoteLink: "{{quoteLink}}",
  reviewLink: "{{reviewLink}}",
  unsubscribeLink: "{{unsubscribeLink}}",
} as const;

export const emailBrand = {
  name: "Ethny Nomad Cuisine",
  chefName: "Chef Reginald Smit",
  tagline: "Cuisine nomade, experiences sur mesure",
  from: "Chef Reginald Smit - Ethny Nomad Cuisine",
  replyTo: "reginald@ethnyfusion.be",
  website: emailVariables.websiteLink,
  defaultPreheader:
    "Une experience culinaire premium, humaine et sur mesure avec Chef Reginald Smit.",
  // Replace this base URL with the verified production asset host before sending.
  assetBaseUrl: "https://ethnyfusion.be",
  assets: {
    logoDark: "/logo/ethny-logo-cercle-brise-horizontal.svg",
    logoLight: "/logo/ethny-logo-cercle-brise-horizontal-white.svg",
    seal: "/logo/ethny-logo-cercle-brise.svg",
    chefIcon: "/brand-kit-canva/icons/icon-chef-prive.svg",
    eventIcon: "/brand-kit-canva/icons/icon-evenement.svg",
    classIcon: "/brand-kit-canva/icons/icon-cooking-class.svg",
    quoteIcon: "/brand-kit-canva/icons/icon-devis.svg",
    heroPrivateChef: "/media/photos/gallery-chef-service-table.jpg",
    heroCatering: "/media/photos/hero-bouchees-cocktail.jpg",
    heroClasses: "/media/photos/gallery-geste-atmosphere.jpg",
    heroStory: "/media/photos/chef-reginald-smith-portrait.jpg",
    heroWebsite: "/media/photos/reception-tables-dressees.jpg",
    heroSeasonal: "/media/photos/menu-jardin-vegetal.jpg",
  },
} as const;

export const assetUrl = (path: string) =>
  path.startsWith("http") ? path : `${emailBrand.assetBaseUrl}${path}`;
