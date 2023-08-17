import React from 'react';
import LetterTile from './LetterTile';

const WORD_LENGTH = 5;

export default function GuessRow({ word, solution }) {
    let padded_word = word ?? '';
    if (padded_word.length < WORD_LENGTH) {
        padded_word += ' '.repeat(WORD_LENGTH - padded_word.length);
    }
    return (
        <div className="guess-row">
            {padded_word.split('').map((letter, idx) => (
                <LetterTile key={idx} letter={letter} />
            ))}
        </div>
    );
}