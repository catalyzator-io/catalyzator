interface ProductCardStyles {
  container: string;
  iconContainer: string;
  icon: string;
  content: string;
  title: string;
  description: string;
  button: string;
  active?: string;
  waitlisted?: string;
  comingSoon?: string;
}

export type ProductCardVariant = "default" | "compact" | "landing" | "sidebar";

export const PRODUCT_CARD_STYLES: Record<ProductCardVariant, ProductCardStyles> = {
  default: {
    container: "p-4 sm:p-6 bg-white",
    iconContainer: "p-2 rounded-lg bg-purple-100",
    icon: "h-6 w-6 text-purple-600",
    content: "flex-1 text-center sm:text-left pl-4",
    title: "text-lg font-semibold text-gray-900",
    description: "mt-2 text-sm text-gray-600",
    button: "mt-4 w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white"
  },
  compact: {
    container: "p-2 bg-gray-50 hover:bg-gray-100 transition-colors",
    iconContainer: "p-1.5 rounded-md bg-purple-100",
    icon: "h-4 w-4 text-purple-600",
    content: "ml-3 flex-1",
    title: "text-sm font-medium text-gray-900",
    description: "hidden",
    button: "hidden"
  },
  landing: {
    container: "p-6 bg-white shadow-md hover:shadow-lg transition-all",
    iconContainer: "p-3 rounded-xl bg-purple-100",
    icon: "h-8 w-8 text-purple-600",
    content: "mt-4 text-center flex-1",
    title: "text-xl font-semibold text-gray-900",
    description: "mt-3 text-gray-600",
    button: "mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white"
  },
  sidebar: {
    container: "p-2 flex items-center rounded-lg transition-colors cursor-pointer shadow-none border-0",
    active: "hover:bg-purple-50",
    waitlisted: "hover:bg-orange-50",
    comingSoon: "hover:bg-gray-50 opacity-70",
    iconContainer: "p-1.5 rounded-md bg-purple-100",
    icon: "h-4 w-4 text-purple-600",
    content: "ml-3 flex-1",
    title: "text-sm font-medium text-gray-900 truncate",
    description: "hidden",
    button: "hidden"
  }
} as const;