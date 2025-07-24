import React from 'react';
import { Box } from '@mui/material';

const Sidebar: React.FC = () => {
  return (
    <Box
      component="nav"
      sx={{
        width: 240,
        flexShrink: 0,
        backgroundColor: '#654321', // Marrom Casca de Árvore
      }}
    />
  );
};

export default Sidebar;
