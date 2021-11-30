import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage () {
    return (
        <div className="landing">
            <h1>Landing!!</h1>
            <Link to = '/home'>
                <button>Ingresar</button>
            </Link>
        </div>
    )
}