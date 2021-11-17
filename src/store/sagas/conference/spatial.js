import { call, delay } from "redux-saga/effects";
import { setEnvironment, setPosition } from "../../services/spatial";

export function* setSpatialEnvironment({ payload }) {
  const error = yield call(setEnvironment, payload);
  if (!error) {
  }
}

export function* setParticipantPosition({ payload }) {
  yield delay(300);

  const error = yield call(
    setPosition,
    payload.participantId,
    payload.position
  );

  if (!error) {
    // console.log("position set");
  }
}
