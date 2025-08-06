import { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
} from '@mui/material';

interface CadastroFormProps {
  onSignUpSuccess: () => void;
}

const CadastroForm: React.FC<CadastroFormProps> = ({ onSignUpSuccess }) => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    nome: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    let tempErrors = { nome: '', email: '', password: '', confirmPassword: '' };
    let isValid = true;

    if (!formData.nome) {
      tempErrors.nome = 'O nome é obrigatório.';
      isValid = false;
    }
    if (!formData.email) {
      tempErrors.email = 'O email é obrigatório.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'O email não é válido.';
      isValid = false;
    }
    if (!formData.password) {
      tempErrors.password = 'A senha é obrigatória.';
      isValid = false;
    } else if (formData.password.length < 6) {
      tempErrors.password = 'A senha deve ter pelo menos 6 caracteres.';
      isValid = false;
    }
    if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = 'As senhas não coincidem.';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log('Formulário enviado:', formData);
      // Aqui você adicionaria a lógica para enviar os dados para o backend
      onSignUpSuccess();
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Cadastre-se
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="nome"
            label="Nome Completo"
            name="nome"
            autoComplete="name"
            autoFocus
            value={formData.nome}
            onChange={handleChange}
            error={!!errors.nome}
            helperText={errors.nome}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Endereço de Email"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="new-password" // Alterado para corrigir o aviso
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirmar Senha"
            type="password"
            id="confirmPassword"
            autoComplete="new-password" // Alterado para corrigir o aviso
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Cadastrar
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CadastroForm;
