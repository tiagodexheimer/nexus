// src/components/Layout.tsx
import React, { useState, type JSX } from 'react';
import { Box, CssBaseline, useTheme, Drawer } from '@mui/material';
import Header from './Header.tsx';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
  isLoggedIn: boolean;
  onLoginSuccess: () => void;
  onLogout: () => void;
}

// Define a largura da sua sidebar/drawer
const drawerWidth = 240;

const Layout = ({ children, isLoggedIn, onLoginSuccess, onLogout }: LayoutProps): JSX.Element => {
  const theme = useTheme();
  // Estado para controlar a abertura/fechamento do drawer móvel
  const [mobileOpen, setMobileOpen] = useState(false);

  // Função para alternar o estado do drawer móvel
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      {/* Componente Header, passa o manipulador de alternância do drawer */}
      <Header
        isLoggedIn={isLoggedIn}
        onLoginSuccess={onLoginSuccess}
        onLogout={onLogout}
        onDrawerToggle={handleDrawerToggle} // Passa a função de alternância para o Header
      />
      {/* Área de conteúdo principal, deslocada pela altura do cabeçalho */}
      <Box
        sx={{
          display: 'flex',
          flexGrow: 1,
          // Garante que o conteúdo comece abaixo do cabeçalho fixo
          mt: `${theme.mixins.toolbar.minHeight}px`,
        }}
      >
        {isLoggedIn && ( // Renderiza o drawer apenas se o usuário estiver logado
          <Box
            component="nav"
            aria-label="navigation drawer"
          >
            {/* Drawer Móvel: visível apenas em telas pequenas (mdDown) e controlado pelo clique */}
            {/* O Drawer temporário por padrão se comporta como um menu lateral para mobile */}
            <Drawer
              variant="temporary" // Drawer temporário para dispositivos móveis
              open={mobileOpen} // Controla a visibilidade do drawer
              onClose={handleDrawerToggle} // Fecha o drawer ao clicar fora ou no botão de fechar
              ModalProps={{
                keepMounted: true, // Otimiza o desempenho para dispositivos móveis
              }}
              sx={{
                // Estilos aplicados ao papel do Drawer
                '& .MuiDrawer-paper': {
                  boxSizing: 'border-box', // Inclui padding e borda na largura total
                  width: drawerWidth, // Define a largura do drawer
                  backgroundColor: '#654321', // Aplica a cor de fundo da sidebar
                  color: 'white', // Aplica a cor do texto da sidebar
                },
                // Esconde o drawer em telas maiores que 'md' (desktop)
                display: { xs: 'block', md: 'none' },
              }}
            >
              {/* O conteúdo do componente Sidebar será renderizado dentro do drawer */}
              <Sidebar />
            </Drawer>
          </Box>
        )}
        {/* Área de conteúdo principal */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3, // Mantém o padding existente para o conteúdo dentro da área principal
            backgroundColor: '#F5F5DC',
          }}
        >
          {children} {/* Conteúdo da página */}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
