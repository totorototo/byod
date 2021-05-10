import { createEffect } from "../utils/store";

export const sdkInitialized = createEffect("SDK_INITIALIZED");
export const setConferenceInfos = createEffect("SET_CURRENT_INFOS");
export const streamAdded = createEffect("STREAM_ADDED");
export const streamUpdated = createEffect("STREAM_UPDATED");
export const streamRemoved = createEffect("STREAM_REMOVED");
export const participantAdded = createEffect("PARTICIPANT_ADDED");
export const participantRemoved = createEffect("PARTICIPANT_REMOVED");
export const participantUpdated = createEffect("PARTICIPANT_UPDATED");
export const setLocalParticipantID = createEffect("SET_LOCAL_PARTICPANT_ID");
export const created = createEffect("CREATED");
export const joined = createEffect("JOINED");
export const left = createEffect("LEFT");
export const ended = createEffect("ENDED");
export const nearbyFound = createEffect("NEARBY_FOUND");
export const nearbyLost = createEffect("NEARBY_LOST");
export const videoStarted = createEffect("VIDEO_STARTED");
export const videoStopped = createEffect("VIDEO_STOPPED");
export const recordingStarted = createEffect("RECORDING_STARTED");
export const recordingStopped = createEffect("RECORDING_STOPPED");
export const participantAudioStatus = createEffect("PARTICIPANT_AUDIO_STATUS");
export const screenShareStarted = createEffect("SCREEN_SHARE_STARTED");
export const screenShareStopped = createEffect("SCREEN_SHARE_STOPPED");
