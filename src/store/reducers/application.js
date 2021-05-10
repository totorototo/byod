import { setToken, sdkInitialized } from "../effects/application";
import { handleEffects } from "../utils/store";

const initialState = {
  token: "",
  initialized: false,
};

export default handleEffects(
  {
    [setToken]: (state, action) => ({ ...state, token: action.payload.token }),
    [sdkInitialized]: (state) => ({ ...state, initialized: true }),
  },
  initialState
);
