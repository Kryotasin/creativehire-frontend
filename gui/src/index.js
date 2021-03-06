import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';


import reducer from './store/reducers/auth';
import ReactGA from 'react-ga';

import * as Sentry from '@sentry/browser';


ReactGA.initialize('UA-112683232-2');
ReactGA.pageview(window.location.pathname + window.location.hash);

Sentry.init({dsn: "https://404bc8cb3b2e48029fc3ff5cae33fe19@o396938.ingest.sentry.io/5251036"});

const composeEnhancer = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(reducer, composeEnhancer(
    applyMiddleware(thunk)
));

const app = (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();