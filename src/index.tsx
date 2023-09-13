import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Wordle from './apps/wordle';
import SportsGrid from './apps/sports-grid';
import reportWebVitals from './reportWebVitals';
import Root from './Root';
import ErrorPage from './ErrorPage';
import { SportsType } from './apps/sports-grid/games/sports-game-service';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "wordle",
                element: <Wordle />
            },
            {
                path: "NBA",
                element: <SportsGrid sports={SportsType.NBA} />
            }
        ],
    },
]);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
