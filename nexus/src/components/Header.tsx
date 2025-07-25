import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

// Array com os itens do menu
const menuItems = [
  { text: 'Dashboard', path: '/dashboard' },
  { text: 'Solicitações', path: '/solicitacoes' },
  { text: 'Rotas', path: '/rotas' },
  { text: 'Relatórios', path: '/relatorios' },
  { text: 'Gerenciar', path: '/gerenciar' },
];

/**
 * Componente de Cabeçalho (Header)
 * * Exibe uma barra de navegação no topo da página com:
 * - Logo/Nome da plataforma à esquerda.
 * - Itens de menu de navegação no centro.
 * - Saudação ao usuário e botão de sair à direita.
 */
const Header: React.FC = () => {
  // O estado e as funções de manipulação do menu devem estar DENTRO do componente.
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

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

          {/* Seção Esquerda: Nome da Plataforma e Menu Mobile */}
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
            {/* Ícone do Menu que só aparece em telas pequenas */}
            <MenuIcon
              sx={{ display: { xs: 'flex', md: 'none' }, marginRight: 1, cursor: 'pointer' }}
              onClick={handleMenuOpen} // Adiciona o evento de clique para abrir o menu
            />
            {/* Menu que é controlado pelo estado 'anchorEl' */}
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={open}
              onClose={handleMenuClose} // Fecha o menu se clicar fora
              sx={{
                display: { xs: 'block', md: 'none' },
                // Adicione esta parte para mudar o fundo
                '& .MuiPaper-root': {
                  backgroundColor: (theme) => theme.palette.primary.main, // <-- Sua cor de fundo aqui
                },
              }}
            >
              {menuItems.map((item) => (
                <MenuItem key={item.text} onClick={handleMenuClose} component="a" href={item.path} sx={{ color: '#FFFFFF' }}>
                  <Typography textAlign="center">{item.text}</Typography>
                </MenuItem>
              ))}
            </Menu>
            
            <Typography variant="h6" component="div" sx={{ whiteSpace: 'nowrap' }}>
              Nexus Ambiental
            </Typography>
          </Box>

          {/* Seção Central: Menu de Navegação para Desktop */}
          <Box sx={{
            flex: 2,
            display: { xs: 'none', md: 'flex' }, // Oculta em mobile, exibe em desktop
            justifyContent: 'center',
            fontSize: '20px'
          }}>
            {menuItems.map((item) => (
              <Button
                key={item.text}
                href={item.path} // O componente Button pode receber um href e se comportará como um link
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
                    color: 'inherit'
                  }
                }}
              >
                {item.text}
              </Button>
            ))}
          </Box>

          {/* Seção Direita: Saudação e Botão Sair */}
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <Typography variant="body1" sx={{ marginRight: 2, display: { xs: 'none', sm: 'block' } }}>
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
