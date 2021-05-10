import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import configureStore from "./store/store";
import { application } from "./store/actions";

const history = createBrowserHistory();

const syncHistoryWithStore = (store, history) => {
  const { router } = store.getState();
  if (router && router.location) {
    history.replace(router.location);
  }
};

export const createStore = ({ initialState = {}, history }) => {
  const store = configureStore(initialState, history);
  syncHistoryWithStore(store, history);
  store.history = history;
  return store;
};

const store = createStore({ initialState: {}, history });
store.dispatch(application.start());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App history={history} />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
