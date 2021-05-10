import {
  take,
  fork,
  cancel,
  cancelled,
  put,
  delay,
  race,
  call,
  all,
} from "redux-saga/effects";
import VoxeetSDK from "@voxeet/voxeet-web-sdk";

import { stopBackgroundTask } from "../../actions/conference";
import { conference } from "../../effects";

//let participantId;
function* bgSync(participant) {
  let isSpeaking;
  let audioLevel;
  const handleSpeakingStatus = (status) => {
    isSpeaking = status;
  };
  const handleAudioLevel = (level) => {
    audioLevel = level;
  };

  try {
    while (true) {
      try {
        // effects will get executed in parallel
        yield all([
          call(
            [VoxeetSDK.conference, VoxeetSDK.conference.isSpeaking],
            participant,
            handleSpeakingStatus
          ),
          call(
            [VoxeetSDK.conference, VoxeetSDK.conference.audioLevel],
            participant,
            handleAudioLevel
          ),
        ]);

        yield put(
          conference.participantAudioStatus({
            id: participant.id,
            isSpeaking,
            audioLevel,
          })
        );

        console.log(
          `${participant.info.name}: audio-level: ${audioLevel}, speaking:${isSpeaking}`
        );
      } catch (error) {
        console.log("hack - sdk issue");
      }

      yield delay(5000);
    }
  } finally {
    if (yield cancelled()) {
      console.log("task cancelled");
      yield put(stopBackgroundTask());
    }
  }
}

export function* watchParticipant({ payload: { participant } }) {
  const bgSyncTask = yield fork(bgSync, participant);

  while (true) {
    console.log("waiting for participant updated");

    const { update, ends } = yield race({
      update: take(conference.participantUpdated),
      ends: take([conference.ended, conference.left]),
    });

    if (ends) {
      yield cancel(bgSyncTask);
      break;
    }

    if (
      participant.id === update.payload.participant.id &&
      update.payload.participant.status === "Left"
    ) {
      yield cancel(bgSyncTask);
      break;
    }
  }
  console.log("exiting");
}
