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
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Login } from '../api/login/Login';

interface HeaderProps {
  isLoggedIn: boolean;
  onLoginSuccess: () => void;
  onLogout: () => void;
  onDrawerToggle?: () => void;
  drawerWidth?: number;
}

const menuItems = [
  { text: 'Dashboard', path: '/dashboard' },
  { text: 'Solicitações', path: '/solicitacoes' },
  { text: 'Rotas', path: '/rotas' },
  { text: 'Relatórios', path: '/relatorios' },
  { text: 'Gerenciar', path: '/gerenciar' },
];

const logoSrc = "/logo.png";

const Header = ({ isLoggedIn, onLoginSuccess, onLogout, onDrawerToggle, drawerWidth = 0 }: HeaderProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
      position="fixed" // Alterado de "sticky" para "fixed"
      sx={{
        backgroundColor: '#4B830D',
        // Ajusta a largura e a margem quando o drawer permanente está visível
        width: { md: isLoggedIn ? `calc(100% - ${drawerWidth}px)` : '100%' },
        ml: { md: isLoggedIn ? `${drawerWidth}px` : 0 },
        zIndex: (theme) => theme.zIndex.drawer + 1, // Garante que o Header fique sobre o Drawer
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
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            
            <Typography variant="h6" component="div" noWrap sx={{ flexGrow: 1, display: { xs: 'block', md: 'none' } }}>
              Nexus
            </Typography>
            
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
              <Avatar src={logoSrc} alt="Nexus Logo" sx={{ width: 35, height: 35, mr: 1 }} />
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
            </Box>

            <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', ml: 2 }}>
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
