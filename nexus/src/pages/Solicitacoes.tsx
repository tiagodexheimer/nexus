import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
} from '@mui/material';
import { Add as AddIcon, Search as SearchIcon } from '@mui/icons-material';
import SolicitacaoCard from '../components/SolicitacaoCard';
import NovaSolicitacaoDialog from '../components/NovaSolicitacaoDialog';
import type { Solicitacao } from '../types';
import mapaExemplo from '../assets/mapa-exemplo.jpg';

// Dados mockados iniciais
const initialSolicitacoes: Solicitacao[] = [
    { id: 'SOL-001', prazo: 5, rua: 'Rua das Flores, 123', bairro: 'Centro', descricao: 'Poda de árvore alta com risco de queda sobre a via.', status: 'Aguardando Agendamento', mapaUrl: mapaExemplo, anexos: [] },
    { id: 'SOL-002', prazo: 2, rua: 'Av. Brasil, 1250', bairro: 'Jardim América', descricao: 'Remoção de galhos caídos após tempestade.', status: 'Agendado Vistoria', mapaUrl: mapaExemplo, anexos: [] },
    { id: 'SOL-003', prazo: 10, rua: 'Rua das Acácias, 45', bairro: 'Vila Nova', descricao: 'Análise de árvore com suspeita de doença.', status: 'Em Rota', mapaUrl: mapaExemplo, anexos: [] },
    { id: 'SOL-004', prazo: 1, rua: 'Rua São José, 789', bairro: 'Centro', descricao: 'Supressão de árvore morta com risco iminente de queda.', status: 'Aguardando Agendamento', mapaUrl: mapaExemplo, anexos: [] },
];

const Solicitacoes: React.FC = () => {
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>(initialSolicitacoes);
  const [tabIndex, setTabIndex] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleSaveSolicitacao = (novaSolicitacaoData: Omit<Solicitacao, 'id' | 'mapaUrl'>) => {
    const novaSolicitacao: Solicitacao = {
      ...novaSolicitacaoData,
      id: `SOL-${String(solicitacoes.length + 1).padStart(3, '0')}`,
      mapaUrl: mapaExemplo, // Usando mapa de exemplo para novas solicitações
    };
    setSolicitacoes(prev => [novaSolicitacao, ...prev]);
  };

  const handleRemoveSolicitacao = (id: string) => {
    setSolicitacoes(prev => prev.filter(s => s.id !== id));
  };
  
  const handleVerDetalhes = (id: string) => {
    // Lógica para ver detalhes pode ser implementada aqui,
    // como abrir um novo diálogo com mais informações.
    console.log("Ver detalhes da solicitação:", id);
    alert(`Detalhes da Solicitação: ${id}`);
  };

  const filteredSolicitacoes = solicitacoes.filter(s =>
    s.rua.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.bairro.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSolicitacoesPorStatus = (status: Solicitacao['status']) => {
    return filteredSolicitacoes.filter(s => s.status === status);
  };

  const renderSolicitacoes = (lista: Solicitacao[]) => {
    if (lista.length === 0) {
      return <Typography sx={{ mt: 3, textAlign: 'center' }}>Nenhuma solicitação encontrada.</Typography>;
    }
    return (
      <Box sx={{ mt: 2 }}>
        {lista.map(solicitacao => (
          <SolicitacaoCard
            key={solicitacao.id}
            solicitacao={solicitacao}
            onRemove={handleRemoveSolicitacao}
            onVerDetalhes={handleVerDetalhes}
          />
        ))}
      </Box>
    );
  };

  const tabsContent = [
    { label: 'Aguardando Agendamento', data: getSolicitacoesPorStatus('Aguardando Agendamento') },
    { label: 'Agendado Vistoria', data: getSolicitacoesPorStatus('Agendado Vistoria') },
    { label: 'Em Rota', data: getSolicitacoesPorStatus('Em Rota') },
  ];

  return (
    <Box>
      <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Grid item>
          <Typography variant="h4" component="h1">
            Painel de Solicitações
          </Typography>
        </Grid>
        <Grid item>
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenDialog}>
            Nova Solicitação
          </Button>
        </Grid>
      </Grid>
      
      <Box sx={{ my: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar por ID, rua, bairro ou descrição..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabIndex} onChange={handleTabChange} aria-label="abas de status de solicitações">
          {tabsContent.map((tab, index) => (
            <Tab key={index} label={`${tab.label} (${tab.data.length})`} />
          ))}
        </Tabs>
      </Box>
      
      {tabsContent.map((tab, index) => (
        tabIndex === index && (
          <Box key={index} sx={{ py: 2 }}>
            {renderSolicitacoes(tab.data)}
          </Box>
        )
      ))}

      <NovaSolicitacaoDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onSave={handleSaveSolicitacao}
      />
    </Box>
  );
};

export default Solicitacoes;
