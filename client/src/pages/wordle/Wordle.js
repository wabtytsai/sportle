
import React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useFetch } from '../../utils/hooks';

import GuessRow from './GuessRow';

const MAX_GUESSES = 6;

function Wordle() {
    const solution = useFetch(
        'http://localhost:8000/wordle/getWord'
    );
    const [currentGuess, setCurrentGuess] = useState('');
    const [attempts, setAttempts] = useState([]);

    useEffect(() => {
        const handleKeyup = (event) => {
            const key = event.key;
            if (key === 'Backspace') {
                return setCurrentGuess(prev => prev.slice(0, -1));
            }
            if (/^[A-Za-z]$/.test(key)) {
                setCurrentGuess(prev => {
                    return prev.length < 5 ? prev + key.toUpperCase() : prev;
                });
            }
        }
        window.addEventListener('keyup', handleKeyup);
        return () => window.removeEventListener('keyup', handleKeyup);
    }, []);

    const guessRows = [];
    attempts.forEach((attempt, i) => {
        guessRows.push(<GuessRow key={i} word={attempt} solution={solution} />);
    });
    guessRows.push(<GuessRow word={currentGuess} solution={solution} />);
    for (let i = attempts.length + 1; i < MAX_GUESSES; i++) {
        guessRows.push(<GuessRow key={i} word={attempts[i]} solution={solution} />);
    }

    return (
        <div className="wordle">
            <h1 className="header">WORDLE</h1>
            <div className="guesses">
                {guessRows}
                
            </div>
        </div>
    );
}

export default Wordle;