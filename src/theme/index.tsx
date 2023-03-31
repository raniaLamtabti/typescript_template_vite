import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

export default extendTheme({
  config,
  colors: {
    primary: "#1E63EC",
    greenBrand: "#16AF54",
    purpleBrand: "#8431D9",
    redBrand: "#D26500",
    textLight: "#28292B",
    textGrayLight: "#727375",
    bgTaskDoneLight: "#F7F7F7",
    bgLight: "#FFFFFF",
    bgGrayLight: "#F9F9F9",
    textDark: "#FDFDFD",
    textGrayDark: "#464648",
    bgTaskDoneDark: "#27292B",
    bgDark: "#1F2123",
    bgGrayDark: "#252728",
  },
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
