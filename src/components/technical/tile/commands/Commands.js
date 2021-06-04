import React from "react";
import { Mic, MicOff, Video, VideoOff } from "@styled-icons/feather";

import style from "./Commands.Style";

const ActionButton = ({ className, children, action, ...rest }) => (
  <div className={className} {...rest} onClick={action}>
    {children}
  </div>
);

const Commands = ({
  className,
  startAudio,
  stopAudio,
  startVideo,
  stopVideo,
  participant,
}) => {
  const handleVideo = () => {
    participant.hasVideo
      ? stopVideo(participant.id)
      : startVideo(participant.id);
  };

  const handleAudio = () => {
    participant.hasAudio
      ? stopAudio(participant.id)
      : startAudio(participant.id);
  };

  return (
    <div className={className}>
      <ActionButton action={() => handleVideo()}>
        {participant.hasVideo ? <Video /> : <VideoOff />}
      </ActionButton>
      <ActionButton action={() => handleAudio()}>
        {participant.hasAudio ? <Mic /> : <MicOff />}
      </ActionButton>
    </div>
  );
};

export default style(Commands);
