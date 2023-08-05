import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import appRouter from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider} from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={appRouter} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
