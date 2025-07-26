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
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

// Interface para definir a estrutura de uma solicitação
// Exportada para que possa ser usada em outros arquivos, como na página de Solicitações
export interface Solicitacao {
  id: string;
  prazo: number;
  rua: string;
  bairro: string;
  descricao: string;
  status: 'Aguardando Agendamento' | 'Agendado Vistoria' | 'Em Rota';
  mapaUrl: string;
}

// Interface para as props do SolicitacaoCard
interface SolicitacaoCardProps {
  solicitacao: Solicitacao;
  onRemove: (id: string) => void;
}

// Componente para o Card de Solicitação
const SolicitacaoCard: React.FC<SolicitacaoCardProps> = ({ solicitacao, onRemove }) => {
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
        <Button variant="outlined" size="small" startIcon={<EditIcon />}>
          Editar
        </Button>
        <Button
          variant="outlined"
          size="small"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={() => onRemove(solicitacao.id)}
        >
          Remover
        </Button>
      </Box>
      <img
        src={solicitacao.mapaUrl}
        alt="Mapa da localização"
        style={{ width: 150, height: 120, objectFit: 'cover', borderRadius: 4 }}
      />
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="body2" color="text.secondary">
          Solicitação {solicitacao.id} • Prazo {solicitacao.prazo} dias
        </Typography>
        <Typography variant="h6" component="div">
          {solicitacao.rua}, {solicitacao.bairro}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          {solicitacao.descricao}
        </Typography>
      </CardContent>
      <CardActions sx={{ p: 2 }}>
        <Chip
          label={solicitacao.status}
          color={getStatusColor(solicitacao.status)}
        />
      </CardActions>
    </Card>
  );
};

export default SolicitacaoCard;
