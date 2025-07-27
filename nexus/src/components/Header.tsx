import { createTheme, type ThemeOptions, alpha } from '@mui/material/styles';

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
  components: {
    // Garante o efeito de ondulação (ripple) para todos os componentes clicáveis
    MuiButtonBase: {
      defaultProps: {
        disableRipple: false,
      },
    },
    // Estilos para botões gerais (ex: Sair, Cadastrar, Entrar)
    MuiButton: {
      styleOverrides: {
        root: {
          // Transição suave para o efeito de esmaecimento
          transition: 'background-color 250ms ease-in-out, border-color 250ms ease-in-out, opacity 250ms ease-in-out',
        },
        // Botão com fundo preenchido
        contained: {
          '&:hover': {
            // Esmaece escurecendo levemente o fundo
            backgroundColor: alpha('#4b830d', 0.85), 
          }
        },
        // Botão com borda
        outlined: {
          '&:hover': {
            // Adiciona um fundo leve para o efeito de esmaecimento
            backgroundColor: alpha('#4b830d', 0.08),
          }
        }
      }
    },
    // Estilo para os itens da Sidebar
    MuiListItemButton: {
      styleOverrides: {
        root: {
          color: 'white',
          transition: 'background-color 250ms ease-in-out',
          '&:hover': {
            // Esmaece clareando o fundo
            backgroundColor: alpha('#ffffff', 0.15), 
            // Garante que o texto permaneça branco
            color: 'white', 
          },
        },
      },
    },
  },
};

// Criando o tema a partir das suas opções
const theme = createTheme(themeOptions);

export default theme;
