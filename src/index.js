import React from 'react';
import ReactDOM from 'react-dom';
import { GlobalStyle } from './style.js';
import { GlobalIcon } from './statics/iconfont/iconfont.js';
import App from './App';

ReactDOM.render(
  (
    <div>
      <GlobalStyle/>
      <GlobalIcon/>
      <App />
    </div>

  ),
  document.getElementById('root'));
