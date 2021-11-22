import VoxeetSDK from "@voxeet/voxeet-web-sdk";

export const isSpeaking = async (participant, cb) => {
  try {
    await VoxeetSDK.conference.isSpeaking(participant, cb);
  } catch (exception) {
    return exception;
  }
};

export const audioLevel = async (participant, cb) => {
  try {
    await VoxeetSDK.conference.audioLevel(participant, cb);
  } catch (exception) {
    return exception;
  }
};
