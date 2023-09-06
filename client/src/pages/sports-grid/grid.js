'use client'

import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';

import React, { useEffect, useState } from 'react';

import PlayerInput from './PlayerInput';
import TeamLogo from './TeamLogo';

import * as constants from '../../utils/constants';

export default function Grid() {
    const sport = 'NBA';

    let routes;

    switch (sport) {
        case 'NBA':
            routes = constants.NBARoutes;
            break;
        default:
            break;
    }

    const [isPuzzleLoading, setIsPuzzleLoading] = useState(true);
    const [isPlayerListLoading, setIsPlayerListLoading] = useState(true);

    const [puzzle, setPuzzle] = useState([]);
    const [playerList, setPlayerList] = useState([]);

    useEffect(() => {
        async function fetchGrid() {
            const response = await fetch(routes.puzzle);
            const json = await response.json();
    
            setPuzzle(json);
            setIsPuzzleLoading(false);
        }

        fetchGrid();
    }, []);

    useEffect(() => {
        async function fetchPlayerList() {
            const response = await fetch(routes.playerList);
            const json = await response.json();
    
            setPlayerList(json);
            setIsPlayerListLoading(false);
        }

        fetchPlayerList();
    }, []);

    if (isPuzzleLoading || isPlayerListLoading) {
        return(
            <div>
                <Spinner animation="border" role="status"/>
            </div>)
    }

    const tableHeaders = puzzle.cols.map(team => (<TeamLogo key={team.Name} source={team.Logo}/>));
    const tableRows = [];

    for (let i = 0; i < puzzle.rows.length; i++) {
        const team = puzzle.rows[i];
        tableRows.push(
            <tr key={i}>
                <TeamLogo source={team.Logo}/>
                <td><PlayerInput pos={{col: 0, row: i}} players={playerList}></PlayerInput></td>
                <td><PlayerInput pos={{col: 1, row: i}} players={playerList}></PlayerInput></td>
                <td><PlayerInput pos={{col: 2, row: i}} players={playerList}></PlayerInput></td>
            </tr>
        );
    }
    

    return (
        <Table variant="white" bordered={true}>
            <thead>
                <tr>
                    <TeamLogo key={sport} source={routes.logo}/>
                    {tableHeaders}
                </tr>
                {tableRows}
            </thead>
        </Table>
    )
}