import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger'

import counterReducer from './reducers/counterReducer';

const logger = createLogger({
    timestamp: true,
    diff: true
  });

const store = createStore(counterReducer, applyMiddleware(logger));

export default store;