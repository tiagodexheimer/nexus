import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Avatar,
} from '@mui/material';
import { registerUser } from '../api/register/Register';
import theme from '../styles/theme';
import { ThemeProvider } from '@mui/material/styles';

const logoSrc = "/logo.png"; // Caminho para o seu logo

// --- Componente do Formulário de Cadastro ---
const SignUpForm = ({ onSignUpSuccess }: { onSignUpSuccess: () => void }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profession, setProfession] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }
    if (!name || !email || !password || !username) {
        setError('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    setLoading(true);
    try {
      await registerUser(name, email, password);
      onSignUpSuccess();
    } catch (err: any) {      
        setError(err.message || 'Ocorreu um erro no cadastro.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        my: { xs: 4, md: 8 },
        mx: { xs: 2, md: 4 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
        <Typography variant="h6" component="h2" gutterBottom align="center">
            Para acessar nossa plataforma crie sua conta:
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Nome Completo"
              name="name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            <TextField
              margin="normal"
              fullWidth
              id="profession"
              label="Profissão"
              name="profession"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              disabled={loading}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Usuário"
              name="username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Repita sua senha"
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
            />
            {error && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {error}
            </Typography>
            )}
            <Box sx={{ position: 'relative', mt: 2 }}>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={loading}
            >
                Cadastrar
            </Button>
            {loading && (
                <CircularProgress
                size={24}
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-12px',
                    marginLeft: '-12px',
                }}
                />
            )}
            </Box>
        </Box>
    </Box>
  );
};

// --- Componente do Diálogo de Sucesso ---
const SuccessDialog = ({ open, onClose }: { open: boolean; onClose: () => void }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Cadastro Realizado com Sucesso!</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Seu cadastro foi efetuado. Por favor, verifique seu e-mail para confirmar sua conta.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary" autoFocus>
        Ok
      </Button>
    </DialogActions>
  </Dialog>
);


// --- Componente Principal da Página de Cadastro ---
const CadastroPage: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSignUpSuccess = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
        <Grid 
            container 
            component="main" 
            sx={{ 
                height: 'calc(100vh - 64px)', // Altura da tela menos o Header
                backgroundColor: 'background.paper' // Fundo bege para TODA a área
            }}
        >
            {/* Lado Esquerdo: Frame Marrom com Descrição */}
            <Grid 
                item 
                xs={12} 
                md={6}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: { xs: 2, sm: 4 }, // Padding para criar o efeito de frame
                }}
            >
                <Paper
                    elevation={6}
                    sx={{
                        p: { xs: 2, sm: 4 },
                        backgroundColor: '#654321',
                        color: 'white',
                        borderRadius: 2,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}
                >
                    <Container maxWidth="sm">
                        <Box sx={{ textAlign: 'center' }}>
                            <Avatar 
                                src={logoSrc} 
                                alt="Nexus Ambiental Logo"
                                sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }}
                            />
                            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                            Bem vindo a plataforma Web
                            </Typography>
                            <Typography variant="body1" paragraph>
                            A Nexus Ambiental é uma startup de tecnologia que desenvolve soluções SaaS para otimizar a gestão de ativos ambientais. Através de plataformas web e mobile integradas, a empresa substitui processos manuais por fluxos de trabalho digitais, fornecendo dados precisos para decisões estratégicas.
                            </Typography>
                            <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 3, fontWeight: 'bold' }}>
                            Principais Recursos
                            </Typography>
                            <Typography variant="body1" align="left" paragraph>
                              <strong>Gerenciamento de Solicitações:</strong> Cadastro e importação em lote de pedidos de vistoria. <br/>
                              <strong>Planejamento e Roteirização:</strong> Criação de rotas de trabalho otimizadas para as equipes. <br/>
                              <strong>Execução de Vistoria Offline:</strong> Preenchimento de laudos em campo, sem necessidade de internet. <br/>
                              <strong>Administração e Gestão:</strong> Painel web para gerenciar formulários e visualizar dashboards. <br/>
                              <strong>Geração de Relatórios:</strong> Criação automática de laudos técnicos padronizados.
                            </Typography>
                        </Box>
                    </Container>
                </Paper>
            </Grid>
            {/* Lado Direito: Formulário */}
            <Grid 
                item 
                xs={12} 
                md={6} 
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Container maxWidth="sm">
                    <SignUpForm onSignUpSuccess={handleSignUpSuccess} />
                </Container>
            </Grid>
        </Grid>
        <SuccessDialog open={dialogOpen} onClose={handleCloseDialog} />
    </ThemeProvider>
  );
};

export default CadastroPage;
