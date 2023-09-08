import React from "react"

interface Props {
    pos: {
        col: number,
        row: number,
    }
}

export default function PlayerInput({ pos }: Props) {
    return (
        <div className="player-input">
            <input></input>
        </div>
    )
}