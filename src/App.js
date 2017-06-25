import React from 'react';
import {connect} from 'react-redux'
import GoogleMap from './components/GoogleMap'
import './App.css';

class App extends React.PureComponent {
    render() {
        // const {lat, lng, zoom} = this.props.mapLocation
        return (
            <div className="App">
                <div className="App-header">
                    <h2>Beste vei</h2>
                </div>
                <GoogleMap lat={60.2} lng={9.0} zoom={10}/>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    // mapLocation: state.mapLocation,
})

export default connect(
    mapStateToProps,
)(App)
