import {
  take,
  cancelled,
  call,
  race,
  all,
  put,
  select,
} from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import VoxeetSDK from "@voxeet/voxeet-web-sdk";
import { push } from "connected-react-router";
import { normalize, schema } from "normalizr";

import { application } from "../../actions";
import { conference } from "../../effects";
import { removeEntity, updateEntity, setEntity } from "../../effects/entities";
import pick from "lodash.pick";
import { getEntity } from "../../reducers/entities/selectors";
import {
  getCurrentConferenceID,
  getLocalParticipantID,
} from "../../reducers/application/selectors";
import { NotFoundEntity } from "../../../dataDefinitions/defect";

function subscribe() {
  return eventChannel((emit) => {
    const handleStreamAdded = (participant, stream) => {
      emit({ type: "streamAdded", payload: { participant, stream } });
    };

    const handleStreamUpdated = (participant, stream) => {
      emit({ type: "streamUpdated", payload: { participant, stream } });
    };

    const handleStreamRemoved = (participant, stream) => {
      emit({ type: "streamRemoved", payload: { participant, stream } });
    };

    const handleParticipantAdded = (participant) => {
      emit({ type: "participantAdded", payload: { participant } });
    };

    const handleParticipantRemoved = (participant) => {
      emit({ type: "participantRemoved", payload: { participant } });
    };

    const handleParticipantUpdated = (participant) => {
      emit({ type: "participantUpdated", payload: { participant } });
    };

    const handleCreated = () => {
      emit({ type: "created" });
    };

    const handleJoined = () => {
      emit({ type: "joined" });
    };

    const handleLeft = () => {
      emit({ type: "left" });
    };

    const handleEnded = () => {
      emit({ type: "ended" });
    };

    const handleRecordingStopped = () => {
      emit({ type: "recordingStopped" });
    };

    const handleRecordingStarted = () => {
      emit({ type: "recordingStarted" });
    };

    VoxeetSDK.conference.on("streamAdded", handleStreamAdded);
    VoxeetSDK.conference.on("streamRemoved", handleStreamRemoved);
    VoxeetSDK.conference.on("streamUpdated", handleStreamUpdated);
    VoxeetSDK.conference.on("participantUpdated", handleParticipantUpdated);
    VoxeetSDK.conference.on("participantRemoved", handleParticipantRemoved);
    VoxeetSDK.conference.on("participantAdded", handleParticipantAdded);
    VoxeetSDK.conference.on("created", handleCreated);
    VoxeetSDK.conference.on("joined", handleJoined);
    VoxeetSDK.conference.on("left", handleLeft);
    VoxeetSDK.conference.on("ended", handleEnded);
    VoxeetSDK.recording.on("started", handleRecordingStarted);
    VoxeetSDK.recording.on("stopped", handleRecordingStopped);

    return () => {
      VoxeetSDK.conference.off("streamAdded", handleStreamAdded);
      VoxeetSDK.conference.off("streamRemoved", handleStreamRemoved);
      VoxeetSDK.conference.off("streamUpdated", handleStreamUpdated);
      VoxeetSDK.conference.off("participantUpdated", handleParticipantUpdated);
      VoxeetSDK.conference.off("participantRemoved", handleParticipantRemoved);
      VoxeetSDK.conference.off("participantAdded", handleParticipantAdded);
      VoxeetSDK.conference.off("created", handleCreated);
      VoxeetSDK.conference.off("joined", handleJoined);
      VoxeetSDK.conference.off("left", handleLeft);
      VoxeetSDK.conference.off("ended", handleEnded);
      VoxeetSDK.recording.on("started", handleRecordingStarted);
      VoxeetSDK.recording.on("stopped", handleRecordingStopped);
    };
  });
}

// TODO: extract function
function normalizeStream(stream) {
  const streamSchema = new schema.Entity(
    "streams",
    {},
    {
      idAttribute: "id",
    }
  );

  const normalizedData = normalize(stream, streamSchema);
  return {
    streamID: normalizedData.result,
    entities: normalizedData.entities,
  };
}

// TODO: extract function
function normalizeParticipant(participant) {
  const participantSchema = new schema.Entity(
    "participants",
    {},
    {
      idAttribute: "id",
      processStrategy: (entity) => {
        const val = pick(entity, ["type", "id"]);
        return { ...val, name: entity.info.name };
      },
    }
  );
  const normalizedData = normalize(participant, participantSchema);
  return {
    participantID: normalizedData.result,
    entities: normalizedData.entities,
  };
}

function* handleStreamUpdate(
  stream,
  participant,
  localParticipant,
  currentConference
) {
  if (!participant || !stream) return;

  if (localParticipant === NotFoundEntity) return;

  const { streamID } = normalizeStream(stream);

  // screen sharing
  if (stream.type === "ScreenShare") {
    yield put(
      updateEntity({
        id: currentConference.id,
        entityType: "conferences",
        data: {
          screenShareStreams: [{ streamID, participantID: participant.id }],
        },
        origin: "stream added/update",
      })
    );
  } else {
    yield put(
      updateEntity({
        id: participant.id,
        entityType: "participants",
        data: { streams: [streamID] },
        origin: "stream added",
      })
    );
  }

  // update stream objs and participant stream list ids
  yield put(
    setEntity({
      id: streamID,
      data: { [streamID]: stream }, // Do not normalize
      entityType: "streams",
      origin: "stream added",
    })
  );
}

