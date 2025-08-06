import { useState } from 'react';
import { nanoid } from 'nanoid';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
// Corrigido o caminho de importação
import { FormBuilder, FormCanvas, type FormField } from '../../components/FormBuilder';

// --- TIPOS E DADOS INICIAIS ---

interface MockForm {
    id: string;
    name: string;
    description: string;
    lastModified: string;
    fields: FormField[];
}

// Corrigido os tipos dos campos de formulário para corresponder à interface FormField
const initialMockForms: MockForm[] = [
    { 
        id: 'FORM-001', 
        name: 'Laudo de Vistoria Padrão', 
        description: 'Formulário completo para vistorias de rotina.', 
        lastModified: '2025-08-05',
        fields: [
            // Alterado 'text' para 'textarea'
            { id: nanoid(), type: 'textarea', label: 'Endereço', placeholder: 'Rua, Número, Bairro' },
            { id: nanoid(), type: 'date', label: 'Data da Vistoria' },
            { id: nanoid(), type: 'select', label: 'Tipo de Vistoria', options: ['Poda', 'Supressão', 'Análise'] },
            { id: nanoid(), type: 'textarea', label: 'Observações', placeholder: 'Descreva a situação...' },
            // Alterado 'checkbox' para 'checkbox-group' e adicionado 'options'
            { id: nanoid(), type: 'checkbox-group', label: 'Risco Iminente?', options: ['Sim'] },
        ]
    },
    { 
        id: 'FORM-002', 
        name: 'Solicitação de Supressão', 
        description: 'Formulário simplificado para pedidos de supressão.', 
        lastModified: '2025-07-28',
        fields: [
            // Alterado 'text' para 'textarea'
            { id: nanoid(), type: 'textarea', label: 'Nome do Solicitante', placeholder: 'Nome completo' },
            // Alterado 'email' para 'textarea'
            { id: nanoid(), type: 'textarea', label: 'Email de Contato', placeholder: 'exemplo@email.com' },
            { id: nanoid(), type: 'file', label: 'Anexar Documento' },
        ]
    },
    { 
        id: 'FORM-003', 
        name: 'Análise de Risco', 
        description: 'Checklist para análise de risco de queda de árvores.', 
        lastModified: '2025-06-15',
        fields: [
            { id: nanoid(), type: 'number', label: 'Nível de Risco (1-5)', placeholder: '1' },
            { id: nanoid(), type: 'multiselect', label: 'Sinais de Risco', options: ['Galhos secos', 'Inclinação acentuada', 'Cavidades no tronco', 'Raízes expostas'] },
            // Alterado 'checkbox' para 'checkbox-group' e adicionado 'options'
            { id: nanoid(), type: 'checkbox-group', label: 'Requer ação imediata?', options: ['Sim'] },
        ]
    },
];

// --- COMPONENTE PRINCIPAL ---

export default function GerenciarFormularios() {
  const [tabIndex, setTabIndex] = useState(0);
  const [fields, setFields] = useState<FormField[]>([]);
  const [forms, setForms] = useState<MockForm[]>(initialMockForms);
  const [formToView, setFormToView] = useState<MockForm | null>(null);
  const [formToDelete, setFormToDelete] = useState<MockForm | null>(null);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const handleOpenViewDialog = (form: MockForm) => setFormToView(form);
  const handleCloseViewDialog = () => setFormToView(null);

  const handleEditForm = (form: MockForm) => {
    setFields(form.fields);
    setTabIndex(1);
  };

  const handleOpenDeleteDialog = (form: MockForm) => setFormToDelete(form);
  const handleCloseDeleteDialog = () => setFormToDelete(null);

  const handleConfirmDelete = () => {
    if (formToDelete) {
      setForms(forms.filter(f => f.id !== formToDelete.id));
      handleCloseDeleteDialog();
    }
  };

  return (
    <Box sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
            Gerenciar Formulários
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs value={tabIndex} onChange={handleTabChange} aria-label="abas de formulários">
                <Tab label="Meus Formulários" />
                <Tab label="Editor de Formulário" />
            </Tabs>
        </Box>

        {tabIndex === 0 && (
            <Paper sx={{ p: 2 }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nome do Formulário</TableCell>
                                <TableCell>Descrição</TableCell>
                                <TableCell>Última Modificação</TableCell>
                                <TableCell align="right">Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {forms.map((form) => (
                                <TableRow key={form.id}>
                                    <TableCell component="th" scope="row">{form.name}</TableCell>
                                    <TableCell>{form.description}</TableCell>
                                    <TableCell>{new Date(form.lastModified).toLocaleDateString()}</TableCell>
                                    <TableCell align="right">
                                        <IconButton size="small" aria-label="visualizar" onClick={() => handleOpenViewDialog(form)}>
                                            <VisibilityIcon />
                                        </IconButton>
                                        <IconButton size="small" aria-label="editar" onClick={() => handleEditForm(form)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton size="small" aria-label="deletar" onClick={() => handleOpenDeleteDialog(form)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        )}

        {tabIndex === 1 && (
            <FormBuilder fields={fields} setFields={setFields} />
        )}

        <Dialog open={!!formToView} onClose={handleCloseViewDialog} maxWidth="sm" fullWidth>
            <DialogTitle>Visualizar Formulário: {formToView?.name}</DialogTitle>
            <DialogContent>
                {formToView && <FormCanvas fields={formToView.fields} />}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseViewDialog}>Fechar</Button>
            </DialogActions>
        </Dialog>

        <Dialog open={!!formToDelete} onClose={handleCloseDeleteDialog}>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Tem certeza que deseja excluir o formulário "{formToDelete?.name}"? Essa ação não pode ser desfeita.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDeleteDialog}>Cancelar</Button>
                <Button onClick={handleConfirmDelete} color="error">Excluir</Button>
            </DialogActions>
        </Dialog>
    </Box>
  );
}
