import teamData from './data/basketball-team.json';
import { constructPuzzle } from './construct-puzzle';

export function getPuzzle() {
    const puzzle = constructPuzzle(teamData);
    return puzzle;
};