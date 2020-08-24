import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { startWebsocketConnection } from './websocket';
 

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
startWebsocketConnection();

const query = new URLSearchParams(window.location.search);
const test = query.get('test');
const id = query.get('id');

window.username = id;

if(test) window.textbar.startTestHandler(id);

//Created by Håkan Hallberg for Creative Technology
