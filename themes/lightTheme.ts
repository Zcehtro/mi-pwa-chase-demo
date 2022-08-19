import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#0e46b7",
        },
    },
    components: {
        MuiBottomNavigationAction: {
            styleOverrides: {
                label: {
                    fontSize: "0.6rem",
                    marginTop: "1px",
                },
            }
        },
    }
});