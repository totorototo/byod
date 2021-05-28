import { select, put, call } from "redux-saga/effects";

import { retrieveAccessToken } from "../authentication/authenticate";
import { application } from "../../effects";
import { initializeSDK } from "../../services/sdk";

export default function* initialize() {
  const token = yield select((state) => state.application.authentication.token);

  const exception = yield call(initializeSDK, {
    token,
    callback: retrieveAccessToken,
  });

  if (!exception) {
    yield put(application.sdkInitialized());
  }
}
