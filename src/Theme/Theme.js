
import { createTheme } from "@mui/material";

const theme = createTheme(
  {
    mixins: {
      toolbar: {
        minHeight: 42,
      },
    },
    palette: {
      background: {
        default: "#ffffff",
      },
      common: {},
      primary: {
        light: "#334756",
        main: "#2C394B",
        dark: "#082032",
      },
      secondary: {
        light: "#fbc02d",
        main: "#f9a825",
        dark: "#f57f17",
      },
      warning: {
        light: "#e64a19",
        main: "#d84315",
        dark: "#bf360c",
      },
      error: {
        light: "#d32f2f",
        main: "#c62828",
        dark: "#b71c1c",
      },
      success: {
        light: "#fbc02d",
        main: "#f9a825",
        dark: "#f57f17",
      },
      info: {
        light: "#455a64",
        main: "#37474f",
        dark: "#263238",
      },
    },

    typography: {
      htmlFontSize: 16,
      fontSize: 16,
      fontFamily: ["Play", "sans-serif"].join(","),
      h1: {
        fontWeight: 400,
        fontSize: "3rem",
      },
      h2: {
        fontWeight: 250,
        fontSize: "2.5rem",
      },
      h3: {
        fontWeight: 200,
        fontSize: "2rem",
      },
      h4: {
        fontWeight: 150,
        fontSize: "1.75rem",
      },
      h5: {
        fontWeight: 100,
        fontSize: "1.5rem",
      },
      h6: {
        fontWeight: 50,
        fontSize: "1.25rem",
      },

      button: {
        minWidth: 2,
      },
    },
    shape: {
      borderRadius: 0,
    },

    overrides: {
      MuiTableCell: {
        root: {
          paddingTop: 2,
          paddingBottom: 2,
          "&:last-child": {
            paddingRight: 2,
          },
        },
      },
    },
  },
  
);

export default theme;
