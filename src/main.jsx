import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Foundational Core Style Ingestion Pipeline
import './styles/variables.css';
import './index.css';
import './styles/globals.css';

/**
 * Root Application Mounting Node
 * Enforces React.StrictMode to flag runtime rendering side-effects,
 * memory leaks, and legacy lifecycle deprecation warnings.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);