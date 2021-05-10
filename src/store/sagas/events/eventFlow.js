import { takeLatest } from "redux-saga/effects";

import watchEvent from "../events/watchEvents";
import { application } from "../../effects";

export default function* conferenceFlow() {
  yield takeLatest(application.sdkInitialized, watchEvent);
}
