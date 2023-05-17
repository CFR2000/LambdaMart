import { extendTheme } from "@chakra-ui/react";

const theme = {
  fonts: {
    heading: `'KarlaVariable', sans-serif`,
    body: `'Inter TightVariable', sans-serif`,
  },
  colors: {
    primary: {
      50: "#e9e6fb",
      100: "#c3baf4",
      200: "#b0a4f0",
      300: "#9c8eed",
      400: "#8978e9",
      500: "#634ce2",
      600: "#3f23d8",
      700: "#381fc2",
      800: "#321cac",
      900: "#251580",
    },
    secondary: {
      50: "#daf9f2",
      100: "#aef3e2",
      200: "#98efda",
      300: "#81ecd3",
      400: "#6be9cb",
      500: "#3fe2bb",
      600: "#1fcfa5",
      700: "#1cb993",
      800: "#19a281",
      900: "#12765e",
    },
  },
};

export default extendTheme(theme);
