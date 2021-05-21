import styled from "styled-components";
import THEME from "../../theme/Theme";

const style = (Component) => styled(Component)`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;

  .local-participant-video {
    position: absolute;
    top: 4rem;
    right: 4rem;
    width: 4rem;
    height: 4rem;
  }

  .conference-details {
    font-family: "Cabin Sketch", cursive;
    font-size: 1rem;
    height: 10%;
    width: 100%;
    display: grid;
    place-items: center;
    color: var(--color-primary);
  }

  .screen-share-wrapper {
    display: flex;
    height: 60%;
    width: 100%;
    padding: 1rem;
    align-items: flex-start;
    justify-content: flex-start;
  }

  .remote-participants-video {
    flex: 1;
    width: 100%;
    padding: 1rem;
    display: grid;
    place-items: center;
    grid-gap: 1rem;
    grid-template-columns: repeat(auto-fit, 1fr);

    .remote-participant-wrapper {
      display: grid;
      width: 100%;
      height: 100%;
    }

    @media screen and (min-width: ${THEME.breakpoints[0]}) {
      .remote-participant-wrapper {
        max-height: 800px;
      }

      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    }
  }

  .remote-participants-no-video {
    display: flex;
    width: 100%;
    justify-content: space-around;
    margin-top: 0.8rem;
    margin-bottom: 0.8rem;

    .remote-participant-no-video-wrapper {
      background-color: var(--color-primary);
      color: var(--color-background);

      width: 2rem;
      height: 2rem;
      display: grid;
      place-items: center;
      border-radius: 80%;
      text-transform: uppercase;
    }
  }

  .main-commands-wrapper {
    display: flex;
    align-items: flex-end;
    margin-bottom: 1rem;
    // flex: 1;
    width: 100%;
    justify-content: center;
  }
`;

export default style;
