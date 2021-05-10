import { take, cancelled, call, race, all, put } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import VoxeetSDK from "@voxeet/voxeet-web-sdk";
import { push } from "connected-react-router";

import { application } from "../../actions";
import { conference } from "../../effects";

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

function* externalListener(channel) {
  // eslint-disable no-constant-condition
  while (true) {
    const event = yield take(channel);
    switch (event.type) {
      case "streamAdded":
        yield put(conference.streamAdded(event.payload));
        break;
      case "streamUpdated":
        yield put(conference.streamUpdated(event.payload));
        break;
      case "streamRemoved":
        yield put(conference.streamRemoved(event.payload));
        break;
      case "participantRemoved":
        yield put(conference.participantRemoved(event.payload));
        break;
      case "participantUpdated":
        yield put(conference.participantUpdated(event.payload));
        break;
      case "participantAdded":
        yield put(conference.participantAdded(event.payload));
        break;
      case "created":
        yield put(conference.created());
        break;
      case "joined":
        yield put(conference.joined());
        break;
      case "left":
        yield put(conference.left());
        break;
      case "ended":
        yield put(conference.ended());
        yield put(push("/conferenceSettings"));
        break;
      case "recordingStarted":
        yield put(conference.recordingStarted());
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
