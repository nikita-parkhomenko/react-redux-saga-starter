
// outsource dependencies
import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';

// local dependencies
import { AppRoot } from './modules';
import { store } from './constants';

// import styles
import './styles';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRoot />
    </Provider>
  </React.StrictMode>
);
