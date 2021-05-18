export const getParticipantVideo = (state, participantID) => {
  const participant = state.conference.participants.find(
    (participant) => participant.id === participantID
  );
  return (
    participant &&
    participant.streams.find((stream) => stream.type === "Camera")
  );
};

export const getRemoteParticipants = (state) => {
  const remoteParticipants = state.conference.participants.filter(
    (participant) =>
      participant.id !== state.conference.localParticipantID &&
      participant.type !== "mixer"
  );

  return remoteParticipants.map((participant) => ({
    id: participant.id,
    name: participant.info.name,
    stream: participant.streams.find((stream) => {
      return stream.type === "Camera";
    }),
    hasAudio: participantHasAudio(state, participant.id),
    hasVideo: participantHasVideo(state, participant.id),
    // inGroup: state.conference.nearbyIds.includes(participant.id),
  }));
  //.sort((a, b) => a.name.localeCompare(b.name));
};

export const getLocalParticipant = (state) => {
  return state.conference.participants.find(
    (participant) => participant.id === state.conference.localParticipantID
  );
};

export const participantHasVideo = (state, participantID) => {
  const participant = state.conference.participants.find(
    (participant) => participant.id === participantID
  );

  const stream =
    participant &&
    participant.streams.find((stream) => stream.type === "Camera");

  if (!stream) return false;

  const videoTracks = stream.getVideoTracks();
  return videoTracks.length > 0;
};

export const participantHasAudio = (state, participantID) => {
  const participant = state.conference.participants.find(
    (participant) => participant.id === participantID
  );
  const stream =
    participant &&
    participant.streams.find((stream) => stream.type === "Camera");

  if (!stream) return false;

  const tracks = stream.getAudioTracks();
  return tracks.length > 0;
};

export const getConferenceDetails = (state) => ({
  name: state.conference.details.alias,
});
