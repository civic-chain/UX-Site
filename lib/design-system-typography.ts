export type TypographyFamily = "sans" | "display";

export type TypographyToken = {
  name: string;
  sourceSize: string;
  font: "DM Sans" | "DM Serif Text";
  family: TypographyFamily;
  lineHeight: string;
  tracking: "normal" | "label";
  weight: "400" | "500" | "700";
  defaultColor: "foreground" | "slate-500";
  role: string;
  sample: string;
};

export const typographyTokens = [
  {
    name: "captions",
    sourceSize: "text-xs",
    font: "DM Sans",
    family: "sans",
    lineHeight: "text-xs default",
    tracking: "label",
    weight: "500",
    defaultColor: "slate-500",
    role: "Status label.",
    sample: "STATUS LABEL",
  },
  {
    name: "body-xs",
    sourceSize: "text-xs",
    font: "DM Sans",
    family: "sans",
    lineHeight: "text-xs default",
    tracking: "normal",
    weight: "400",
    defaultColor: "foreground",
    role: "Metadata label.",
    sample: "Metadata label",
  },
  {
    name: "body-sm",
    sourceSize: "text-sm",
    font: "DM Sans",
    family: "sans",
    lineHeight: "text-sm default",
    tracking: "normal",
    weight: "400",
    defaultColor: "foreground",
    role: "Helper text and captions.",
    sample: "Helper text and captions.",
  },
  {
    name: "body",
    sourceSize: "text-base",
    font: "DM Sans",
    family: "sans",
    lineHeight: "text-base default",
    tracking: "normal",
    weight: "400",
    defaultColor: "foreground",
    role: "Default paragraph text.",
    sample: "Default paragraph text.",
  },
  {
    name: "body-bold",
    sourceSize: "text-base",
    font: "DM Sans",
    family: "sans",
    lineHeight: "text-base default",
    tracking: "normal",
    weight: "700",
    defaultColor: "foreground",
    role: "Bold paragraph text.",
    sample: "Bold body text.",
  },
  {
    name: "body-lg",
    sourceSize: "text-lg",
    font: "DM Sans",
    family: "sans",
    lineHeight: "text-lg default",
    tracking: "normal",
    weight: "400",
    defaultColor: "foreground",
    role: "Large body or intro text.",
    sample: "Large body or intro text.",
  },
  {
    name: "body-xl",
    sourceSize: "text-xl",
    font: "DM Sans",
    family: "sans",
    lineHeight: "text-xl default",
    tracking: "normal",
    weight: "400",
    defaultColor: "foreground",
    role: "Section subheading.",
    sample: "Section subheading",
  },
  {
    name: "h4",
    sourceSize: "text-3xl",
    font: "DM Serif Text",
    family: "display",
    lineHeight: "text-3xl default",
    tracking: "normal",
    weight: "400",
    defaultColor: "foreground",
    role: "Small display heading.",
    sample: "Small display heading",
  },
  {
    name: "h3",
    sourceSize: "text-5xl",
    font: "DM Serif Text",
    family: "display",
    lineHeight: "text-5xl default",
    tracking: "normal",
    weight: "400",
    defaultColor: "foreground",
    role: "Page heading.",
    sample: "Page heading",
  },
  {
    name: "h2",
    sourceSize: "text-6xl",
    font: "DM Serif Text",
    family: "display",
    lineHeight: "text-6xl default",
    tracking: "normal",
    weight: "400",
    defaultColor: "foreground",
    role: "Metric value.",
    sample: "Metric value",
  },
  {
    name: "h1",
    sourceSize: "text-8xl",
    font: "DM Serif Text",
    family: "display",
    lineHeight: "text-8xl default",
    tracking: "normal",
    weight: "400",
    defaultColor: "foreground",
    role: "Hero-scale display.",
    sample: "Hero-scale display",
  },
] as const satisfies readonly TypographyToken[];

export type TypographyTokenName = (typeof typographyTokens)[number]["name"];

export const typographyTokenNames = typographyTokens.map((token) => token.name);
