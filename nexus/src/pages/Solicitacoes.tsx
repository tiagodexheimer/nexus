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
import { Add as AddIcon, Search as SearchIcon, AltRoute as AltRouteIcon } from '@mui/icons-material';
import SolicitacaoCard from '../components/SolicitacaoCard';
import NovaSolicitacaoDialog from '../components/NovaSolicitacaoDialog';
import CriarRotaDialog from '../components/CriarRotaDialog';
import ConfirmacaoDialog from '../components/ConfirmacaoDialog';
import EditarSolicitacaoDialog from '../components/EditarSolicitacaoDialog';
import DetalhesSolicitacaoDialog from '../components/DetalhesSolicitacaoDialog';
import type { Solicitacao } from '../types';
import mapaExemplo from '../assets/mapa-exemplo.jpg';

// Dados mockados iniciais expandidos para 20 exemplos
const initialSolicitacoes: Solicitacao[] = [
    { id: 'SOL-001', prazo: 5, rua: 'Rua das Flores, 123', bairro: 'Centro', descricao: 'Poda de árvore alta com risco de queda sobre a via.', status: 'Sem rota', mapaUrl: mapaExemplo, anexos: [] },
    { id: 'SOL-002', prazo: 2, rua: 'Av. Brasil, 1250', bairro: 'Jardim América', descricao: 'Remoção de galhos caídos após tempestade.', status: 'Aguardando agendamento', mapaUrl: mapaExemplo, anexos: [] },
    { id: 'SOL-003', prazo: 10, rua: 'Rua das Acácias, 45', bairro: 'Vila Nova', descricao: 'Análise de árvore com suspeita de doença.', status: 'Agendado', mapaUrl: mapaExemplo, anexos: [] },
    { id: 'SOL-004', prazo: 1, rua: 'Rua São José, 789', bairro: 'Centro', descricao: 'Supressão de árvore morta com risco iminente de queda.', status: 'Em rota', mapaUrl: mapaExemplo, anexos: [] },
    { id: 'SOL-005', prazo: 7, rua: 'Rua Tiradentes, 500', bairro: 'Vila Industrial', descricao: 'Vistoria de rotina.', status: 'Concluído', mapaUrl: mapaExemplo, anexos: [] },
    { id: 'SOL-006', prazo: 3, rua: 'Av. Getúlio Vargas, 2000', bairro: 'Centro', descricao: 'Avaliação de galho quebado.', status: 'Sem rota', mapaUrl: mapaExemplo, anexos: [] },
    { id: 'SOL-007', prazo: 8, rua: 'Rua Dom Pedro II, 330', bairro: 'São Luís', descricao: 'Poda de levantamento de copa.', status: 'Aguardando agendamento', mapaUrl: mapaExemplo, anexos: [] },
    { id: 'SOL-008', prazo: 4, rua: 'Rua Sete de Setembro, 150', bairro: 'Centro', descricao: 'Verificação de infestação por pragas.', status: 'Agendado', mapaUrl: mapaExemplo, anexos: [] },
    { id: 'SOL-009', prazo: 6, rua: 'Rua da República, 850', bairro: 'Rio Branco', descricao: 'Remoção de árvore caída em calçada.', status: 'Em rota', mapaUrl: mapaExemplo, anexos: [] },
    { id: 'SOL-010', prazo: 12, rua: 'Av. Independência, 910', bairro: 'Jardim Botânico', descricao: 'Análise para transplante de muda.', status: 'Concluído', mapaUrl: mapaExemplo, anexos: [] },
    { id: 'SOL-011', prazo: 2, rua: 'Rua Vinte e Quatro de Outubro, 111', bairro: 'Moinhos de Vento', descricao: 'Poda de contenção.', status: 'Sem rota', mapaUrl: mapaExemplo, anexos: [] },
    { id: 'SOL-012', prazo: 5, rua: 'Rua Anita Garibaldi, 2345', bairro: 'Boa Vista', descricao: 'Vistoria de saúde de árvore idosa.', status: 'Aguardando agendamento', mapaUrl: mapaExemplo, anexos: [] },
    { id: 'SOL-013', prazo: 9, rua: 'Av. Ipiranga, 5550', bairro: 'Partenon', descricao: 'Avaliação de raízes expostas.', status: 'Agendado', mapaUrl: mapaExemplo, anexos: [] },
    { id: 'SOL-014', prazo: 3, rua: 'Rua dos Andradas, 1001', bairro: 'Centro Histórico', descricao: 'Remoção de galhos secos.', status: 'Em rota', mapaUrl: mapaExemplo, anexos: [] },
    { id: 'SOL-015', prazo: 15, rua: 'Av. Protásio Alves, 7000', bairro: 'Alto Petrópolis', descricao: 'Laudo técnico para supressão.', status: 'Concluído', mapaUrl: mapaExemplo, anexos: [] },
    { id: 'SOL-016', prazo: 4, rua: 'Rua Coronel Bordini, 830', bairro: 'Auxiliadora', descricao: 'Poda de limpeza.', status: 'Sem rota', mapaUrl: mapaExemplo, anexos: [] },
    { id: 'SOL-017', prazo: 7, rua: 'Av. Wenceslau Escobar, 1823', bairro: 'Tristeza', descricao: 'Avaliação de inclinação de tronco.', status: 'Aguardando agendamento', mapaUrl: mapaExemplo, anexos: [] },
    { id: 'SOL-018', prazo: 3, rua: 'Rua Doutor Timóteo, 755', bairro: 'Floresta', descricao: 'Verificação de danos por colisão de veículo.', status: 'Agendado', mapaUrl: mapaExemplo, anexos: [] },
    { id: 'SOL-019', prazo: 5, rua: 'Av. Padre Cacique, 891', bairro: 'Praia de Belas', descricao: 'Poda para desobstrução de sinalização.', status: 'Em rota', mapaUrl: mapaExemplo, anexos: [] },
    { id: 'SOL-020', prazo: 10, rua: 'Rua Goethe, 200', bairro: 'Rio Branco', descricao: 'Análise de solo e adubação.', status: 'Concluído', mapaUrl: mapaExemplo, anexos: [] },
];


