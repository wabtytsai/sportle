'use client'

import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';

import React, { useEffect, useState } from 'react';

import PlayerInput from './PlayerInput';
import TeamLogo from './TeamLogo';

import * as constants from '../../utils/constants';

export default function Grid() {
    const sport = 'NBA';

    const dataUrl = constants.routes[sport];
    const logoSrc = constants.logos[sport];

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchGrid() {
            const response = await fetch(dataUrl);
            const json = await response.json();
    
            setData(json);
            setIsLoading(false);
        }

        fetchGrid();
    }, [])

    if (isLoading) {
        return(
            <div>
                <Spinner animation="border" role="status"/>
            </div>)
    }

    const tableHeaders = data.cols.map(team => (<TeamLogo key={team.Name} source={team.Logo}/>));
    const tableRows = [];

    for (let i = 0; i < data.rows.length; i++) {
        const team = data.rows[i];
        tableRows.push(
            <tr key={i}>
                <TeamLogo source={team.Logo}/>
                <td><PlayerInput pos={{col: 0, row: i}}></PlayerInput></td>
                <td><PlayerInput pos={{col: 1, row: i}}></PlayerInput></td>
                <td><PlayerInput pos={{col: 2, row: i}}></PlayerInput></td>
            </tr>
        );
    }
    

    return (
        <Table variant="white" bordered={true}>
            <thead>
                <tr>
                    <TeamLogo key={sport} source={logoSrc}/>
                    {tableHeaders}
                </tr>
                {tableRows}
            </thead>
        </Table>
    )
}