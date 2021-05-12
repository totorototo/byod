import { call, put, delay } from "redux-saga/effects";
import { push } from "connected-react-router";

import { application } from "../../effects";

export async function retrieveAccessToken() {
  const consumerKey = process.env.REACT_APP_CONSUMER_KEY;
  const hostUri = "https://session.voxeet.com";
  const url = `${hostUri}/test/token/${consumerKey}`;
  const response = await fetch(url);
  const { access_token } = await response.json();
  return access_token;
}

export default function* authenticate() {
  const token = yield call(retrieveAccessToken);

  if (token) {
    yield put(application.setToken({ token }));
    yield delay(500);
    yield put(push("/sessionSettings"));
  }
}
