import Table from 'react-bootstrap/Table';
import React, { useEffect, useMemo, useState } from 'react';
import PlayerInput from './components/PlayerInput';
import TeamLogo from './components/TeamLogo';
import { getPuzzle as getBasketballPuzzle } from './games/basketball';
import * as constants from '../../utils/constants';
import './SportsGrid.css';
import { Spinner } from 'react-bootstrap';

export default function Grid() {
    const sport = 'NBA';

    let routes: constants.Routes;

    switch (sport) {
        case 'NBA':
            routes = constants.NBARoutes;
            break;
        default:
            routes = { playerList: '', puzzle: '', logo: '' };
            break;
    }

    const [isLoading, setIsLoading] = useState(true);

    const [playerList, setPlayerList] = useState([]);

    useEffect(() => {
        async function fetchGrid() {
            const playersResponse = await fetch(routes.playerList);
            const playersJson = await playersResponse.json();
    
            setPlayerList(playersJson);

            setIsLoading(false);
        }

        fetchGrid();
    }, []);

    // TODO(tseddie): generalize this
    const puzzle = useMemo(getBasketballPuzzle, [sport]); 

    if (isLoading) {
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