function* externalListener(channel) {
  // eslint-disable no-constant-condition
  while (true) {
    const event = yield take(channel);
    switch (event.type) {
      case "streamAdded": {
        const localParticipantID = yield select((state) =>
          getLocalParticipantID(state)
        );

        const localParticipant = yield select((state) =>
          getEntity(state, "participants", localParticipantID)
        );

        const currentConferenceID = yield select((state) =>
          getCurrentConferenceID(state)
        );

        const currentConference = yield select((state) =>
          getEntity(state, "conferences", currentConferenceID)
        );

        yield call(
          handleStreamUpdate,
          event.payload.stream,
          event.payload.participant,
          localParticipant,
          currentConference
        );

        break;
      }

      case "streamUpdated": {
        const localParticipantID = yield select((state) =>
          getLocalParticipantID(state)
        );

        const localParticipant = yield select((state) =>
          getEntity(state, "participants", localParticipantID)
        );

        const currentConferenceID = yield select((state) =>
          getCurrentConferenceID(state)
        );

        const currentConference = yield select((state) =>
          getEntity(state, "conferences", currentConferenceID)
        );

        yield call(
          handleStreamUpdate,
          event.payload.stream,
          event.payload.participant,
          localParticipant,
          currentConference
        );

        break;
      }

      case "streamRemoved": {
        // get participant
        const participant = yield select((state) =>
          getEntity(state, "participants", event.payload.participant.id)
        );

        // remove stream id from participant streams
        const { streamID } = normalizeStream(event.payload.stream);

        if (event.payload.stream.type === "ScreenShare") {
          const currentConferenceID = yield select((state) =>
            getCurrentConferenceID(state)
          );

          const currentConference = yield select((state) =>
            getEntity(state, "conferences", currentConferenceID)
          );

          yield put(
            updateEntity({
              id: currentConferenceID,
              entityType: "conferences",
              origin: "stream removed",
              data: {
                screenShareStreams: currentConference.screenShareStreams.filter(
                  (item) => item.streamID !== event.payload.stream.id
                ),
              },
            })
          );
        } else {
          // check valid
          if (participant !== NotFoundEntity) {
            yield put(
              updateEntity({
                id: event.payload.participant.id,
                entityType: "participants",
                origin: "stream removed",
                data: {
                  streams: participant.streams.filter(
                    (stream) => stream.id !== streamID
                  ),
                },
              })
            );
          }
        }

        // remove stream obj
        yield put(
          removeEntity({
            id: event.payload.stream.id,
            entityType: "streams",
            origin: "stream removed",
          })
        );

        break;
      }

      case "participantRemoved": {
        // remove participant obj
        yield put(
          removeEntity({
            id: event.payload.participant.id,
            entityType: "participants",
            origin: "participant removed",
          })
        );

        // remove participant id from conference participant list
        const conferenceID = yield select((state) =>
          getCurrentConferenceID(state)
        );

        const conference = yield select((state) =>
          getEntity(state, "conferences", conferenceID)
        );

        yield put(
          updateEntity({
            id: conferenceID,
            entityType: "conferences",
            origin: "participant removed",
            data: {
              participants: conference.participants.filter(
                (participant) => participant.id !== event.payload.participant.id
              ),
            },
          })
        );

        break;
      }

      case "participantUpdated": {
        // TODO-HACK: check participant status!
        const hasLeft = event.payload.participant.status === "Left";
        if (hasLeft) {
          yield put(
            removeEntity({
              id: event.payload.participant.id,
              entityType: "participants",
              origin: "participant removed",
            })
          );
          break;
        }

        const {
          participantID,
          entities: { participants },
        } = normalizeParticipant(event.payload.participant);

        yield put(
          updateEntity({
            id: participantID,
            entityType: "participants",
            data: { ...participants[participantID] },
            origin: "participant updated",
          })
        );

        break;
      }

      case "participantAdded": {
        const conferenceID = yield select((state) =>
          getCurrentConferenceID(state)
        );

        const conference = yield select((state) =>
          getEntity(state, "conferences", conferenceID)
        );

        const {
          participantID,
          entities: { participants },
        } = normalizeParticipant(event.payload.participant);

        // add participant
        yield put(
          setEntity({
            id: participantID,
            data: participants,
            entityType: "participants",
            origin: "participant added",
          })
        );

        //add participant to conference participant list
        yield put(
          updateEntity({
            id: conferenceID,
            entityType: "conferences",
            data: {
              participants: [...conference.participants, participantID],
            },
            origin: "participant added",
          })
        );

        break;
      }

      case "created":
        //yield put(conference.created());
        break;

      case "joined":
        //yield put(conference.joined());
        break;

      case "left":
        //yield put(conference.left());
        break;

      case "ended":
        //yield put(conference.ended());
        yield put(push("/conferenceSettings"));
        break;

      case "recordingStarted":
        //yield put(conference.recordingStarted());
        break;

      case "recordingStopped":
        yield put(conference.recordingStopped());
        break;

      default:
        break;
    }
  }
}

function* internalListener() {
  //TODO: send data to sdk ??
  // VoxeetSDK.send
}

export default function* watchEvents() {
  const channel = yield call(subscribe);

  try {
    const { cancel } = yield race({
      task: all([call(externalListener, channel), call(internalListener)]),
      cancel: take(application.stop),
    });

    if (cancel) {
      channel.close();
    }
  } finally {
    if (yield cancelled()) channel.close();
  }
}
