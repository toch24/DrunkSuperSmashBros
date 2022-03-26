import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./style.css";
import "./fonts/super_smash.ttf"


export const fetch_url = 'http://127.0.0.1:8080'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
