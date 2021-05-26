import VoxeetSDK from "@voxeet/voxeet-web-sdk";

export const initializeSDK = async ({ token, callback }) => {
  try {
    await VoxeetSDK.initializeToken(token, callback);
  } catch (exception) {
    return exception;
  }
};
