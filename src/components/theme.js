import { createTheme } from "@material-ui/core/styles";

export const theme = createTheme({
  palette: {
    primary: {
      light: "#D3E9E9",
      main: "#008181",
    },
    secondary: {
      main: "#0067B1",
      light: "#C3E6FF",
    },
    light: {
      main: "#f7f7f7",
    },
    dark: {
      main: "#484848",
    },
    danger: {
      main: "#CB0000",
    },
    grey: {
      main: "#DDDCDC",
      dark: "#BDBDBD",
    },
    green: {
      light: "#7FBFBF",
    },
  },
  iconBtn: {
    size: "16px",
  },
});
