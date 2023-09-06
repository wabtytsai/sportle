const express = require('express')
const router = express.Router()

const basketballData = require('../game_data/basketBallTeamData.json');
const { constructPuzzle } = require('./construct-puzzle');
const { getPlayerList } = require('./get-player-list');

router.get('/basketball', (_, res) => {
    const puzzle = constructPuzzle(basketballData);
    res.json(puzzle);
})

router.get('/basketball/players', (_, res) => {
    const players = getPlayerList();
    res.json(players);
});

module.exports = router