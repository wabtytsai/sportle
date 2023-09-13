import { Outlet, useNavigate } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import { useState } from "react";

export default function Root() {
    const [activeTab, setActiveTab] = useState(window.location.pathname);

    const navigate = useNavigate();

    function onSelect(selectedKey: string | null) {
        if (selectedKey === null) {
            navigate('/error');
        } else {
            setActiveTab(selectedKey);
            navigate(selectedKey);
        }   
    }

    return (
        <div>
            <Nav variant="tabs" activeKey={ activeTab } onSelect={onSelect}>
                <Nav.Item key={ '/wordle' }>
                    <Nav.Link eventKey="/wordle">Wordle</Nav.Link>
                </Nav.Item>
                <Nav.Item key={ '/NBA' }>
                    <Nav.Link eventKey="/NBA">NBA</Nav.Link>
                </Nav.Item>
            </Nav>
            <div id="app-outlet">
                <Outlet />
            </div>
        </div>
    );
}