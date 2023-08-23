'use client'

import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';

import React from 'react';

import PlayerInput from './player-input';
import TeamLogo from './team-logo';

import { useFetch } from '../../utils/hooks';

export default function Grid() {
    const data = useFetch(
        'http://localhost:8000/sports-grid/basketball'
    );

    const tableHeaders = [];
    const tableRows = [];

    if (!data) {
        return(<div>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>)
    }

    if (!!data.cols) {
        data.cols.forEach(team => tableHeaders.push(<TeamLogo key={team.Name} source={team.Logo}/>))
    }

    if (!!data.rows) {
        for (var i = 0; i < data.rows.length; i++) {
            const team = data.rows[i];
            tableRows.push(
                <tr>
                    <TeamLogo key={team.Name} source={team.Logo}/>
                    <td><PlayerInput pos={{col: 0, row: i}}></PlayerInput></td>
                    <td><PlayerInput pos={{col: 1, row: i}}></PlayerInput></td>
                    <td><PlayerInput pos={{col: 2, row: i}}></PlayerInput></td>
                </tr>
            );
        }
    }

    return (
        <Table variant="white" bordered={true}>
            <thead>
                <tr>
                    <TeamLogo key={'NBA'} source={'https://cdn.ssref.net/req/202308101/tlogo/bbr/NBA.png'}/>
                    {tableHeaders}
                </tr>
                {tableRows}
            </thead>
        </Table>
    )
}