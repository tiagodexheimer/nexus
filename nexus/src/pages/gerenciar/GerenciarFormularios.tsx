import React from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const mockForms = [
  { id: 1, name: 'Autorização de poda', status: 'Ativo' },
  { id: 2, name: 'Autorização de supressão', status: 'Ativo' },
  { id: 3, name: 'Fiscalização de supressão irregular', status: 'Ativo' },
  { id: 4, name: 'Fiscalização de poda irregular', status: 'Ativo' },
];

const GerenciarFormularios: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Gerenciar Formulários
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button variant="contained">Novo Formulário</Button>
          <TextField label="Filtro" variant="outlined" size="small" sx={{ flexGrow: 1 }} />
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Tipo</InputLabel>
            <Select label="Tipo">
              <MenuItem value="poda">Poda</MenuItem>
              <MenuItem value="supressao">Supressão</MenuItem>
              <MenuItem value="fiscalizacao">Fiscalização</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Paper>

      <List>
        {mockForms.map((form) => (
          <Paper key={form.id} sx={{ mb: 2 }}>
            <ListItem
              secondaryAction={
                <Box>
                  <Button
                    variant="outlined"
                    startIcon={<EditIcon />}
                    sx={{ mr: 1 }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                  >
                    Remover
                  </Button>
                </Box>
              }
            >
              <Checkbox edge="start" />
              <ListItemText
                primary={<strong>{form.name}</strong>}
                secondary={`Status: ${form.status}`}
              />
            </ListItem>
          </Paper>
        ))}
      </List>
    </Box>
  );
};

export default GerenciarFormularios;