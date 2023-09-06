'use client'

import React from "react"

import TextInput from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';

export default function PlayerInput({ players }) {
    
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