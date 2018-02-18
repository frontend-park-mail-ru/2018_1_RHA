
const express = require("express"); // express
const bodyParser = require("body-parser"); // обработка форм
const app = express(); // объект приложения
const port = process.env.PORT || 3000;

app.use( (req, res, next) => { console.log(req,res); next(); } );
app.use(express.static(__dirname + "/public")); // middleware
app.listen(port); // слушаем порт
