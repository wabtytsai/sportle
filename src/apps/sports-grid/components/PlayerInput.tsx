import React, { useState } from "react"
import { Player, Team } from "../games/game";

import Autocomplete from '@mui/joy/Autocomplete';
import Chip from '@mui/joy/Chip';

interface Props {
    teams: {
        col: Team,
        row: Team,
    },
    players: Player[]
}

export default function PlayerInput({ teams, players }: Props) {
    const [isDisabled, setIsDisabled] = useState(false);
    const [correctAnswer, setCorrectAnswer] = useState('');

    return (
        <div className="player-input">
            <div className="player-input-text-area-container">
                <Autocomplete
                    options={players}
                    getOptionLabel={(player: Player) => formatPlayerName(player)}
                    onChange={(_event, value) => validatePlayerSelection(value)}
                    disabled={isDisabled}
                />
                { correctAnswer === 'correct' ? <Chip color="success"variant="solid">Correct</Chip> : null}
                { correctAnswer === 'incorrect' ? <Chip color="danger"variant="solid">Incorrect</Chip> : null}
            </div>
        </div>
    )

    function validatePlayerSelection(player: Player | null) {
        if (player === null) {
            return;
        }

        setIsDisabled(true);

        if (hasPlayerPlayedForTeam(player, teams.col) && hasPlayerPlayedForTeam(player, teams.row)) {
            setCorrectAnswer('correct');
        } else {
            setCorrectAnswer('incorrect');
        }
    }

    function hasPlayerPlayedForTeam(player: Player, team: Team): boolean {
        return player.player_team_data.filter((t) => t[0] === team.Name).length > 0;
    }

    function formatPlayerName(player: Player): string {
        if (player.player_debut === '') {
            return player.player_name;
        }

        const playerFirstYear: number = new Date(player.player_debut).getFullYear();
        return `${player.player_name} (${playerFirstYear} - ${playerFirstYear + Number(player.player_career_length)})`;
    }
}