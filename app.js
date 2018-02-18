const express = require("express"); // express
const bodyParser = require("body-parser"); // обработка форм
const app = express(); // объект приложения
const port = process.env.PORT || 3000;

app.use( (req, res, next) => { console.log(req,res); next(); } );
app.use(express.static(__dirname + "/public")); // middleware
app.listen(port); // слушаем порт


const users = {};
const ids = {};

app.post('/auth', (req, res) => {
   const username = req.body.username;
   const email = req.body.email;
   if (!username || !username) {
       return res.status(400).end();
   }
   if (!users[email]) {
       users[email] = {
           username,
           email,
           count: 0,
       };
   }
   const id = uuid();
   ids[id] = email;

   res.cookie('smth', id, {domain: 'localhost', expires: new Date(Date.now()) + 1000 * 60 * 10});
   res.json({id});
});

app.get('/me', (req, res) => {
   const id = req.cookies['smth'];
   const email = ids[id];
   if (!email || !users[email]) {
       return res.status(401).end();
   }

   users[email].count += 1;
   res.json(users[email]);
});