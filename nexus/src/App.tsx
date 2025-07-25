import React, { useState } from 'react';
import { CssBaseline, ThemeProvider, Typography } from '@mui/material';
import Layout from './components/Layout';
import theme from './styles/theme';
import LoginUI from './pages/Login-UI'; // Importe a tela de login

/**
 * Componente principal da aplicação.
 * Agora ele gerencia o estado de autenticação (logado/deslogado)
 * e decide qual tela renderizar.
 */
const App: React.FC = () => {
  // 1. Estado para controlar se o usuário está logado. Inicia como 'false'.
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 2. Função para ser chamada quando o login for bem-sucedido.
  // Ela muda o estado para 'logado'.
  const handleLoginSuccess = () => {
    console.log('App: Login bem-sucedido! Alterando estado para logado.');
    setIsLoggedIn(true);
  };

  // 3. Função para ser chamada quando o usuário clicar em 'Sair'.
  // Ela muda o estado para 'deslogado'.
  const handleLogout = () => {
    console.log('App: Usuário deslogou! Alterando estado para deslogado.');
    setIsLoggedIn(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {
        // 4. Renderização condicional:
        // Se 'isLoggedIn' for true, mostra o Layout principal.
        // Se for false, mostra a tela de Login.
        isLoggedIn ? (
          <Layout onLogout={handleLogout}>
            <Typography variant="h4" component="h1" gutterBottom>
              Bem-vindo ao Dashboard
            </Typography>
            <Typography paragraph>
              Este é o espaço onde o conteúdo principal da sua aplicação será exibido.
              Você pode adicionar seus componentes, gráficos e tabelas aqui.
            </Typography>
          </Layout>
        ) : (
          <LoginUI onLoginSuccess={handleLoginSuccess} />
        )
      }
    </ThemeProvider>
  );
};

export default App;
