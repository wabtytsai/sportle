
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <h1>Project Home!</h1>
            <Link to={'./wordle'}>
                <button>
                    Wordle
                </button>
            </Link>
            <Link to={'./sports-grid'}>
                <button>
                    Sports Grid
                </button>
            </Link>
        </div>
    );
}

export default Home;