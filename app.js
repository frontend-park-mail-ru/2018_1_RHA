'use strict';
const express = require("express"); // express
const cookie = require('cookie-parser');
const bodyparser = require('body-parser');
const fallback = require('express-history-api-fallback');
const path = require('path');

const app = express(); // объект приложения

const root = path.resolve(__dirname, 'public');
app.use(express.static(root)); // middleware
app.use(fallback('index.html', {root}));
app.use(bodyparser.json());


const port = process.env.PORT || 3000;
app.listen(3000);
