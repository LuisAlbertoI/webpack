import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

const App = () => {
  return (
    <div>Welcome to React</div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);