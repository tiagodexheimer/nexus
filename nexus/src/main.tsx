// src/main.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* O BrowserRouter é necessário para que as rotas (Routes) funcionem no App. */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);