import React from 'react';
import { Grid, CardContent, Typography, Box, List, ListItem, ListItemIcon, ListItemText, Divider, Paper } from '@mui/material';
import { Assignment, AltRoute, Assessment, HourglassEmpty, CheckCircle, PlayCircleFilled, Schedule, TaskAlt, PendingActions } from '@mui/icons-material';

// --- Dados Mockados ---
// Em uma aplicação real, esses dados viriam de uma API ou estado global.
const summaryData = {
  solicitacoes: {
    total: 20,
    semRota: 4,
    aguardando: 3,
    agendado: 3,
    emRota: 3,
    concluido: 7,
  },
  rotas: {
    total: 3,
    planejadas: 1,
    emAndamento: 1,
    concluidas: 1,
  },
  relatorios: {
    total: 8,
    recentes: [
      { id: 'REL-008', data: '2025-08-05', tipo: 'Laudo de Vistoria' },
      { id: 'REL-007', data: '2025-08-04', tipo: 'Supressão Vegetal' },
      { id: 'REL-006', data: '2025-08-02', tipo: 'Laudo de Vistoria' },
    ]
  }
};

// --- Componente do Card de Resumo ---
const SummaryCard = ({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) => (
  <Paper elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
    <CardContent sx={{ flexGrow: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        {icon}
        <Typography variant="h5" component="div" sx={{ ml: 1.5 }}>
          {title}
        </Typography>
      </Box>
      {children}
    </CardContent>
  </Paper>
);

const Dashboard: React.FC = () => (
  <Box>
    <Typography variant="h4" component="h1" gutterBottom>
      Dashboard
    </Typography>
    <Typography paragraph color="text.secondary">
      Olá! Bem-vindo ao painel de controle. Aqui está um resumo das atividades recentes.
    </Typography>

    <Grid container spacing={3}>
      {/* Card de Solicitações */}
      <Grid sx={{ gridColumn: { xs: 'span 12', md: 'span 4' } }}>
        <SummaryCard title="Solicitações" icon={<Assignment color="primary" sx={{ fontSize: 30 }} />}>
          <Typography variant="h3" component="p" gutterBottom>
            {summaryData.solicitacoes.total}
          </Typography>
          <Typography variant="body2" color="text.secondary">Total de solicitações cadastradas.</Typography>
          <Divider sx={{ my: 2 }} />
          <List dense>
            <ListItem disablePadding>
              <ListItemIcon sx={{minWidth: 40}}><PendingActions fontSize="small" color="action" /></ListItemIcon>
              <ListItemText primary="Sem Rota" secondary={`${summaryData.solicitacoes.semRota} solicitações`} />
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon sx={{minWidth: 40}}><Schedule fontSize="small" color="warning" /></ListItemIcon>
              <ListItemText primary="Aguardando Agendamento" secondary={`${summaryData.solicitacoes.aguardando} solicitações`} />
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon sx={{minWidth: 40}}><TaskAlt fontSize="small" color="info" /></ListItemIcon>
              <ListItemText primary="Concluídas" secondary={`${summaryData.solicitacoes.concluido} solicitações`} />
            </ListItem>
          </List>
        </SummaryCard>
      </Grid>

      {/* Card de Rotas */}
      <Grid sx={{ gridColumn: { xs: 'span 12', md: 'span 4' } }}>
        <SummaryCard title="Rotas" icon={<AltRoute color="primary" sx={{ fontSize: 30 }} />}>
          <Typography variant="h3" component="p" gutterBottom>
            {summaryData.rotas.total}
          </Typography>
          <Typography variant="body2" color="text.secondary">Total de rotas criadas.</Typography>
          <Divider sx={{ my: 2 }} />
          <List dense>
            <ListItem disablePadding>
              <ListItemIcon sx={{minWidth: 40}}><HourglassEmpty fontSize="small" color="action" /></ListItemIcon>
              <ListItemText primary="Planejadas" secondary={`${summaryData.rotas.planejadas} rotas`} />
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon sx={{minWidth: 40}}><PlayCircleFilled fontSize="small" color="warning" /></ListItemIcon>
              <ListItemText primary="Em Andamento" secondary={`${summaryData.rotas.emAndamento} rotas`} />
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon sx={{minWidth: 40}}><CheckCircle fontSize="small" color="success" /></ListItemIcon>
              <ListItemText primary="Concluídas" secondary={`${summaryData.rotas.concluidas} rotas`} />
            </ListItem>
          </List>
        </SummaryCard>
      </Grid>

      {/* Card de Relatórios */}
      <Grid sx={{ gridColumn: { xs: 'span 12', md: 'span 4' } }}>
        <SummaryCard title="Relatórios" icon={<Assessment color="primary" sx={{ fontSize: 30 }} />}>
          <Typography variant="h3" component="p" gutterBottom>
            {summaryData.relatorios.total}
          </Typography>
          <Typography variant="body2" color="text.secondary">Total de relatórios gerados.</Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>Últimos Gerados:</Typography>
          <List dense>
            {summaryData.relatorios.recentes.map(rel => (
              <ListItem key={rel.id} disablePadding>
                <ListItemText 
                  primary={rel.id} 
                  secondary={`${rel.tipo} - ${new Date(rel.data).toLocaleDateString()}`} 
                />
              </ListItem>
            ))}
          </List>
        </SummaryCard>
      </Grid>
    </Grid>
  </Box>
);

export default Dashboard;
