import { call, select } from "redux-saga/effects";

import { getEntity } from "../../reducers/entities/selectors";
import { startAudio as start, stopAudio as stop } from "../../services/audio";

export function* startAudio({ payload }) {
  const participant = yield select((state) =>
    getEntity(state, "participants", payload)
  );

  if (participant) {
    yield call(start, participant);
  }
}
export function* stopAudio({ payload }) {
  const participant = yield select((state) =>
    getEntity(state, "participants", payload)
  );

  if (participant) {
    yield call(stop, participant);
  }
}
