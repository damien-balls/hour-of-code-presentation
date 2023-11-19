const express = require('express');
const fs = require('fs');
const body = require('body-parser');
import { configDotenv } from 'dotenv';
var foo = require('./download.js')

const app = express();
const port = 8080;
var thing;
app.use(express.static('balls/'));
app.use(express.json());
app.use(body.urlencoded({ extended: false }));

console.log('started');

app.use('/', (req, res, next) => {
    console.log('Starte dsomethign');
    req.on("finish", () => {
        console.log('what hapepen');
    })
    res.on('finish', () => {
        console.log('finish something');
    });
    next();
});

app.get('/', (req, res) => {
    console.log('GET req: ' + req + 'res: ' + res);
    console.log('it got');
    res.send('recievd');
    thing = req.body;
    console.log(thing);
});

app.post('/', (req, res) => {
    const link = req.body.input;
    url = link;
    console.log('input: ' + link + ' also ' + url);
    res.redirect('/one');
    res.on('finish', () => {
        console.log('it finished');
    })
});

app.listen(port, () => console.log('startin and fartin'));