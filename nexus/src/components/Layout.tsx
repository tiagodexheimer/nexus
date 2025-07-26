import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';

// Props que o Layout espera receber
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
          {/* O conteúdo (children) é renderizado diretamente */}
          {children}
        </Box>
      </Box>

    </>
  );
};

export default Layout;
