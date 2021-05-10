import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Route } from "react-router";

export const RouterContext = React.createContext({});

const CustomRouter = ({ children, history }) => (
  <ConnectedRouter history={history}>
    <Route>
      {(routeProps) => (
        <RouterContext.Provider value={routeProps}>
          {children}
        </RouterContext.Provider>
      )}
    </Route>
  </ConnectedRouter>
);

export default CustomRouter;
