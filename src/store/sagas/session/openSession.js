import { call, put } from "redux-saga/effects";
import VoxeetSDK from "@voxeet/voxeet-web-sdk";
import { push } from "connected-react-router";

import { session } from "../../effects";

export default function* openSession({ payload }) {
  try {
    yield call([VoxeetSDK.session, VoxeetSDK.session.open], payload);
    yield put(session.opened());
    yield put(push("/conferenceSettings"));
  } catch (exception) {
    //TODO: handle exception
  }
}
