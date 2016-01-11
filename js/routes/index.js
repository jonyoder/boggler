import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '../containers/App';
import HomeView from '../views/HomeView';
import PlayView from '../views/PlayView';

export default (
    <Route path='/' component={App}>
        <IndexRoute component={HomeView} />
        <Route path="play" component={PlayView} />
    </Route>
);

