// import React from 'react'
import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
// import createLogger from 'redux-logger'
// import throttle from 'lodash/throttle'
// import storage from './util/storage'
import rootReducer from './reducers'

const configureStore = (bootState, keepStateOnRefresh = false) => {

    const store = createStore(rootReducer, composeWithDevTools(
        applyMiddleware(thunkMiddleware),
        // other store enhancers if any
    ));

    return store
}

export default configureStore
