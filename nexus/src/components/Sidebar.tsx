import React from 'react';
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
} from '@mui/icons-material';

// Itens do menu principal
const mainMenuItems = [
  { text: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
  { text: 'Solicitações', path: '/solicitacoes', icon: <ListAltIcon /> },
  { text: 'Rotas', path: '/rotas', icon: <AltRouteIcon /> },
  { text: 'Relatórios', path: '/relatorios', icon: <AssessmentIcon /> },
];

interface SidebarProps {
  isExpanded: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isExpanded }) => {
  const location = useLocation();
  const isGerenciarPage = location.pathname.startsWith('/gerenciar');

  return (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {mainMenuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              component={RouterLink}
              to={item.path}
              sx={{
                minHeight: 48,
                justifyContent: isExpanded ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon sx={{ minWidth: 0, mr: isExpanded ? 3 : 'auto', justifyContent: 'center' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} sx={{ opacity: isExpanded ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ))}
        
        {/* Item "Gerenciar" que leva para a página e expande o menu */}
        <ListItem disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            component={RouterLink}
            to="/gerenciar"
            sx={{
              minHeight: 48,
              justifyContent: isExpanded ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            <ListItemIcon sx={{ minWidth: 0, mr: isExpanded ? 3 : 'auto', justifyContent: 'center' }}>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Gerenciar" sx={{ opacity: isExpanded ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
