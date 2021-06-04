import styled from "styled-components";

import THEME from "../../../theme/Theme";

const style = (Component) => styled(Component)`
  display: flex;
  width: 60%;
  max-width: 500px;
  justify-content: space-between;
  align-items: center;
  //background-color: var(--color-gray-100);
  color: var(--color-primary);
  padding: 1rem;
  border-radius: 0.4rem;

  svg {
    transition: stroke 0.5s ease;
    width: 1.3rem;

    &.recording-on {
      stroke: var(--color-error);
      fill: var(--color-error);
      :hover {
        stroke: var(--color-error);
      }
    }
  }

  @media screen and (min-width: ${THEME.breakpoints[0]}) {
    bottom: 4rem;
    svg {
      width: 2.4rem;
    }
  }

  svg:hover {
    stroke: var(--color-error);
  }
`;

export default style;
