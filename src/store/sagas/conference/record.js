import { call } from "redux-saga/effects";
import VoxeetSDK from "@voxeet/voxeet-web-sdk";

export function* stopRecordingConference() {
  yield call([VoxeetSDK.recording, VoxeetSDK.recording.stop]);
}

export function* recordConference() {
  yield call([VoxeetSDK.recording, VoxeetSDK.recording.start]);
}
