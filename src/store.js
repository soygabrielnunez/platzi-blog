import { createStore } from 'redux';

import reducer from './reducer';

// El store recibe el reducer, y el estado inicial o un enhancer
const store = createStore(reducer);

export default store;
