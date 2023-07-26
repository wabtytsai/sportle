const express = require('express');

const app = express();

// middleware for allowing react to fetch() from server
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, OPTIONS');
    next();
});

// An api endpoint that returns a short list of items
app.get('/api/getList', (req, res) => {
    const list = ['item1', 'item2', 'item3'];
    res.json(list);
    console.log('sent list of items');
})

app.get('/api/getWord', (req, res) => {
    const words = {
        "2023-07-19": "POUND",
        "2023-07-20": "CRANE",
        "2023-07-21": "STOOP",
    };

    const today = new Date().toJSON().slice(0, 10);
    res.json(words[today] || "TODAY");
    console.log('sent today\'s word');
})

app.listen(8000, () => {
    console.log(`listening on port ${8000}`);
})