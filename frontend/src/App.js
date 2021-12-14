import React, { useRef } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  let keepAliveId = useRef(null);

  function connect(url, keepAlive, keepAlivePeriod) {
    try {
      const ws = new WebSocket(url);

      if (keepAlive) {
        clearInterval(keepAliveId.current);
        keepAliveId.current = setInterval(() => {
          ws.send('ping');
        }, keepAlivePeriod || 5000);
      }

      ws.onopen = () => {
        console.log('Websocket is open');
      }

      ws.onclose = () => {
        console.log('Websocket closed');
      }

      ws.onerror = (e) => {
        console.log('Websocket error', e);
      }

      ws.onmessage = (message) => {
        console.log('Websocket data', message.data);
      }

    } catch (e) {
      console.log('Error in websocket connection: ', e);
    }
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={() => connect('ws://localhost:8000', true, 5000)}>CONNECT</button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
