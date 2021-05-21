import { select, put, call } from "redux-saga/effects";
import VoxeetSDK from "@voxeet/voxeet-web-sdk";

import { retrieveAccessToken } from "../authentication/authenticate";
import { application } from "../../effects";

export default function* initialize() {
  const token = yield select((state) => state.application.token);
  try {
    yield call(
      [VoxeetSDK, VoxeetSDK.initializeToken],
      token,
      retrieveAccessToken
    );
    yield put(application.sdkInitialized());
  } catch (exception) {
    // TODO: handle initialization exception
  }
}
