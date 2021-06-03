import omit from "lodash.omit";

import {
  removeEntity,
  setEntities,
  setEntity,
  updateEntity,
} from "../../effects/entities";
import {
  participantAdded,
  participantUpdated,
  participantRemoved,
  streamAdded,
  streamUpdated,
  streamRemoved,
  conferenceAdded,
  conferenceUpdated,
  deviceAdded,
  deviceUpdated,
} from "../../effects/conference";
import { handleEffects } from "../../utils/store";
import { leaveConference } from "../../effects/application";

const initialState = {};

const setEntitiesReducer = (state, action) => {
  return {
    ...state,
    ...action.payload.entities,
  };
};

const setEntityReducer = (state, action) => ({
  ...state,
  [action.payload.entityType]: {
    ...state[action.payload.entityType],
    ...action.payload.data,
  },
});

const removeEntityReducer = (state, action) => {
  const cleanedEntity = omit(
    state[action.payload.entityType],
    action.payload.id
  );
  return {
    ...state,
    [action.payload.entityType]: cleanedEntity,
  };
};

const updateEntityReducer = (state, action) => {
  return {
    ...state,
    [action.payload.entityType]: {
      ...state[action.payload.entityType],
      [action.payload.id]: {
        ...state[action.payload.entityType][action.payload.id],
        ...action.payload.data,
      },
    },
  };
};

export default handleEffects(
  {
    [setEntities]: setEntitiesReducer,
    [setEntity]: setEntityReducer,
    [removeEntity]: removeEntityReducer,
    [updateEntity]: updateEntityReducer,
    [leaveConference]: () => initialState,
    [participantAdded]: setEntityReducer,
    [participantUpdated]: updateEntityReducer,
    [participantRemoved]: removeEntityReducer,
    [streamAdded]: setEntityReducer,
    [streamRemoved]: removeEntityReducer,
    [streamUpdated]: setEntityReducer,
    [conferenceUpdated]: updateEntityReducer,
    [deviceAdded]: setEntityReducer,
    [deviceUpdated]: updateEntityReducer,
    [conferenceAdded]: setEntityReducer,
  },
  initialState
);
