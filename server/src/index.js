const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const cors = require('cors');
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000']
  }));

const route = require('./routes');
route(app);

module.exports = app;