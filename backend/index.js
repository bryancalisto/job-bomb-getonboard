require('dotenv').config();
const express = require('express');
const WsServer = require('ws');
const { createServer } = require('http');
const { getJobOffers } = require('./controller');

const app = express();
const server = createServer(app);

function initWs() {
  const options = {
    noServer: true
  }

  return new WsServer.Server(options);
}

function initHttpServer(port) {
  app.get('/', (_, res) => {
    res.send('holaaa');
  });

  server.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`);
  });

  return app;
}

function initWebSocketServer(port = 8000) {
  initHttpServer(port);
  const wss = initWs();

  server.on('upgrade', async (req, socket, head) => {
    try {
      wss.handleUpgrade(req, socket, head, (ws) => {
        wss.emit('connection', ws, req);
      })
    } catch (e) {
      console.log('Socket upgrade failed', e);
      socket.destroy();
    }
  })

  return wss;
}

const wss = initWebSocketServer();

wss.on('connection', (ws) => {
  let pollingProcessId = setInterval(async () => {
    const offers = await getJobOffers();
    ws.send(JSON.stringify(offers));
  }, 10000);

  ws.on('message', (data) => {
    ws.send('message: ', data.toString());
  });

  ws.on('close', () => {
    clearInterval(pollingProcessId);
  });
});