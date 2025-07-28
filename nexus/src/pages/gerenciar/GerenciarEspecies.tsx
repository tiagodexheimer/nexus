import React from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';

const mockSpecies = [
    { id: 1, commonName: 'Ipê-roxo', scientificName: 'Handroanthus heptaphyllus', family: 'Bignoniaceae', origin: 'América do S-LC', risk: 'LC', synonym: 'Bignonia heptaphylla Vell. (basônimo)' },
    { id: 2, commonName: 'Jambolão', scientificName: 'Syzygium cumini', family: 'Myrtaceae', origin: 'Índia', risk: 'LC', synonym: 'Myrtus cumini L.' },
];


const GerenciarEspecies: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Gerenciar Espécies Arbóreas
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button variant="contained">Enviar espécies em lote</Button>
          <TextField label="Filtro" variant="outlined" size="small" sx={{ flexGrow: 1 }} />
        </Box>
      </Paper>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="tabela de espécies">
          <TableHead>
            <TableRow>
              <TableCell>Nome Comum</TableCell>
              <TableCell>Nome Científico</TableCell>
              <TableCell>Família</TableCell>
              <TableCell>Origem</TableCell>
              <TableCell>Grau de Ameaça</TableCell>
              <TableCell>Sinonímia</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockSpecies.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.commonName}</TableCell>
                <TableCell>{row.scientificName}</TableCell>
                <TableCell>{row.family}</TableCell>
                <TableCell>{row.origin}</TableCell>
                <TableCell>{row.risk}</TableCell>
                <TableCell>{row.synonym}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default GerenciarEspecies;