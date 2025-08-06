// nexus/src/App.tsx
import React, { useState, useEffect } from 'react';
import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import muiTheme from './styles/theme';
import Dashboard from './pages/Dashboard';
import Solicitacoes from './pages/Solicitacoes';
import Rotas from './pages/Rotas';
import Relatorios from './pages/Relatorios';
import Gerenciar from './pages/Gerenciar';
import SobrePage from './pages/Sobre';
import GerenciarEspecies from './pages/gerenciar/GerenciarEspecies';
import GerenciarFormularios from './pages/gerenciar/GerenciarFormularios';
import GerenciarRotas from './pages/gerenciar/GerenciarRotas';
import GerenciarStatus from './pages/gerenciar/GerenciarStatus';
import GerenciarTiposVistoria from './pages/gerenciar/GerenciarTiposVistoria';
import GerenciarUsuarios from './pages/gerenciar/GerenciarUsuarios';

const App: React.FC = () => {
  // Inicializa o estado de login a partir do localStorage.
  // A função dentro do useState só é executada na primeira renderização.
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  // useEffect é usado para sincronizar o estado 'isLoggedIn' com o localStorage.
  // Toda vez que 'isLoggedIn' mudar, este código será executado.
  useEffect(() => {
    localStorage.setItem('isLoggedIn', String(isLoggedIn));
  }, [isLoggedIn]);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Garante que o estado seja removido do localStorage ao sair.
    localStorage.removeItem('isLoggedIn');
  };

  return (
    <MuiThemeProvider theme={muiTheme}>
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
              <Route path="/gerenciar/especies" element={<GerenciarEspecies />} />
              <Route
                path="/gerenciar/formularios"
                element={<GerenciarFormularios />}
              />
              <Route path="/gerenciar/rotas" element={<GerenciarRotas />} />
              <Route path="/gerenciar/status" element={<GerenciarStatus />} />
              <Route path="/gerenciar/tipos-vistoria" element={<GerenciarTiposVistoria />} />
              <Route path="/gerenciar/usuarios" element={<GerenciarUsuarios />} />
              <Route path="/sobre" element={<SobrePage />} />
              {/* Rota padrão quando logado */}
              <Route path="/" element={<Dashboard />} />
            </>
          ) : (
            <>
              {/* Se não estiver logado, qualquer rota leva para a página "Sobre" */}
              <Route path="/*" element={<SobrePage />} />
            </>
          )}
        </Routes>
      </Layout>
    </MuiThemeProvider>
  );
};

export default App;
