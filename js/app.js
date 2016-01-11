import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Root from './containers/Root';
import configureStore from './store/store';

const target = document.getElementById('react');
const store = configureStore(window.__INITIAL_STATE__);

const node = (
    <Root store={store} />
);

ReactDOM.render(node, target);
