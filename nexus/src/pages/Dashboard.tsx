import React from 'react';
import { Typography } from '@mui/material';

const Dashboard: React.FC = () => (
  <>
    <Typography variant="h4" component="h1" gutterBottom>
      Dashboard
    </Typography>
    <Typography paragraph>
      Bem-vindo ao seu Dashboard!
    </Typography>
  </>
);

export default Dashboard;