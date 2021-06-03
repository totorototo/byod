import { all, call, put, select } from "redux-saga/effects";

import {
  listAudioDevices,
  listVideoDevices,
  selectAudioInput,
  selectAudioOutput,
  selectVideoInput,
} from "../../services/devices";

import { deviceAdded, participantUpdated } from "../../effects/conference";
import { getLocalParticipantID } from "../../reducers/application/selectors";
import { getEntity } from "../../reducers/entities/selectors";

export function* enumerateAudioDevices() {
  const { ids, entities } = yield call(listAudioDevices);

  if (ids && entities) {
    yield all(
      Object.entries(entities).map(([id, value]) =>
        put(
          deviceAdded({
            id,
            data: value,
            entityType: "devices",
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
        participantUpdated({
          id: participantID,
          entityType: "participants",
          data: { audioDevices: updatedDeviceIds },
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
          deviceAdded({
            id,
            data: value,
            entityType: "devices",
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
        participantUpdated({
          id: participantID,
          entityType: "participants",
          data: { videoDevices: updatedDeviceIds },
        })
      );
    }
  }
}

export function* setAudioInput({ payload }) {
  yield call(selectAudioInput, payload);
}

export function* setVideoInput({ payload }) {
  yield call(selectVideoInput, payload);
}

export function* setAudioOutput({ payload }) {
  yield call(selectAudioOutput, payload);
}
