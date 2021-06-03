import { createEffect } from "../utils/store";

export const streamAdded = createEffect("STREAM_ADDED");
export const streamUpdated = createEffect("STREAM_UPDATED");
export const streamRemoved = createEffect("STREAM_REMOVED");
export const participantAdded = createEffect("PARTICIPANT_ADDED");
export const participantRemoved = createEffect("PARTICIPANT_REMOVED");
export const participantUpdated = createEffect("PARTICIPANT_UPDATED");

export const created = createEffect("CREATED");
export const joined = createEffect("JOINED");
export const left = createEffect("LEFT");
export const ended = createEffect("ENDED");

export const recordingStarted = createEffect("RECORDING_STARTED");
export const recordingStopped = createEffect("RECORDING_STOPPED");
export const participantAudioStatus = createEffect("PARTICIPANT_AUDIO_STATUS");
