'use client'

import Table from 'react-bootstrap/Table';
import React, { useMemo } from 'react';
import PlayerInput from './components/PlayerInput';
import TeamLogo from './components/TeamLogo';
import { getPuzzle as getBasketballPuzzle } from './games/basketball';
import * as constants from '../../utils/constants';
import './SportsGrid.css';

export default function Grid() {
    const sport = 'NBA';

    const logoSrc = constants.logos[sport];

    // TODO(tseddie): generalize this
    const data = useMemo(getBasketballPuzzle, sport); 

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