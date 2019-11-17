const express = require('express');
const http = require('http');
const path = require('path');
const compression = require("compression");
const bodyParser = require('body-parser');

const _app_folder = path.join(__dirname, '/dist/frontend');
const port = process.env.PORT || 3000;

const app = express();
app.use(compression());
app.use(bodyParser.json());
app.use(express.static(_app_folder));

const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer();

app.all('/api/*', (req, res) => {
  console.log('redirecting to api server');
  apiProxy.web(req, res, {target: 'http://localhost:1234'});
});

app.use(function(req, res) {
  res.sendFile(path.join(_app_folder, 'index.html'));
});

app.listen(port, () => console.log('Running...'));
