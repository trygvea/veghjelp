import {parse} from 'wellknown'
import { createSelector } from 'reselect'
import {get} from 'lodash'

const flipLatLong = geometry => ({
    ...geometry,
    coordinates: geometry.coordinates.map(([lat, lng, height]) => [lng, lat])
})

const findEgenskapVerdi = (egenskaper, id)  => {
    const egenskap = egenskaper.find(egenskap => egenskap.id === id)
    return egenskap && egenskap.verdi
}

const findFartsgrense = egenskaper => findEgenskapVerdi(egenskaper, 2021)

const fartsgrenseTilFarge = fartsgrense => {
    if (fartsgrense < 70) {
        return "red"
    } else if (fartsgrense === 70) {
        return "blue"
    } else if (fartsgrense === 80) {
        return "green"
    } else {
        return "yellow"
    }
}

// Selectors below

const getVegdekke = state => state.vegvesen.vegdekke
const getFartsgrenser = state => state.vegvesen.fartsgrenser

export const getVegdekkeFeatures = createSelector(
    [ getVegdekke ],
    (vegdekke) =>
        vegdekke.map(({egenskaper, geometri}) => ({
                type: "Feature",
                properties: {
                    color: "red",
                },
                geometry: flipLatLong(parse(geometri.wkt))
            }))
)

export const getFartsgrenseFeatures = createSelector(
    [ getFartsgrenser ],
    (fartsgrenser) =>
        fartsgrenser.map(({egenskaper, geometri}) => {
            return {
                type: "Feature",
                properties: {
                    color: fartsgrenseTilFarge(findFartsgrense(egenskaper)),
                },
                geometry: flipLatLong(parse(geometri.wkt))
            }
        })
)
