import { connect } from "react-redux";

import { conference, devices } from "../store/actions";
import Commands from "../components/commands/Commands";
import {
  getCurrentConferenceID,
  getLocalParticipantID,
} from "../store/reducers/application/selectors";
import {
  getEntity,
  getValidEntities,
} from "../store/reducers/entities/selectors";

const mapDispatchToProps = {
  leave: conference.leave,
  record: conference.record,
  stopRecording: conference.stopRecording,
  startVideo: conference.startVideo,
  stopVideo: conference.stopVideo,
  startAudio: conference.startAudio,
  stopAudio: conference.stopAudio,
  startScreenShare: conference.startScreenShare,
  stopScreenShare: conference.stopScreenShare,
  listAudioDevices: devices.listAudioDevices,
  listVideoDevices: devices.listVideoDevices,
  setAudioInput: devices.setAudioInput,
  setAudioOutput: devices.setAudioOutput,
  setVideoInput: devices.setVideoInput,
};

const mapStateToProps = (state) => {
  const hasVideo = (streams) => {
    const stream = streams.find((stream) => stream.type === "Camera");

    if (!stream) return false;

    const tracks = stream.getVideoTracks();
    return tracks.length > 0;
  };

  const hasAudio = (streams) => {
    const stream = streams.find((stream) => stream.type === "Camera");

    if (!stream) return false;

    const tracks = stream.getAudioTracks();
    return tracks.length > 0;
  };

  const localParticipant = getEntity(
    state,
    "participants",
    getLocalParticipantID(state)
  );

  const localParticipantStreams = getValidEntities(
    state,
    "streams",
    localParticipant.streams
  );

  const conference = getEntity(
    state,
    "conferences",
    getCurrentConferenceID(state)
  );

  const screenShareStream =
    conference.screenShareStreams &&
    conference.screenShareStreams.length > 0 &&
    conference.screenShareStreams[0];

  const sharing =
    screenShareStream &&
    screenShareStream.participantID === localParticipant.id;

  return {
    localParticipantID: localParticipant.id,
    hasVideo: hasVideo(localParticipantStreams),
    hasAudio: hasAudio(localParticipantStreams),
    recording: !!conference.recording,
    screenSharing: sharing,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Commands);
