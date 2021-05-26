import { call } from "redux-saga/effects";

import {
  startScreenShare as start,
  stopScreenShare as stop,
} from "../../services/screenShare";

export function* startScreenShare() {
  yield call(start);
}

export function* stopScreenShare() {
  yield call(stop);
}
