export const HELP_AND_LINKS_STYLES = {
  footer: {
    container: "mt-8 p-2 border-t border-purple-700 text-center",
    title: "text-white",
    description: "text-orange-200",
    link: "text-orange-400 hover:text-orange-300",
    legalLinks: "text-gray-300",
    legalLinksHover: "hover:text-white",
  },
  sidebar: {
    container: "p-2 border-t border-gray-200 rounded-lg bg-pale-pink",
    title: "text-gray-900 text-s",
    description: "text-gray-600 text-sm",
    link: "text-purple-600 hover:text-purple-500 text-sm",
    legalLinks: "text-gray-500 text-xs",
    legalLinksHover: "hover:text-gray-700",
  },
} as const;

export type HelpAndLinksVariant = keyof typeof HELP_AND_LINKS_STYLES; 