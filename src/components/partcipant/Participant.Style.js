import styled from "styled-components";

const style = (Component) => styled(Component)`
  position: absolute;
  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: var(--color-primary);
  .icon {
    display: grid;
    place-items: center;
    // border: 0.13rem solid var(--color-primary);
    border-radius: 2rem;
    margin-bottom: 1rem;
  }
`;

export default style;
