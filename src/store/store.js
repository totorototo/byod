import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { connectRouter, routerMiddleware, push } from "connected-react-router";
import createSagaMiddleware from "redux-saga";

import * as reducers from "./reducers";
import * as actions from "./actions";
import rootSaga from "./sagas/rootSaga";

export default function configureStore(initialState = {}, routerHistory) {
  const router = routerMiddleware(routerHistory);
  const saga = createSagaMiddleware();

  const staticReducers = {
    router: connectRouter(routerHistory),
    ...reducers,
  };

  const createReducer = (asyncReducers) =>
    combineReducers({
      ...staticReducers,
      ...asyncReducers,
    });

  const actionCreators = {
    ...actions,
    // todo check effect, missing here?
    push,
  };

  const middlewares = [saga, router];

  const composeEnhancers = (() => {
    const compose_ = window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    if (process.env.NODE_ENV === "development" && compose_) {
      return compose_({ actionCreators });
    }
    return compose;
    // Enable devtools in production mode! (extension needs to be installed first)
    // const compose_ = window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    // return compose_({ actionCreators });
  })();

  const enhancer = composeEnhancers(applyMiddleware(...middlewares));
  const store = createStore(createReducer(), initialState, enhancer);

  // Add a dictionary to keep track of the registered async reducers
  store.asyncReducers = {};

  // Create an inject reducer function
  // This function adds the async reducer, and creates a new combined reducer
  store.injectReducer = (key, asyncReducer) => {
    store.asyncReducers[key] = asyncReducer;
    store.replaceReducer(createReducer(this.asyncReducers));
  };

  saga.run(rootSaga);

  store.registerSagas = (...sagas) => {
    sagas.forEach(saga.run);
  };

  return store;
}
