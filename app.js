'use strict';
const express = require("express"); // express
const cookie = require('cookie-parser');
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

app.get('/avatar', (res, req) => {
    const avatar = req.query.avatar;
    res.sendFile(path.resolve(__dirname, 'avatars', avatar));
});

app.post('/avatar', (res, req) => {
    console.log(req.files);
    const avatar = req.files.avatar;
    let avName = '';
    try {
        avName = avatar.name;
        avatar.mv('./avatars/' + avatar.name, (err) => {
            if (err) {
                console.log(err);
            }
        });
    } catch (err) {
      console.log('one more', err);
    }
    res.status(201).json();
});


const port = process.env.PORT || 3000;
app.listen(port);
