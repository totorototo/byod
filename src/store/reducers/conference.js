import {
  setConferenceInfos,
  participantAdded,
  participantUpdated,
  participantRemoved,
  streamRemoved,
  streamUpdated,
  streamAdded,
  setLocalParticipantID,
  joined,
  created,
  ended,
  nearbyFound,
  nearbyLost,
  left,
  videoStarted,
  videoStopped,
  recordingStarted,
  recordingStopped,
  participantAudioStatus,
  screenShareStarted,
  screenShareStopped,
} from "../effects/conference";
import { handleEffects } from "../utils/store";

const initialState = {
  details: {},
  participants: [],
  localParticipantID: -1,
  started: false,
  joined: false,
  nearbyIds: [],
  videoStarted: false,
  recording: false,
  screenSharing: false,
  screenSharingStream: {},
};

const handleStreamModification = (state, action) => {
  if (
    action.payload.stream.type === "ScreenShare" &&
    action.payload.participant.id !== state.localParticipantID
  ) {
    return { ...state, screenSharingStream: action.payload.stream };
  }
  const others = state.participants.filter(
    (participant) => participant.id !== action.payload.participant.id
  );

  const currentParticipant = state.participants.find(
    (participant) => participant.id === action.payload.participant.id
  );

  const filteredStreams = currentParticipant.streams.filter(
    (stream) => stream.id !== action.payload.stream.id
  );

  const updatedCurrentParticipant = {
    ...currentParticipant,
    streams: [...filteredStreams, action.payload.stream],
  };

  return { ...state, participants: [...others, updatedCurrentParticipant] };
};

export default handleEffects(
  {
    [setConferenceInfos]: (state, action) => ({
      ...state,
      details: { ...action.payload },
    }),
    [nearbyFound]: (state, action) => {
      return { ...state, nearbyIds: [...state.nearbyIds, action.payload] };
    },
    [nearbyLost]: (state, action) => {
      return {
        ...state,
        nearbyIds: state.nearbyIds.filter((id) => id !== action.payload),
      };
    },
    [streamAdded]: (state, action) => handleStreamModification(state, action),
    [streamUpdated]: (state, action) => handleStreamModification(state, action),
    [streamRemoved]: (state, action) => {
      if (
        action.payload.stream.type === "ScreenShare" &&
        action.payload.participant.id !== state.localParticipantID
      ) {
        return { ...state, screenSharingStream: {} };
      }
      const others = state.participants.filter(
        (participant) => participant.id !== action.payload.participant.id
      );

      const currentParticipant = state.participants.find(
        (participant) => participant.id === action.payload.participant.id
      );

      if (!currentParticipant) return state;

      const updatedCurrentParticipant = {
        ...currentParticipant,
        streams: [],
      };

      return { ...state, participants: [...others, updatedCurrentParticipant] };
    },
    [participantAdded]: (state, action) => ({
      ...state,
      participants: [...state.participants, action.payload.participant],
    }),
    [participantUpdated]: (state, action) => {
      const others = state.participants.filter(
        (participant) => participant.id !== action.payload.participant.id
      );

      const updatedParticipants =
        action.payload.participant.status === "Left"
          ? [...others]
          : [...others, action.payload.participant];

      return {
        ...state,
        participants: updatedParticipants,
      };
    },
    [participantRemoved]: (state, action) => ({
      ...state,
      participants: state.participants.filter(
        (participant) => participant.id !== action.participant.id
      ),
    }),
    [setLocalParticipantID]: (state, action) => ({
      ...state,
      localParticipantID: action.payload,
    }),
    [created]: (state) => ({ ...state, started: true }),
    [joined]: (state) => ({ ...state, joined: true }),
    [left]: () => initialState,
    [ended]: (state) => ({ ...state, started: false }),
    [videoStarted]: (state) => ({ ...state, videoStarted: true }),
    [videoStopped]: (state) => ({ ...state, videoStarted: false }),
    [recordingStarted]: (state) => ({
      ...state,
      recording: true,
    }),
    [recordingStopped]: (state) => ({
      ...state,
      recording: false,
    }),
    [participantAudioStatus]: (state, action) => {
      const others = state.participants.filter(
        (participant) => participant.id !== action.payload.id
      );

      const participant = state.participants.find(
        (participant) => participant.id === action.payload.id
      );

      if (!participant) return state;

      const updatedParticipant = {
        ...participant,
        isSpeaking: action.payload.isSpeaking,
        audioLevel: action.payload.audioLevel,
      };

      return { ...state, participants: [...others, updatedParticipant] };
    },
    [screenShareStarted]: (state) => ({ ...state, screenSharing: true }),
    [screenShareStopped]: (state) => ({ ...state, screenSharing: false }),
  },
  initialState
);
