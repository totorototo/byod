import styled from "styled-components";

const style = (Component) => styled(Component)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-background);
  background-color: var(--syntax-fn);
  opacity: 1;
  padding: 0.2rem;
  border-radius: 0.3rem;
  margin-left: auto;
  margin-right: 0.6rem;

  svg {
    transition: stroke 0.5s ease, width 0.5s ease;
    width: 1.3rem;
    margin-right: 0.1rem;
    margin-left: 0.1rem;
    stroke: var(--color-background);
  }

  svg:hover {
    stroke: var(--color-gray-300);
  }
`;

export default style;
