import thunk from 'redux-thunk';
import {reduxReactRouter} from 'redux-router';
import createHistory from 'history/lib/createBrowserHistory';
import {createHashHistory} from 'history';
import {applyMiddleware, compose, createStore} from 'redux';
import createLogger from 'redux-logger';
import { persistState } from 'redux-devtools';
import promiseMiddleware from 'redux-promise';

import routes from '../routes';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';

export default function configureStore(initialState) {
    let createStoreWithMiddleware;

    const logger = createLogger();

    const middleware = applyMiddleware(thunk, logger, promiseMiddleware);

    createStoreWithMiddleware = compose(
     middleware,
     reduxReactRouter({routes, createHistory: createHashHistory}),
     DevTools.instrument(),
     persistState(getDebugSessionKey())
    );

    const store = createStoreWithMiddleware(createStore)(rootReducer, initialState);

    if (module.hot) {
        module.hot
            .accept('../reducers', () => {
                const nextRootReducer = require('../reducers/index');
                store.replaceReducer(nextRootReducer);
            });
    }

    return store;
}

function getDebugSessionKey() {
  // You can write custom logic here!
  // By default we try to read the key from ?debug_session=<key> in the address bar
  const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
  return (matches && matches.length > 0)? matches[1] : null;
}

