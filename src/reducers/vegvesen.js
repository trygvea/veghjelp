import * as types from '../actions';

const initialState = {
    vegdekke: [],
    fartsgrenser: []
}

export default function(state = initialState, action = {}) {
    switch (action.type) {

        case types.LOAD_NEARBY_VEGDEKKE.SUCCESS:
            return { ...state,
                vegdekke: action.body.objekter
            }

        case types.LOAD_NEARBY_FARTSGRENSE.SUCCESS:
            return { ...state,
                fartsgrenser: action.body.objekter
            }

        default:
            return state;
    }
}
