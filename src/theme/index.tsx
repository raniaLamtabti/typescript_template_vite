import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

export default extendTheme({
  config,
  breakpoints: {
    sm: "5em",
    md: "48em",
    lg: "62em",
    xl: "90em",
    xxl: "100em",
    xxxl: "120em",
  },
  fonts: {
    body: "'Poppins', sans-serif",
    heading: "'Poppins', sans-serif",
  },
});
