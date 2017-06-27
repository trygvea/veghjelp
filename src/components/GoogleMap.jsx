/*global google*/
import React from 'react'
import {connect} from 'react-redux'
import {getVegdekkeFeatures, getFartsgrenseFeatures} from '../selector/vegvesen'
import {mapBoundsChanged} from '../actions/creators/map'
import './GoogleMap.css'

/**
 * React mapping of google maps taken from http://revelry.co/google-maps-react-component-in-es6/
 */
class GoogleMap extends React.PureComponent {

    renderVegdekke() {
        const {vegdekkeFeatures} = this.props
        console.log('### render map, number of vegdekke features:', vegdekkeFeatures.length)

        if (vegdekkeFeatures.length > 0) {
            this.map.data.addGeoJson({
                type: "FeatureCollection",
                features: vegdekkeFeatures
            })
        }
    }

    renderFartsgrense() {
        const {fartsgrenseFeatures} = this.props
        console.log('### render map, number of vegdekke features:', fartsgrenseFeatures.length)

        if (fartsgrenseFeatures.length > 0) {
            this.map.data.addGeoJson({
                type: "FeatureCollection",
                features: fartsgrenseFeatures
            })
            this.map.data.setStyle(feature => {
                var color = feature.getProperty('color');
                return {
                    strokeColor: color,
                    strokeWeight: 3
                };
            });
        }
    }

    render() {
        // this.renderVegdekke()
        this.renderFartsgrense()

        return (
            <div className="GMap">
                <div className='GMap-canvas' ref="mapCanvas">
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.map = this.createMap()
        google.maps.event.addListener(this.map, 'idle', ()=> this.handleMapChanges())
    }

    // clean up event listeners when component unmounts
    componentDidUnMount() {
        google.maps.event.clearListeners(this.map, 'idle')
    }

    createMap() {
        const {lat, lng, zoom} = this.props
        return new google.maps.Map(this.refs.mapCanvas, {
            zoom,
            center: new google.maps.LatLng(lat, lng),
        })
    }

    handleMapChanges() {
        this.props.mapBoundsChanged(this.map.getBounds())
    }

}

const mapStateToProps = (state, ownProps) => ({
    vegdekkeFeatures: getVegdekkeFeatures(state),
    fartsgrenseFeatures: getFartsgrenseFeatures(state),
})

export default connect(
    mapStateToProps,
    {mapBoundsChanged}
)(GoogleMap)
