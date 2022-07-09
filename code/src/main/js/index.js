import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('react'));
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);

// import cartReducer from './components/reducers/cartReducer';
// import { Provider } from 'react-redux';
// import { createStore } from 'redux';
//
// const store = createStore(cartReducer);
//
// ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// <React.StrictMode>
//     <Provider store={createStore(cartReducer)}>
//         <App/>
//     </Provider>
// </React.StrictMode>