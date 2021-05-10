import { call, put, delay } from "redux-saga/effects";
import { push } from "connected-react-router";

import { callAPI } from "../api";
import { application } from "../../effects";

export default function* authenticate() {
  const consumerKey = process.env.REACT_APP_CONSUMER_KEY;
  const hostUri = "https://session.voxeet.com";
  const {
    success,
    error,
    result: { access_token: token },
  } = yield call(callAPI, { url: `${hostUri}/test/token/${consumerKey}` });

  if (success && !error) {
    yield put(application.setToken({ token }));
    yield delay(500);
    yield put(push("/sessionSettings"));
  }
}
