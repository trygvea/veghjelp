import React, { Component } from 'react';
import GoogleMap from './components/GoogleMap'
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h2>Beste vei</h2>
                </div>
                <GoogleMap lat="59.0" lng="10.0" zoom="10.0"/>
            </div>
        )
    }
}

export default App;
