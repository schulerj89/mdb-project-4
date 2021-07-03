const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const path = require('path');

// Register '.html' extension with The Mustache Express
app.engine('html', mustacheExpress());

// Register body parsing
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

// view engine setup
app.set('views', path.join(__dirname, '/site'));
app.set('view engine', 'html');

// Load the routes
app.use(express.static('public'))
app.use(express.static('node_modules/bootstrap/dist'))
app.use(require('./site/router'));
app.use('/api', require('./api/router'));

module.exports = app;