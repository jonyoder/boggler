import {RECEIVE_SITES, FETCH_SITES_REQUEST} from '../constants';
import {createReducer} from '../utils';

const initialState = {
    data: null,
    isFetching: true
};

export default createReducer(initialState, {
    [RECEIVE_SITES]: (state, payload) => {
        return Object.assign({}, state, {
            'data': [ ...payload.data],
            'isFetching': false
        });
    },
    [FETCH_SITES_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            'isFetching': true
        });
    }
});
