import { extendTheme } from "@chakra-ui/react";

export default extendTheme({
  breakpoints: {
    sm: "5em",
    md: "48em",
    lg: "62em",
    xl: "90em",
    xxl: "100em",
    xxxl: "120em",
  },
  colors: {
    brand: {
      primary: "#3C61C7",
      accent: "#FF00B8",
      gray: "#eff2fa",
      white: "#FFF",
      black: "#050912",
    },
  },
  fonts: {
    body: "'Poppins', sans-serif",
    heading: "'Poppins', sans-serif",
  },
});
