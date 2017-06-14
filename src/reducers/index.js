import { combineReducers } from 'redux'

import geoLocation from './geoLocation'
import mapLocation from './mapLocation'
import vegvesen from './vegvesen'

export default combineReducers({
    geoLocation,
    mapLocation,
    vegvesen,
})
