import teamsDataJSON from './data/basketball-teams.json';
import playersDataJSON from './data/basketball-players.json';
import { Game, TeamsData, PlayersData } from './game';

export class BasketballGame extends Game {
    private playersData: PlayersData;
    private teamsData: TeamsData;

    constructor() {
        super();
        this.playersData = playersDataJSON as PlayersData;
        this.teamsData = teamsDataJSON as TeamsData;
    }

    public getTeamsData(): TeamsData {
        return this.teamsData;
    }

    public getPlayersData(): PlayersData {
        return this.playersData;
    }

    public getLogo(): string {
        // TODO(tian) store this locally rather than rely on cdn of someone's png
        return 'https://cdn.ssref.net/req/202308101/tlogo/bbr/NBA.png'
    }

}