import { takeEvery } from "redux-saga/effects";

import initialize from "./initialize";
import { application, authentication } from "../../effects";
import { conference, devices } from "../../actions";
import { stopVideo, startVideo } from "./video";
import { startAudio, stopAudio } from "./audio";
import { recordConference, stopRecordingConference } from "./record";
import { create, join, leave } from "./conference";
//import { watchParticipant } from "./speaker";
import { startScreenShare, stopScreenShare } from "./screenshare";
import {
  enumerateAudioDevices,
  enumerateVideoDevices,
  setAudioInput,
  setAudioOutput,
  setVideoInput,
} from "./devices";

export default function* conferenceFlow() {
  yield takeEvery(authentication.setToken, initialize);
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

  yield takeEvery(application.setLocalParticipantID, enumerateAudioDevices);
  yield takeEvery(application.setLocalParticipantID, enumerateVideoDevices);
  yield takeEvery(devices.setAudioInput, setAudioInput);
  yield takeEvery(devices.setAudioOutput, setAudioOutput);
  yield takeEvery(devices.setVideoInput, setVideoInput);
}
