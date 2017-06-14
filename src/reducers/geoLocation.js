import * as types from '../actions';

const initialState = {geoLocStatus: {status: 'init', error: null}}

export default function(state = initialState, action = {}) {
    switch (action.type) {

        case types.FETCH_GEOLOCATION_START:
            return { ...state,
                geoLocStatus: {status: 'fetching', error: null}
            }

        case types.FETCH_GEOLOCATION_NOT_AVAILABLE:
            return { ...state,
                geoLocStatus: {status: 'warning', error: 'n/a'}
            }

        case types.FETCH_GEOLOCATION_FAILURE:
            return { ...state,
                geoLocStatus: {status: 'failure', error: action.error}
            }

        case types.FETCH_GEOLOCATION_SUCCESS:
            const {latitude, longitude} = action.geopos.coords
            return { ...state,
                geoLocStatus: { status: 'success', error: null},
                lastPosition: {lat: latitude, lng: longitude}
            }

        default:
            return state;
    }
}
