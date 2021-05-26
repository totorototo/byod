import VoxeetSDK from "@voxeet/voxeet-web-sdk";

export const startScreenShare = async () => {
  try {
    await VoxeetSDK.conference.startScreenShare();
  } catch (exception) {
    return exception;
  }
};

export const stopScreenShare = async () => {
  try {
    await VoxeetSDK.conference.stopScreenShare();
  } catch (exception) {
    return exception;
  }
};
