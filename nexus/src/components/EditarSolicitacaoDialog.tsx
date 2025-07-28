import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import type { Solicitacao } from '../types';

interface EditarSolicitacaoDialogProps {
  open: boolean;
  onClose: () => void;
  solicitacao: Solicitacao | null;
  onSave: (solicitacaoEditada: Solicitacao) => void;
}

const EditarSolicitacaoDialog: React.FC<EditarSolicitacaoDialogProps> = ({ open, onClose, solicitacao, onSave }) => {
  const [formState, setFormState] = useState<Solicitacao | null>(null);

  useEffect(() => {
    // Popula o formulário quando uma solicitação é passada para o diálogo
    setFormState(solicitacao);
  }, [solicitacao]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    if (formState) {
      setFormState({
        ...formState,
        [name]: name === 'prazo' ? Number(value) : value,
      });
    }
  };

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    if (formState) {
      setFormState({
        ...formState,
        status: event.target.value as Solicitacao['status'],
      });
    }
  };

  const handleSaveClick = () => {
    if (formState) {
      onSave(formState);
      onClose();
    }
  };

  // Não renderiza nada se o estado do formulário for nulo
  if (!formState) {
    return null;
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Editar Solicitação {solicitacao?.id}</DialogTitle>
      <DialogContent>
        <TextField autoFocus margin="dense" name="rua" label="Nome da Rua e Número" type="text" fullWidth variant="outlined" value={formState.rua} onChange={handleChange} />
        <TextField margin="dense" name="bairro" label="Bairro" type="text" fullWidth variant="outlined" value={formState.bairro} onChange={handleChange} />
        <TextField margin="dense" name="prazo" label="Prazo (em dias)" type="number" fullWidth variant="outlined" value={formState.prazo} onChange={handleChange} InputProps={{ inputProps: { min: 1 } }} />
        <TextField margin="dense" name="descricao" label="Descrição" type="text" fullWidth multiline rows={4} variant="outlined" value={formState.descricao} onChange={handleChange} />
        <FormControl fullWidth margin="dense">
          <InputLabel>Status</InputLabel>
          <Select name="status" value={formState.status} label="Status" onChange={handleStatusChange}>
            <MenuItem value="Sem rota">Sem Rota</MenuItem>
            <MenuItem value="Aguardando agendamento">Aguardando Agendamento</MenuItem>
            <MenuItem value="Agendado">Agendado</MenuItem>
            <MenuItem value="Em rota">Em Rota</MenuItem>
            <MenuItem value="Concluído">Concluído</MenuItem>
          </Select>
        </FormControl>
        {/* Observação: A edição de anexos não foi implementada para simplificar */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSaveClick} variant="contained">Salvar Alterações</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditarSolicitacaoDialog;
