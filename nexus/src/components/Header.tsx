import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Divider,
} from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';

const menuItems = ['Dashboard', 'Solicitações', 'Rotas', 'Relatórios', 'Gerenciar'];

const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const LogoSection = () => (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <PublicIcon sx={{ mr: 1.5, fontSize: '2.2rem' }} />
      <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
        Nexus
      </Typography>
    </Box>
  );

  const DesktopMenu = () => (
    <Box sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
      {menuItems.map((item) => (
        <Button key={item} color="inherit" sx={{ fontWeight: 500, mx: 1 }}>
          {item}
        </Button>
      ))}
    </Box>
  );

  const UserSectionDesktop = () => (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography sx={{ mr: 2 }}>Olá Usuário</Typography>
      <Button
        color="inherit"
        variant="outlined"
        startIcon={<LogoutIcon />}
        sx={{
          borderColor: 'rgba(255, 255, 255, 0.5)',
          '&:hover': { borderColor: 'white', backgroundColor: 'rgba(255, 255, 255, 0.1)' },
        }}
      >
        Sair
      </Button>
    </Box>
  );

  const MobileMenu = () => (
    <>
      <IconButton size="large" edge="end" color="inherit" aria-label="menu" onClick={handleMenuOpen}>
        <MenuIcon />
      </IconButton>
      <Menu
        id="mobile-menu"
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        sx={{ mt: 5 }}
      >
        <MenuItem disabled>
          <Typography variant="body2" color="text.secondary">Olá Usuário</Typography>
        </MenuItem>
        <Divider />
        {menuItems.map((item) => (
          <MenuItem key={item} onClick={handleMenuClose}>
            {item}
          </MenuItem>
        ))}
        <Divider />
        <MenuItem onClick={handleMenuClose}>
          <LogoutIcon sx={{ mr: 1.5, color: 'text.secondary' }} fontSize="small" />
          Sair
        </MenuItem>
      </Menu>
    </>
  );

  return (
    <AppBar position="static" sx={{ backgroundColor: '#556B2F', zIndex: theme.zIndex.drawer + 1 }}>
      <Toolbar sx={{ position: 'relative', justifyContent: 'space-between' }}>
        <LogoSection />
        {!isMobile ? (
          <>
            <DesktopMenu />
            <UserSectionDesktop />
          </>
        ) : (
          <MobileMenu />
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
