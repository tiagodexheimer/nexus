import React, { useState } from 'react';
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
  Avatar, // Adicione Avatar para usar como imagem
  // Adicione AdbIcon aqui
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'; // Ícone para o menu hambúrguer
import { Login } from '../api/login/Login'; // Importa a lógica da API

// Props que o Header espera receber do App.tsx
interface HeaderProps {
  isLoggedIn: boolean;
  onLoginSuccess: () => void;
  onLogout: () => void;
}

// Itens do menu que aparecem quando o utilizador está logado
const menuItems = [
  { text: 'Dashboard', path: '/dashboard' },
  { text: 'Solicitações', path: '/solicitacoes' },
  { text: 'Rotas', path: '/rotas' },
  { text: 'Relatórios', path: '/relatorios' },
  { text: 'Gerenciar', path: '/gerenciar' },
];

const logoSrc = "/logo.png";

const Header: React.FC<HeaderProps> = ({ isLoggedIn, onLoginSuccess, onLogout }) => {
  // Estados para controlar os campos de login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Estados para controlar os menus responsivos
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // Função para lidar com a submissão do formulário de login
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
      onLoginSuccess(); // Informa o App.tsx que o login foi bem-sucedido
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro.');
    } finally {
      setLoading(false);
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLElement>, path: string) => {
    e.preventDefault();
    // No futuro, quando tiver rotas, a lógica de navegação virá aqui.
    // Ex: navigate(path);
    console.log(`Simulando navegação para: ${path}`);
    alert(`A navegação para "${path}" ainda não foi implementada.`);
    handleCloseNavMenu(); // Fecha o menu após o clique
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#4B830D' }}>
      <Toolbar>
        {isLoggedIn ? (
          // --- APARÊNCIA QUANDO LOGADO ---
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* Ícone do Menu Hambúrguer para telas pequenas */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="menu de navegação"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {menuItems.map((item) => (
                  <MenuItem key={item.text} onClick={(e) => handleNavClick(e, item.path)}>
                    <Typography textAlign="center">{item.text}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            {/* Logo para telas pequenas e grandes */}
            <Avatar
              src={logoSrc}
              alt="Nexus Logo"
              sx={{ width: 35, height: 35, mr: 1, display: { xs: 'flex', md: 'flex' } }}
            />
            <Typography variant="h6" component="div" sx={{ whiteSpace: 'nowrap', display: { md: 'flex' } }}>
              Nexus Ambiental
            </Typography>
            {/* MENU COMPLETO - VISÍVEL EM TELAS GRANDES */}

            <Box sx={{ flex: 2, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
              {menuItems.map((item) => (
                <Button
                  key={item.text}
                  onClick={(e) => handleNavClick(e, item.path)}
                  color="inherit"
                  sx={{
                    margin: '0 10px',
                    textTransform: 'none',
                    fontSize: '1rem',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.08)'
                    }
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
              <Button
                color="inherit"
                variant="outlined"
                onClick={onLogout}
                sx={{
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)'
                  }
                }}
              >
                Sair
              </Button>
            </Box>
          </Box>
        ) : (
          // --- APARÊNCIA QUANDO DESLOGADO ---
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Avatar
              src={logoSrc}
              alt="Nexus Logo"
              sx={{ width: 35, height: 35, mr: 1, display: { xs: 'flex', md: 'flex' } }}
            />
            <Box component="form" onSubmit={handleSubmitLogin} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {error && <Typography variant="caption" sx={{ color: 'error.main', mr: 2, backgroundColor: 'white', p: 0.5, borderRadius: 1 }}>{error}</Typography>}
              <TextField
                variant="outlined"
                size="small"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                sx={{
                  '& .MuiInputBase-root': { backgroundColor: 'rgba(255,255,255,0.1)', color: 'white' },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.5)' },
                  '& .MuiInputLabel-root': { color: 'white' },
                }}
              />
              <TextField
                variant="outlined"
                size="small"
                type="password"
                label="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                sx={{
                  '& .MuiInputBase-root': { backgroundColor: 'rgba(255,255,255,0.1)', color: 'white' },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.5)' },
                  '& .MuiInputLabel-root': { color: 'white' },
                }}
              />
              <Box sx={{ position: 'relative' }}>
                <Button
                  type="submit"
                  variant="outlined"
                  color="inherit"
                  disabled={loading}
                  sx={{
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)'
                    }
                  }}
                >
                  Entrar
                </Button>
                {loading && <CircularProgress size={24} sx={{ position: 'absolute', top: '50%', left: '50%', mt: '-12px', ml: '-12px' }} />}
              </Box>
            </Box>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;