"use strict";

const compression = require('compression')
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

const imgDir = '/img/';

app.use(compression({ filter: shouldCompress }));

function shouldCompress(req, res) {
    if (req.originalUrl.indexOf('.js') == -1) {
        return false
    }
    return compression.filter(req, res)
}

app.use('/', express.static(path.join(__dirname, 'public')));

app.use('/imgs', function (req, res) {
    fs.readdir(path.join(__dirname, 'public' + imgDir), (err, files) => res.json({ files: files, imgDir: imgDir }));
});

const port = process.env.PORT || 9090;

app.listen(port);
console.log('Listening on ' + port);