// подключение express
const express = require("express");
// создаем объект приложения
const app = express();
// определяем обработчик для маршрута "/"
app.use(express.static(__dirname + '/public'));
// начинаем прослушивать подключения на 3000 порту
app.listen(3000);
