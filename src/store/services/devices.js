import VoxeetSDK from "@voxeet/voxeet-web-sdk";
import { schema, normalize } from "normalizr";
import pick from "lodash.pick";

export const listAudioDevices = async () => {
  try {
    const audioDevices = await VoxeetSDK.mediaDevice.enumerateAudioDevices();
    const device = new schema.Entity(
      "devices",
      {},
      {
        idAttribute: "deviceId",
        processStrategy: (entity) => pick(entity, ["label", "king", "groupId"]),
      }
    );
    const normalizedData = normalize(audioDevices, [device]);

    return {
      ids: normalizedData.result,
      entities: normalizedData.entities,
    };
  } catch (exception) {
    return exception;
  }
};

export const listVideoDevices = async () => {
  try {
    const videoDevices = await VoxeetSDK.mediaDevice.enumerateVideoDevices();
    const device = new schema.Entity(
      "devices",
      {},
      {
        idAttribute: "deviceId",
        processStrategy: (entity) =>
          pick(entity, ["deviceId", "label", "king", "groupId"]),
      }
    );
    const normalizedData = normalize(videoDevices, [device]);

    return {
      ids: normalizedData.result,
      entities: normalizedData.entities,
    };
  } catch (exception) {
    return exception;
  }
};

export const selectVideoInput = async (id) => {
  try {
    const result = await VoxeetSDK.mediaDevice.selectVideoInput(id);
    console.log(result);
  } catch (exception) {
    return exception;
  }
};

export const selectAudioInput = async (id) => {
  try {
    const result = await VoxeetSDK.mediaDevice.selectAudioInput(id);
    console.log(result);
  } catch (exception) {
    return exception;
  }
};

export const selectAudioOutput = async (id) => {
  try {
    const result = await VoxeetSDK.mediaDevice.selectAudioOutput(id);
    console.log(result);
  } catch (exception) {
    return exception;
  }
};
