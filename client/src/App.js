import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Wordle from './pages/wordle';
import Grid from './pages/sports-grid';

function App() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/wordle' element={<Wordle />} />
            <Route path='/sports-grid' element={<Grid/>} />
        </Routes>
    )
}

export default App;
