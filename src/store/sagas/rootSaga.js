import { all } from "redux-saga/effects";

import authenticationFlow from "./authentication/authenticationFlow";
import conferenceFlow from "./conference/conferenceFlow";
import sessionFlow from "./session/sessionFlow";
import eventFlow from "./events/eventFlow";

export default function* rootSaga() {
  yield all([
    authenticationFlow(),
    sessionFlow(),
    conferenceFlow(),
    eventFlow(),
  ]);
}
