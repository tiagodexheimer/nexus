import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Card,
  CardContent,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from '@mui/material';
import { Place as PlaceIcon, Edit as EditIcon, Delete as DeleteIcon, Close as CloseIcon } from '@mui/icons-material';
import MapaRotaExemplo from '../assets/mapa-rota-exemplo.png'; // Assumindo que a imagem está na pasta assets

// --- Tipos e Dados Mockados ---

interface SolicitacaoResumo {
  id: string;
  endereco: string;
  prazo: number;
}

interface Rota {
  id: string;
  nome: string;
  dataCriacao: string;
  agente: string;
  status: 'Planejada' | 'Em andamento' | 'Concluída';
  solicitacoes: SolicitacaoResumo[];
  mapaUrl: string;
}

const mockRotas: Rota[] = [
  {
    id: 'ROTA-01',
    nome: 'Vistorias Centro - Manhã',
    dataCriacao: '2025-07-28',
    agente: 'Carlos Silva',
    status: 'Planejada',
    solicitacoes: [
      { id: 'SOL-002', endereco: 'Av. Brasil, 1250', prazo: 2 },
      { id: 'SOL-005', endereco: 'Rua Independência, 800', prazo: 7 },
      { id: 'SOL-010', endereco: 'Rua Lindolfo Collor, 400', prazo: 8 },
      { id: 'SOL-016', endereco: 'Rua Dom João Becker, 754', prazo: 7 },
    ],
    mapaUrl: MapaRotaExemplo,
  },
  {
    id: 'ROTA-02',
    nome: 'Reparos Urgentes - Tarde',
    dataCriacao: '2025-07-28',
    agente: 'Ana Pereira',
    status: 'Em andamento',
    solicitacoes: [
      { id: 'SOL-003', endereco: 'Rua das Acácias, 45', prazo: 10 },
      { id: 'SOL-006', endereco: 'Rua São João, 550', prazo: 1 },
      { id: 'SOL-015', endereco: 'Rua Padre Anchieta, 205', prazo: 2 },
    ],
    mapaUrl: MapaRotaExemplo,
  },
  {
    id: 'ROTA-03',
    nome: 'Vistorias Bairro Ideal',
    dataCriacao: '2025-07-27',
    agente: 'Carlos Silva',
    status: 'Concluída',
    solicitacoes: [
      { id: 'SOL-001', endereco: 'Rua Salgado Filho, 300', prazo: 5 },
      { id: 'SOL-009', endereco: 'Rua Bento Gonçalves, 1500', prazo: 6 },
    ],
    mapaUrl: MapaRotaExemplo,
  },
];

const getStatusChipColor = (status: Rota['status']) => {
    switch (status) {
      case 'Planejada': return 'info';
      case 'Em andamento': return 'warning';
      case 'Concluída': return 'success';
      default: return 'default';
    }
};

// --- Componente do Card de Rota ---

