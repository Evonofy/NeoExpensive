import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './App';
import './global.css';
import '../../html/css/main.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('app')
);
