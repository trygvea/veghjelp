import * as types from '../index'

const fetchGeolocationStart = () => ({type: types.FETCH_GEOLOCATION_START})
const fetchGeolocationSuccess = geopos => ({type: types.FETCH_GEOLOCATION_SUCCESS, geopos})
const fetchGeolocationFailure = error => ({type: types.FETCH_GEOLOCATION_FAILURE, error})
const fetchGeolocationNotAvailable = () => ({type: types.FETCH_GEOLOCATION_NOT_AVAILABLE})

const gotoLocation = pos => ({type: types.GOTO_LOCATION, pos})

const getGeoLocation = onSuccess => dispatch => {
    const {geolocation} = navigator
    if (geolocation) {
        const geolocationProps = {maximumAge: 500000, enableHighAccuracy: true, timeout: 6000}

        const success = pos => {
            console.groupCollapsed("Geoposition succeeded, position is:");console.log(pos);console.groupEnd();
            dispatch(fetchGeolocationSuccess(pos))
            dispatch(onSuccess(pos))
        }

        const fail = error => {
            const {code, message} = error
            console.groupCollapsed('Geolocation failure:');console.log(error);console.groupEnd();
            return dispatch(fetchGeolocationFailure({code, message}))
        }

        dispatch(fetchGeolocationStart())
        geolocation.getCurrentPosition(success, fail, geolocationProps);
    } else {
        dispatch(fetchGeolocationNotAvailable())
    }
}

export const gotoCurrentLocation = () => dispatch =>
    dispatch(getGeoLocation(
        pos => dispatch => {
            const coords = pos.coords
            dispatch(gotoLocation({lat: coords.latitude, lng: coords.longitude}))
        }))


