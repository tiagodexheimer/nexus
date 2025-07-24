import React from 'react';
import { Typography } from '@mui/material';
import Layout from './components/Layout';

const App: React.FC = () => {
  return (
    <Layout>
      <Typography variant="h4" component="h1" gutterBottom>
        Bem-vindo ao Dashboard
      </Typography>
      <Typography paragraph>
        Este é o espaço onde o conteúdo principal da sua aplicação será exibido.
        Você pode adicionar seus componentes, gráficos e tabelas aqui.
      </Typography>
    </Layout>
  );
};

export default App;
