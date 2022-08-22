import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Auth0Provider 
      domain='playlistic.us.auth0.com'
      clientId='lKUMbru9ououI3x88ZB5QmRnKz1oANVT'
      redirectUri={window.location.origin}>
    <App />
    </Auth0Provider>
  </React.StrictMode>
);