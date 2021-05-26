import VoxeetSDK from "@voxeet/voxeet-web-sdk";

export const startRecording = async () => {
  try {
    await VoxeetSDK.recording.start();
  } catch (exception) {
    return exception;
  }
};

export const stopRecording = async () => {
  try {
    await VoxeetSDK.recording.stop();
  } catch (exception) {
    return exception;
  }
};
