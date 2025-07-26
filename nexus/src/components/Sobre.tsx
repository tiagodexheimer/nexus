import React from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Avatar,
} from '@mui/material';

const logoSrc = "/logo.png"; // Caminho para o seu logo

const Sobre: React.FC = () => {
  return (
    <Paper
        elevation={6}
        sx={{
            p: { xs: 2, sm: 4 },
            backgroundColor: '#654321',
            color: 'white',
            borderRadius: 2,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        }}
    >
        <Container maxWidth="sm">
            <Box sx={{ textAlign: 'center' }}>
                <Avatar 
                    src={logoSrc} 
                    alt="Nexus Ambiental Logo"
                    sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }}
                />
                <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                Bem vindo a plataforma Web
                </Typography>
                <Typography variant="body1" paragraph>
                A Nexus Ambiental é uma startup de tecnologia que desenvolve soluções SaaS para otimizar a gestão de ativos ambientais. Através de plataformas web e mobile integradas, a empresa substitui processos manuais por fluxos de trabalho digitais, fornecendo dados precisos para decisões estratégicas.
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 3, fontWeight: 'bold' }}>
                Principais Recursos
                </Typography>
                <Typography variant="body1" align="left" paragraph>
                  <strong>Gerenciamento de Solicitações:</strong> Cadastro e importação em lote de pedidos de vistoria. <br/>
                  <strong>Planejamento e Roteirização:</strong> Criação de rotas de trabalho otimizadas para as equipes. <br/>
                  <strong>Execução de Vistoria Offline:</strong> Preenchimento de laudos em campo, sem necessidade de internet. <br/>
                  <strong>Administração e Gestão:</strong> Painel web para gerenciar formulários e visualizar dashboards. <br/>
                  <strong>Geração de Relatórios:</strong> Criação automática de laudos técnicos padronizados.
                </Typography>
            </Box>
        </Container>
    </Paper>
  );
};

export default Sobre;
