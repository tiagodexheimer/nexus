import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  Box,
  Chip,
} from '@mui/material';
import type { Solicitacao } from '../types';

interface DetalhesSolicitacaoDialogProps {
  open: boolean;
  onClose: () => void;
  solicitacao: Solicitacao | null;
}

const DetalhesSolicitacaoDialog: React.FC<DetalhesSolicitacaoDialogProps> = ({ open, onClose, solicitacao }) => {
  if (!solicitacao) {
    return null;
  }

  // Função para obter a cor do chip com base no status (reutilizada do Card)
  const getStatusChipProps = (status: Solicitacao['status']) => {
    switch (status) {
      case 'Sem rota':
        return { label: 'Sem Rota', sx: { backgroundColor: '#9e9e9e', color: 'white' } };
      case 'Aguardando agendamento':
        return { label: 'Aguardando Agendamento', sx: { backgroundColor: '#9c27b0', color: 'white' } };
      case 'Agendado':
        return { label: 'Agendado', sx: { backgroundColor: '#2196f3', color: 'white' } };
      case 'Em Rota': // Corrected 'Em rota' to 'Em Rota' to match type definition
        return { label: 'Em Rota', color: 'warning' as 'warning' };
      case 'Concluída':
        return { label: 'Concluída', color: 'success' as 'success' };
      default:
        return { label: status, color: 'default' as 'default' };
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Detalhes da Solicitação: {solicitacao.id}</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          {/* Added component="div" to Grid item */}
          <Grid sx={{ gridColumn: { xs: 'span 12', md: 'span 6' } }}>
            {/* Box adicionado para limitar a altura da imagem */}
            <Box sx={{ maxHeight: '350px', overflow: 'hidden', borderRadius: '4px' }}>
              <img
                src={solicitacao.mapaUrl}
                alt="Mapa da localização"
                style={{ width: '100%', height: 'auto', objectFit: 'cover', display: 'block' }}
              />
            </Box>
          </Grid>
          {/* Added component="div" to Grid item */}
          <Grid sx={{ gridColumn: { xs: 'span 12', md: 'span 6' } }}>
            <Typography variant="h6">{solicitacao.rua}</Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>{solicitacao.bairro}</Typography>
            <Box sx={{ my: 2 }}>
              <Chip {...getStatusChipProps(solicitacao.status)} />
            </Box>
            <Typography variant="body1"><strong>Prazo:</strong> {solicitacao.prazo} dias</Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              <strong>Descrição:</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary">{solicitacao.descricao}</Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Fechar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DetalhesSolicitacaoDialog;
