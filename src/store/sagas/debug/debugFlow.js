import { takeEvery, call } from "redux-saga/effects";

import { debug } from "../../actions";
import { takeSnapshot } from "./stateSnapshot";
// import { watchAndLogActions } from "./watchAndLogActions";

export default function* conferenceFlow() {
  yield takeEvery(debug.takeSnapshot, takeSnapshot);
  // yield call(watchAndLogActions);
}
