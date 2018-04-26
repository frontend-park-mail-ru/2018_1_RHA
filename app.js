'use strict';
const express = require('express'); // express
const bodyparser = require('body-parser');
const fallback = require('express-history-api-fallback');
const fileUpload = require('express-fileupload');
const path = require('path');
// const debug = require('debug');
// const logger = debug('mylogger');

const app = express(); // объект приложения

const root = path.resolve('./public/');
app.use(express.static(root)); // middleware
// app.use(fallback('index.html', {root}));
app.use(bodyparser.json());
// app.use(fileUpload());

//todo сделать путь к sw

function sendIndex(req, res) {
	let indexFile = root + '/' + 'index.html';
	res.sendFile(indexFile);
}

app.get('/*', sendIndex);
// app.get('/singleplayer', sendIndex);
// app.get('/*', (req, res) => {
// 	res.sendFile(path.join(root, 'index.html'));
// });


const port = process.env.PORT || 3000;
app.listen(port);
