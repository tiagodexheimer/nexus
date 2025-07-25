import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const menuItems = [
  { text: 'Dashboard', path: '/dashboard' },
  { text: 'Solicitações', path: '/solicitacoes' },
  { text: 'Rotas', path: '/rotas' },
  { text: 'Relatórios', path: '/relatorios' },
  { text: 'Gerenciar', path: '/gerenciar' },
];

// 1. Definimos que o Header agora espera receber a propriedade 'onLogout'
interface HeaderProps {
  onLogout: () => void;
}

// 2. Recebemos 'onLogout' como propriedade do componente
const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#4B830D' }}>
      <Toolbar>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Seção Esquerda */}
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
            <MenuIcon
              sx={{ display: { xs: 'flex', md: 'none' }, marginRight: 1, cursor: 'pointer' }}
              onClick={handleMenuOpen}
            />
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              open={open}
              onClose={handleMenuClose}
              sx={{
                display: { xs: 'block', md: 'none' },
                '& .MuiPaper-root': { backgroundColor: (theme) => theme.palette.primary.main },
              }}
            >
              {menuItems.map((item) => (
                <MenuItem key={item.text} onClick={handleMenuClose} component="a" href={item.path} sx={{ color: '#FFFFFF' }}>
                  <Typography textAlign="center">{item.text}</Typography>
                </MenuItem>
              ))}
            </Menu>
            <Typography variant="h6" component="div" sx={{ whiteSpace: 'nowrap' }}>
              Nexus Ambiental
            </Typography>
          </Box>

          {/* Seção Central */}
          <Box sx={{ flex: 2, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', fontSize: '20px' }}>
            {menuItems.map((item) => (
              <Button key={item.text} href={item.path} color="inherit" sx={{ margin: '0 10px', textTransform: 'none', fontSize: 'inherit', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.15)' } }}>
                {item.text}
              </Button>
            ))}
          </Box>

          {/* Seção Direita */}
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <Typography variant="body1" sx={{ marginRight: 2, display: { xs: 'none', sm: 'block' } }}>
              Olá, Utilizador
            </Typography>
            {/* 3. Usamos a função 'onLogout' no evento onClick do botão */}
            <Button color="inherit" variant="outlined" onClick={onLogout}>
              Sair
            </Button>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
