import {parse} from 'wellknown'
import { createSelector } from 'reselect'
import {get} from 'lodash'

const flipLatLong = geometry => ({
    ...geometry,
    coordinates: geometry.coordinates.map(([lat, lng, height]) => [lng, lat])
})

// Selectors below

const getVegdekke = (state) => state.vegvesen.vegdekke

export const getVegdekkeFeatures = createSelector(
    [ getVegdekke],
    (vegdekke) =>
        vegdekke.map(({geometri}) => ({
                type: "Feature",
                properties: {
                    color: "red",
                },
                geometry: flipLatLong(parse(geometri.wkt))
            }))
)
