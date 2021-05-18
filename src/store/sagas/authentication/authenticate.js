import { call, put, delay } from "redux-saga/effects";
import { push } from "connected-react-router";

import { application } from "../../effects";

export async function retrieveAccessToken() {
  const consumerKey = process.env.REACT_APP_CONSUMER_KEY;
  const consumerSecret = process.env.REACT_APP_CONSUMER_SECRET;
  const url = "https://session.voxeet.com/v1/oauth2/token";

  const headers = new Headers();
  headers.append(
    "Authorization",
    "Basic " + btoa(encodeURI(consumerKey) + ":" + encodeURI(consumerSecret))
  );

  const params = {
    method: "POST",
    headers,
    body: {
      grant_type: "client_credentials",
    },
  };

  const response = await fetch(url, params);
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
