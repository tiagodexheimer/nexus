import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
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