const RotaCard: React.FC<{ rota: Rota, onClick: () => void }> = ({ rota, onClick }) => {
    const menorPrazo = rota.solicitacoes.length > 0
        ? Math.min(...rota.solicitacoes.map(s => s.prazo))
        : null;

    return (
        <Card elevation={3} sx={{ display: 'flex' }}>
            <Stack
                spacing={1}
                sx={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 1.5,
                    backgroundColor: 'rgba(0, 0, 0, 0.03)',
                    borderRight: (theme) => `1px solid ${theme.palette.divider}`
                }}
            >
                <Button
                    size="small"
                    variant="contained"
                    color="success"
                    sx={{ minWidth: '100px' }}
                    startIcon={<EditIcon />}
                    onClick={(e) => e.stopPropagation()}
                >
                    Editar
                </Button>
                <Button
                    size="small"
                    variant="contained"
                    color="error"
                    sx={{ minWidth: '100px' }}
                    startIcon={<DeleteIcon />}
                    onClick={(e) => e.stopPropagation()}
                >
                    Remover
                </Button>
            </Stack>
            <Box sx={{ display: 'flex', flexGrow: 1, cursor: 'pointer', p: 2, gap: 2 }} onClick={onClick}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <img
                        src={rota.mapaUrl}
                        alt={`Mapa da Rota ${rota.nome}`}
                        style={{
                            width: '200px',
                            height: '150px',
                            objectFit: 'cover',
                            borderRadius: '8px'
                        }}
                    />
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                    <CardContent sx={{ p: '0 !important' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                            <Box>
                                <Typography variant="h6" component="div">
                                    {rota.nome}
                                </Typography>
                                <Typography color="text.secondary">
                                    Criada em: {new Date(rota.dataCriacao).toLocaleDateString()} • Agente: {rota.agente}
                                </Typography>
                            </Box>
                            <Stack direction="column" spacing={1} alignItems="flex-end">
                                <Chip label={rota.status} color={getStatusChipColor(rota.status)} />
                                {menorPrazo !== null && (
                                    <Box sx={{
                                        backgroundColor: (theme) => theme.palette.success.main,
                                        color: (theme) => theme.palette.success.contrastText,
                                        px: 1.5,
                                        py: 0.5,
                                        borderRadius: 1,
                                        textAlign: 'center'
                                    }}>
                                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                            Prazo expira em: {menorPrazo} dia(s)
                                        </Typography>
                                    </Box>
                                )}
                            </Stack>
                        </Box>
                        <Divider sx={{ my: 1 }} />
                        <Typography sx={{ mb: 1 }}>Resumo de Endereços ({rota.solicitacoes.length}):</Typography>
                        <List dense sx={{ maxHeight: 100, overflow: 'auto', p: 0 }}>
                            {rota.solicitacoes.map((sol) => (
                            <ListItem key={sol.id} disablePadding>
                                <ListItemIcon sx={{ minWidth: 32 }}>
                                <PlaceIcon fontSize="small" color="primary" />
                                </ListItemIcon>
                                <ListItemText primary={`${sol.id} - ${sol.endereco}`} />
                            </ListItem>
                            ))}
                        </List>
                    </CardContent>
                </Box>
            </Box>
        </Card>
    );
};

// --- Componente do Dialog de Detalhes da Rota ---
const DetalheRotaDialog: React.FC<{
  rota: Rota | null;
  open: boolean;
  onClose: () => void;
}> = ({ rota, open, onClose }) => {
  if (!rota) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        Detalhes da Rota
        <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box>
                <Typography variant="h5">{rota.nome}</Typography>
                <Typography color="text.secondary">Agente: {rota.agente}</Typography>
                <Typography color="text.secondary">Criada em: {new Date(rota.dataCriacao).toLocaleDateString()}</Typography>
            </Box>
            <Chip label={rota.status} color={getStatusChipColor(rota.status)} />
        </Box>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" gutterBottom>Endereços da Rota ({rota.solicitacoes.length})</Typography>
        <List>
            {rota.solicitacoes.map((sol) => (
                <ListItem key={sol.id}>
                    <ListItemIcon>
                        <PlaceIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={`${sol.id} - ${sol.endereco}`} secondary={`Prazo: ${sol.prazo} dia(s)`} />
                </ListItem>
            ))}
        </List>
      </DialogContent>
    </Dialog>
  );
};


// --- Componente Principal da Página de Rotas ---

const Rotas: React.FC = () => {
  const [rotas] = useState<Rota[]>(mockRotas);
  const [filtro, setFiltro] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [rotaEmDetalhe, setRotaEmDetalhe] = useState<Rota | null>(null);

  const rotasFiltradas = rotas.filter(
    (r) =>
      (r.nome.toLowerCase().includes(filtro.toLowerCase()) ||
       r.agente.toLowerCase().includes(filtro.toLowerCase())) &&
      (statusFilter === '' || r.status === statusFilter)
  );
  
  const handleCardClick = (rota: Rota) => {
    setRotaEmDetalhe(rota);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 2, mb: 3, display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>Gerenciar Rotas</Typography>
        <TextField
          label="Procurar por nome ou agente..."
          variant="outlined"
          size="small"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          sx={{ minWidth: '300px' }}
        />
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            label="Status"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value=""><em>Todos</em></MenuItem>
            <MenuItem value="Planejada">Planejada</MenuItem>
            <MenuItem value="Em andamento">Em andamento</MenuItem>
            <MenuItem value="Concluída">Concluída</MenuItem>
          </Select>
        </FormControl>
      </Paper>

      <Stack spacing={3}>
        {rotasFiltradas.length > 0 ? (
          rotasFiltradas.map((rota) => (
            <RotaCard key={rota.id} rota={rota} onClick={() => handleCardClick(rota)} />
          ))
        ) : (
          <Typography sx={{ textAlign: 'center', mt: 4 }}>Nenhuma rota encontrada.</Typography>
        )}
      </Stack>

      <DetalheRotaDialog 
        open={!!rotaEmDetalhe}
        onClose={() => setRotaEmDetalhe(null)}
        rota={rotaEmDetalhe}
      />
    </Box>
  );
};

export default Rotas;
