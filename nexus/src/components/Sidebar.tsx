// nexus/src/components/Sidebar.tsx
import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemText, useTheme } from '@mui/material'; // Importar useTheme
import { Link as RouterLink } from 'react-router-dom';

// Define os itens de navegação principais
const mainMenuItems = [
  { text: 'Dashboard', path: '/dashboard' },
  { text: 'Solicitações', path: '/solicitacoes' },
  { text: 'Rotas', path: '/rotas' },
  { text: 'Relatórios', path: '/relatorios' },
];

// Define os itens do menu de gerenciamento
const gerenciarMenuItems = [
  { text: 'Gerenciar Espécies', path: '/gerenciar/especies' },
  { text: 'Gerenciar Formulários', path: '/gerenciar/formularios' },
  { text: 'Gerenciar Rotas', path: '/gerenciar/rotas' },
  { text: 'Gerenciar Status', path: '/gerenciar/status' },
  { text: 'Gerenciar Tipos de Vistoria', path: '/gerenciar/tipos-vistoria' },
  { text: 'Gerenciar Usuários', path: '/gerenciar/usuarios' },
];

const Sidebar: React.FC = () => {
  const theme = useTheme(); // Obtenha o tema para acessar os mixins

  return (
    <Box
      sx={{
        width: '100%',
        // A cor de fundo e a cor do texto são definidas no Drawer em Layout.tsx
      }}
    >
      {/* Espaçador para empurrar o conteúdo para baixo da AppBar fixa. */}
      {/* Isso cria uma Box com a altura mínima da toolbar, evitando a sobreposição. */}
      <Box sx={theme.mixins.toolbar} />

      <List>
        {/* Renderiza os itens de navegação principais */}
        {mainMenuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton component={RouterLink} to={item.path}>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
        ))}
        {/* Renderiza todos os itens de "Gerenciar" */}
        {gerenciarMenuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={RouterLink} to={item.path}>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
