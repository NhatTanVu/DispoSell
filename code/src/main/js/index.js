import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import cartReducer from './pages/test/reducers/cartReducer';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        cart: cartReducer
    }
});

const root = ReactDOM.createRoot(document.getElementById('react'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>
);