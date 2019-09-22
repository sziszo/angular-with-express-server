const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/dist/frontend'));

app.get('/*', (req, res) => res.sendFile(path.join(__dirname)));

const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer();

app.all('/api/*', (req, res) => {
  console.log('redirecting to Server1');
  apiProxy.web(req, res, {target: 'http://localhost:1234'});
});

const server = http.createServer(app);

server.listen(port, () => console.log('Running...'));
