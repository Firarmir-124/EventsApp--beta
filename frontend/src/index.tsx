import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { persistor, store } from './app/store';
import { addInterceptors } from './axios';
import DialogsProvider from './components/Dialogs/DialogsProvider';

addInterceptors(store);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <DialogsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </DialogsProvider>
    </PersistGate>
  </Provider>,
);
