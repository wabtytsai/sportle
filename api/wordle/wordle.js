const express = require('express')
const router = express.Router()

// define the home page route
router.get('/getWord', (req, res) => {
    const words = {
        "2023-07-19": "POUND",
        "2023-07-20": "CRANE",
        "2023-07-21": "STOOP",
    };

    const today = new Date().toJSON().slice(0, 10);
    res.json(words[today] || "TODAY");
})

module.exports = router