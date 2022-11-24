const express = require('express');

var app = express();

app.get('/', (req, res) => {
    res.send('Welcome to Maxisolve...')
});

app.listen(5000, console.log('app'))