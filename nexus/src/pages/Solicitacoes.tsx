import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Pagination,
  Typography,
  FormControl,
  InputLabel,
  Select,
  type SelectChangeEvent,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Chip,
} from '@mui/material';
import {
  Add as AddIcon,
  FileUpload as FileUploadIcon,
  Route as RouteIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
// Os imports abaixo são baseados no seu código. Assumimos que eles existem no seu projeto.
import SolicitacaoCard from '../components/SolicitacaoCard';
import type { Solicitacao } from '../types';
import NovaSolicitacaoDialog from '../components/NovaSolicitacaoDialog';
import MapaImage from '../assets/mapa-exemplo.jpg'; // Importando a imagem


// Dados de exemplo expandidos para 20 solicitações
const mockSolicitacoes: Solicitacao[] = [
    { id: 'SOL-001', prazo: 5, rua: 'Rua Salgado Filho, 300', bairro: 'Campina', descricao: 'Árvore obstruindo o passeio público e a via de veículos na esquina com a pedro adams, não é possível ver quem passa e nem quem olha para o céu azul deste meu brasil varonil!', status: 'Aguardando Agendamento', mapaUrl: MapaImage, anexos: [] },
    { id: 'SOL-002', prazo: 2, rua: 'Av. Brasil, 1250', bairro: 'Centro', descricao: 'Poste com fiação exposta, risco de acidente iminente para os pedestres que passam pelo local. A situação piora em dias de chuva, com faíscas sendo visíveis.', status: 'Agendado Vistoria', mapaUrl: MapaImage, anexos: [] },
    { id: 'SOL-003', prazo: 10, rua: 'Rua das Acácias, 45', bairro: 'Ideal', descricao: 'Buraco na via pública causando transtornos e perigo para os motoristas. Necessita reparo urgente. O buraco tem aproximadamente 50cm de diâmetro.', status: 'Em Rota', mapaUrl: MapaImage, anexos: [] },
    { id: 'SOL-004', prazo: 3, rua: 'Av. Theodomiro Porto da Fonseca, 123', bairro: 'Fião', descricao: 'Vazamento de esgoto a céu aberto, mau cheiro forte na vizinhança.', status: 'Concluído', mapaUrl: MapaImage, anexos: [] },
    { id: 'SOL-005', prazo: 7, rua: 'Rua Independência, 800', bairro: 'Centro', descricao: 'Lixo acumulado em terreno baldio, atraindo animais e insetos.', status: 'Aguardando Agendamento', mapaUrl: MapaImage, anexos: [] },
    { id: 'SOL-006', prazo: 1, rua: 'Rua São João, 550', bairro: 'Rio Branco', descricao: 'Fio de alta tensão rompido e caído na calçada. Perigo extremo.', status: 'Em Rota', mapaUrl: MapaImage, anexos: [] },
    { id: 'SOL-007', prazo: 15, rua: 'Av. Feitoria, 2100', bairro: 'Feitoria', descricao: 'Construção irregular em área de preservação ambiental.', status: 'Agendado Vistoria', mapaUrl: MapaImage, anexos: [] },
    { id: 'SOL-008', prazo: 4, rua: 'Rua Presidente Roosevelt, 999', bairro: 'Morro do Espelho', descricao: 'Descarte irregular de entulho em via pública.', status: 'Concluído', mapaUrl: MapaImage, anexos: [] },
    { id: 'SOL-009', prazo: 6, rua: 'Rua Bento Gonçalves, 1500', bairro: 'São José', descricao: 'Tampa de bueiro quebrada, oferecendo risco a pedestres e veículos.', status: 'Aguardando Agendamento', mapaUrl: MapaImage, anexos: [] },
    { id: 'SOL-010', prazo: 8, rua: 'Rua Lindolfo Collor, 400', bairro: 'Centro', descricao: 'Semáforo de pedestres com defeito, não fecha para os carros.', status: 'Agendado Vistoria', mapaUrl: MapaImage, anexos: [] },
    { id: 'SOL-011', prazo: 12, rua: 'Av. Unisinos, 950', bairro: 'Cristo Rei', descricao: 'Poda de árvore necessária, galhos atingindo a rede elétrica.', status: 'Em Rota', mapaUrl: MapaImage, anexos: [] },
    { id: 'SOL-012', prazo: 5, rua: 'Rua da Figueira, 123', bairro: 'Scharlau', descricao: 'Iluminação pública deficiente, rua muito escura à noite.', status: 'Aguardando Agendamento', mapaUrl: MapaImage, anexos: [] },
    { id: 'SOL-013', prazo: 3, rua: 'Rua Leopoldo Wasun, 78', bairro: 'Santos Dumont', descricao: 'Calçada danificada por raízes de árvore.', status: 'Concluído', mapaUrl: MapaImage, anexos: [] },
    { id: 'SOL-014', prazo: 9, rua: 'Estrada do Horto, 300', bairro: 'Arroio da Manteiga', descricao: 'Animal de grande porte (cavalo) solto na via.', status: 'Agendado Vistoria', mapaUrl: MapaImage, anexos: [] },
    { id: 'SOL-015', prazo: 2, rua: 'Rua Padre Anchieta, 205', bairro: 'Vicentina', descricao: 'Obstrução de boca de lobo causando alagamento na rua.', status: 'Em Rota', mapaUrl: MapaImage, anexos: [] },
    { id: 'SOL-016', prazo: 7, rua: 'Rua Dom João Becker, 754', bairro: 'Centro', descricao: 'Pichação em monumento histórico na praça central.', status: 'Aguardando Agendamento', mapaUrl: MapaImage, anexos: [] },
    { id: 'SOL-017', prazo: 14, rua: 'Rua Caxias do Sul, 110', bairro: 'Rio dos Sinos', descricao: 'Terreno necessitando de capina e limpeza geral.', status: 'Agendado Vistoria', mapaUrl: MapaImage, anexos: [] },
    { id: 'SOL-018', prazo: 1, rua: 'Av. Imperatriz Leopoldina, 85', bairro: 'Pinheiro', descricao: 'Veículo abandonado na rua há mais de um mês.', status: 'Concluído', mapaUrl: MapaImage, anexos: [] },
    { id: 'SOL-019', prazo: 8, rua: 'Rua Osvino Scherer, 43', bairro: 'Fazenda São Borja', descricao: 'Ninho de vespas em árvore de praça pública.', status: 'Em Rota', mapaUrl: MapaImage, anexos: [] },
    { id: 'SOL-020', prazo: 6, rua: 'Rua Tomaz Edison, 221', bairro: 'Duque de Caxias', descricao: 'Sinalização de trânsito apagada em cruzamento perigoso.', status: 'Aguardando Agendamento', mapaUrl: MapaImage, anexos: [] },
];

const getStatusChipColor = (status: Solicitacao['status']) => {
    switch (status) {
      case 'Aguardando Agendamento': return 'warning';
      case 'Agendado Vistoria': return 'info';
      case 'Em Rota': return 'secondary';
      case 'Concluído': return 'success';
      default: return 'default';
    }
};

// Componente para o Dialog de Criação de Rota
const CriarRotaDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  onSave: (nome: string, status: string) => void;
  count: number;
}> = ({ open, onClose, onSave, count }) => {
  const [nomeRota, setNomeRota] = useState('');
  const [statusRota, setStatusRota] = useState('Planejada');

  const handleSave = () => {
    if (nomeRota.trim()) {
      onSave(nomeRota, statusRota);
      onClose();
    }
  };

  React.useEffect(() => {
    if (!open) {
      setNomeRota('');
      setStatusRota('Planejada');
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Criar Nova Rota</DialogTitle>
      <DialogContent>
        <Typography gutterBottom>
          Você selecionou {count} solicitação(ões).
        </Typography>
        <TextField autoFocus margin="dense" label="Nome da Rota" type="text" fullWidth variant="outlined" value={nomeRota} onChange={(e) => setNomeRota(e.target.value)} />
        <FormControl fullWidth margin="dense">
          <InputLabel>Status da Rota</InputLabel>
          <Select value={statusRota} label="Status da Rota" onChange={(e) => setStatusRota(e.target.value)}>
            <MenuItem value="Planejada">Planejada</MenuItem>
            <MenuItem value="Em andamento">Em andamento</MenuItem>
            <MenuItem value="Concluída">Concluída</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSave} variant="contained" disabled={!nomeRota.trim()}>Criar</Button>
      </DialogActions>
    </Dialog>
  );
};

// Componente para o Dialog de Detalhes da Solicitação
const DetalheSolicitacaoDialog: React.FC<{
  solicitacao: Solicitacao | null;
  open: boolean;
  onClose: () => void;
}> = ({ solicitacao, open, onClose }) => {
  if (!solicitacao) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ m: 0, p: 2 }}>
        <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 2 }}>
            <img src={solicitacao.mapaUrl} alt={`Mapa para ${solicitacao.rua}`} style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: '8px' }} />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">
                Solicitação {solicitacao.id} <Typography component="span" color="text.secondary">• Prazo {solicitacao.prazo} dias</Typography>
            </Typography>
            <Chip label={solicitacao.status} color={getStatusChipColor(solicitacao.status)} />
        </Box>
        <Typography variant="h5" sx={{ my: 1 }}>{solicitacao.rua}, {solicitacao.bairro}</Typography>
        <Typography variant="body1" color="text.secondary">
            <strong>Descrição:</strong> {solicitacao.descricao}
        </Typography>
      </DialogContent>
    </Dialog>
  );
};


