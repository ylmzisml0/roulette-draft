import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#09203F',
    },
    secondary: {
      main: '#209927',
    },
    text: {
      primary: '#09203F',
    },
  },
  typography: {
    fontFamily: '"Bahnschrift Condensed", "Bahnschrift", "Arial Narrow", Arial, sans-serif',
  },
  shape: {
    borderRadius: 3,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
});
