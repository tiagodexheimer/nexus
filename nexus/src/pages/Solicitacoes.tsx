import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Menu,
  MenuItem,
  Paper,
  Stack, // Importando o componente Stack
} from '@mui/material';
import {
  Add as AddIcon,
  FileUpload as FileUploadIcon,
} from '@mui/icons-material';
import SolicitacaoCard from '../components/SolicitacaoCard';
import type { Solicitacao } from '../types';
import NovaSolicitacaoDialog from '../components/NovaSolicitacaoDialog';

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
    anexos: [],
  },
  {
    id: 'SOL-002',
    prazo: 2,
    rua: 'Av. Brasil, 1250',
    bairro: 'Centro',
    descricao: 'Poste com fiação exposta, risco de acidente iminente para os pedestres que passam pelo local.',
    status: 'Agendado Vistoria',
    mapaUrl: 'https://placehold.co/200x150/e8e8e8/a8a8a8?text=Mapa',
    anexos: [],
  },
  {
    id: 'SOL-003',
    prazo: 10,
    rua: 'Rua das Acácias, 45',
    bairro: 'Ideal',
    descricao: 'Buraco na via pública causando transtornos e perigo para os motoristas. Necessita reparo urgente.',
    status: 'Em Rota',
    mapaUrl: 'https://placehold.co/200x150/e8e8e8/a8a8a8?text=Mapa',
    anexos: [],
  },
];


const Solicitacoes: React.FC = () => {
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>(mockSolicitacoes);
  const [filtro, setFiltro] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

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
    setSolicitacoes(prevSolicitacoes => prevSolicitacoes.filter(s => s.id !== id));
  };

  const handleAdicionarSolicitacao = (novaSolicitacaoData: Omit<Solicitacao, 'id' | 'mapaUrl'>) => {
    const novaSolicitacao: Solicitacao = {
      ...novaSolicitacaoData,
      id: `SOL-${String(solicitacoes.length + 1).padStart(3, '0')}`,
      mapaUrl: 'https://placehold.co/200x150/e8e8e8/a8a8a8?text=Mapa',
    };
    setSolicitacoes(prevSolicitacoes => [novaSolicitacao, ...prevSolicitacoes]);
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
      <Paper sx={{ p: 2, mb: 3, display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setDialogOpen(true)}>
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

      {/* Lista de Cards de Solicitação usando Stack */}
      <Stack spacing={2}>
        {solicitacoesFiltradas.map((solicitacao) => (
          <SolicitacaoCard 
            key={solicitacao.id}
            solicitacao={solicitacao} 
            onRemove={handleRemoveSolicitacao}
          />
        ))}
      </Stack>

      <NovaSolicitacaoDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleAdicionarSolicitacao}
      />
    </Box>
  );
};

export default Solicitacoes;
