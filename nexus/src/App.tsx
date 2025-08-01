// nexus/src/App.tsx
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
// Importe os novos componentes
import GerenciarEspecies from './pages/gerenciar/GerenciarEspecies';
import GerenciarFormularios from './pages/gerenciar/GerenciarFormularios';
import GerenciarRotas from './pages/gerenciar/GerenciarRotas';
import GerenciarStatus from './pages/gerenciar/GerenciarStatus';
import GerenciarTiposVistoria from './pages/gerenciar/GerenciarTiposVistoria';
import GerenciarUsuarios from './pages/gerenciar/GerenciarUsuarios';


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
              {/* Adicione as novas rotas de gerenciamento aqui */}
              <Route path="/gerenciar/especies" element={<GerenciarEspecies />} />
              <Route path="/gerenciar/formularios" element={<GerenciarFormularios />} />
              <Route path="/gerenciar/rotas" element={<GerenciarRotas />} />
              <Route path="/gerenciar/status" element={<GerenciarStatus />} />
              <Route path="/gerenciar/tipos-vistoria" element={<GerenciarTiposVistoria />} />
              <Route path="/gerenciar/usuarios" element={<GerenciarUsuarios />} />
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