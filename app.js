'use strict';
const express = require("express"); // express
const cookie = require('cookie-parser');
const bodyparser = require('body-parser');

const app = express(); // объект приложения

app.use(express.static(__dirname + "/public")); // middleware
app.use(bodyparser.json());



const port = process.env.PORT || 3000;
app.listen(port);
