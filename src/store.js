import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import reducer from './reducer';

/* function logger(store) {
  return function(next) {
    return function(action) {
      //
    }
  }
}*/

// El store recibe el reducer, y el estado inicial o un enhancer
const store = createStore(
  reducer,
  applyMiddleware(
    logger,
    thunk,
  ),
);

export default store;