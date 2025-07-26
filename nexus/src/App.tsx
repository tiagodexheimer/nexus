import React, { useState } from 'react';
import { CssBaseline, ThemeProvider, Typography } from '@mui/material';
import Layout from './components/Layout';
import theme from './styles/theme';

const App: React.FC = () => {
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
    </ThemeProvider>
  );
};

export default App;
