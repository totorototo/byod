import { select, call } from "redux-saga/effects";
import { getFileHandle, writeFile } from "../../../helpers/filesystem";

export function* takeSnapshot() {
  const handle = yield call(getFileHandle);
  const state = yield select((state) => state);
  const snapshot = JSON.stringify(state);
  yield call(writeFile, handle, snapshot);
}
