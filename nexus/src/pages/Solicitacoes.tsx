import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip,
  Menu,
  MenuItem,
  IconButton,
  Paper,
} from '@mui/material';
import {
  Add as AddIcon,
  FileUpload as FileUploadIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';

// Interface para definir a estrutura de uma solicitação
interface Solicitacao {
  id: string;
  prazo: number;
  rua: string;
  bairro: string;
  descricao: string;
  status: 'Aguardando Agendamento' | 'Agendado Vistoria' | 'Em Rota';
  mapaUrl: string;
}

// Dados de exemplo para as solicitações
const mockSolicitacoes: Solicitacao[] = [
  {
    id: 'SOL-001',
    prazo: 5,
    rua: 'Rua Salgado Filho, 300',
    bairro: 'Campina',
    descricao: 'Árvore obstruindo o passeio público e a via de veículos na esquina com a pedro adams, não é possível ver...',
    status: 'Aguardando Agendamento',
    mapaUrl: 'https://placehold.co/200x150/e8e8e8/a8a8a8?text=Mapa',
  },
  {
    id: 'SOL-002',
    prazo: 2,
    rua: 'Av. Brasil, 1250',
    bairro: 'Centro',
    descricao: 'Poste com fiação exposta, risco de acidente iminente para os pedestres que passam pelo local.',
    status: 'Agendado Vistoria',
    mapaUrl: 'https://placehold.co/200x150/e8e8e8/a8a8a8?text=Mapa',
  },
  {
    id: 'SOL-003',
    prazo: 10,
    rua: 'Rua das Acácias, 45',
    bairro: 'Ideal',
    descricao: 'Buraco na via pública causando transtornos e perigo para os motoristas. Necessita reparo urgente.',
    status: 'Em Rota',
    mapaUrl: 'https://placehold.co/200x150/e8e8e8/a8a8a8?text=Mapa',
  },
];

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
        <Button variant="outlined" size="small" color="error" startIcon={<DeleteIcon />} onClick={() => onRemove(solicitacao.id)}>
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
        <Chip label={solicitacao.status} color={getStatusColor(solicitacao.status)} />
      </CardActions>
    </Card>
  );
};

const Solicitacoes: React.FC = () => {
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>(mockSolicitacoes);
  const [filtro, setFiltro] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleFiltroChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiltro(event.target.value);
  };

  const handleRemoveSolicitacao = (id: string) => {
    // A função setSolicitacoes agora é usada para atualizar o estado,
    // removendo a solicitação com o ID correspondente.
    setSolicitacoes(prevSolicitacoes => prevSolicitacoes.filter(s => s.id !== id));
  };

  const solicitacoesFiltradas = solicitacoes.filter(
    (s) =>
      s.rua.toLowerCase().includes(filtro.toLowerCase()) ||
      s.bairro.toLowerCase().includes(filtro.toLowerCase()) ||
      s.descricao.toLowerCase().includes(filtro.toLowerCase()) ||
      s.prazo.toString().includes(filtro.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      {/* Barra de Ações e Filtros */}
      <Paper sx={{ p: 2, mb: 3, display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
        <Button variant="contained" startIcon={<AddIcon />}>
          Adicionar
        </Button>
        <Button variant="outlined" startIcon={<FileUploadIcon />}>
          Adicionar em lote (XLS)
        </Button>
        <TextField
          label="Procurar por rua, bairro, prazo, descrição..."
          variant="outlined"
          size="small"
          value={filtro}
          onChange={handleFiltroChange}
          sx={{ flexGrow: 1, minWidth: '300px' }}
        />
        <Button variant="contained" onClick={handleMenuClick}>
          Status
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Aguardando Agendamento</MenuItem>
          <MenuItem onClick={handleMenuClose}>Agendado Vistoria</MenuItem>
          <MenuItem onClick={handleMenuClose}>Em Rota</MenuItem>
          <MenuItem onClick={handleMenuClose}>Todos</MenuItem>
        </Menu>
      </Paper>

      {/* Grid de Cards de Solicitação */}
      <Grid container spacing={2}>
        {solicitacoesFiltradas.map((solicitacao) => (
          <Grid item xs={12} key={solicitacao.id}>
            <SolicitacaoCard 
              solicitacao={solicitacao} 
              onRemove={handleRemoveSolicitacao}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Solicitacoes;
