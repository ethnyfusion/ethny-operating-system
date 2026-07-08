import { emailBrand } from "../tokens/email-brand";

export const ethnyServices = [
  {
    id: "private-chef",
    title: "Chef a domicile",
    icon: emailBrand.assets.chefIcon,
    summary:
      "Une table privee avec la presence du chef, une cuisine soignee et un rythme adapte a vos invites.",
  },
  {
    id: "event-catering",
    title: "Traiteur evenementiel",
    icon: emailBrand.assets.eventIcon,
    summary:
      "Cocktail, diner assis, buffet elegant ou experience corporate, avec une approche claire et sur mesure.",
  },
  {
    id: "cooking-classes",
    title: "Cours de cuisine",
    icon: emailBrand.assets.classIcon,
    summary:
      "Ateliers prives ou formations conviviales autour des gestes, des produits et des influences Ethny.",
  },
  {
    id: "quote",
    title: "Proposition personnalisee",
    icon: emailBrand.assets.quoteIcon,
    summary:
      "Une proposition lisible, avec les postes separes et les options utiles selon le lieu, la date et le niveau de service.",
  },
] as const;
