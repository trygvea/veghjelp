import * as types from '../index'

const fetchGeolocationStart = () => ({type: types.FETCH_GEOLOCATION_START})
const fetchGeolocationSuccess = pos => ({type: types.FETCH_GEOLOCATION_SUCCESS, pos})
const fetchGeolocationFailure = error => ({type: types.FETCH_GEOLOCATION_FAILURE, error})
const fetchGeolocationNotAvailable = () => ({type: types.FETCH_GEOLOCATION_NOT_AVAILABLE})

export const initCurrentLocation = onSuccess => dispatch => {
    const {geolocation} = navigator
    if (geolocation) {
        dispatch(fetchGeolocationStart())

        const geolocationProps = {maximumAge: 500000, enableHighAccuracy: true, timeout: 6000}

        const success = pos => {
            console.groupCollapsed("Geoposition succeeded, position is:");console.log(pos);console.groupEnd();
            return Promise.all([
                dispatch(fetchGeolocationSuccess(pos)),
                dispatch(onSuccess(pos))
            ])
        }

        const fail = error => {
            console.groupCollapsed('Geolocation failure:');console.log(error);console.groupEnd();
            return dispatch(fetchGeolocationFailure(error))
        }

        geolocation.getCurrentPosition(success, fail, geolocationProps);
    } else {
        dispatch(fetchGeolocationNotAvailable())
    }
}

