import { call } from "redux-saga/effects";
import VoxeetSDK from "@voxeet/voxeet-web-sdk";

export function* stopRecordingConference() {
  try {
    yield call([VoxeetSDK.recording, VoxeetSDK.recording.stop]);
  } catch (exception) {
    // TODO: handle error
  }
}

export function* recordConference() {
  try {
    yield call([VoxeetSDK.recording, VoxeetSDK.recording.start]);
  } catch (exception) {
    // TODO: handle error
  }
}
