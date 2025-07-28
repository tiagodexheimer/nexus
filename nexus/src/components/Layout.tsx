// src/components/Layout.tsx
import React, { type JSX } from 'react';
import { Box, CssBaseline, useTheme } from '@mui/material'; // Import useTheme
import Header from './Header.tsx';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
  isLoggedIn: boolean;
  onLoginSuccess: () => void;
  onLogout: () => void;
}

const Layout = ({ children, isLoggedIn, onLoginSuccess, onLogout }: LayoutProps): JSX.Element => {
  const theme = useTheme(); // Initialize useTheme

  return (
    <>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header
          isLoggedIn={isLoggedIn}
          onLoginSuccess={onLoginSuccess}
          onLogout={onLogout}
        />
        {/* This Box now correctly accounts for the header's height */}
        <Box
          sx={{
            display: 'flex',
            flexGrow: 1,
            // Apply margin-top to push content below the fixed header
            mt: `${theme.mixins.toolbar.minHeight}px`,
          }}
        >
          {isLoggedIn && <Sidebar />} {/* Show the Sidebar only if logged in */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              backgroundColor: '#F5F5DC',
              p: 3, // Keep existing padding for content within the main area
            }}
          >
            {children} {/* The content (routes) will be rendered here */}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Layout;