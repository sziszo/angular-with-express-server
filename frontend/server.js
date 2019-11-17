const express = require('express');
const http = require('http');
const path = require('path');
const compression = require("compression");
const bodyParser = require('body-parser')

const _app_folder = 'dist/frontend';
const port = process.env.PORT || 3000;

const app = express();
app.use(compression());
app.use(bodyParser.json())
app.use(express.static(__dirname + '/dist/frontend'));

const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer();

app.all('/api/*', (req, res) => {
  console.log('redirecting to Server1');
  apiProxy.web(req, res, {target: 'http://localhost:1234'});
});

app.use(function(req, res) {
  res.sendFile(path.join(__dirname, '/dist/frontend', 'index.html'));
})

// const server = http.createServer(app);
// app.use(express.static(__dirname + '/dist/frontend'));

app.listen(port, () => console.log('Running...'));
