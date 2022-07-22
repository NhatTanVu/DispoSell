import { configureStore, applyMiddleware } from '@reduxjs/toolkit'

import throttle from 'lodash.throttle';

//import rootReducer from "./rootReducer";
//import middleware from './middleware';

import cartReducer from './cartSlice'


import { saveState, loadState } from './localStorage';


// By providing a preloaded state (loaded from local storage), we can persist
// the state across the user's visits to the web app.
//
// READ: https://redux.js.org/recipes/configuring-your-store
const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
    //middleware: middleware,
    //enhancer: applyMiddleware(...middleware),
    preloadedState: loadState()
})


// We'll subscribe to state changes, saving the store's state to the browser's
// local storage. We'll throttle this to prevent excessive work.
store.subscribe(
    throttle( () => saveState(store.getState()), 1000)
);


export default store;