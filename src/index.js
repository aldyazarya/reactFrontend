import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';



import App from './components/App';
import reducers from './reducers';

const storE = createStore(reducers, applyMiddleware(logger, thunk))

ReactDOM.render(
<Provider store = {storE}>
    <App/>
</Provider>
, document.getElementById('root'))