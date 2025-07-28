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
  Menu,
  MenuItem,
  IconButton,
  Avatar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Login } from '../api/login/Login';

interface HeaderProps {
  isLoggedIn: boolean;
  onLoginSuccess: () => void;
  onLogout: () => void;
}

const menuItems = [
  { text: 'Dashboard', path: '/dashboard' },
  { text: 'Solicitações', path: '/solicitacoes' },
  { text: 'Rotas', path: '/rotas' },
  { text: 'Relatórios', path: '/relatorios' },
  { text: 'Gerenciar', path: '/gerenciar' },
];

const logoSrc = "/logo.png";


const Header = ({ isLoggedIn, onLoginSuccess, onLogout }: HeaderProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
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
    <AppBar position="sticky" sx={{ backgroundColor: '#4B830D' }}>
      <Toolbar>
        {isLoggedIn ? (
          // --- APARÊNCIA QUANDO LOGADO ---
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton size="large" aria-label="menu de navegação" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
                <MenuIcon />
              </IconButton>
              <Menu id="menu-appbar" anchorEl={anchorElNav} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'left' }} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu} sx={{ display: { xs: 'block', md: 'none' } }}>
                {menuItems.map((item) => (
                  <MenuItem key={item.text} component={RouterLink} to={item.path} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{item.text}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            
            <Avatar src={logoSrc} alt="Nexus Logo" sx={{ width: 35, height: 35, mr: 1 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: { xs: 1, md: 0 } }}>
              Nexus Ambiental
            </Typography>

            <Box sx={{ flex: 2, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
              {menuItems.map((item) => (
                <Button
                  key={item.text}
                  component={RouterLink}
                  to={item.path}
                  color="inherit"
                  sx={{
                    margin: '0 10px',
                    textTransform: 'none',
                    fontSize: '1rem',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#81C784', // Muda a cor de fundo no hover
                      color: 'white', // Garante que a cor do texto não mude
                    },
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>

            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
              <Typography variant="body1" sx={{ mr: 2, display: { xs: 'none', sm: 'block' } }}>
                Olá, Utilizador
              </Typography>
              <Button color="inherit" variant="outlined" onClick={onLogout}>
                Sair
              </Button>
            </Box>
          </Box>
        ) : (
          // --- APARÊNCIA QUANDO DESLOGADO ---
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar src={logoSrc} alt="Nexus Logo" sx={{ width: 35, height: 35, mr: 1 }} />
                <Typography variant="h6" component="div">
                    Nexus Ambiental
                </Typography>
            </Box>
            
            <Box component="form" onSubmit={handleSubmitLogin} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {error && <Typography variant="caption" color="error">{error}</Typography>}
              <TextField variant="outlined" size="small" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} sx={{ '& .MuiInputBase-root': { backgroundColor: 'rgba(255,255,255,0.1)', color: 'white' } }}/>
              <TextField variant="outlined" size="small" type="password" label="Senha" value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} sx={{ '& .MuiInputBase-root': { backgroundColor: 'rgba(255,255,255,0.1)', color: 'white' } }}/>
              <Button type="submit" variant="outlined" color="inherit" disabled={loading}>
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
