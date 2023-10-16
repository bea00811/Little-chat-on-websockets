import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './slices/configureStore.js';
import i18n from "i18next";
import Texts from './Components/Texts';

import {initReactI18next } from "react-i18next";

const i18nextInstance = i18n.createInstance();
i18nextInstance.use(initReactI18next) 
   .init({ 
    lng: "ru",
    fallbackLng: "ru",    
    resources: {
    ru: Texts,   
    },
  interpolation: {
  escapeValue: false,
    }
    });


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();