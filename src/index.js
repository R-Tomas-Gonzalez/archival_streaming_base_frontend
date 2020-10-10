import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from '../src/App';
import * as serviceWorker from './serviceWorker';
import './fonts/Moon-Light.otf'
import './fonts/Moon2.0-Light.otf'
import './fonts/Moon2.0-Regular.otf'

ReactDOM.render(
  // <React.StrictMode>
    <App />,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
