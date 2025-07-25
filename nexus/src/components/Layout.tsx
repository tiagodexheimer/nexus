import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';

// 1. Definimos que o Layout agora espera receber uma propriedade 'onLogout'
interface LayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
}

// 2. Recebemos 'onLogout' junto com 'children'
const Layout: React.FC<LayoutProps> = ({ children, onLogout }) => {
  return (
    <>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* 3. Passamos a propriedade 'onLogout' para o componente Header */}
        <Header onLogout={onLogout} />
        <Box sx={{ display: 'flex', flexGrow: 1 }}>
          <Sidebar />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              backgroundColor: '#F5F5DC', // Bege Madeira Clara
              p: 3,
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Layout;
