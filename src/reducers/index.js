import { combineReducers } from 'redux'

import geoLocation from './geoLocation'
import mapLocation from './mapLocation'

export default combineReducers({
    geoLocation,
    mapLocation,
})
