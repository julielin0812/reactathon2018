import React from 'react';
import ReactDOM from 'react-dom';
import '@opentok/client'

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { configureStore } from './store/store'

import {
  SAMPLE_SERVER_BASE_URL,
  API_KEY,
  SESSION_ID,
  TOKEN
} from './config';

// store setup
let store = configureStore()

// TokBox credentials setup
function renderApp(credentials) {
  ReactDOM.render(
    <App credentials={credentials} store={store}/>,
    document.getElementById('root')
  );
}

if (API_KEY && TOKEN && SESSION_ID) {
  renderApp({
    apiKey: API_KEY,
    sessionId: SESSION_ID,
    token: TOKEN,
  });
} else {
  fetch(SAMPLE_SERVER_BASE_URL + '/session')
    .then(data => data.json())
    .then(renderApp)
    .catch((err) => {
      console.error('Failed to get session credentials', err);
      alert('Failed to get opentok sessionId and token. Make sure you have updated the config.js file.');
    });
}

document.addEventListener('DOMContentLoaded', () => {
  registerServiceWorker();
})

