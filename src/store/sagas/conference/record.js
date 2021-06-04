import { call, select, put } from "redux-saga/effects";

import { startRecording, stopRecording } from "../../services/record";
import { getEntity } from "../../reducers/entities/selectors";
import { getCurrentConferenceID } from "../../reducers/application/selectors";
import { updateConference } from "../../effects/conference";

export function* stopRecordingConference() {
  yield call(stopRecording);

  const currentConferenceID = yield select((state) =>
    getCurrentConferenceID(state)
  );

  const conference = yield select((state) =>
    getEntity(state, "conferences", currentConferenceID)
  );

  yield put(
    updateConference({
      id: conference.id,
      entityType: "conferences",
      data: { recording: false },
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
    updateConference({
      id: conference.id,
      entityType: "conferences",
      data: { recording: true },
    })
  );
}
