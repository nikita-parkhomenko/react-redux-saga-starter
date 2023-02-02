
// outsource dependencies
import React from 'react';
import ReactDOM from 'react-dom/client';

// local dependencies
import App from './modules';

// import styles
import './styles';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
