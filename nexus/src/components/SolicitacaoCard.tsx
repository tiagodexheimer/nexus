import React from 'react';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Checkbox,
  Chip,
  Typography,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Attachment as AttachmentIcon } from '@mui/icons-material';
import type { Solicitacao } from '../types';

interface SolicitacaoCardProps {
  solicitacao: Solicitacao;
  onRemove: (id: string) => void;
  onEditar: (solicitacao: Solicitacao) => void;
  onVerDetalhes: (solicitacao: Solicitacao) => void;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const SolicitacaoCard: React.FC<SolicitacaoCardProps> = ({ solicitacao, onRemove, onEditar, onVerDetalhes, isSelected, onSelect }) => {
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
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 1 }}>
        <Checkbox
          checked={isSelected}
          onChange={() => onSelect(solicitacao.id)}
          onClick={(e) => e.stopPropagation()}
        />
        <Button variant="outlined" size="small" startIcon={<EditIcon />} onClick={() => onEditar(solicitacao)}>
          Editar
        </Button>
        <Button variant="outlined" size="small" color="error" startIcon={<DeleteIcon />} onClick={() => onRemove(solicitacao.id)}>
          Remover
        </Button>
      </Box>
      <CardActionArea onClick={() => onVerDetalhes(solicitacao)} sx={{ display: 'flex', flexGrow: 1, alignItems: 'center' }}>
        <img src={solicitacao.mapaUrl} alt="Mapa da localização" style={{ width: 150, height: 120, objectFit: 'cover', borderRadius: 4, marginLeft: '10px' }} />
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
      </CardActionArea>
    </Card>
  );
};

export default SolicitacaoCard;