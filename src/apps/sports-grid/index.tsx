import Table from 'react-bootstrap/Table';
import React, { useMemo, useRef, useState } from 'react';
import PlayerInput from './components/PlayerInput';
import TeamLogo from './components/TeamLogo';
import { Player, type Game, type Puzzle } from './games/game';
import { getSportsGame, MAX_NUMBER_OF_LIVES, SportsType } from './games/sports-game-service';
import './SportsGrid.css';
import LivesDisplay from './components/LivesDisplay';

type Props = {
    sports: SportsType,
}

export default function Grid({ sports }: Props) {
    const gameService = useRef<Game>(getSportsGame(sports));

    const puzzle: Puzzle = useMemo<Puzzle>(() => gameService.current.getPuzzle(), []);
    const players: Player[] = useMemo<Player[]>(() => gameService.current.getPlayers(), []);

    const tableHeaders = puzzle.cols.map(team => (<TeamLogo key={team.Name} source={team.Logo} />));
    const tableRows = [];

    const [curNumLives, setCurNumLives] = useState<number>(MAX_NUMBER_OF_LIVES);
    const [isGameOver, setGameOver] = useState<boolean>(false);

    const [inputCorrectness, setInputCorrectness] = useState<boolean[]>([false, false, false, false, false, false, false, false, false]);

    const deductLife = () => {        
        if (curNumLives === 1) {
            setGameOver(true);
            console.log('gameover')
        }

        setCurNumLives(curNumLives - 1);
    }

    const onCorrectPlayerInput = (i: number, j: number) => {
        inputCorrectness[i*3+j] = true;
        setInputCorrectness(inputCorrectness);

        console.log(inputCorrectness);

        if (!inputCorrectness.some(input => !input)) {
            setGameOver(true);
            console.log('gameover')
        }
    }

    for (let i = 0; i < puzzle.rows.length; i++) {
        const team = puzzle.rows[i];
        tableRows.push(
            <tr key={i}>
                <TeamLogo source={team.Logo} />
                <td><PlayerInput teams={{ col: puzzle.cols[0], row: puzzle.rows[i] }} players={players} correctGuess={() => onCorrectPlayerInput(0, i)} wrongGuess={deductLife} isInputDisabled={isGameOver}/></td>
                <td><PlayerInput teams={{ col: puzzle.cols[1], row: puzzle.rows[i] }} players={players} correctGuess={() => onCorrectPlayerInput(1, i)} wrongGuess={deductLife} isInputDisabled={isGameOver}/></td>
                <td><PlayerInput teams={{ col: puzzle.cols[2], row: puzzle.rows[i] }} players={players} correctGuess={() => onCorrectPlayerInput(2, i)} wrongGuess={deductLife} isInputDisabled={isGameOver}/></td>
            </tr>
        );
    }

    return (
        <div>
            <Table variant="white" bordered={true}>
                <thead>
                    <tr>
                        <TeamLogo source={gameService.current.getLogo()} />
                        {tableHeaders}
                    </tr>
                    {tableRows}
                </thead>
            </Table>
            <LivesDisplay numLives={curNumLives}></LivesDisplay>
        </div>
    )
}