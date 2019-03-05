import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger'

import listReducer from './reducers/listReducer';

const logger = createLogger({
    timestamp: true,
    diff: true
  });

const store = createStore(listReducer, applyMiddleware(logger));

export default store;