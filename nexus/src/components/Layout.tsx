import React from 'react';
import { Box, CssBaseline, Typography } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';

// Layout agora recebe todas as props relacionadas à autenticação
interface LayoutProps {
  children: React.ReactNode;
  isLoggedIn: boolean;
  onLoginSuccess: () => void;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, isLoggedIn, onLoginSuccess, onLogout }) => {
  return (
    <>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Passa todas as props recebidas para o Header */}
        <Header 
          isLoggedIn={isLoggedIn} 
          onLoginSuccess={onLoginSuccess} 
          onLogout={onLogout} 
        />
        <Box sx={{ display: 'flex', flexGrow: 1 }}>
          <Sidebar />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              backgroundColor: '#F5F5DC',
              p: 3,
            }}
          >
            {/* Só mostra o conteúdo principal se o usuário estiver logado */}
            {isLoggedIn ? children : (
              <Typography variant="h5" align="center" sx={{ mt: 5 }}>
                Por favor, faça o login para continuar.
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Layout;
