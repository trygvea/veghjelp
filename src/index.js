import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import App from './App';
import configureStore from'./configureStore'
import {gotoCurrentLocation} from './actions/creators/location'
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const store = configureStore({}, true)

// Start by fetching some data
store.dispatch(gotoCurrentLocation())

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
