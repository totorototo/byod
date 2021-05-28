import { createAction } from "../utils/store";

export const listAudioDevices = createAction("LIST_AUDIO_DEVICES");
export const listVideoDevices = createAction("LIST_VIDEO_DEVICES");
export const setAudioInput = createAction("SET_AUDIO_INPUT");
export const setAudioOutput = createAction("SET_AUDIO_OUTPUT");
export const setVideoInput = createAction("SET_VIDEO_INPUT");
