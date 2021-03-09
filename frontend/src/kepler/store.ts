import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import keplerGlReducer from 'kepler.gl/reducers';
import { enhanceReduxMiddleware } from 'kepler.gl/middleware';

const initialState = {};
const reducer = combineReducers({
  keplerGl: keplerGlReducer,
});
const middlewares = enhanceReduxMiddleware([]);
const enhancers = [applyMiddleware(...middlewares)];

export default createStore(reducer, initialState, compose(...enhancers));
