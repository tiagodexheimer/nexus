// src/components/SolicitacaoCard.tsx
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
  Stack,
  Typography,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Attachment as AttachmentIcon } from '@mui/icons-material';
import type { Solicitacao } from '../types';

interface SolicitacaoCardProps {
  solicitacao: Solicitacao;
  onRemove: (id: string) => void;
  onEditar: () => void;
  onVerDetalhes: (solicitacao: Solicitacao) => void;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const SolicitacaoCard: React.FC<SolicitacaoCardProps> = ({ solicitacao, onRemove, onEditar, onVerDetalhes, isSelected, onSelect }) => {
  const getStatusColor = (status: Solicitacao['status']) => {
    switch (status) {
      case 'Aguardando agendamento': return 'warning';
      case 'Agendado': return 'info';
      case 'Em Rota': return 'success';
      default: return 'default';
    }
  };

  const handleActionClick = (event: React.MouseEvent, action: () => void) => {
    event.stopPropagation(); // Impede que o clique no botão acione o clique no card
    action();
  };

  return (
    <Card sx={{ display: 'flex', mb: 2, alignItems: 'stretch' }}>
      {/* Coluna de Ações à Esquerda */}
      <Stack
        sx={{
          p: 1.5,
          justifyContent: 'center',
          alignItems: 'center',
          borderRight: '1px solid',
          borderColor: 'divider',
        }}
        spacing={1}
      >
        <Checkbox
          checked={isSelected}
          onClick={(e) => handleActionClick(e, () => onSelect(solicitacao.id))}
          title="Selecionar para criar rota"
        />
        <Button
          variant="contained"
          color="success" // Cor verde
          size="small"
          startIcon={<EditIcon />}
          onClick={(e) => handleActionClick(e, onEditar)}
        >
          EDITAR
        </Button>
        <Button
          variant="contained"
          color="error" // Cor vermelha
          size="small"
          startIcon={<DeleteIcon />}
          onClick={(e) => handleActionClick(e, () => onRemove(solicitacao.id))}
        >
          REMOVER
        </Button>
      </Stack>

      {/* Área Clicável com o Conteúdo */}
      <CardActionArea
        onClick={() => onVerDetalhes(solicitacao)}
        sx={{ display: 'flex', flexGrow: 1, justifyContent: 'flex-start', p: 1, gap: 2 }}
      >
        <img
          src={solicitacao.mapaUrl}
          alt="Mapa da localização"
          style={{ width: 150, height: 120, objectFit: 'cover', borderRadius: 4, flexShrink: 0 }}
        />
        <CardContent sx={{ flex: 1, py: 0, px: 1, textAlign: 'left' }}>
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
          <Typography
            variant="body2"
            sx={{
              mt: 1,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {solicitacao.descricao}
          </Typography>
        </CardContent>
        <CardActions sx={{ p: 2, alignSelf: 'center' }}>
          <Chip label={solicitacao.status} color={getStatusColor(solicitacao.status)} />
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

export default SolicitacaoCard;