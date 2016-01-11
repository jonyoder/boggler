import React from 'react';
import {Link} from 'react-router';

export default class HomeView extends React.Component {

    render () {
        return (
            <div>
                <h1>Boggler</h1>
                <p><Link to='play'>Play Now!</Link></p>
            </div>
        );
    }
}

