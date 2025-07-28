// nexus/src/components/Sidebar.tsx
import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useLocation, Link as RouterLink } from 'react-router-dom';

const gerenciarMenuItems = [
  { text: 'Gerenciar Espécies', path: '/gerenciar/especies' },
  { text: 'Gerenciar Formulários', path: '/gerenciar/formularios' },
  { text: 'Gerenciar Rotas', path: '/gerenciar/rotas' },
  { text: 'Gerenciar Status', path: '/gerenciar/status' },
  { text: 'Gerenciar Tipos de Vistoria', path: '/gerenciar/tipos-vistoria' },
  { text: 'Gerenciar Usuários', path: '/gerenciar/usuarios' },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  const isGerenciarPage = location.pathname.startsWith('/gerenciar');

  return (
    <Box
      component="nav"
      sx={{
        width: 240,
        flexShrink: 0,
        backgroundColor: '#654321', // Marrom Casca de Árvore
        color: 'white',
      }}
    >
      {isGerenciarPage && (
        <List>
          {gerenciarMenuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton component={RouterLink} to={item.path}>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default Sidebar;