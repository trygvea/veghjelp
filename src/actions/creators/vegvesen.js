import * as types from '../index'
import {fetchAction} from '../../utils/fetchUtils'

const prefix = "https://www.vegvesen.no/nvdb/api/v2/"

const kartutsnitt = (p1, p2) => `srid=wgs84&kartutsnitt=${p1.lng},${p1.lat},${p2.lng},${p2.lat}`

const getVegdekkePage = (p1, p2) =>
    fetchAction(
        prefix + `vegobjekter/241?inkluder=geometri,egenskaper&${kartutsnitt(p1, p2)}`,
        types.LOAD_NEARBY_VEGDEKKE
    )

export const getNearbyVegdekke = (p1, p2) =>
    fetchAction(
        prefix + `vegobjekter/241?vegreferanse=FV&inkluder=geometri,egenskaper&${kartutsnitt(p1, p2)}`,
        types.LOAD_NEARBY_VEGDEKKE
    )

export const getFartsgrenser = (p1, p2) =>
    fetchAction(
        prefix + `vegobjekter/105?vegreferanse=FV&inkluder=geometri,egenskaper&${kartutsnitt(p1, p2)}`,
        types.LOAD_NEARBY_FARTSGRENSE
    )
