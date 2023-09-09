import React from "react"
//@ts-ignore //this component does not have types
import TextInput from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';

interface Props {
    pos: {
        col: number,
        row: number,
    },
    players: string[]
}

export default function PlayerInput({ pos, players }: Props) {
    return (
        <div className="player-input">
            <div className="player-input-text-area-container">
                <TextInput
                    className="player-input-text-area"
                    trigger={''}
                    options={players}
                    matchAny={true}
                />
            </div>
        </div>
    )
}