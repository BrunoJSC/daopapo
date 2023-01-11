import { extendTheme } from "native-base";

export const THEME = extendTheme({
  gray: {
    900: "#171717",
    800: "#18181b",
    700: "#262626",
  },

  darkBlue: {
    600: "#005db4",
    500: "#0077e6",
  },
  white: "#ffffff",

  fonts: {
    heading: "Roboto_700Bold",
    text: "Roboto_500Medium",
    body: "Roboto_400Regular",
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
  },
});
