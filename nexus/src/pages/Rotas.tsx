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
  DialogActions,
} from '@mui/material';
import { Place as PlaceIcon, Edit as EditIcon, Delete as DeleteIcon, Close as CloseIcon, DragIndicator as DragIndicatorIcon } from '@mui/icons-material';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import MapaRotaExemplo from '../assets/mapa-rota-exemplo.png'; // Referenciando a imagem local

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
  mapaUrlDetalhe: string;
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
    mapaUrlDetalhe: MapaRotaExemplo,
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
    mapaUrlDetalhe: MapaRotaExemplo,
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
    mapaUrlDetalhe: MapaRotaExemplo,
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

const RotaCard: React.FC<{ rota: Rota, onClick: () => void, onEdit: () => void, onRemove: () => void }> = ({ rota, onClick, onEdit, onRemove }) => {
    const menorPrazo = rota.solicitacoes.length > 0
        ? Math.min(...rota.solicitacoes.map(s => s.prazo))
        : null;

    const handleEditClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onEdit();
    };

    const handleRemoveClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onRemove();
    };

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
                    onClick={handleEditClick}
                >
                    Editar
                </Button>
                <Button
                    size="small"
                    variant="contained"
                    color="error"
                    sx={{ minWidth: '100px' }}
                    startIcon={<DeleteIcon />}
                    onClick={handleRemoveClick}
                >
                    Remover
                </Button>
            </Stack>
            <Box sx={{ flexGrow: 1, cursor: 'pointer', display: 'flex', alignItems: 'center', p: 2, gap: 2 }} onClick={onClick}>
                <Stack spacing={1} sx={{ flexShrink: 0, alignItems: 'center' }}>
                    <Stack 
                        direction="row" 
                        spacing={1} 
                        justifyContent="center"
                        sx={{ width: '250px' }}
                    >
                        <Chip label={rota.status} color={getStatusChipColor(rota.status)} size="small" />
                        {menorPrazo !== null && (
                            <Box sx={{
                                backgroundColor: (theme) => theme.palette.success.main,
                                color: (theme) => theme.palette.success.contrastText,
                                px: 1,
                                py: 0.2,
                                borderRadius: 1,
                                textAlign: 'center'
                            }}>
                                <Typography variant="caption" sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                                    Prazo: {menorPrazo} dia(s)
                                </Typography>
                            </Box>
                        )}
                    </Stack>
                    <img
                        src={rota.mapaUrl}
                        alt={`Mapa da Rota ${rota.nome}`}
                        style={{
                            width: '250px',
                            height: '150px',
                            objectFit: 'cover',
                            borderRadius: '8px'
                        }}
                    />
                </Stack>
                <Box sx={{ flexGrow: 1 }}>
                    <CardContent sx={{ p: '0 !important', display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <Box>
                            <Typography variant="h6" component="div">
                                {rota.nome}
                            </Typography>
                            <Typography color="text.secondary">
                                Criada em: {new Date(rota.dataCriacao).toLocaleDateString()} • Agente: {rota.agente}
                            </Typography>
                        </Box>
                        <Divider sx={{ my: 1 }} />
                        <Box sx={{ flexGrow: 1 }}>
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
                        </Box>
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
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        Detalhes da Rota
        <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ mb: 2, maxHeight: '400px', overflow: 'hidden', borderRadius: '8px' }}>
            <img 
                src={rota.mapaUrlDetalhe} 
                alt={`Mapa da Rota ${rota.nome}`}
                style={{ width: '100%', height: 'auto', display: 'block' }} 
            />
        </Box>
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
                <ListItem key={sol.id} secondaryAction={
                    <Chip label={`Prazo: ${sol.prazo} dia(s)`} color="warning" size="small" />
                }>
                    <ListItemIcon>
                        <PlaceIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={`${sol.id} - ${sol.endereco}`} />
                </ListItem>
            ))}
        </List>
      </DialogContent>
    </Dialog>
  );
};

