import seedrandom from "seedrandom";

export type Team = {
    Name: string,
    Logo: string,
    Players: string[],
};
export type TeamsData = Record<string, Team>;
export type Player = {
    player_name: string,
    player_bday: string,
    player_img: string,
    player_team_data: string[][],
    [key: string]: any, // allowing arbitrary fields
}
export type PlayersData = Record<string, Player>;
export type Puzzle = {
    rows: Team[],
    cols: Team[],
}

export abstract class Game {
    static get PUZZLE_SIZE() { return 3; }

    public getPuzzle(): Puzzle {
        const teamsData = this.getTeamsData();
        const teams = Object.keys(teamsData);
        this.shuffle(teams);

        const rows = teams.slice(0, Game.PUZZLE_SIZE)
            .map(team => teamsData[team]);
        const cols = [];

        for (let i = Game.PUZZLE_SIZE; i < teams.length; i++) {
            const col = teamsData[teams[i]];
            if (rows.every(row => this.hasOverlap(row.Players, col.Players))) {
                cols.push(col);
            }

            if (cols.length === Game.PUZZLE_SIZE) {
                break;
            }
        }

        return {
            rows,
            cols
        };
    }

    public getPlayers(): Player[] {
        return Object.values(this.getPlayersData());
    }

    public abstract getTeamsData(): TeamsData;
    public abstract getPlayersData(): PlayersData;
    public abstract getLogo(): string;

    private shuffle(array: any[], seed=null): any[] {
        // use today's date as default seed
        const rng = seedrandom(seed || new Date().toJSON().slice(0, 10));
    
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(rng() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    private hasOverlap(group1: Team['Players'], group2: Team['Players']): boolean {
        const setGroup1 = new Set(group1);
        const intersection = group2.filter(x => setGroup1.has(x));
        return (new Set(intersection)).size > 0;
    }
}