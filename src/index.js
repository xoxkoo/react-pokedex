import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.scss';
import { RouterProvider, createHashRouter } from "react-router-dom"

// routes
import Root from './routes/Root'
import Home from './routes/Home'
import About from './routes/About'
import ErrorPage from './routes/Error-page'
import PokemonPage from './routes/Pokemon';

const router = createHashRouter([
    {
        path: "/",
        element: <Root />,
		  errorElement: <ErrorPage />,
        children: [
            {
                path: "",
                element: <Home />,
            },
            {
                path: "about",
                element: <About />,
            },
            {
                path: "pokemon",
                element: <PokemonPage />,
            },
        ],
    },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
