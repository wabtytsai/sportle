import Table from 'react-bootstrap/Table';
import React, { useMemo, useRef } from 'react';
import PlayerInput from './components/PlayerInput';
import TeamLogo from './components/TeamLogo';
import { type Game, type Puzzle } from './games/game';
import { getSportsGame, SportsType } from './games/sports-game-service';
import './SportsGrid.css';

export default function Grid() {
    const gameService = useRef<Game>(getSportsGame(SportsType.NBA));

    const puzzle = useMemo<Puzzle>(() => gameService.current.getPuzzle(), []); 
    const playerNames = useMemo<string[]>(() => {
        const players = gameService.current.getPlayers();
        return players.map(player => player.player_name);
    }, []);

    const tableHeaders = puzzle.cols.map(team => (<TeamLogo key={team.Name} source={team.Logo}/>));
    const tableRows = [];

    for (let i = 0; i < puzzle.rows.length; i++) {
        const team = puzzle.rows[i];
        tableRows.push(
            <tr key={i}>
                <TeamLogo source={team.Logo}/>
                <td><PlayerInput pos={{col: 0, row: i}} players={playerNames} /></td>
                <td><PlayerInput pos={{col: 1, row: i}} players={playerNames} /></td>
                <td><PlayerInput pos={{col: 2, row: i}} players={playerNames} /></td>
            </tr>
        );
    }
    

    return (
        <Table variant="white" bordered={true}>
            <thead>
                <tr>
                    <TeamLogo source={gameService.current.getLogo()}/>
                    {tableHeaders}
                </tr>
                {tableRows}
            </thead>
        </Table>
    )
}