import { call, takeEvery, take } from "redux-saga/effects";

import authenticate from "./authenticate";
import { session, application } from "../../actions";
import logout from "./logout";

export default function* authenticationFlow() {
  yield take(application.start);
  yield call(authenticate);
  yield takeEvery(session.close, logout);
}
