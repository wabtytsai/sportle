import teamsDataJSON from './data/basketball-teams.json';
import playersDataJSON from './data/basketball-players.json';
import { Game, TeamsData, PlayersData } from './game';
import Logo from '../../../assets/NBA-logo.png';

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
        return Logo;
    }

}