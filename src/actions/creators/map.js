import {getNearbyVegdekke} from './vegvesen'

export const mapBoundsChanged = pos => dispatch => {
        console.log('#### bounds changed: pos=', pos.b, pos.f)
        return dispatch(getNearbyVegdekke(
            {lat: pos.f.b , lng: pos.b.b},
            {lat: pos.f.f,  lng: pos.b.f}
        ))
}
