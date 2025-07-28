import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  TextField,
  CircularProgress,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Login } from '../api/login/Login';

interface HeaderProps {
  isLoggedIn: boolean;
  onLoginSuccess: () => void;
  onLogout: () => void;
  onDrawerToggle?: () => void;
}

const menuItems = [
  { text: 'Dashboard', path: '/dashboard' },
  { text: 'Solicitações', path: '/solicitacoes' },
  { text: 'Rotas', path: '/rotas' },
  { text: 'Relatórios', path: '/relatorios' },
];

// Itens do submenu de gerenciamento
const gerenciarMenuItems = [
  { text: 'Visão Geral', path: '/gerenciar' },
  { text: 'Formulários', path: '/gerenciar/formularios' },
  { text: 'Espécies', path: '/gerenciar/especies' },
  { text: 'Tipos de Vistoria', path: '/gerenciar/tipos-vistoria' },
  { text: 'Status', path: '/gerenciar/status' },
  { text: 'Rotas', path: '/gerenciar/rotas' },
  { text: 'Usuários', path: '/gerenciar/usuarios' },
];

const logoSrc = "/logo.png";

const Header = ({ isLoggedIn, onLoginSuccess, onLogout, onDrawerToggle }: HeaderProps): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [anchorElGerenciar, setAnchorElGerenciar] = useState<null | HTMLElement>(null);

  const handleGerenciarMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElGerenciar(event.currentTarget);
  };

  const handleGerenciarMenuClose = () => {
    setAnchorElGerenciar(null);
  };

  const handleSubmitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Preencha ambos os campos.');
      return;
    }
    setLoading(true);
    try {
      await Login(email, password);
      onLoginSuccess();
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: '#4B830D',
        zIndex: (theme) => theme.zIndex.drawer + 1, // Garante que o Header fique sobre a Sidebar
      }}
    >
      <Toolbar>
        {isLoggedIn ? (
          // --- APARÊNCIA QUANDO LOGADO ---
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={onDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' } }} // Visível apenas em mobile
            >
              <MenuIcon />
            </IconButton>
            
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
              <Avatar src={logoSrc} alt="Nexus Logo" sx={{ width: 35, height: 35, mr: 1, display: { xs: 'none', md: 'flex' } }} />
              <Typography variant="h6" component="div" noWrap>
                Nexus Ambiental
              </Typography>
            </Box>

            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              {menuItems.map((item) => (
                <Button key={item.text} component={RouterLink} to={item.path} sx={{ color: 'white' }}>
                  {item.text}
                </Button>
              ))}
              {/* Botão Gerenciar com Menu Dropdown */}
              <Button
                aria-controls="gerenciar-menu"
                aria-haspopup="true"
                onClick={handleGerenciarMenuOpen}
                sx={{ color: 'white' }}
              >
                Gerenciar
              </Button>
              <Menu
                id="gerenciar-menu"
                anchorEl={anchorElGerenciar}
                keepMounted
                open={Boolean(anchorElGerenciar)}
                onClose={handleGerenciarMenuClose}
              >
                {gerenciarMenuItems.map((item) => (
                  <MenuItem key={item.text} component={RouterLink} to={item.path} onClick={handleGerenciarMenuClose}>
                    {item.text}
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
              <Typography variant="body1" sx={{ mr: 2, display: { xs: 'none', sm: 'block' } }}>
                Olá, Utilizador
              </Typography>
              <Button color="inherit" variant="outlined" onClick={onLogout}>
                Sair
              </Button>
            </Box>
          </Box>
        ) : (
          // --- APARÊNCIA QUANDO DESLOGADO (RESPONSIVO) ---
          <Box sx={{ width: '100%', display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar src={logoSrc} alt="Nexus Logo" sx={{ width: 35, height: 35, mr: 1 }} />
                <Typography variant="h6" component="div">
                    Nexus Ambiental
                </Typography>
            </Box>
            
            <Box component="form" onSubmit={handleSubmitLogin} sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', gap: 1, width: { xs: '100%', sm: 'auto' } }}>
              {error && <Typography variant="caption" color="error" sx={{ width: '100%', textAlign: 'center' }}>{error}</Typography>}
              <TextField fullWidth variant="outlined" size="small" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} sx={{ '& .MuiInputBase-root': { backgroundColor: 'rgba(255,255,255,0.1)', color: 'white' } }}/>
              <TextField fullWidth variant="outlined" size="small" type="password" label="Senha" value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} sx={{ '& .MuiInputBase-root': { backgroundColor: 'rgba(255,255,255,0.1)', color: 'white' } }}/>
              <Button type="submit" variant="outlined" color="inherit" disabled={loading} fullWidth sx={{ minWidth: '100px' }}>
                {loading ? <CircularProgress size={24} /> : 'Entrar'}
              </Button>
            </Box>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
