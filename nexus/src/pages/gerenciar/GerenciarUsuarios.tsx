import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import type { User } from '../../types';
import ConfirmacaoDialog from '../../components/ConfirmacaoDialog';

const GerenciarUsuarios = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  useEffect(() => {
    // Simulação de chamada de API
    const fetchedUsers: User[] = [
      {
        id: '1',
        name: 'João da Silva',
        email: 'joao.silva@example.com',
        role: 'admin',
      },
      {
        id: '2',
        name: 'Maria Oliveira',
        email: 'maria.oliveira@example.com',
        role: 'user',
      },
    ];
    setUsers(fetchedUsers);
  }, []);

  const handleEdit = (user: User) => {
    setSelectedUser(user);
  };

  const handleDelete = (user: User) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      setUsers(users.filter((user) => user.id !== userToDelete.id));
      setDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  const handleSaveChanges = () => {
    if (selectedUser) {
      setUsers(
        users.map((user) => (user.id === selectedUser.id ? selectedUser : user))
      );
      setSelectedUser(null);
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom sx={{ mt: 4, mb: 4 }}>
        Gerenciar Usuários
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEdit(user)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(user)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog de Edição */}
      <Dialog open={!!selectedUser} onClose={() => setSelectedUser(null)}>
        <DialogTitle>Editar Usuário</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nome"
            type="text"
            fullWidth
            value={selectedUser?.name || ''}
            onChange={(e) =>
              selectedUser &&
              setSelectedUser({ ...selectedUser, name: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={selectedUser?.email || ''}
            onChange={(e) =>
              selectedUser &&
              setSelectedUser({ ...selectedUser, email: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Role"
            type="text"
            fullWidth
            value={selectedUser?.role || ''}
            onChange={(e) =>
              selectedUser &&
              setSelectedUser({ ...selectedUser, role: e.target.value as 'admin' | 'user' })
            }
          />
          <TextField
            margin="dense"
            label="Senha"
            type="password"
            fullWidth
            value="123" // Valor de exemplo
            disabled
            autoComplete="current-password" // Adicionado para corrigir o aviso
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedUser(null)}>Cancelar</Button>
          <Button onClick={handleSaveChanges}>Salvar</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog de Confirmação de Exclusão */}
      <ConfirmacaoDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        title="Confirmar Exclusão"
        description={`Tem certeza de que deseja excluir o usuário ${userToDelete?.name}?`}
      />
    </Container>
  );
};

export default GerenciarUsuarios;
