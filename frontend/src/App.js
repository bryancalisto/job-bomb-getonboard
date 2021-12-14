import React, { useRef } from "react";
import "./App.css";

function App() {
  let keepAliveId = useRef(null);

  function connect(url, keepAlive, keepAlivePeriod) {
    try {
      const ws = new WebSocket(url);

      if (keepAlive) {
        clearInterval(keepAliveId.current);
        keepAliveId.current = setInterval(() => {
          ws.send("ping");
        }, keepAlivePeriod || 5000);
      }

      ws.onopen = () => {
        console.log("Websocket is open");
      };

      ws.onclose = () => {
        console.log("Websocket closed");
      };

      ws.onerror = (e) => {
        console.log("Websocket error", e);
      };

      ws.onmessage = (message) => {
        console.log("Websocket data", message.data);
      };
    } catch (e) {
      console.log("Error in websocket connection: ", e);
    }
  }

  return (
    <div className="App">
      <h1>Página principal</h1>
      <button onClick={() => connect("ws://localhost:8000", true, 5000)}>
        CONNECT
      </button>
    </div>
  );
}

export default App;
