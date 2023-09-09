import NBALogo from '../assets/NBA-logo.png';

export interface Routes {
    puzzle: string,
    playerList: string,
    logo: any
}

export const NBARoutes: Routes = {
    puzzle: 'http://localhost:8000/sports-grid/basketball',
    playerList: 'http://localhost:8000/sports-grid/basketball/players',
    logo: NBALogo
}