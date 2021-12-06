import VoxeetSDK from "@voxeet/voxeet-web-sdk";

export const setEnvironment = (payload) => {
  try {
    VoxeetSDK.conference.setSpatialEnvironment(
      payload.scale,
      payload.forward,
      payload.up,
      payload.right
    );
  } catch (exception) {
    return exception;
  }
};

export const setPosition = (participantId, position = { x: 0, y: 0, z: 0 }) => {
  try {
    const participant = VoxeetSDK.conference.participants.get(participantId);
    VoxeetSDK.conference.setSpatialPosition(participant, position);
  } catch (exception) {
    return exception;
  }
};

export const setDirection = (
  participantId,
  direction = { x: 0, y: 0, z: -1 }
) => {
  try {
    const participant = VoxeetSDK.conference.participants.get(participantId);
    VoxeetSDK.conference.setSpatialDirection(participant, direction);
  } catch (exception) {
    return exception;
  }
};
