// founder-rating-app/src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client'; // Use `react-dom/client` for createRoot
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')); // Create root with createRoot
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);