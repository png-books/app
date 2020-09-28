import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

async function apiWrapper(fn, onSuccess, onError = console.error, ...args) {
  try {
    console.log(fn);
    console.log(args);
    await fn(args);
    onSuccess();
  } catch (err) {
    onError(err.message);
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App fn={apiWrapper} />
  </React.StrictMode>,
  document.getElementById('root')
);
