import React, { useState, useEffect } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Toolbar,
  Collapse,
  Typography
} from '@mui/material';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import {
  Dashboard as DashboardIcon,
  ListAlt as ListAltIcon,
  AltRoute as AltRouteIcon,
  Assessment as AssessmentIcon,
  Settings as SettingsIcon,
  ExpandLess,
  ExpandMore,
  People as PeopleIcon,
  Description as DescriptionIcon,
  Category as CategoryIcon,
  PlaylistAddCheck as PlaylistAddCheckIcon,
  Park as ParkIcon
} from '@mui/icons-material';

// Itens do menu principal
const mainMenuItems = [
  { text: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
  { text: 'Solicitações', path: '/solicitacoes', icon: <ListAltIcon /> },
  { text: 'Rotas', path: '/rotas', icon: <AltRouteIcon /> },
  { text: 'Relatórios', path: '/relatorios', icon: <AssessmentIcon /> },
];

// Itens do submenu de gerenciamento
const gerenciarMenuItems = [
  { text: 'Formulários', path: '/gerenciar/formularios', icon: <DescriptionIcon /> },
  { text: 'Espécies', path: '/gerenciar/especies', icon: <ParkIcon /> },
  { text: 'Tipos de Vistoria', path: '/gerenciar/tipos-vistoria', icon: <CategoryIcon /> },
  { text: 'Status', path: '/gerenciar/status', icon: <PlaylistAddCheckIcon /> },
  { text: 'Rotas', path: '/gerenciar/rotas', icon: <AltRouteIcon /> },
  { text: 'Usuários', path: '/gerenciar/usuarios', icon: <PeopleIcon /> },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [gerenciarOpen, setGerenciarOpen] = useState(false);

  // Abre o submenu "Gerenciar" se a rota atual for uma de suas subpáginas
  useEffect(() => {
    if (location.pathname.startsWith('/gerenciar')) {
      setGerenciarOpen(true);
    }
  }, [location.pathname]);

  const handleGerenciarClick = () => {
    setGerenciarOpen(!gerenciarOpen);
  };

  return (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {mainMenuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={RouterLink} to={item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
        
        {/* Item "Gerenciar" que expande para mostrar o submenu */}
        <ListItemButton onClick={handleGerenciarClick}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Gerenciar" />
          {gerenciarOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={gerenciarOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {gerenciarMenuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton component={RouterLink} to={item.path} sx={{ pl: 4 }}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>
    </div>
  );
};

export default Sidebar;
