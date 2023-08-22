'use client'

import Table from 'react-bootstrap/Table';
import TeamSelector from './team-selector';
import PlayerInput from './player-input';
import React from 'react';

export default function Grid() {

    return (
        <Table variant="dark">
            <thead>
                <tr>
                    <td></td>
                    <td>
                        <TeamSelector></TeamSelector>
                    </td>
                    <td>
                        <TeamSelector></TeamSelector>
                    </td>
                    <td>
                        <TeamSelector></TeamSelector>
                    </td>
                </tr>
                <tr>
                    <td><TeamSelector></TeamSelector></td>
                    <td><PlayerInput></PlayerInput></td>
                    <td><PlayerInput></PlayerInput></td>
                    <td><PlayerInput></PlayerInput></td>
                </tr>
                <tr>
                    <td><TeamSelector></TeamSelector></td>
                    <td><PlayerInput></PlayerInput></td>
                    <td><PlayerInput></PlayerInput></td>
                    <td><PlayerInput></PlayerInput></td>
                </tr>
                <tr>
                    <td><TeamSelector></TeamSelector></td>
                    <td><PlayerInput></PlayerInput></td>
                    <td><PlayerInput></PlayerInput></td>
                    <td><PlayerInput></PlayerInput></td>
                </tr>
            </thead>
        </Table>
    )
}