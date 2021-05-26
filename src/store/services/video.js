import VoxeetSDK from "@voxeet/voxeet-web-sdk";

export const startVideo = async (participant) => {
  try {
    await VoxeetSDK.conference.startVideo(participant, {
      audio: true,
      video: true,
    });
  } catch (exception) {
    return exception;
  }
};

export const stopVideo = async (participant) => {
  try {
    await VoxeetSDK.conference.stopVideo(participant);
  } catch (exception) {
    return exception;
  }
};