// --- Componente para Item Arrastável ---
const SortableItem: React.FC<{solicitacao: SolicitacaoResumo, onRemove: (id: string) => void}> = ({solicitacao, onRemove}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({id: solicitacao.id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <ListItem
            ref={setNodeRef}
            style={style}
            secondaryAction={
                <IconButton edge="end" onClick={() => onRemove(solicitacao.id)}>
                    <DeleteIcon color="error" />
                </IconButton>
            }
        >
            <ListItemIcon sx={{ minWidth: 40, cursor: 'grab' }} {...attributes} {...listeners}>
                <DragIndicatorIcon />
            </ListItemIcon>
            <ListItemText primary={solicitacao.endereco} secondary={solicitacao.id} />
        </ListItem>
    );
}

// --- Componente do Dialog de Edição de Rota ---
const EditarRotaDialog: React.FC<{
  rota: Rota | null;
  open: boolean;
  onClose: () => void;
  onSave: (rota: Rota) => void;
}> = ({ rota, open, onClose, onSave }) => {
    const [nome, setNome] = useState(rota?.nome || '');
    const [agente, setAgente] = useState(rota?.agente || '');
    const [status, setStatus] = useState(rota?.status || 'Planejada');
    const [solicitacoes, setSolicitacoes] = useState<SolicitacaoResumo[]>(rota?.solicitacoes || []);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
          coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    React.useEffect(() => {
        if (rota) {
            setNome(rota.nome);
            setAgente(rota.agente);
            setStatus(rota.status);
            setSolicitacoes(rota.solicitacoes);
        }
    }, [rota]);

    const handleSave = () => {
        if (rota) {
            onSave({ ...rota, nome, agente, status, solicitacoes });
        }
    };
    
    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event;
        if (over && active.id !== over.id) {
          setSolicitacoes((items) => {
            const oldIndex = items.findIndex(item => item.id === active.id);
            const newIndex = items.findIndex(item => item.id === over.id);
            return arrayMove(items, oldIndex, newIndex);
          });
        }
    };

    const handleRemoveSolicitacao = (id: string) => {
        setSolicitacoes(prev => prev.filter(s => s.id !== id));
    };

    if (!rota) return null;

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Editar Rota</DialogTitle>
            <DialogContent>
                <TextField autoFocus margin="dense" label="Nome da Rota" type="text" fullWidth variant="outlined" value={nome} onChange={(e) => setNome(e.target.value)} sx={{ mt: 2 }} />
                <TextField margin="dense" label="Agente Responsável" type="text" fullWidth variant="outlined" value={agente} onChange={(e) => setAgente(e.target.value)} />
                <FormControl fullWidth margin="dense">
                    <InputLabel>Status</InputLabel>
                    <Select value={status} label="Status" onChange={(e) => setStatus(e.target.value as Rota['status'])}>
                        <MenuItem value="Planejada">Planejada</MenuItem>
                        <MenuItem value="Em andamento">Em andamento</MenuItem>
                        <MenuItem value="Concluída">Concluída</MenuItem>
                    </Select>
                </FormControl>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" gutterBottom>Solicitações na Rota</Typography>
                <DndContext 
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext 
                        items={solicitacoes}
                        strategy={verticalListSortingStrategy}
                    >
                        <List>
                            {solicitacoes.map((sol) => (
                                <SortableItem key={sol.id} solicitacao={sol} onRemove={handleRemoveSolicitacao} />
                            ))}
                        </List>
                    </SortableContext>
                </DndContext>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={handleSave} variant="contained">Salvar</Button>
            </DialogActions>
        </Dialog>
    );
};


// --- Componente Principal da Página de Rotas ---

const Rotas: React.FC = () => {
  const [rotas, setRotas] = useState<Rota[]>(mockRotas);
  const [filtro, setFiltro] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [rotaEmDetalhe, setRotaEmDetalhe] = useState<Rota | null>(null);
  const [rotaEmEdicao, setRotaEmEdicao] = useState<Rota | null>(null);

  const handleRemoverRota = (id: string) => {
    setRotas(prev => prev.filter(r => r.id !== id));
  };

  const handleAbrirEditarDialog = (rota: Rota) => {
    setRotaEmEdicao(rota);
  };

  const handleSalvarEdicao = (rotaEditada: Rota) => {
    setRotas(prev => prev.map(r => (r.id === rotaEditada.id ? rotaEditada : r)));
    setRotaEmEdicao(null);
  };

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
            <RotaCard 
                key={rota.id} 
                rota={rota} 
                onClick={() => handleCardClick(rota)}
                onEdit={() => handleAbrirEditarDialog(rota)}
                onRemove={() => handleRemoverRota(rota.id)}
            />
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
      <EditarRotaDialog
        open={!!rotaEmEdicao}
        onClose={() => setRotaEmEdicao(null)}
        onSave={handleSalvarEdicao}
        rota={rotaEmEdicao}
      />
    </Box>
  );
};

export default Rotas;
