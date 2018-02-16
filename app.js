
const express = require("express"); // express

const fs = require("fs"); // логирование

const bodyParser = require("body-parser"); // обработка форм

const app = express(); // объект приложения

const urlencodedParser = bodyParser.urlencoded({extended: false});

// app.post("/register", urlencodedParser, (request, response) => {
//
//     if( !request.body ) return response.sendStatus(400);
//
//     console.log(request.body);
//
//   response.send(`${request.body.userName} - ${request.body.userAge}`);
//
// });

app.use(express.static(__dirname + "/public")); // middleware

app.listen(3000); // слушаем порт

