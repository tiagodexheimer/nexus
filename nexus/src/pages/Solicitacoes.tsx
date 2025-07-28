import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

// Corrigido: Adicionado "Concluído" ao tipo Status
type Status = "Aguardando Agendamento" | "Agendado Vistoria" | "Em Rota" | "Concluído";

// Define a interface para uma solicitação
interface Solicitacao {
  id: number;
  protocolo: string;
  data: string;
  proprietario: string;
  status: Status;
}

// Dados de exemplo, incluindo o status "Concluído"
const mockSolicitacoes: Solicitacao[] = [
    { id: 1, protocolo: "001-2023", data: "2023-10-26", proprietario: "João Silva", status: "Aguardando Agendamento" },
    { id: 2, protocolo: "002-2023", data: "2023-10-25", proprietario: "Maria Oliveira", status: "Agendado Vistoria" },
    { id: 3, protocolo: "003-2023", data: "2023-10-24", proprietario: "Carlos Pereira", status: "Em Rota" },
    { id: 4, protocolo: "004-2023", data: "2023-10-23", proprietario: "Ana Costa", status: "Concluído" },
    { id: 5, protocolo: "005-2023", data: "2023-10-22", proprietario: "Lucas Souza", status: "Aguardando Agendamento" },
    { id: 6, protocolo: "006-2023", data: "2023-10-21", proprietario: "Juliana Santos", status: "Concluído" },
    { id: 7, protocolo: "007-2023", data: "2023-10-20", proprietario: "Marcos Lima", status: "Agendado Vistoria" },
    { id: 8, protocolo: "008-2023", data: "2023-10-19", proprietario: "Fernanda Almeida", status: "Concluído" },
];

// Adicionado a cor para o status "Concluído"
const statusColors: Record<Status, "default" | "warning" | "info" | "success"> = {
  "Aguardando Agendamento": "default",
  "Agendado Vistoria": "warning",
  "Em Rota": "info",
  "Concluído": "success",
};

const Solicitacoes = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [solicitacoes] = useState<Solicitacao[]>(mockSolicitacoes); // Removido setSolicitacoes se não for usado para alterar
  const [selectedSolicitacao, setSelectedSolicitacao] = useState<Solicitacao | null>(null);

  // Corrigido: Removido o parâmetro 'event' não utilizado
  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const filteredSolicitacoes = solicitacoes.filter(s => {
    const search = searchTerm.toLowerCase();
    return s.protocolo.toLowerCase().includes(search) || s.proprietario.toLowerCase().includes(search);
  });

  const agendamento = filteredSolicitacoes.filter(s => s.status === "Aguardando Agendamento");
  const vistoria = filteredSolicitacoes.filter(s => s.status === "Agendado Vistoria");
  const rota = filteredSolicitacoes.filter(s => s.status === "Em Rota");
  const concluidas = filteredSolicitacoes.filter(s => s.status === "Concluído");

  const handleOpenDetails = (solicitacao: Solicitacao) => {
    setSelectedSolicitacao(solicitacao);
  };

  const handleCloseDetails = () => {
    setSelectedSolicitacao(null);
  };

  const renderList = (items: Solicitacao[]) => (
    <List>
      {items.map(item => (
        <ListItem key={item.id} divider button onClick={() => handleOpenDetails(item)}>
          <ListItemText 
            primary={`Protocolo: ${item.protocolo} - ${item.proprietario}`}
            secondary={`Data: ${item.data}`}
          />
          <Chip label={item.status} color={statusColors[item.status]} size="small" />
        </ListItem>
      ))}
    </List>
  );

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Gerenciar Solicitações
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Buscar por protocolo ou proprietário..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ width: '40%' }}
        />
        <Button variant="contained" color="primary">
          Nova Solicitação
        </Button>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabIndex} onChange={handleTabChange} aria-label="abas de solicitações">
          <Tab label={`Aguardando Agendamento (${agendamento.length})`} />
          <Tab label={`Agendado Vistoria (${vistoria.length})`} />
          <Tab label={`Em Rota (${rota.length})`} />
          <Tab label={`Concluídas (${concluidas.length})`} />
        </Tabs>
      </Box>
      
      {tabIndex === 0 && renderList(agendamento)}
      {tabIndex === 1 && renderList(vistoria)}
      {tabIndex === 2 && renderList(rota)}
      {tabIndex === 3 && renderList(concluidas)}

      {/* Modal de Detalhes */}
      <Dialog open={!!selectedSolicitacao} onClose={handleCloseDetails} fullWidth maxWidth="sm">
        <DialogTitle>Detalhes da Solicitação</DialogTitle>
        <DialogContent>
          {selectedSolicitacao && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography><strong>Protocolo:</strong> {selectedSolicitacao.protocolo}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography><strong>Proprietário:</strong> {selectedSolicitacao.proprietario}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography><strong>Data:</strong> {selectedSolicitacao.data}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography><strong>Status:</strong> <Chip label={selectedSolicitacao.status} color={statusColors[selectedSolicitacao.status]} size="small" /></Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetails}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default Solicitacoes;
