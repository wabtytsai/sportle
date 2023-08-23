const express = require('express')
const router = express.Router()

const basketballData = require('../game_data/basketBallTeamData.json');
const { constructPuzzle } = require('./construct-puzzle');

router.get('/basketball', (_, res) => {
    const puzzle = constructPuzzle(basketballData);
    res.json(puzzle);
})

module.exports = router