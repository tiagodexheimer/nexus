import React, { useState } from 'react';
import { Box, CssBaseline, Drawer, Toolbar } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Header from './Header.tsx';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
  isLoggedIn: boolean;
  onLoginSuccess: () => void;
  onLogout: () => void;
}

const expandedDrawerWidth = 240;
const collapsedDrawerWidth = 64;

const Layout: React.FC<LayoutProps> = ({ children, isLoggedIn, onLoginSuccess, onLogout }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isGerenciarPage = location.pathname.startsWith('/gerenciar');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Determina a largura atual da barra lateral no desktop
  const desktopDrawerWidth = isGerenciarPage ? expandedDrawerWidth : collapsedDrawerWidth;

  const drawerContent = <Sidebar isExpanded={isGerenciarPage} />;
  const mobileDrawerContent = <Sidebar isExpanded={true} />; // Mobile sempre expandido

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header 
        isLoggedIn={isLoggedIn} 
        onLoginSuccess={onLoginSuccess} 
        onLogout={onLogout}
        onDrawerToggle={handleDrawerToggle}
      />
      
      {isLoggedIn && (
        <Box
          component="nav"
          sx={{ width: { md: desktopDrawerWidth }, flexShrink: { md: 0 } }}
        >
          {/* Drawer para mobile (temporário e flutuante) */}
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: expandedDrawerWidth, backgroundColor: '#654321', color: 'white' },
            }}
          >
            {mobileDrawerContent}
          </Drawer>

          {/* Drawer para desktop (permanente) */}
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', md: 'block' },
              '& .MuiDrawer-paper': { 
                boxSizing: 'border-box', 
                width: desktopDrawerWidth, 
                backgroundColor: '#654321', 
                color: 'white',
                transition: (theme) => theme.transitions.create('width', {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.enteringScreen,
                }),
                overflowX: 'hidden'
              },
            }}
            open
          >
            {drawerContent}
          </Drawer>
        </Box>
      )}
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: '#F5F5DC',
          p: 3,
          width: { md: `calc(100% - ${isLoggedIn ? desktopDrawerWidth : 0}px)` },
          minHeight: '100vh',
          transition: (theme) => theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        <Toolbar /> {/* Espaçador para o conteúdo não ficar sob o Header */}
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
