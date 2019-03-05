import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger'

import listReducer from './reducers/listReducer';
import promiseMiddleware from 'redux-promise';


const logger = createLogger({
    timestamp: true,
    diff: true
  });

const store = createStore(listReducer, applyMiddleware(logger, promiseMiddleware));

export default store;