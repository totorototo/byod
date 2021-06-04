import styled from "styled-components";

const style = (Component) => styled(Component)`
  display: grid;
  place-items: center;
  background-color: var(--color-background);
  width: 100%;
  height: 100%;
`;

export default style;
