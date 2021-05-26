import { call, select, put } from "redux-saga/effects";

import { startRecording, stopRecording } from "../../services/record";
import { getEntity } from "../../reducers/entities/selectors";
import { getCurrentConferenceID } from "../../reducers/application/selectors";
import { updateEntity } from "../../effects/entities";

export function* stopRecordingConference() {
  yield call(stopRecording);

  const currentConferenceID = yield select((state) =>
    getCurrentConferenceID(state)
  );

  const conference = yield select((state) =>
    getEntity(state, "conferences", currentConferenceID)
  );

  yield put(
    updateEntity({
      id: conference.id,
      entityType: "conferences",
      data: { recording: false },
      origin: "record conference",
    })
  );
}

export function* recordConference() {
  yield call(startRecording);

  const currentConferenceID = yield select((state) =>
    getCurrentConferenceID(state)
  );

  const conference = yield select((state) =>
    getEntity(state, "conferences", currentConferenceID)
  );

  yield put(
    updateEntity({
      id: conference.id,
      entityType: "conferences",
      data: { recording: true },
      origin: "record conference",
    })
  );
}
