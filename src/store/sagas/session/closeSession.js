import { call } from "redux-saga/effects";

// import { session } from "../../effects";
import { closeSession as close } from "../../services/session";

export default function* closeSession() {
  const exception = yield call(close);
  if (!exception) {
    // yield put(session.closed());
  }
}
