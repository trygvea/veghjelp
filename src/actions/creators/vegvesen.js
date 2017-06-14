import * as types from '../index'
import {fetchXmlAction} from '../../utils/fetchXmlActionUtils'

const prefix = "https://www.vegvesen.no/nvdb/api/v2/"

// const getBoundingRect = (center, zoom) => {
//     const szX = center.lat *
//     return {p1:
// }

export const getNearbyVegdekke = (p1, p2) =>
    fetchXmlAction(
        prefix + `vegobjekter/241?inkluder=alle&srid=wgs84&kartutsnitt=${p1.lng},${p1.lat},${p2.lng},${p2.lat}`,
        types.LOAD_NEARBY_VEGDEKKE
    )
