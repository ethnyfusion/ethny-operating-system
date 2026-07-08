export const emailColors = {
  forestDeep: "#1C3B34",
  forest: "#285447",
  sage: "#5E8D7A",
  cream: "#F2EBDC",
  stone: "#C9C5BB",
  anthracite: "#2A2A2A",
  white: "#FFFFFE",
  line: "#DED8CA",
  softSage: "#E3ECE6",
  softForest: "#EEF3EF",
} as const;

export type EmailColorToken = keyof typeof emailColors;
