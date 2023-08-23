const seedrandom = require('seedrandom');

const shuffle = (array, seed=null) => {
    // use today's date as default seed
    const rng = seedrandom(seed || new Date().toJSON().slice(0, 10));

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const hasOverlap = (group1, group2) => {
    const setGroup1 = new Set(group1);
    const intersection = group2.filter(x => setGroup1.has(x));
    return (new Set(intersection)).size > 0;
}

const constructPuzzle = (teamsJSON) => {
    const teams = Object.keys(teamsJSON);
    const shuffledTeams = shuffle(teams);

    const rows = teams.slice(0, 3).map(team => teamsJSON[team]);
    const cols = [];

    for (let i = 3; i < teams.length; i++) {
        const col = teamsJSON[teams[i]];
        if (rows.every(row => hasOverlap(row.Players, col.Players))) {
            cols.push(col);
        }

        if (cols.length === 3) {
            break;
        }
    }

    return {
        rows,
        cols
    };
}

module.exports = { constructPuzzle }