const Solicitacoes: React.FC = () => {
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>(mockSolicitacoes);
  const [solicitacoesSelecionadas, setSolicitacoesSelecionadas] = useState<string[]>([]);
  const [solicitacaoEmDetalhe, setSolicitacaoEmDetalhe] = useState<Solicitacao | null>(null);
  const [filtro, setFiltro] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [rotaDialogOpen, setRotaDialogOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleFiltroChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiltro(event.target.value);
    setPage(1);
  };

  const handleRemoveSolicitacao = (id: string) => {
    setSolicitacoes(prev => prev.filter(s => s.id !== id));
    setSolicitacoesSelecionadas(prev => prev.filter(selId => selId !== id));
  };

  const handleAdicionarSolicitacao = (novaSolicitacaoData: Omit<Solicitacao, 'id' | 'mapaUrl' | 'anexos'>) => {
    const novaSolicitacao: Solicitacao = {
      ...novaSolicitacaoData,
      id: `SOL-${String(solicitacoes.length + 1).padStart(3, '0')}`,
      mapaUrl: MapaImage,
      anexos: [],
    };
    setSolicitacoes(prev => [novaSolicitacao, ...prev]);
  };

  const handleToggleSelecao = (id: string) => {
    setSolicitacoesSelecionadas(prev =>
      prev.includes(id)
        ? prev.filter(solId => solId !== id)
        : [...prev, id]
    );
  };

  const handleCriarRota = (nome: string, status: string) => {
    console.log('Criando rota:', {
      nome,
      status,
      solicitacoes: solicitacoesSelecionadas,
    });
    setSolicitacoesSelecionadas([]);
  };

  const handleCardClick = (solicitacao: Solicitacao) => {
    setSolicitacaoEmDetalhe(solicitacao);
  };

  const solicitacoesFiltradas = solicitacoes.filter(
    (s) =>
      s.rua.toLowerCase().includes(filtro.toLowerCase()) ||
      s.bairro.toLowerCase().includes(filtro.toLowerCase()) ||
      s.descricao.toLowerCase().includes(filtro.toLowerCase()) ||
      s.prazo.toString().includes(filtro.toLowerCase())
  );

  const pageCount = Math.ceil(solicitacoesFiltradas.length / itemsPerPage);
  const solicitacoesDaPagina = solicitacoesFiltradas.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleItemsPerPageChange = (event: SelectChangeEvent<number>) => {
    setItemsPerPage(event.target.value as number);
    setPage(1);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 2, mb: 3, display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<RouteIcon />} 
          onClick={() => setRotaDialogOpen(true)}
          disabled={solicitacoesSelecionadas.length === 0}
        >
          Criar Rota
        </Button>
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
          <MenuItem onClick={handleMenuClose}>Concluído</MenuItem>
          <MenuItem onClick={handleMenuClose}>Todos</MenuItem>
        </Menu>
      </Paper>

      <Stack spacing={2}>
        {solicitacoesDaPagina.map((solicitacao) => (
          <Box key={solicitacao.id} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Checkbox
              checked={solicitacoesSelecionadas.includes(solicitacao.id)}
              onChange={() => handleToggleSelecao(solicitacao.id)}
              onClick={(e) => e.stopPropagation()} // Impede que o clique no checkbox abra o dialog
            />
            <Box sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => handleCardClick(solicitacao)}>
              <SolicitacaoCard
                solicitacao={solicitacao}
                onRemove={(id) => {
                  // Impede que o clique no botão de remover abra o dialog
                  event?.stopPropagation();
                  handleRemoveSolicitacao(id);
                }}
              />
            </Box>
          </Box>
        ))}
      </Stack>
      
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 4, gap: 2, flexWrap: 'wrap' }}>
        <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Itens por página</InputLabel>
            <Select
                value={itemsPerPage}
                label="Itens por página"
                onChange={handleItemsPerPageChange}
            >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={15}>15</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
            </Select>
        </FormControl>
        <Pagination
          count={pageCount}
          page={page}
          onChange={handlePageChange}
          color="primary"
          showFirstButton
          showLastButton
        />
      </Box>

      <NovaSolicitacaoDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleAdicionarSolicitacao}
      />
      <CriarRotaDialog
        open={rotaDialogOpen}
        onClose={() => setRotaDialogOpen(false)}
        onSave={handleCriarRota}
        count={solicitacoesSelecionadas.length}
      />
      <DetalheSolicitacaoDialog
        open={!!solicitacaoEmDetalhe}
        onClose={() => setSolicitacaoEmDetalhe(null)}
        solicitacao={solicitacaoEmDetalhe}
      />
    </Box>
  );
};

export default Solicitacoes;
