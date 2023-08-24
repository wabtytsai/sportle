'use client'

import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';

import React from 'react';
import { useState } from 'react';

import PlayerInput from './PlayerInput';
import TeamLogo from './TeamLogo';

import * as constants from '../../utils/constants';
import { useFetch } from '../../utils/hooks';

export default function Grid() {
    const sport = 'NBA';

    const dataUrl = constants.routes[sport];
    const logoSrc = constants.logos[sport];

    const [isLoading, setIsLoading] = useState(true);

    const data = useFetch(dataUrl, setIsLoading);

    const tableHeaders = [];
    const tableRows = [];

    if (isLoading) {
        return(
            <div>
                <Spinner animation="border" role="status"/>
            </div>)
    }

    data.cols.forEach(team => tableHeaders.push(<TeamLogo key={team.Name} source={team.Logo}/>))
    

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
                    <TeamLogo key={'NBA'} source={logoSrc}/>
                    {tableHeaders}
                </tr>
                {tableRows}
            </thead>
        </Table>
    )
}