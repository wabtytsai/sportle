const express = require('express');
const wordle = require('./wordle/wordle');
const sportsGrid = require('./sports-grid/sports-grid');

const app = express();

// middleware for allowing react to fetch() from server
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, OPTIONS');
    next();
});

app.use('/wordle', wordle);

app.use('/sports-grid', sportsGrid);


app.listen(8000, () => {
    console.log(`listening on port ${8000}`);
})