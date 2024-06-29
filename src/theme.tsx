import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "'Roboto Mono Variable', monospace",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (theme) => ({
        scrollbarWidth: "thin",
        "&::-webkit-scrollbar": {
          width: theme.spacing(1),
        },
        "&::-webkit-scrollbar-track": {
          background: theme.palette.grey[200],
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: theme.palette.grey[300],
        },
        "&::-webkit-scrollbar-thumb:hover": {
          background: theme.palette.grey[400],
        },
      }),
    },
  },
});

export default theme;
