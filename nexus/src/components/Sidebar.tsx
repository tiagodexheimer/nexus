import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemText, Divider, Toolbar } from '@mui/material';
import { useLocation, Link as RouterLink } from 'react-router-dom';

// Itens do menu principal
const mainMenuItems = [
  { text: 'Dashboard', path: '/dashboard' },
  { text: 'Solicitações', path: '/solicitacoes' },
  { text: 'Rotas', path: '/rotas' },
  { text: 'Relatórios', path: '/relatorios' },
  { text: 'Gerenciar', path: '/gerenciar' },
];

// Itens do submenu de gerenciamento
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
    // O conteúdo do Drawer
    <div>
      <Toolbar />
      <Divider />
      <List>
        {mainMenuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={RouterLink} to={item.path}>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      {/* Mostra o submenu apenas se estiver na página de gerenciar */}
      {isGerenciarPage && (
        <List>
          <Typography sx={{ pl: 2, pt: 1, fontWeight: 'bold' }}>Admin</Typography>
          {gerenciarMenuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton component={RouterLink} to={item.path} sx={{ pl: 4 }}>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default Sidebar;
