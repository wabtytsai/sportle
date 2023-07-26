
import React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useFetch } from '../utils/hooks';

function Wordle() {
    const solution = useFetch(
        'http://localhost:8000/api/getWord'
    );
    const [currentGuess, setCurrentGuess] = useState('');
    const [attempts, setAttempts] = useState([]);
    const [error, setError] = useState(null);
    const [gameover, setGameover] = useState(false);
    const [win, setWin] = useState(false);

    const getColorForGuess = guess => {
        let solutionDict = {}
        for (let i of solution) {
            solutionDict[i] = (solutionDict[i] | 0) + 1;
        }

        let color = ['x', 'x', 'x', 'x', 'x'];
        for (let i = 0; i < 5; i++) {
            const letter = guess[i];
            if (letter === solution[i]) {
                color[i] = 'o';
                solutionDict[letter] -= 1;
            } else if ((solutionDict[letter] | 0) > 0) {
                color[i] = '-';
                solutionDict[letter] -= 1;
            }
        }
        return color;
    }

    const isValidWord = useCallback(() => {
        if (currentGuess.length < 5) {
            setError('Must be a 5 letter word.');
            return false;
        }
        // check word in dictionary
        if (false) {
            setError('Not in word list.');
            return false;
        }
        for (let word of attempts) {
            if (word === currentGuess) {
                setError('Already guessed.');
                return false;
            }
        }
        setError(null);
        return true;
    }, [currentGuess, attempts]);

    const handleSubmit = useCallback(() => {
        if (!isValidWord()) {
            return;
        }
        setAttempts(prev => {
            prev.push(currentGuess);
            return prev;
        });
        if (currentGuess === solution || attempts.length === 6) {
            setWin(currentGuess === solution);
            setGameover(true);
        }
        setCurrentGuess('');
    }, [currentGuess, isValidWord, solution, attempts]);

    const handleKeyup = useCallback(({ key }) => {
        if (gameover) {
            return;
        }
        if (key === 'Backspace') {
            return setCurrentGuess(prev => prev.slice(0, -1));
        }
        if (key === 'Enter') {
            return handleSubmit();
        }
        if (currentGuess.length >= 5) {
            return;
        }
        if (/^[A-Za-z]$/.test(key)) {
            setCurrentGuess(prev => prev + key.toUpperCase());
        }
    }, [currentGuess, handleSubmit, gameover]);



    useEffect(() => {
        window.addEventListener('keyup', handleKeyup);
        return () => window.removeEventListener('keyup', handleKeyup);
    }, [handleKeyup]);

    return (
        <div>
            <h1>WORDLE{"\n"}</h1>
            {gameover && <div>You {win ? 'won!' : 'lost!'} </div>}
            <div>Current guess is: {currentGuess} </div>
            Previous guesses:
            {attempts.map(guess => <div>{guess}, {getColorForGuess(guess)}</div>)}
            {error && <div>{error}</div>}
        </div>
    );
}

export default Wordle;