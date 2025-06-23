import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import '../css/app.css';
import { AuthProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('app')!).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
