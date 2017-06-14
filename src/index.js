import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import App from './App';
import configureStore from'./configureStore'
import {gotoCurrentLocation} from './actions/creators/location'
import {getNearbyVegdekke} from './actions/creators/vegvesen'
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const store = configureStore({}, true)

// Start by fetching some data
store.dispatch(gotoCurrentLocation())
store.dispatch(getNearbyVegdekke(
    {lat: 59.0, lng: 10.0},
    {lat: 59.05, lng: 9.95}
    ))

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
