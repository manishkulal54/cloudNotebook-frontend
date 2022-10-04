import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //removed " <React.StrictMode></React.StrictMode> " for not render twice
    <App />
);

reportWebVitals();
