import styled from "styled-components";

const style = (Component) => styled(Component)`
  > video {
    border-radius: 1rem;
    object-fit: cover;

    //border: 1px solid var(--color-primary);
  }
`;

export default style;
