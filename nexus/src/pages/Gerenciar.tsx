import React from 'react';
import { Grid, Card, CardActionArea, CardContent, Typography, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ForestIcon from '@mui/icons-material/Forest';
import RuleFolderIcon from '@mui/icons-material/RuleFolder';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import PeopleIcon from '@mui/icons-material/People';

const managementOptions = [
  {
    title: 'Formulários',
    description: 'Crie, edite e gerencie os formulários de vistoria.',
    path: '/gerenciar/formularios',
    icon: <ListAltIcon sx={{ fontSize: 40 }} />,
  },
  {
    title: 'Espécies Arbóreas',
    description: 'Administre o cadastro de espécies de árvores.',
    path: '/gerenciar/especies',
    icon: <ForestIcon sx={{ fontSize: 40 }} />,
  },
  {
    title: 'Tipos de Vistorias',
    description: 'Defina os diferentes tipos de vistorias disponíveis.',
    // CORREÇÃO: O caminho foi ajustado para o correto.
    path: '/gerenciar/tipos-vistoria',
    icon: <RuleFolderIcon sx={{ fontSize: 40 }} />,
  },
  {
    title: 'Status de Solicitação',
    description: 'Gerencie os status para solicitações e ordens de serviço.',
    path: '/gerenciar/status',
    icon: <PlaylistAddCheckIcon sx={{ fontSize: 40 }} />,
  },
  {
    title: 'Rotas',
    description: 'Administre e otimize as rotas de suas equipes.',
    path: '/gerenciar/rotas',
    icon: <AltRouteIcon sx={{ fontSize: 40 }} />,
  },
  {
    title: 'Usuários',
    description: 'Gerencie os usuários da plataforma e suas permissões.',
    path: '/gerenciar/usuarios',
    icon: <PeopleIcon sx={{ fontSize: 40 }} />,
  },
];

const Gerenciar: React.FC = () => (
  <Box>
    <Typography variant="h4" component="h1" gutterBottom>
      Painel de Administração
    </Typography>
    <Typography paragraph>
      Selecione uma opção abaixo para gerenciar.
    </Typography>
    <Grid container spacing={4}>
      {managementOptions.map((option) => (
        <Grid item xs={12} sm={6} md={4} key={option.title}>
          <Card sx={{ height: '100%' }}>
            <CardActionArea component={RouterLink} to={option.path} sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Box sx={{ mb: 2, color: 'primary.main' }}>
                    {option.icon}
                </Box>
                <Typography gutterBottom variant="h5" component="div">
                  {option.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {option.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default Gerenciar;
