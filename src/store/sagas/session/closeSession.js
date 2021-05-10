import { call, put } from "redux-saga/effects";
import VoxeetSDK from "@voxeet/voxeet-web-sdk";

import { session } from "../../effects";

export default function* closeSession() {
  yield call([VoxeetSDK.session, VoxeetSDK.session.close]);
  yield put(session.closed());
}
