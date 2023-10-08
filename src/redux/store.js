import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import { rootReducer } from './reducer';

const initStore = {};
const middleware = [thunk];

const store = createStore(rootReducer, initStore, applyMiddleware(...middleware));
const persistor = persistStore(store);

export { store, persistor };
