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

  const supportedLocales = ['en', 'hu', 'de'];
  const defaultLocale = 'en';
  const matches = req.url.match(/^\/([a-z]{2}(?:-[A-Z]{2})?)\//);

  // check if the requested url has a correct format '/locale' and matches any of the supportedLocales
  const locale = (matches && supportedLocales.indexOf(matches[1]) !== -1) ? matches[1] : defaultLocale;
  console.log(`requested locale: ${locale}`);

  res.sendFile(path.join(_app_folder, locale, 'index.html'));

  // res.render(`${locale}/index`, {
  //   req,
  //   providers: [
  //     {provide: 'language', useFactory: () => locale, deps: []},
  //   ]
  // });
});

app.listen(port, () => console.log(`Running on http://localhost:${port} ...`));
