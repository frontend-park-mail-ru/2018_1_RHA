'use strict';
const express = require("express"); // express
const cookie = require('cookie-parser');
const bodyparser = require('body-parser');

const app = express(); // объект приложения

app.use(express.static(__dirname + "/public")); // middleware
app.use(bodyparser.json());

const users = {
    'a.ostapenko@corp.mail.ru': {
        email: 'a.ostapenko@corp.mail.ru',
        password: 'password',
        age: 20,
        score: 72
    },
    'd.dorofeev@corp.mail.ru': {
        email: 'd.dorofeev@corp.mail.ru',
        password: 'password',
        age: 20,
        score: 100500
    },
    'a.udalov@corp.mail.ru': {
        email: 'a.udalov@corp.mail.ru',
        password: 'password',
        age: 20,
        score: 72
    },
    'marina.titova@corp.mail.ru': {
        email: 'marina.titova@corp.mail.ru',
        password: 'password',
        age: 20,
        score: 72
    },
    'a.tyuldyukov@corp.mail.ru': {
        email: 'a.tyuldyukov@corp.mail.ru',
        password: 'password',
        age: 20,
        score: 72
    }
};

const ids = {};

app.post('/signup', function (req, res) {
    console.log(req.body.Body);
    // res.cookie('frontend', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
    res.status(201).json({id});
});


app.post('/forms', function (req, res) {
    console.log(req.body.username);
    console.log(req.body.email);
    // res.cookie('frontend', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
    res.status(201).json({msg: "Hura, Wir leben noch!"});
});


app.get('/me', function (req, res) {
    const id = req.cookies['frontend'];
    const email = ids[id];
    if (!email || !users[email]) {
        return res.status(401).end();
    }

    users[email].score += 1;

    res.json(users[email]);
});


app.get('/users', function (req, res) {
    const scorelist = Object.values(users)
        .sort((l, r) => r.score - l.score)
        .map(user => {
            return {
                email: user.email,
                age: user.age,
                score: user.score
            };
        });

    res.json(scorelist);
});

const port = process.env.PORT || 3000;
app.listen(port);
