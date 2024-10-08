import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import { Provider } from 'react-redux';
import Store from './scripts/StoreComponent'; 
import App from './scripts/App';
const rootElement=document.getElementById('root') as HTMLElement;
const root= ReactDOM.createRoot(rootElement)

root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <App />
    </Provider>
  </React.StrictMode>
);
