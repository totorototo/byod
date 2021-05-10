import { call, select, put } from "redux-saga/effects";
import VoxeetSDK from "@voxeet/voxeet-web-sdk";

import { conference } from "../../effects";

export function* startVideo({ payload }) {
  const participants = yield select((state) => state.conference.participants);
  const participant = participants.find(
    (participant) => participant.id === payload
  );
  if (participant) {
    yield call(
      [VoxeetSDK.conference, VoxeetSDK.conference.startVideo],
      participant,
      { audio: true, video: true }
    );

    yield put(conference.videoStarted());
  }
}

export function* stopVideo({ payload }) {
  const participants = yield select((state) => state.conference.participants);
  const participant = participants.find(
    (participant) => participant.id === payload
  );
  if (participant) {
    yield call(
      [VoxeetSDK.conference, VoxeetSDK.conference.stopVideo],
      participant
    );

    yield put(conference.videoStopped());
  }
}