const Solicitacoes: React.FC = () => {
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>(initialSolicitacoes);
  const [tabIndex, setTabIndex] = useState(0);
  const [novaSolicitacaoDialogOpen, setNovaSolicitacaoDialogOpen] = useState(false);
  const [criarRotaDialogOpen, setCriarRotaDialogOpen] = useState(false);
  const [confirmacaoDialogOpen, setConfirmacaoDialogOpen] = useState(false);
  const [confirmacaoMessage, setConfirmacaoMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSolicitacoes, setSelectedSolicitacoes] = useState<string[]>([]);
  const [solicitacaoParaEditar, setSolicitacaoParaEditar] = useState<Solicitacao | null>(null);
  const [editarDialogOpen, setEditarDialogOpen] = useState(false);
  const [solicitacaoParaVer, setSolicitacaoParaVer] = useState<Solicitacao | null>(null);
  const [detalhesDialogOpen, setDetalhesDialogOpen] = useState(false);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const handleOpenNovaSolicitacaoDialog = () => {
    setNovaSolicitacaoDialogOpen(true);
  };

  const handleCloseNovaSolicitacaoDialog = () => {
    setNovaSolicitacaoDialogOpen(false);
  };

  const handleSaveSolicitacao = (novaSolicitacaoData: Omit<Solicitacao, 'id' | 'mapaUrl'>) => {
    const novaSolicitacao: Solicitacao = {
      ...novaSolicitacaoData,
      id: `SOL-${String(solicitacoes.length + 1).padStart(3, '0')}`,
      mapaUrl: mapaExemplo,
    };
    setSolicitacoes(prev => [novaSolicitacao, ...prev]);
  };

  const handleRemoveSolicitacao = (id: string) => {
    setSolicitacoes(prev => prev.filter(s => s.id !== id));
    setSelectedSolicitacoes(prev => prev.filter(selectedId => selectedId !== id));
  };
  
  const handleOpenEditarDialog = (solicitacao: Solicitacao) => {
    setSolicitacaoParaEditar(solicitacao);
    setEditarDialogOpen(true);
  };

  const handleCloseEditarDialog = () => {
    setEditarDialogOpen(false);
    setSolicitacaoParaEditar(null);
  };

  const handleSaveEdicao = (solicitacaoEditada: Solicitacao) => {
    setSolicitacoes(prev => 
      prev.map(s => s.id === solicitacaoEditada.id ? solicitacaoEditada : s)
    );
    handleCloseEditarDialog();
    setConfirmacaoMessage(`Solicitação ${solicitacaoEditada.id} atualizada com sucesso.`);
    setConfirmacaoDialogOpen(true);
  };

  const handleOpenDetalhesDialog = (solicitacao: Solicitacao) => {
    setSolicitacaoParaVer(solicitacao);
    setDetalhesDialogOpen(true);
  };

  const handleCloseDetalhesDialog = () => {
    setDetalhesDialogOpen(false);
    setSolicitacaoParaVer(null);
  };

  const handleSelectSolicitacao = (id: string) => {
    setSelectedSolicitacoes(prevSelected =>
      prevSelected.includes(id)
        ? prevSelected.filter(solId => solId !== id)
        : [...prevSelected, id]
    );
  };

  const handleCreateRouteClick = () => {
    if (selectedSolicitacoes.length === 0) {
      alert("Selecione ao menos uma solicitação para criar uma rota.");
      return;
    }
    setCriarRotaDialogOpen(true);
  };

  const handleSaveRota = (rotaData: { nome: string; agente: string; status: string }) => {
    console.log("Salvando nova rota:", rotaData);
    console.log("Com as solicitações:", selectedSolicitacoes);
    
    setConfirmacaoMessage(`Rota "${rotaData.nome}" criada com sucesso para o agente ${rotaData.agente}.`);
    setCriarRotaDialogOpen(false);
    setConfirmacaoDialogOpen(true);
  };

  const handleCloseConfirmacaoDialog = () => {
    setConfirmacaoDialogOpen(false);
    setSelectedSolicitacoes([]);
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
            onEditar={handleOpenEditarDialog}
            onVerDetalhes={handleOpenDetalhesDialog}
            isSelected={selectedSolicitacoes.includes(solicitacao.id)}
            onSelect={handleSelectSolicitacao}
          />
        ))}
      </Box>
    );
  };

  const tabsContent = [
    { label: 'Sem Rota', data: getSolicitacoesPorStatus('Sem rota') },
    { label: 'Aguardando Agendamento', data: getSolicitacoesPorStatus('Aguardando agendamento') },
    { label: 'Agendado', data: getSolicitacoesPorStatus('Agendado') },
    { label: 'Em Rota', data: getSolicitacoesPorStatus('Em rota') },
    { label: 'Concluído', data: getSolicitacoesPorStatus('Concluído') },
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
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenNovaSolicitacaoDialog}>
            Nova Solicitação
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<AltRouteIcon />}
            onClick={handleCreateRouteClick}
            disabled={selectedSolicitacoes.length === 0}
            sx={{ ml: 2 }}
          >
            Criar Rota ({selectedSolicitacoes.length})
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
        <Tabs value={tabIndex} onChange={handleTabChange} aria-label="abas de status de solicitações" variant="scrollable" scrollButtons="auto">
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
        open={novaSolicitacaoDialogOpen}
        onClose={handleCloseNovaSolicitacaoDialog}
        onSave={handleSaveSolicitacao}
      />

      <CriarRotaDialog
        open={criarRotaDialogOpen}
        onClose={() => setCriarRotaDialogOpen(false)}
        onSave={handleSaveRota}
        solicitacoesCount={selectedSolicitacoes.length}
      />

      <ConfirmacaoDialog
        open={confirmacaoDialogOpen}
        onClose={handleCloseConfirmacaoDialog}
        title="Sucesso!"
        message={confirmacaoMessage}
      />

      <EditarSolicitacaoDialog
        open={editarDialogOpen}
        onClose={handleCloseEditarDialog}
        solicitacao={solicitacaoParaEditar}
        onSave={handleSaveEdicao}
      />

      <DetalhesSolicitacaoDialog
        open={detalhesDialogOpen}
        onClose={handleCloseDetalhesDialog}
        solicitacao={solicitacaoParaVer}
      />
    </Box>
  );
};

export default Solicitacoes;
