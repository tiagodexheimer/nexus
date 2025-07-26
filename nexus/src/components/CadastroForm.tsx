import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { registerUser } from '../api/register/Register';

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

// --- Componente do Formulário de Cadastro ---
const CadastroForm: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [profession, setProfession] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
  
    const handleSignUpSuccess = () => {
      setDialogOpen(true);
    };
  
    const handleCloseDialog = () => {
      setDialogOpen(false);
    };

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
        handleSignUpSuccess();
      } catch (err: any) {      
          setError(err.message || 'Ocorreu um erro no cadastro.');
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <>
        <Container maxWidth="sm">
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
        </Container>
        <SuccessDialog open={dialogOpen} onClose={handleCloseDialog} />
      </>
    );
  };

  export default CadastroForm;