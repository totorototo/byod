import { connect } from "react-redux";

import { conference } from "../store/actions";
import Conference from "../components/conference/Conference";
import {
  getCurrentConferenceID,
  getLocalParticipantID,
} from "../store/reducers/application/selectors";
import {
  getEntity,
  getValidEntities,
} from "../store/reducers/entities/selectors";
import { NotFoundEntity } from "../dataDefinitions/defect";

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

  const conference = getEntity(
    state,
    "conferences",
    getCurrentConferenceID(state)
  );

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

  const localParticipantHasVideo = hasVideo(localParticipantStreams);
  const localParticipantHasAudio = hasAudio(localParticipantStreams);

  const updatedLocalParticipant = {
    ...localParticipant,
    hasAudio: localParticipantHasAudio,
    hasVideo: localParticipantHasVideo,
    streams: localParticipantStreams,
  };

  const remoteParticipantsIDs =
    conference &&
    conference.participants &&
    conference.participants.length > 0 &&
    conference.participants.filter((id) => id !== localParticipant.id);

  const remoteParticipants = getValidEntities(
    state,
    "participants",
    remoteParticipantsIDs
  );

  const updatedRemoteParticipants = remoteParticipants.map((participant) => {
    const streams = getValidEntities(state, "streams", participant.streams);

    const video = hasVideo(streams);
    const audio = hasAudio(streams);
    return { ...participant, streams, hasVideo: video, hasAudio: audio };
  });

  const screenShareStream =
    conference.screenShareStreams &&
    conference.screenShareStreams.length > 0 &&
    conference.screenShareStreams[0];

  const stream =
    screenShareStream && screenShareStream.streamID
      ? getEntity(state, "streams", screenShareStream.streamID)
      : {};

  const participantID = screenShareStream && screenShareStream.participantID;

  const str =
    participantID === localParticipant.id || stream === NotFoundEntity
      ? {}
      : stream;

  return {
    localParticipant: updatedLocalParticipant,
    conference,
    remoteParticipants: updatedRemoteParticipants,
    screenSharingStream: str,
  };
};

const mapDispatchToProps = {
  leave: conference.leave,
  stopAudio: conference.stopAudio,
  startAudio: conference.startAudio,
  stopVideo: conference.stopVideo,
  startVideo: conference.startVideo,
};

export default connect(mapStateToProps, mapDispatchToProps)(Conference);
