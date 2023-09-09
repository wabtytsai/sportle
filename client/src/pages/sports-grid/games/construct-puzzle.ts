import seedrandom from 'seedrandom';

const PUZZLE_SIZE = 3;
type Team = {
    Name: string,
    Logo: string,
    Players: string[],
};
type TeamsData = Record<string, Team>;

const shuffle = (array: any[], seed=null) => {
    // use today's date as default seed
    const rng = seedrandom(seed || new Date().toJSON().slice(0, 10));

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const hasOverlap = (group1: Team['Players'], group2: Team['Players']) => {
    const setGroup1 = new Set(group1);
    const intersection = group2.filter(x => setGroup1.has(x));
    return (new Set(intersection)).size > 0;
}

export const constructPuzzle = (teamsJSON: TeamsData) => {
    const teams = Object.keys(teamsJSON);
    shuffle(teams);

    const rows = teams.slice(0, PUZZLE_SIZE).map(team => teamsJSON[team]);
    const cols = [];

    for (let i = PUZZLE_SIZE; i < teams.length; i++) {
        const col = teamsJSON[teams[i]];
        if (rows.every(row => hasOverlap(row.Players, col.Players))) {
            cols.push(col);
        }

        if (cols.length === PUZZLE_SIZE) {
            break;
        }
    }

    return {
        rows,
        cols
    };
}