import VoxeetSDK from "@voxeet/voxeet-web-sdk";

export const openSession = async (payload) => {
  try {
    await VoxeetSDK.session.open(payload);
  } catch (exception) {
    return exception;
  }
};

export const closeSession = async () => {
  try {
    await VoxeetSDK.session.close();
  } catch (exception) {
    return exception;
  }
};
