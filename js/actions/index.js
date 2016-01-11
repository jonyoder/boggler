import {FETCH_SITES_REQUEST, RECEIVE_SITES} from '../constants';
import { pushState } from 'redux-router';
import cookie from 'react-cookie';

export function receiveSites(data) {
    return {
        type: RECEIVE_SITES,
        payload: {
            data: data
        }
    }
}

export function fetchSitesRequest() {
  return {
    type: FETCH_SITES_REQUEST
  }
}

export function fetchSites(token) {

    return (dispatch, state) => {
        dispatch(fetchSitesRequest());
        return fetch('http://localhost:9500/rest/v1/sites/', {
                credentials: 'include'
            })
//            .then(checkHttpStatus)
//            .then(parseJSON)
            .then(response => {
                dispatch(receiveSites(response));
            })
            .catch(error => {
                if(error.response.status === 401) {
                  dispatch(loginUserFailure(error));
                  dispatch(pushState(null, '/login'));
                }
            })
       }
}