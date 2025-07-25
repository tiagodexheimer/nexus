import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Link,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

// Array com os itens do menu
const menuItems = ['Dashboard', 'Solicitações', 'Rotas', 'Relatórios', 'Gerenciar'];

/**
 * Componente de Cabeçalho (Header)
 * * Exibe uma barra de navegação no topo da página com:
 * - Logo/Nome da plataforma à esquerda.
 * - Itens de menu de navegação no centro.
 * - Saudação ao usuário e botão de sair à direita.
 */
const Header: React.FC = () => {
  return (
    // O AppBar funciona como o container principal do cabeçalho.
    <AppBar position="static" sx={{ backgroundColor: '#4B830D' }}>
      {/* Toolbar ajuda a organizar o conteúdo horizontalmente e adiciona um padding padrão. */}
      <Toolbar>
        {/* Box principal que usa flexbox para distribuir o espaço. */}
        <Box sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between', // Espaça os itens: um no início, um no meio, um no fim.
          alignItems: 'center' // Alinha os itens verticalmente ao centro.
        }}>

          {/* Seção Esquerda: Nome da Plataforma */}
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
            <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: "center", whiteSpace: 'nowrap' }}>
              <MenuIcon />
              Nexus Ambiental
            </Typography>
          </Box>

          {/* Seção Central: Menu de Navegação */}
          <Box sx={{ flex: 2, display: 'flex', justifyContent: 'center', fontSize: '20  px' }}>
            {menuItems.map((item) => (
              <Button
                key={item}
                href="#" // O componente Button pode receber um href e se comportará como um link
                color="inherit"
                
                sx={{
                  margin: '0 10px',
                  padding: '6px 8px',
                  borderRadius: '4px',
                  transition: 'background-color 0.3s ease',
                  textTransform: 'none', // Impede que o texto do botão fique em maiúsculas
                  fontSize: 'inherit',   // Garante que o tamanho da fonte seja o mesmo
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    color:'inherit'
                  },
                }}
              >
                {item}
              </Button>
            ))}
          </Box>

          {/* Seção Direita: Saudação e Botão Sair */}
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <Typography variant="body1" sx={{ marginRight: 2 }}>
              Olá, Usuário
            </Typography>
            <Button color="inherit" variant="outlined">
              Sair
            </Button>
          </Box>

        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
