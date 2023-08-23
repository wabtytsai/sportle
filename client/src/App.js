import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import List from './pages/List';
import Wordle from './pages/Wordle';
import Grid from './pages/sports-grid/grid';

function App() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/list' element={<List />} />
            <Route path='/wordle' element={<Wordle />} />
            <Route path='/sports-grid' element={<Grid/>} />
        </Routes>
    )
}

export default App;
