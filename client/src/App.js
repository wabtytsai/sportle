import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Wordle from './pages/wordle/Wordle';
import Grid from './pages/sports-grid/grid';

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
