import { takeEvery } from "redux-saga/effects";

import initialize from "./initialize";
import { application } from "../../effects";
import { conference } from "../../actions";
import { stopVideo, startVideo } from "./video";
import { startAudio, stopAudio } from "./audio";
import { recordConference, stopRecordingConference } from "./record";
import { create, join, leave } from "./conference";
//import { watchParticipant } from "./speaker";
import { startScreenShare, stopScreenShare } from "./screenshare";

export default function* conferenceFlow() {
  yield takeEvery(application.setToken, initialize);
  yield takeEvery(conference.create, create);
  yield takeEvery(conference.join, join);
  yield takeEvery(conference.leave, leave);
  yield takeEvery(conference.nearbyFound, stopAudio);
  yield takeEvery(conference.nearbyLost, startAudio);
  yield takeEvery(conference.record, recordConference);
  yield takeEvery(conference.stopRecording, stopRecordingConference);
  yield takeEvery(conference.startVideo, startVideo);
  yield takeEvery(conference.stopVideo, stopVideo);
  yield takeEvery(conference.startAudio, startAudio);
  yield takeEvery(conference.stopAudio, stopAudio);
  //yield takeEvery(conferenceEffects.participantAdded, watchParticipant);
  yield takeEvery(conference.startScreenShare, startScreenShare);
  yield takeEvery(conference.stopScreenShare, stopScreenShare);
}
