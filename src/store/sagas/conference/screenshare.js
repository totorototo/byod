import { call, put } from "redux-saga/effects";
import VoxeetSDK from "@voxeet/voxeet-web-sdk";

import { conference } from "../../effects";

export function* startScreenShare({ payload }) {
  try {
    yield call([VoxeetSDK.conference, VoxeetSDK.conference.startScreenShare]);
    yield put(conference.screenShareStarted());
  } catch (error) {
    //TODO: handle sdk raised exception
  }
}

export function* stopScreenShare({ payload }) {
  try {
    yield call([VoxeetSDK.conference, VoxeetSDK.conference.stopScreenShare]);
    yield put(conference.screenShareStopped());
  } catch (error) {
    //TODO: handle sdk raised exception
  }
}
