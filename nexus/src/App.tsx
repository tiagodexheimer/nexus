import React, { useState } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import theme from './styles/theme';
import Dashboard from './pages/Dashboard';
import Solicitacoes from './pages/Solicitacoes';
import Rotas from './pages/Rotas';
import Relatorios from './pages/Relatorios';
import Gerenciar from './pages/Gerenciar';
import SobrePage from './pages/Sobre';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    // Inicializa o estado de login a partir do localStorage.
    // Isso garante que o estado persista mesmo após recarregar a página.
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    // Salva o estado de login no localStorage para persistência
    localStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
    // Redireciona para o dashboard após o login bem-sucedido
    navigate('/dashboard');
  };

  const handleLogout = () => {
    // Remove o estado de login do localStorage
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    // Redireciona para a página inicial (página de "Sobre")
    navigate('/');
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
              {/* Rotas acessíveis apenas quando o usuário está logado */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/solicitacoes" element={<Solicitacoes />} />
              <Route path="/rotas" element={<Rotas />} />
              <Route path="/relatorios" element={<Relatorios />} />
              <Route path="/gerenciar" element={<Gerenciar />} />
              <Route path="/sobre" element={<SobrePage />} />
              {/* Redireciona a rota raiz para o dashboard */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              {/* Redireciona qualquer outra rota não encontrada para o dashboard */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </>
          ) : (
            <>
              {/* Quando deslogado, qualquer rota leva para a página Sobre/Cadastro */}
              <Route path="/*" element={<SobrePage />} />
            </>
          )}
        </Routes>
      </Layout>
    </ThemeProvider>
  );
};

export default App;
