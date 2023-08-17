import React from 'react';
import LetterTile from './LetterTile';

const WORD_LENGTH = 5;

const Status = Object.freeze({
    CORRECT: 'correct',
    PARTIALLY_CORRECT: 'partially-correct',
    INCORRECT: 'incorrect',
    BLANK: 'blank',
});

export default function GuessRow({ word, solution }) {
    const getStatusesForGuess = (guess) => {
        if (solution === null) {
            return [];
        }
        let frequency = {}
        for (let i of solution) {
            frequency[i] = (frequency[i] | 0) + 1;
        }

        let statuses = [Status.INCORRECT, Status.INCORRECT, Status.INCORRECT, Status.INCORRECT, Status.INCORRECT];
        for (let i = 0; i < WORD_LENGTH; i++) {
            const letter = guess[i];
            if (letter === ' ') {
                statuses[i] = Status.BLANK;
            } else if (letter === solution[i]) {
                statuses[i] = Status.CORRECT;
                frequency[letter] -= 1;
            } else if ((frequency[letter] | 0) > 0) {
                statuses[i] = Status.PARTIALLY_CORRECT;
                frequency[letter] -= 1;
            }
        }
        return statuses;
    };

    let padded_word = word ?? '';
    if (padded_word.length < WORD_LENGTH) {
        padded_word += ' '.repeat(WORD_LENGTH - padded_word.length);
    }
    const statuses = getStatusesForGuess(padded_word);
    return (
        <div className="guess-row">
            {padded_word.split('').map((letter, idx) => (
                <LetterTile key={idx} letter={letter} status={statuses[idx]} />
            ))}
        </div>
    );
}