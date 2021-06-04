import styled from "styled-components";

import THEME from "../../../theme/Theme";

const style = (Component) => styled(Component)`
  position: relative;
  display: grid;
  place-items: center;
  border-radius: 0.8rem;
  background-color: var(--color-gray-100);
  // max-height: 300px;

  @media screen and (min-width: ${THEME.breakpoints[0]}) {
    max-height: 800px;
  }

  .name {
    position: absolute;
    bottom: 0.5rem;
    left: 50%;
    transform: translate(-50%, 0);
    color: var(--color-primary);
  }

  .commands-wrapper {
    position: absolute;
    bottom: 0.5rem;
    left: 50%;
    transform: translate(-50%, 0);
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;

    .participant-name {
      color: var(--color-gray-100);
      background-color: var(--color-gray-900);
      border-radius: 0.4rem;
      opacity: 0.6;
      padding: 0.2rem 0.6rem;
      margin-right: auto;
      margin-left: 0.6rem;
      ::after {
        margin-left: 0.5rem;
        content: "";
        display: inline-block;
        width: 0.2rem;
        height: 0.2rem;
        border-radius: 1rem;
        background-color: var(--color-success);
        top: 50%;
        transform: translate(0%, -50%);
      }
    }
  }

  .commands-wrapper ~ svg {
    stroke: var(--color-primary);
  }
`;

export default style;
