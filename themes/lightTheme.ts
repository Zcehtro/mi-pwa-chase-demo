import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#005eb8",
      contrastText: "#fff",
    },
  },
  components: {
    MuiBottomNavigationAction: {
      styleOverrides: {
        label: {
          margin: "8px 0 0",
        },
      },
    },
  },
});
