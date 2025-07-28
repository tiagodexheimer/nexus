import React from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Typography,
  Checkbox,
  CardActionArea,
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
  
  const getStatusChipProps = (status: Solicitacao['status']) => {
    switch (status) {
      case 'Sem rota':
        return { label: 'Sem Rota', sx: { backgroundColor: '#9e9e9e', color: 'white' } }; // Cinza
      case 'Aguardando agendamento':
        return { label: 'Aguardando Agendamento', sx: { backgroundColor: '#9c27b0', color: 'white' } }; // Roxo
      case 'Agendado':
        return { label: 'Agendado', sx: { backgroundColor: '#2196f3', color: 'white' } }; // Azul
      case 'Em rota':
        return { label: 'Em Rota', color: 'warning' as 'warning' }; // Amarelo
      case 'Concluído':
        return { label: 'Concluído', color: 'success' as 'success' }; // Verde
      default:
        return { label: status, color: 'default' as 'default' };
    }
  };

  // Previne que o clique nos botões acione o clique do card
  const handleButtonClick = (e: React.MouseEvent<HTMLElement>, action: () => void) => {
    e.stopPropagation();
    action();
  };

  return (
    <Card sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mb: 2, alignItems: 'stretch' }}>
       <Box sx={{ 
         p: 1, 
         display: 'flex', 
         flexDirection: { xs: 'row', sm: 'column' }, 
         alignItems: 'center', 
         justifyContent: 'center', 
         gap: 1, 
         borderRight: { sm: '1px solid rgba(0, 0, 0, 0.12)' },
         borderBottom: { xs: '1px solid rgba(0, 0, 0, 0.12)', sm: 'none' },
         width: { xs: '100%', sm: 'auto' }
       }}>
        <Checkbox
            checked={isSelected}
            onChange={() => onSelect(solicitacao.id)}
            onClick={(e) => e.stopPropagation()}
            inputProps={{ 'aria-label': 'Selecionar solicitação' }}
        />
        <Button variant="outlined" size="small" startIcon={<EditIcon />} onClick={(e) => handleButtonClick(e, () => onEditar(solicitacao))}>
          Editar
        </Button>
        <Button variant="outlined" size="small" color="error" startIcon={<DeleteIcon />} onClick={(e) => handleButtonClick(e, () => onRemove(solicitacao.id))}>
          Remover
        </Button>
      </Box>
      <CardActionArea onClick={() => onVerDetalhes(solicitacao)} sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, flex: 1, alignItems: 'center', p: 1 }}>
        <img src={solicitacao.mapaUrl} alt="Mapa da localização" style={{ width: '100%', maxWidth: '150px', height: '120px', objectFit: 'cover', borderRadius: 4, alignSelf: 'center' }} />
        <CardContent sx={{ flex: 1, width: '100%' }}>
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
        <CardActions sx={{ p: 2, alignSelf: { xs: 'flex-end', sm: 'center' } }}>
          <Chip {...getStatusChipProps(solicitacao.status)} />
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

export default SolicitacaoCard;
