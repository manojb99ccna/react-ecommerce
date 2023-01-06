import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import './assets/stylesheet/main.css';
import LoaderFrame from './components/LoaderFrame';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import store from './app/store'
import { Provider } from 'react-redux';
import AlertMessage from './components/AlertMessage';

const root = ReactDOM.createRoot(document.getElementById('root'));

let persistor = persistStore(store)

root.render(
  <Provider store={store}>
  <PersistGate persistor={persistor}>
  <React.StrictMode>
    <App />
    <LoaderFrame/>
    <AlertMessage/>
  </React.StrictMode>
  </PersistGate>
  </Provider>
);


/* root.render(
  <React.StrictMode>
    <App />
    <LoaderFrame/>
  </React.StrictMode>
);
 */

reportWebVitals();
