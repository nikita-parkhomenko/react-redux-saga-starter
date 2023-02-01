
// outsource dependencies
import React from 'react';
import ReactDOM from 'react-dom/client';

// local dependencies
import App from './modules';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
