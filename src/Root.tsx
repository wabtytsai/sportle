import { Link, Outlet } from "react-router-dom";

export default function Root() {
    return (
        <div>
            <div id='header'>
                <div id='title'>
                    <h1>Title</h1>
                </div>
                <div id='nav'>
                    <Link to={`/wordle`}>Wordle</Link>
                    <Link to={`/NBA`}>NBA</Link>
                </div>
            </div>
            <div id="app-outlet">
                <Outlet />
            </div>
        </div>
    );
}