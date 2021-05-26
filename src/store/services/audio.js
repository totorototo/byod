import VoxeetSDK from "@voxeet/voxeet-web-sdk";

export const startAudio = async (participant) => {
  try {
    await VoxeetSDK.conference.startAudio(participant);
  } catch (exception) {
    return exception;
  }
};

export const stopAudio = async (participant) => {
  try {
    await VoxeetSDK.conference.stopAudio(participant);
  } catch (exception) {
    return exception;
  }
};
