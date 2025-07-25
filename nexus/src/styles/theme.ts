import { createTheme, type ThemeOptions } from '@mui/material/styles';

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#4b830d',
    },
    secondary: {
      main: '#9ddab2',
    },
    background: {
      paper: '#f5f5dc',
      default: '#eceff1',
    },
  },
  typography: {
    h1: {
      fontFamily: 'montserrat',
    },
    h2: {
      fontFamily: 'montserrat',
    },
    body1: {
      fontFamily: 'Roboto',
      fontSize: 14,
    },
  },
};

// Criando o tema a partir das suas opções
const theme = createTheme(themeOptions);

export default theme;