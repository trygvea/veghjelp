import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import App from './App';
import configureStore from'./configureStore'
import {initCurrentLocation} from './actions/creators/currentLocation'
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const store = configureStore({}, true)

// // Start by fetching some data
// store.dispatch(initCurrentLocation(
//     pos => console.log('#### not really starting at ', pos)
//     // TODO from pos, get upper left, lower right, and call getNearbyVegdekke
// ))

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
