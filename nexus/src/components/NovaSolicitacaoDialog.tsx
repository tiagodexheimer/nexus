import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  type SelectChangeEvent,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import { UploadFile as UploadFileIcon, Delete as DeleteIcon } from '@mui/icons-material';
import type { Solicitacao } from '../types';

// Omitimos 'id' e 'mapaUrl' do tipo, pois serão gerados ou definidos automaticamente
type NovaSolicitacaoData = Omit<Solicitacao, 'id' | 'mapaUrl'>;

interface NovaSolicitacaoDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (novaSolicitacao: NovaSolicitacaoData) => void;
}

const NovaSolicitacaoDialog: React.FC<NovaSolicitacaoDialogProps> = ({ open, onClose, onSave }) => {
  const initialState: NovaSolicitacaoData = {
    rua: '',
    bairro: '',
    prazo: 0,
    descricao: '',
    status: 'Sem rota',
    anexos: [],
  };

  const [formState, setFormState] = useState<NovaSolicitacaoData>(initialState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: name === 'prazo' ? Number(value) : value,
    }));
  };

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setFormState(prevState => ({
      ...prevState,
      status: event.target.value as Solicitacao['status'],
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setFormState(prevState => ({
        ...prevState,
        anexos: [...prevState.anexos, ...files],
      }));
    }
  };

  const handleRemoveFile = (fileName: string) => {
    setFormState(prevState => ({
      ...prevState,
      anexos: prevState.anexos.filter((file: File) => file.name !== fileName),
    }));
  };

  const handleSaveClick = () => {
    if (!formState.rua || !formState.bairro || formState.prazo <= 0 || !formState.descricao) {
      // Replaced alert with a more user-friendly message or a custom dialog if necessary
      console.error('Por favor, preencha todos os campos corretamente.');
      return;
    }
    onSave(formState);
    setFormState(initialState);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Adicionar Nova Solicitação</DialogTitle>
      <DialogContent>
        <TextField autoFocus margin="dense" name="rua" label="Nome da Rua e Número" type="text" fullWidth variant="outlined" value={formState.rua} onChange={handleChange} />
        <TextField margin="dense" name="bairro" label="Bairro" type="text" fullWidth variant="outlined" value={formState.bairro} onChange={handleChange} />
        <TextField margin="dense" name="prazo" label="Prazo (em dias)" type="number" fullWidth variant="outlined" value={formState.prazo} onChange={handleChange} InputProps={{ inputProps: { min: 1 } }} />
        <TextField margin="dense" name="descricao" label="Descrição" type="text" fullWidth multiline rows={4} variant="outlined" value={formState.descricao} onChange={handleChange} />
        <FormControl fullWidth margin="dense">
          <InputLabel>Status</InputLabel>
          <Select name="status" value={formState.status} label="Status" onChange={handleStatusChange}>
            {/* Corrected MenuItem value to match type definition */}
            <MenuItem value="Aguardando agendamento">Aguardando Agendamento</MenuItem>
            <MenuItem value="Agendado">Agendado Vistoria</MenuItem> {/* Assuming 'Agendado Vistoria' maps to 'Agendado' */}
            <MenuItem value="Em Rota">Em Rota</MenuItem>
          </Select>
        </FormControl>
        <Box mt={2}>
          <Button variant="outlined" component="label" startIcon={<UploadFileIcon />}>
            Anexar Fotos ou PDF
            <input type="file" hidden multiple accept="image/*,.pdf" onChange={handleFileChange} />
          </Button>
          {formState.anexos.length > 0 && (
            <Box mt={1}>
              <Typography variant="subtitle2">Ficheiros selecionados:</Typography>
              <List dense>
                {formState.anexos.map((file: File) => (
                  <ListItem key={file.name} secondaryAction={<IconButton edge="end" aria-label="delete" onClick={() => handleRemoveFile(file.name)}><DeleteIcon /></IconButton>}>
                    <ListItemText primary={file.name} />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSaveClick} variant="contained">Salvar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default NovaSolicitacaoDialog;
