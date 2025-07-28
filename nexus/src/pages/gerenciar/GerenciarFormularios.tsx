import React from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Button,
  // A importação de 'IconButton' foi removida pois não estava sendo usada
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

// Dados de exemplo para os formulários
const mockFormularios = [
  { id: 'form1', nome: 'Laudo de Vistoria Padrão', versao: '1.2' },
  { id: 'form2', nome: 'Formulário de Supressão Vegetal', versao: '2.0' },
  { id: 'form3', nome: 'Checklist de Conformidade Ambiental', versao: '1.0' },
];

const GerenciarFormularios = () => {
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" component="h2">
          Formulários de Vistoria
        </Typography>
        <Button variant="contained">Novo Formulário</Button>
      </Box>
      <List>
        {mockFormularios.map((form) => (
          <ListItem
            key={form.id}
            divider
            secondaryAction={
              <>
                <Button startIcon={<EditIcon />} sx={{ mr: 1 }}>Editar</Button>
                <Button startIcon={<DeleteIcon />} color="error">Excluir</Button>
              </>
            }
          >
            <ListItemText
              primary={form.nome}
              secondary={`Versão: ${form.versao}`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default GerenciarFormularios;
