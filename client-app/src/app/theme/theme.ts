import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Theme {
    myColor: {
      delete: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    myColor?: {
      delete?: string;
    };
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1976D2",
    },
  },
});
