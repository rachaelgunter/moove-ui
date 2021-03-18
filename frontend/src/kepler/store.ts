import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import keplerGlReducer from 'kepler.gl/reducers';
import { enhanceReduxMiddleware } from 'kepler.gl/middleware';

const customizedKeplerGlReducer = keplerGlReducer.initialState({
  uiState: {
    // hide side panel when mounted
    activeSidePanel: null,
    // hide all modals whtn mounted
    currentModal: null,
  },
});

const initialState = {};
const reducer = combineReducers({
  keplerGl: customizedKeplerGlReducer,
});
const middlewares = enhanceReduxMiddleware([]);
const enhancers = [applyMiddleware(...middlewares)];

export default createStore(reducer, initialState, compose(...enhancers));
