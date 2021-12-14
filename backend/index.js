require('dotenv').config();
const express = require('express');
const WsServer = require('ws');
const { createServer } = require('http');
const { getJobOffers } = require('./controllers/jobOffersCtl');

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
  /* Poll professional offers every 10 seconds and send the results to the frontend. 
    This will be displayed in the venue's screen */
  let pollingProcessId = setInterval(async () => {
    const offers = await getJobOffers();
    if (offers) {
      // ws.send(JSON.stringify(offers[0].attributes.title));
      ws.send('asdffd');
    }
  }, 5000);

  ws.on('message', (data) => {
    ws.send('hello');
  });

  ws.on('close', () => {
    clearInterval(pollingProcessId);
  });
});