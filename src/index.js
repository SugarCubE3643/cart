import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import firebaseApp from './firebase';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App app={firebaseApp}/>
  </React.StrictMode>
);
