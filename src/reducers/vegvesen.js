import * as types from '../actions';

const initialState = {objekter: []}

export default function(state = initialState, action = {}) {
    switch (action.type) {

        case types.LOAD_NEARBY_VEGDEKKE.SUCCESS:
            return { ...state,
                objekter: action.body.objekter
            }

        default:
            return state;
    }
}
