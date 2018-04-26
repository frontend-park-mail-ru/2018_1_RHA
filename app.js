'use strict';
const express = require('express'); // express
const bodyparser = require('body-parser');
const fallback = require('express-history-api-fallback');
const fileUpload = require('express-fileupload');
const path = require('path');

const app = express(); // объект приложения

const root = path.resolve(__dirname, 'public');
app.use(express.static(root)); // middleware
app.use(fallback('index.html', {root}));
app.use(bodyparser.json());
app.use(fileUpload());


const port = process.env.PORT || 3000;
app.listen(port);
