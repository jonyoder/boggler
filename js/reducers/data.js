import {SET_SIZE, PLAY_GAME} from '../constants';
import {createReducer} from '../utils';

const DEFAULT_SIZE = 4;

const initialState = {
    results: null,
    size: DEFAULT_SIZE
};

export default createReducer(initialState, {
    [SET_SIZE]: (state, payload) => {
        return Object.assign({}, state, {
            'size': payload.size
        });
    },
    [PLAY_GAME]: (state, payload) => {
        return Object.assign({}, state, {
            'results': payload.results
        });
    }
});
