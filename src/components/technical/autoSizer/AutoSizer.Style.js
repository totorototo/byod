import styled from "styled-components";

export default (Component) => styled(Component)`
  display: flex;
  flex: 1 1 auto;
  height: 90%;
  align-items: center;
  justify-content: center;
  > * {
    margin: 4px;
  }
`;
