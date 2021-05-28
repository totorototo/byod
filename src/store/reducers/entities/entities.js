import { omit } from "lodash";

import {
  removeEntity,
  setEntities,
  setEntity,
  updateEntity,
} from "../../effects/entities";
import { handleEffects } from "../../utils/store";
import { leaveConference } from "../../effects/application";

const initialState = {};

export default handleEffects(
  {
    [setEntities]: (state, action) => {
      return {
        ...state,
        ...action.payload.entities,
      };
    },
    [setEntity]: (state, action) => ({
      ...state,
      [action.payload.entityType]: {
        ...state[action.payload.entityType],
        ...action.payload.data,
      },
    }),
    [removeEntity]: (state, action) => {
      const cleanedEntity = omit(
        state[action.payload.entityType],
        action.payload.id
      );
      return {
        ...state,
        [action.payload.entityType]: cleanedEntity,
      };
    },
    [updateEntity]: (state, action) => {
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
    },
    [leaveConference]: () => initialState,
  },
  initialState
);
