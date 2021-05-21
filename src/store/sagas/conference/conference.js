import { call, put, select } from "redux-saga/effects";
import VoxeetSDK from "@voxeet/voxeet-web-sdk";

import { conference } from "../../effects";
import { push } from "connected-react-router";

export function* create({ payload }) {
  const newConference = yield call(
    [VoxeetSDK.conference, VoxeetSDK.conference.create],
    payload
  );

  //TODO: hack
  yield put(
    conference.setConferenceInfos({
      id: newConference._id,
      alias: newConference._alias,
      status: newConference._status,
      pinCode: newConference._pinCode,
      isNew: newConference._isNew,
    })
  );

  const localParticipant = VoxeetSDK.session.participant;

  yield put(conference.setLocalParticipantID(localParticipant.id));
  yield put(conference.participantAdded({ participant: localParticipant }));

  yield* join({
    payload: {
      audio: true,
      video: false,
    },
  });
}

export function* join({ payload }) {
  const savedConference = yield select((state) => state.conference.details);

  try {
    const updatedConference = yield call(
      [VoxeetSDK.conference, VoxeetSDK.conference.join],
      savedConference,
      {
        constraints: payload,
      }
    );

    yield put(conference.setConferenceInfos(updatedConference));
    yield put(push(`/conference/${updatedConference.id}`));
  } catch (exception) {
    // TODO: handle joining issue
  }
}

export function* leave() {
  try {
    yield call([VoxeetSDK.conference, VoxeetSDK.conference.leave]);
    yield put(conference.setConferenceInfos({}));
    yield put(conference.setLocalParticipantID());
    yield put(push("/conferenceSettings"));
  } catch (exception) {
    // TODO: handle leaving exception
  }
}
