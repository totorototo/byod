import { createAction } from "../utils/store";

export const create = createAction("CREATE_CONFERENCE");
export const join = createAction("JOIN_CONFERENCE");
export const leave = createAction("LEAVE_CONFERENCE");
export const nearbyFound = createAction("NEARBY_FOUND");
export const nearbyLost = createAction("NEARBY_LOST");
export const record = createAction("RECORD_CONFERENCE");
export const stopRecording = createAction("STOP_RECORDING_CONFERENCE");
export const startVideo = createAction("START_VIDEO");
export const stopVideo = createAction("STOP_VIDEO");
export const startAudio = createAction("START_AUDIO");
export const stopAudio = createAction("STOP_AUDIO");
export const stopBackgroundTask = createAction("STOP_BACKGROUND_TASK");
export const startScreenShare = createAction("START_SCREEN_SHARE");
export const stopScreenShare = createAction("STOP_SCREEN_SHARE");
