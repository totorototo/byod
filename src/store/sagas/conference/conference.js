import { call, put, select } from "redux-saga/effects";

import { application } from "../../effects";
import { push } from "connected-react-router";
import {
  removeEntity,
  setEntities,
  updateEntity,
} from "../../effects/entities";
import {
  createConference,
  getLocalParticipant,
  joinConference,
  leaveConference,
} from "../../services/conference";
import {
  getCurrentConferenceID,
  getLocalParticipantID,
} from "../../reducers/application/selectors";
import { getEntity } from "../../reducers/entities/selectors";

export function* create({ payload }) {
  const { entities: conferenceEntities, conferenceID } = yield call(
    createConference,
    payload
  );

  yield put(setEntities({ entities: conferenceEntities }));
  yield put(application.setCurrentConferenceID({ id: conferenceID }));

  // get local participant
  const { participantID, entities: participantEntities } = yield call(
    getLocalParticipant
  );

  yield put(setEntities({ entities: participantEntities }));

  yield put(
    updateEntity({
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
    const state = yield select((state) => state);
    const currentConferenceID = getCurrentConferenceID(state);
    const localParticipantID = getLocalParticipantID(state);
    // remove conference entity
    yield put(
      removeEntity({ id: currentConferenceID, entityType: "conferences" })
    );
    // remove participant entity
    yield put(
      removeEntity({ id: localParticipantID, entityType: "participants" })
    );

    // remove participant entity
    yield put(removeEntity({ id: localParticipantID, entityType: "streams" }));

    yield put(application.leaveConference());
    yield put(push("/conferenceSettings"));
  }
}
