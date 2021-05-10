import { call, put } from "redux-saga/effects";
import VoxeetSDK from "@voxeet/voxeet-web-sdk";
import { push } from "connected-react-router";

import { session } from "../../effects";

export default function* openSession({ payload }) {
  yield call([VoxeetSDK.session, VoxeetSDK.session.open], payload);
  yield put(session.opened());
  yield put(push("/conferenceSettings"));
}
