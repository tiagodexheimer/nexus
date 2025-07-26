import React, { useState } from 'react';
import { CssBaseline, ThemeProvider, Typography } from '@mui/material';
import Layout from './components/Layout';
import theme from './styles/theme';
import CadastroPage from './pages/Cadastro'; // Importa a página de Cadastro

const App: React.FC = () => {
  // O estado de login agora determina qual página mostrar
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {isLoggedIn ? (
        // Se estiver logado, mostra o Layout principal com o conteúdo da aplicação
        <Layout 
          isLoggedIn={isLoggedIn} 
          onLoginSuccess={handleLoginSuccess} 
          onLogout={handleLogout}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Bem-vindo ao Dashboard
          </Typography>
          <Typography paragraph>
            Este é o espaço onde o conteúdo principal da sua aplicação será exibido.
          </Typography>
        </Layout>
      ) : (
        // Se não estiver logado, mostra a página de Cadastro
        <Layout 
          isLoggedIn={isLoggedIn} 
          onLoginSuccess={handleLoginSuccess} 
          onLogout={handleLogout}
        >
           <CadastroPage />
        </Layout>
      )}
    </ThemeProvider>
  );
};

export default App;
