const express = require('express');
const app = express();

const route = require('./routes');
route(app);

module.exports = app;