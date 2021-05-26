import { call, select } from "redux-saga/effects";

import { getEntity } from "../../reducers/entities/selectors";
import { startVideo as start, stopVideo as stop } from "../../services/video";

export function* startVideo({ payload }) {
  const participant = yield select((state) =>
    getEntity(state, "participants", payload)
  );

  if (participant) {
    yield call(start, participant);
  }
}

export function* stopVideo({ payload }) {
  const participant = yield select((state) =>
    getEntity(state, "participants", payload)
  );

  if (participant) {
    yield call(stop, participant);
  }
}
