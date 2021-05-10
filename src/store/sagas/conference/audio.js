import { call, select } from "redux-saga/effects";
import VoxeetSDK from "@voxeet/voxeet-web-sdk";

export function* startAudio({ payload }) {
  const participants = yield select((state) => state.conference.participants);
  const participant = participants.find(
    (participant) => participant.id === payload
  );
  if (participant) {
    yield call(
      [VoxeetSDK.conference, VoxeetSDK.conference.startAudio],
      participant
    );
  }
}
export function* stopAudio({ payload }) {
  const participants = yield select((state) => state.conference.participants);
  const participant = participants.find(
    (participant) => participant.id === payload
  );
  if (participant) {
    yield call(
      [VoxeetSDK.conference, VoxeetSDK.conference.stopAudio],
      participant
    );
  }
}
