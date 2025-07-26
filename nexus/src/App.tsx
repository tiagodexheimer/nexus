import React, { useState } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import theme from './styles/theme';
import Dashboard from './pages/Dashboard';
import Solicitacoes from './pages/Solicitacoes';
import Rotas from './pages/Rotas';
import Relatorios from './pages/Relatorios';
import Gerenciar from './pages/Gerenciar';
import SobrePage from './pages/Sobre';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout
        isLoggedIn={isLoggedIn}
        onLoginSuccess={handleLoginSuccess}
        onLogout={handleLogout}
      >
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/solicitacoes" element={<Solicitacoes />} />
              <Route path="/rotas" element={<Rotas />} />
              <Route path="/relatorios" element={<Relatorios />} />
              <Route path="/gerenciar" element={<Gerenciar />} />
              <Route path="/sobre" element={<SobrePage />} />
              {/* Rota padrão para / quando logado */}
              <Route path="/" element={<Dashboard />} />
            </>
          ) : (
            <>
                {/* Quando deslogado, todas as rotas levam para a página Sobre, que agora tem o cadastro */}
                <Route path="/*" element={<SobrePage />} />
            </>
          )}
        </Routes>
      </Layout>
    </ThemeProvider>
  );
};

export default App;
