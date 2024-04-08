import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/';

import {Provider} from 'react-redux';
import {store} from './store';

import {ToastContainer} from 'react-toastify';
import {BrowserRouter} from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ToastContainer />
        <App/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
