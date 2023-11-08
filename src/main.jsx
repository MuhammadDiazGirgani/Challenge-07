import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from 'react-redux';
import store from './redux/store';
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
<GoogleOAuthProvider
        clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}
      >
  <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </React.StrictMode>
  </GoogleOAuthProvider>
  </Provider>
)