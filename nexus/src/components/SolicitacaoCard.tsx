import React from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Typography,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Attachment as AttachmentIcon, Visibility as VisibilityIcon } from '@mui/icons-material';
import type { Solicitacao } from '../types'; //

// Interface de props atualizada para incluir onVerDetalhes
interface SolicitacaoCardProps {
  solicitacao: Solicitacao;
  onRemove: (id: string) => void;
  onVerDetalhes: (id: string) => void;
}

const SolicitacaoCard: React.FC<SolicitacaoCardProps> = ({ solicitacao, onRemove, onVerDetalhes }) => {
  const getStatusColor = (status: Solicitacao['status']) => {
    switch (status) {
      case 'Aguardando Agendamento':
        return 'warning';
      case 'Agendado Vistoria':
        return 'info';
      case 'Em Rota':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Card sx={{ display: 'flex', mb: 2, alignItems: 'center' }}>
      <Box sx={{ p: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
        {/* Botão "Ver Detalhes" adicionado */}
        <Button variant="outlined" size="small" startIcon={<VisibilityIcon />} onClick={() => onVerDetalhes(solicitacao.id)}>
          Detalhes
        </Button>
        <Button variant="outlined" size="small" startIcon={<EditIcon />}>
          Editar
        </Button>
        <Button variant="outlined" size="small" color="error" startIcon={<DeleteIcon />} onClick={() => onRemove(solicitacao.id)}>
          Remover
        </Button>
      </Box>
      <img src={solicitacao.mapaUrl} alt="Mapa da localização" style={{ width: 150, height: 120, objectFit: 'cover', borderRadius: 4 }} />
      <CardContent sx={{ flex: 1 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" color="text.secondary">
            Solicitação {solicitacao.id} • Prazo {solicitacao.prazo} dias
          </Typography>
          {solicitacao.anexos && solicitacao.anexos.length > 0 && (
            <Chip
              icon={<AttachmentIcon />}
              label={solicitacao.anexos.length}
              size="small"
              variant="outlined"
            />
          )}
        </Box>
        <Typography variant="h6" component="div">
          {solicitacao.rua}, {solicitacao.bairro}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          {solicitacao.descricao}
        </Typography>
      </CardContent>
      <CardActions sx={{ p: 2 }}>
        <Chip label={solicitacao.status} color={getStatusColor(solicitacao.status)} />
      </CardActions>
    </Card>
  );
};

export default SolicitacaoCard;