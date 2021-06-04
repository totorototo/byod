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
import { isSpeaking as isSpeakingService } from "../../services/speaker";

import { stopBackgroundTask } from "../../actions/conference";
import { conference } from "../../effects";
import { participantUpdated } from "../../effects/conference";

//let participantId;
function* bgSync(participant) {
  let isSpeaking;

  const handleSpeakingStatus = (status) => {
    isSpeaking = status;
  };

  try {
    while (true) {
      try {
        // effects will get executed in parallel
        yield all([call(isSpeakingService, participant, handleSpeakingStatus)]);

        yield put(
          participantUpdated({
            id: participant.id,
            entityType: "participants",
            data: { ...participant, isSpeaking },
          })
        );

        console.log(`${participant.name}: speaking:${isSpeaking}`);
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

export function* watchParticipant({ payload: { data, id } }) {
  const bgSyncTask = yield fork(bgSync, data[id]);

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
      id === update.payload.id &&
      update.payload.data.status &&
      update.payload.data.status === "Left"
    ) {
      yield cancel(bgSyncTask);
      break;
    }
  }
  console.log("exiting");
}
