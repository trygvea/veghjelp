import * as types from '../actions';

const initialState = {lat: 59.0, lng: 10.0, zoom:10.0}

export default function(state = initialState, action = {}) {
    switch (action.type) {

        case types.GOTO_LOCATION:
            return { ...state,
                lat: action.pos.lat,
                lng: action.pos.lng
            }

        default:
            return state;
    }
}
