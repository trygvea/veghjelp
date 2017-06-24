/*global google*/
import React from 'react'
import {connect} from 'react-redux'
import {getVegdekkeFeatures} from '../selector/vegvesen'
import './GoogleMap.css'

/**
 * React mapping of google maps taken from http://revelry.co/google-maps-react-component-in-es6/
 */
class GoogleMap extends React.PureComponent {
    state = { zoom: 10 };

    render() {
        const {lat, lng, zoom, vegdekkeFeatures} = this.props
        console.log('### vegdekke:', vegdekkeFeatures)
        this.map && this.map.setCenter({lat, lng})

        if (vegdekkeFeatures.length > 0) {
            this.map.data.addGeoJson({
                type: "FeatureCollection",
                features: vegdekkeFeatures
            })
        }

        return (
            <div className="GMap">
                <div className='GMap-canvas' ref="mapCanvas">
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.map = this.createMap()
        // google.maps.event.addListener(this.map, 'zoom_changed', ()=> this.handleZoomChange())
    }

    // clean up event listeners when component unmounts
    componentDidUnMount() {
        google.maps.event.clearListeners(this.map, 'zoom_changed')
    }

    createMap() {
        return new google.maps.Map(this.refs.mapCanvas, {
            zoom: this.props.zoom,
            center: new google.maps.LatLng(this.props.lat, this.props.lng),
            // mapTypeId: 'terrain'
        })
    }

    handleZoomChange() {
        this.setState({
            zoom: this.map.getZoom()
        })
    }

}

const mapStateToProps = (state, ownProps) => ({
    vegdekkeFeatures: getVegdekkeFeatures(state),
})

export default connect(
    mapStateToProps,
)(GoogleMap)
