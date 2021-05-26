import { call } from "redux-saga/effects";
import VoxeetSDK from "@voxeet/voxeet-web-sdk";

export function* startScreenShare() {
  yield call([VoxeetSDK.conference, VoxeetSDK.conference.startScreenShare]);
}

export function* stopScreenShare() {
  yield call([VoxeetSDK.conference, VoxeetSDK.conference.stopScreenShare]);
}
