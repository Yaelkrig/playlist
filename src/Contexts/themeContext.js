import { createTheme } from "@mui/system";
import React from "react";

export const theme = createTheme({
    palette: {
        primary: {
            main: '#d35c89',
        },
        secondary: {
            main: '#616161',
        },
    },
});

export const ThemeContext = React.createContext(
    theme // default value
);