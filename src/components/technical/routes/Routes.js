import React from "react";
import { Switch, Route } from "react-router";

import style from "./Routes.Style";
import useRouter from "../router/useRouter";
import Authentication from "../../screens/authentication/Authentication";
import SessionSettings from "../../../containers/SessionSettings";
import ConferenceSettings from "../../../containers/ConferenceSettings";
import Conference from "../../../containers/Conference";

const Routes = ({ className }) => {
  const { location } = useRouter();

  return (
    <div className={className}>
      <Switch location={location}>
        <Route exact path="/" render={() => <Authentication />} />
        <Route
          exact
          path="/sessionSettings"
          render={() => <SessionSettings />}
        />
        <Route
          exact
          path="/conferenceSettings"
          render={() => <ConferenceSettings />}
        />
        <Route
          path="/conference/:conferenceId"
          exact
          render={({ match }) => {
            const { conferenceId } = match.params;
            return <Conference conferenceId={conferenceId} />;
          }}
        />
      </Switch>
    </div>
  );
};

export default style(Routes);
