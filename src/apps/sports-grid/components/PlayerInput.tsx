import React, { useState } from "react"
import { Player, Team } from "../games/game";

import Autocomplete from '@mui/joy/Autocomplete';
import Chip from '@mui/joy/Chip';

interface Props {
    teams: {
        col: Team,
        row: Team,
    },
    players: Player[],
    correctGuess: () => void;
    wrongGuess: () => void;
    isInputDisabled: boolean;
}

export default function PlayerInput({ teams, players, correctGuess, wrongGuess, isInputDisabled }: Props) {
    const [isCorrect, setIsCorrect] = useState(false);
    const [showOptions, setShowOptions] = useState(false);

    return (
        <div className="player-input">
            <div className="player-input-text-area-container">
                <Autocomplete
                    freeSolo
                    options={showOptions ? players : []}
                    getOptionLabel={(player: String | Player) => formatPlayerName(player)}
                    onChange={(_event, value) => validatePlayerSelection(value)}
                    onInputChange={onInputChange}
                    disabled={isInputDisabled || isCorrect} 
                />
                { isCorrect ? <Chip color="success"variant="solid">Correct</Chip> : null }
            </div>
        </div>
    )

    function validatePlayerSelection(input : String | Player | null) {
        if (input === null || typeof input === 'string') {
            return;
        }

        let player = input as Player;

        if (hasPlayerPlayedForTeam(player, teams.col) && hasPlayerPlayedForTeam(player, teams.row)) {
            correctGuess();
            setIsCorrect(true);
        } else {
            wrongGuess();
        }
    }

    function hasPlayerPlayedForTeam(player: Player, team: Team): boolean {
        return player.player_team_data.filter((t) => t[0] === team.Name).length > 0;
    }

    function formatPlayerName(input: String | Player): string {
        if (typeof input === 'string') {
            return '';
        }

        let player = input as Player;

        if (player.player_debut === '') {
            return player.player_name;
        }

        const playerFirstYear: number = new Date(player.player_debut).getFullYear();
        return `${player.player_name} (${playerFirstYear} - ${playerFirstYear + Number(player.player_career_length)})`;
    }

    function onInputChange(_event: any, input : String) {
        if (input.length > 2) {
            setShowOptions(true);
        } else {
            setShowOptions(false);
        }
    }
}