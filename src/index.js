
// outsource dependencies
import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { ProSidebarProvider } from 'react-pro-sidebar';

// local dependencies
import { AppRoot } from './pages';
import { store } from './constants';

// import styles
import './styles';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ProSidebarProvider>
        <AppRoot />
      </ProSidebarProvider>
    </Provider>
  </React.StrictMode>
);
