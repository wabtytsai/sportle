import Table from 'react-bootstrap/Table';
import React, { useMemo, useRef } from 'react';
import PlayerInput from './components/PlayerInput';
import TeamLogo from './components/TeamLogo';
import { Player, type Game, type Puzzle } from './games/game';
import { getSportsGame, SportsType } from './games/sports-game-service';
import './SportsGrid.css';

type Props = {
    sports: SportsType,
}

export default function Grid({ sports }: Props) {
    const gameService = useRef<Game>(getSportsGame(sports));

    const puzzle: Puzzle = useMemo<Puzzle>(() => gameService.current.getPuzzle(), []);
    const players: Player[] = gameService.current.getPlayers();

    const tableHeaders = puzzle.cols.map(team => (<TeamLogo key={team.Name} source={team.Logo} />));
    const tableRows = [];

    for (let i = 0; i < puzzle.rows.length; i++) {
        const team = puzzle.rows[i];
        tableRows.push(
            <tr key={i}>
                <TeamLogo source={team.Logo} />
                <td><PlayerInput teams={{ col: puzzle.cols[0], row: puzzle.rows[i] }} players={players} /></td>
                <td><PlayerInput teams={{ col: puzzle.cols[1], row: puzzle.rows[i] }} players={players} /></td>
                <td><PlayerInput teams={{ col: puzzle.cols[2], row: puzzle.rows[i] }} players={players} /></td>
            </tr>
        );
    }


    return (
        <Table variant="white" bordered={true}>
            <thead>
                <tr>
                    <TeamLogo source={gameService.current.getLogo()} />
                    {tableHeaders}
                </tr>
                {tableRows}
            </thead>
        </Table>
    )
}