import { takeEvery, takeLatest } from "redux-saga/effects";

import initialize from "./initialize";
import {
  application,
  authentication,
  // conference as conferenceEffects,
} from "../../effects";
import { conference, devices, spatial } from "../../actions";
import { stopVideo, startVideo } from "./video";
import { startAudio, stopAudio } from "./audio";
import { recordConference, stopRecordingConference } from "./record";
import { create, join, leave, demo } from "./conference";
import { watchParticipant } from "./speaker";
import { startScreenShare, stopScreenShare } from "./screenshare";
import {
  enumerateAudioDevices,
  enumerateVideoDevices,
  setAudioInput,
  setAudioOutput,
  setVideoInput,
} from "./devices";
import {
  setParticipantDirection,
  setParticipantPosition,
  setSpatialEnvironment,
} from "./spatial";
import { addParticipant } from "../../effects/conference";

export default function* conferenceFlow() {
  yield takeEvery(authentication.setToken, initialize);
  yield takeEvery(conference.create, create);
  yield takeEvery(conference.join, join);
  yield takeEvery(conference.demo, demo);
  yield takeEvery(conference.leave, leave);
  yield takeEvery(conference.nearbyFound, stopAudio);
  yield takeEvery(conference.nearbyLost, startAudio);
  yield takeEvery(conference.record, recordConference);
  yield takeEvery(conference.stopRecording, stopRecordingConference);
  yield takeEvery(conference.startVideo, startVideo);
  yield takeEvery(conference.stopVideo, stopVideo);
  yield takeEvery(conference.startAudio, startAudio);
  yield takeEvery(conference.stopAudio, stopAudio);
  yield takeEvery(addParticipant, watchParticipant);
  yield takeEvery(conference.startScreenShare, startScreenShare);
  yield takeEvery(conference.stopScreenShare, stopScreenShare);

  yield takeEvery(application.setLocalParticipantID, enumerateAudioDevices);
  yield takeEvery(application.setLocalParticipantID, enumerateVideoDevices);
  yield takeEvery(devices.setAudioInput, setAudioInput);
  yield takeEvery(devices.setAudioOutput, setAudioOutput);
  yield takeEvery(devices.setVideoInput, setVideoInput);

  yield takeLatest(spatial.setParticipantPosition, setParticipantPosition);
  yield takeLatest(spatial.setParticipantDirection, setParticipantDirection);
  yield takeEvery(spatial.setSpatialEnvironment, setSpatialEnvironment);
}
