import { call, put } from "redux-saga/effects";
import { push } from "connected-react-router";

import { session } from "../../effects";
import { openSession as open } from "../../services/session";

export default function* openSession({ payload }) {
  const exception = yield call(open, payload);
  if (!exception) {
    yield put(session.opened());
    yield put(push("/conferenceSettings"));
  }
}
