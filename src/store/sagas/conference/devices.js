import { all, call, put, select } from "redux-saga/effects";

import {
  listAudioDevices,
  listVideoDevices,
  selectAudioInput,
  selectAudioOutput,
  selectVideoInput,
} from "../../services/devices";
import { setEntity, updateEntity } from "../../effects/entities";
import { getLocalParticipantID } from "../../reducers/application/selectors";
import { getEntity } from "../../reducers/entities/selectors";

export function* enumerateAudioDevices() {
  const { ids, entities } = yield call(listAudioDevices);

  if (ids && entities) {
    yield all(
      Object.entries(entities).map(([id, value]) =>
        put(
          setEntity({
            id,
            data: value,
            entityType: "devices",
            origin: "enumerate audio devices",
          })
        )
      )
    );

    const participantID = yield select((state) => getLocalParticipantID(state));
    const participant = yield select((state) =>
      getEntity(state, "participants", participantID)
    );

    const updatedDeviceIds =
      participant.audioDevices && participant.audioDevices.length > 0
        ? [...participant.audioDevices, ...ids]
        : ids;

    if (participant) {
      yield put(
        updateEntity({
          id: participantID,
          entityType: "participants",
          data: { audioDevices: updatedDeviceIds },
          origin: "enumerate audio devices",
        })
      );
    }
  }
}

export function* enumerateVideoDevices() {
  const { ids, entities } = yield call(listVideoDevices);

  if (ids && entities) {
    yield all(
      Object.entries(entities).map(([id, value]) =>
        put(
          setEntity({
            id,
            data: value,
            entityType: "devices",
            origin: "enumerate video devices",
          })
        )
      )
    );

    const participantID = yield select((state) => getLocalParticipantID(state));
    const participant = yield select((state) =>
      getEntity(state, "participants", participantID)
    );

    const updatedDeviceIds =
      participant.videoDevices && participant.videoDevices.length > 0
        ? [...participant.videoDevices, ...ids]
        : ids;

    if (participant) {
      yield put(
        updateEntity({
          id: participantID,
          entityType: "participants",
          data: { videoDevices: updatedDeviceIds },
          origin: "enumerate video devices",
        })
      );
    }
  }
}

export function* setAudioInput({ payload }) {
  yield call(selectAudioInput, payload.id);
}

export function* setVideoInput({ payload }) {
  yield call(selectVideoInput, payload.id);
}

export function* setAudioOutput({ payload }) {
  yield call(selectAudioOutput, payload.id);
}
