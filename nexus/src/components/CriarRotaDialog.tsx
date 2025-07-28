import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  type SelectChangeEvent,
} from '@mui/material';

// Interface para as propriedades do diálogo
interface CriarRotaDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (rotaData: { nome: string; agente: string; status: string }) => void;
  solicitacoesCount: number;
}

const CriarRotaDialog: React.FC<CriarRotaDialogProps> = ({ open, onClose, onSave, solicitacoesCount }) => {
  const [nome, setNome] = useState('');
  const [agente, setAgente] = useState('');
  const [status, setStatus] = useState('Planejada');

  const handleSave = () => {
    // Validação simples para garantir que os campos foram preenchidos
    if (!nome || !agente) {
      alert('Por favor, preencha o nome da rota e o agente.');
      return;
    }
    onSave({ nome, agente, status });
    // Limpa o formulário e fecha o diálogo
    setNome('');
    setAgente('');
    setStatus('Planejada');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Criar Nova Rota</DialogTitle>
      <DialogContent>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Você está criando uma rota com {solicitacoesCount} solicitação(ões).
        </Typography>
        <TextField
          autoFocus
          margin="dense"
          label="Nome da Rota"
          type="text"
          fullWidth
          variant="outlined"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Agente Responsável"
          type="text"
          fullWidth
          variant="outlined"
          value={agente}
          onChange={(e) => setAgente(e.target.value)}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel>Status</InputLabel>
          <Select
            value={status}
            label="Status"
            onChange={(e: SelectChangeEvent<string>) => setStatus(e.target.value)}
          >
            <MenuItem value="Planejada">Planejada</MenuItem>
            <MenuItem value="Em andamento">Em andamento</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSave} variant="contained">Salvar Rota</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CriarRotaDialog;
