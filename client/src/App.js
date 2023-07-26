import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import List from './pages/List';
import Wordle from './pages/Wordle';

function App() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/list' element={<List />} />
            <Route path='/wordle' element={<Wordle />} />
        </Routes>
    )
}

export default App;
