import {getNearbyVegdekke, getFartsgrenser} from './vegvesen'

export const mapBoundsChanged = pos => dispatch => {
        console.log('#### bounds changed: pos=', pos.b, pos.f)
        return dispatch(getFartsgrenser(
            {lat: pos.f.b , lng: pos.b.b},
            {lat: pos.f.f,  lng: pos.b.f}
        ))
}
