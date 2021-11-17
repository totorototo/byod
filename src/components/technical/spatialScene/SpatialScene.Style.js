import styled from "styled-components";

const style = (Component) => styled(Component)`
  position: relative;

  > svg {
    position: absolute;
    top: 0;
    left: 0;
  }
`;

export default style;
