import React, { useState } from 'react';
import { Box, CssBaseline, Drawer, Toolbar } from '@mui/material';
import Header from './Header.tsx';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
  isLoggedIn: boolean;
  onLoginSuccess: () => void;
  onLogout: () => void;
}

const drawerWidth = 240;

const Layout: React.FC<LayoutProps> = ({ children, isLoggedIn, onLoginSuccess, onLogout }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header 
        isLoggedIn={isLoggedIn} 
        onLoginSuccess={onLoginSuccess} 
        onLogout={onLogout}
        onDrawerToggle={handleDrawerToggle}
        drawerWidth={drawerWidth}
      />
      {isLoggedIn && (
        <Box
          component="nav"
          sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
          aria-label="menu de navegação"
        >
          {/* Drawer para telas pequenas (temporário) */}
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Melhora a performance de abertura em mobile.
            }}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: '#654321' },
            }}
          >
            <Sidebar />
          </Drawer>
          {/* Drawer para telas grandes (permanente) */}
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', md: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: '#654321' },
            }}
            open
          >
            <Sidebar />
          </Drawer>
        </Box>
      )}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: '#F5F5DC',
          p: { xs: 1, sm: 2, md: 3 },
          width: { md: `calc(100% - ${isLoggedIn ? drawerWidth : 0}px)` },
          minHeight: '100vh'
        }}
      >
        <Toolbar /> {/* Espaçador para o conteúdo não ficar sob o Header */}
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
