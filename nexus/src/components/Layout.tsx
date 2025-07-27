// src/components/Layout.tsx
import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';

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
        <Header
          isLoggedIn={isLoggedIn}
          onLoginSuccess={onLoginSuccess}
          onLogout={onLogout}
        />
        <Box sx={{ display: 'flex', flexGrow: 1 }}>
          {isLoggedIn && <Sidebar />} {/* Mostra a Sidebar somente se logado */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              backgroundColor: '#F5F5DC',
              p: 3,
            }}
          >
            {children} {/* O conteúdo (rotas) será renderizado aqui */}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Layout;