import styled from "styled-components";

const style = (Component) => styled(Component)`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;

  input::placeholder {
    transition: all 0.3s ease-in-out;
  }

  .container {
    width: 40%;
    max-width: 400px;
    min-width: 250px;
    display: flex;
    flex-direction: column;

    .icons {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2.4rem;
      > svg {
        stroke: var(--color-primary);
      }
    }

    form {
      display: flex;
      flex: 1;
      flex-direction: column;

      button {
        align-self: flex-end;
        margin-right: 0;
      }
    }
  }

  .user-box {
    position: relative;

    input {
      width: 100%;
      padding: 10px 0;
      font-size: 16px;
      color: var(--color-primary);
      margin-bottom: 30px;
      border: none;
      border-bottom: 1px solid var(--color-primary);
      outline: none;
      background: transparent;
      :valid ~ label,
      :focus ~ label {
        top: -20px;
        left: 0;
        color: var(--color-primary);
        font-size: 12px;
      }
      :invalid {
        box-shadow: none;
      }
    }

    label {
      position: absolute;
      top: 0;
      left: 0;
      padding: 10px 0;
      font-size: 16px;
      color: var(--color-primary);
      pointer-events: none;
      transition: 0.5s;
    }
  }
`;

export default style;
