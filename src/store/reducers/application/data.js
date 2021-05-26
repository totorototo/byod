import {
  setLocalParticipantID,
  setCurrentConferenceID,
  leaveConference,
} from "../../effects/application";
import { handleEffects } from "../../utils/store";

const initialState = {
  localParticipantID: null,
  currentConferenceID: null,
};

export default handleEffects(
  {
    [setLocalParticipantID]: (state, action) => ({
      ...state,
      localParticipantID: action.payload.id,
    }),
    [setCurrentConferenceID]: (state, action) => {
      return {
        ...state,
        currentConferenceID: action.payload.id,
      };
    },
    [leaveConference]: () => initialState,
  },
  initialState
);
