import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import './styles/style.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

const root = createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />,
  </BrowserRouter>
);
