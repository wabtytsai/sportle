import React from 'react';

export default function LetterTile({ letter, status }) {
    return <div className={"letter-tile " + status}>{letter}</div>;
}