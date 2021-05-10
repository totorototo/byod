import { opened, closed } from "../effects/session";
import { handleEffects } from "../utils/store";

const initialState = {
  opened: false,
};

export default handleEffects(
  {
    [opened]: (state) => ({ ...state, opened: true }),
    [closed]: (state) => ({ ...state, opened: false }),
  },
  initialState
);
