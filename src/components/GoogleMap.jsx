/*global google*/
import React from 'react'

import './GoogleMap.css'

/**
 * React mapping of google maps taken from http://revelry.co/google-maps-react-component-in-es6/
 */
export default class extends React.PureComponent {
    state = { zoom: 10 };

    render() {
        const {lat, lng, zoom} = this.props
        this.map && this.map.setCenter({lat, lng})
        return (
            <div className="GMap">
                <div className='GMap-canvas' ref="mapCanvas">
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.map = this.createMap()
        this.createRoad()
        google.maps.event.addListener(this.map, 'zoom_changed', ()=> this.handleZoomChange())
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

    createRoad() {
        const flightPlanCoordinates = [
            {lat: 59.0, lng: 10.0},
            {lat: 59.1, lng: 9.95},
            {lat: 59.1, lng: 9.9},
            {lat: 59.2, lng: 9.85}
        ];
        const flightPath = new google.maps.Polyline({
            path: flightPlanCoordinates,
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2
        });

        return flightPath.setMap(this.map);
    }

    handleZoomChange() {
        this.setState({
            zoom: this.map.getZoom()
        })
    }

}
