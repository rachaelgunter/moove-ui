import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import keplerGlReducer from 'kepler.gl/reducers';
import { enhanceReduxMiddleware } from 'kepler.gl/middleware';
import { taskMiddleware } from 'react-palm';

const initialState = {};
const reducer = combineReducers({
  keplerGl: keplerGlReducer,
});
const middlewares = enhanceReduxMiddleware([taskMiddleware]);
const enhancers = [applyMiddleware(...middlewares)];

export default createStore(reducer, initialState, compose(...enhancers));
