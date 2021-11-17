import { call, put, select } from "redux-saga/effects";

import { application } from "../../effects";
import { push } from "connected-react-router";

import {
  createConference,
  getLocalParticipant,
  joinConference,
  leaveConference,
} from "../../services/conference";
import { getCurrentConferenceID } from "../../reducers/application/selectors";
import { getEntity } from "../../reducers/entities/selectors";
import {
  addConference,
  addParticipant,
  updateConference,
} from "../../effects/conference";

export function* create({ payload }) {
  const { entities: conferenceEntities, conferenceID } = yield call(
    createConference,
    payload
  );

  yield put(
    addConference({
      id: conferenceID,
      data: conferenceEntities.conferences,
      entityType: "conferences",
    })
  );

  yield put(application.setCurrentConferenceID({ id: conferenceID }));

  // get local participant
  const { participantID, entities: participantEntities } = yield call(
    getLocalParticipant
  );

  yield put(
    addParticipant({
      id: participantID,
      data: participantEntities.participants,
      entityType: "participants",
    })
  );

  yield put(
    updateConference({
      id: conferenceID,
      entityType: "conferences",
      data: { participants: [participantID] },
    })
  );

  yield put(application.setLocalParticipantID({ id: participantID }));

  const constraints = {
    audio: true,
    video: false,
  };
  yield call(join, { payload: constraints });
}

export function* join({ payload }) {
  const state = yield select((state) => state);
  const currentConferenceID = getCurrentConferenceID(state);
  const conference = getEntity(state, "conferences", currentConferenceID);

  const options = {
    constraints: payload,
    spatialAudio: true,
  };

  // FIXME: do not want conference object to be modify by sdk.
  const copy = { ...conference };

  /*const { entities } =*/ yield call(joinConference, {
    conference: copy,
    options,
  });

  // NOTE: do not forget to update entities: object passed as ref!
  // yield put(setEntities({ entities, origin: "join conference" }));
  yield put(push(`/conference/${currentConferenceID}`));
}

export function* leave() {
  const error = yield call(leaveConference);
  if (!error) {
    yield put(application.leaveConference());

    yield put(push("/conferenceSettings"));
  }
}
