import { select, put, call } from "redux-saga/effects";
import VoxeetSDK from "@voxeet/voxeet-web-sdk";

import { retrieveAccessToken } from "../authentication/authenticate";
import { application } from "../../effects";

export default function* initialize() {
  const token = yield select((state) => state.application.token);
  yield call(
    [VoxeetSDK, VoxeetSDK.initializeToken],
    token,
    retrieveAccessToken
  );
  yield put(application.sdkInitialized());
}
