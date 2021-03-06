const httpActionTypes = actionType => ({
    REQUEST: actionType + "_REQUEST",
    SUCCESS: actionType + "_SUCCESS",
    FAILURE: actionType + "_FAILURE"
});

export const FETCH_GEOLOCATION_START = 'FETCH_GEOLOCATION_START'
export const FETCH_GEOLOCATION_NOT_AVAILABLE = 'FETCH_GEOLOCATION_NOT_AVAILABLE'
export const FETCH_GEOLOCATION_SUCCESS = 'FETCH_GEOLOCATION_SUCCESS'
export const FETCH_GEOLOCATION_FAILURE = 'FETCH_GEOLOCATION_FAILURE'

export const GOTO_LOCATION = 'GOTO_LOCATION'

export const LOAD_NEARBY_VEGDEKKE = httpActionTypes("LOAD_NEARBY_VEGDEKKE")
export const LOAD_NEARBY_FARTSGRENSE = httpActionTypes("LOAD_NEARBY_FARTSGRENSE")
