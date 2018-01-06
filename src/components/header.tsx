import * as React from 'react';
import { Link } from 'react-router-dom';

export const Header = (): JSX.Element => (
    <header>
        <h1>Hello I'm Monty Dawson</h1>
        <nav>
            <Link to="/">Home</Link>
            <Link to="/CV">CV</Link>
        </nav>
    </header>
);

