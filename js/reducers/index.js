import {combineReducers} from 'redux';
import {routerStateReducer} from 'redux-router';

import data from './data';

export default combineReducers({
 data,
 router: routerStateReducer
});
