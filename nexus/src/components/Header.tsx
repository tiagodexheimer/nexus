import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Button, Box, TextField, CircularProgress
} from '@mui/material';
import { Login } from '../api/login/Login'; // Importa a lógica da API

// As props que o Header espera receber do App.tsx
interface HeaderProps {
  isLoggedIn: boolean;
  onLoginSuccess: () => void;
  onLogout: () => void;
}

// Itens do menu que só aparecem quando o utilizador está logado
const menuItems = [
  { text: 'Dashboard', path: '/dashboard' },
  { text: 'Solicitações', path: '/solicitacoes' },
  { text: 'Rotas', path: '/rotas' },
  { text: 'Relatórios', path: '/relatorios' },
  { text: 'Gerenciar', path: '/gerenciar' },
];

const Header: React.FC<HeaderProps> = ({ isLoggedIn, onLoginSuccess, onLogout }) => {
  // Estados para controlar os campos de login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
  
  const handleNavClick = (e: React.MouseEvent<HTMLButtonElement>, path: string) => {
    e.preventDefault();
    // No futuro, quando tiver rotas, a lógica de navegação virá aqui.
    // Ex: navigate(path);
    console.log(`Simulando navegação para: ${path}`);
    alert(`A navegação para "${path}" ainda não foi implementada.`);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#4B830D' }}>
      <Toolbar>
        {isLoggedIn ? (
          // --- APARÊNCIA QUANDO LOGADO ---
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
              <Typography variant="h6" component="div" sx={{ whiteSpace: 'nowrap' }}>
                Nexus Ambiental
              </Typography>
            </Box>
            <Box sx={{ flex: 2, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', fontSize: '20px' }}>
              {menuItems.map((item) => (
                <Button 
                  key={item.text} 
                  onClick={(e) => handleNavClick(e, item.path)}
                  color="inherit" 
                  sx={{ 
                    margin: '0 10px', 
                    textTransform: 'none', 
                    fontSize: 'inherit',
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
                // Adicionado para corrigir a borda azul
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
            <Typography variant="h6" component="div" sx={{ whiteSpace: 'nowrap' }}>
              Nexus Ambiental
            </Typography>
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
