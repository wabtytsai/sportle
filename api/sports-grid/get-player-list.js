const basketballData = require('../game_data/basketBallTeamData.json');

var cachedPlayers;

const getPlayerList = () => {
    if (!!cachedPlayers) {
        return cachedPlayers;
    }

    const players = new Set();

    Object.keys(basketballData).forEach(team => {
        basketballData[team]['Players'].forEach(player => {
            players.add(player);
        })
    });

    cachedPlayers = Array.from(players);

    return cachedPlayers;
}

module.exports = { getPlayerList }