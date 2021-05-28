import React from "react";
import {
  Mic,
  MicOff,
  Cast,
  Video,
  VideoOff,
  LogOut,
  Circle,
  Settings,
} from "@styled-icons/feather";

import style from "./Commands.Style";

const ActionButton = ({ className, children, action, ...rest }) => (
  <div className={className} {...rest} onClick={action}>
    {children}
  </div>
);

const Commands = ({
  className,
  leave,
  record,
  stopRecording,
  startVideo,
  stopVideo,
  localParticipantID,
  startAudio,
  stopAudio,
  hasAudio,
  hasVideo,
  recording,
  startScreenShare,
  stopScreenShare,
  screenSharing,
  listAudioDevices,
  listVideoDevices,
  setAudioInput,
  setAudioOutput,
  setVideoInput,
  displayModal,
}) => {
  const handleVideo = () => {
    hasVideo ? stopVideo(localParticipantID) : startVideo(localParticipantID);
  };

  const handleAudio = () => {
    hasAudio ? stopAudio(localParticipantID) : startAudio(localParticipantID);
  };

  const handleRecording = () => {
    recording ? stopRecording() : record();
  };

  const handleScreenSharing = () => {
    screenSharing ? stopScreenShare() : startScreenShare();
  };

  return (
    <div className={className}>
      <ActionButton action={() => handleVideo()}>
        {hasVideo ? <Video /> : <VideoOff />}
      </ActionButton>
      <ActionButton action={() => handleAudio()}>
        {hasAudio ? <Mic /> : <MicOff />}
      </ActionButton>
      <ActionButton action={() => handleRecording()}>
        <Circle className={`recording-${recording ? "on" : "off"}`} />
      </ActionButton>
      <ActionButton action={() => handleScreenSharing()}>
        <Cast />
      </ActionButton>
      <ActionButton action={() => displayModal()}>
        <Settings />
      </ActionButton>
      <ActionButton action={() => leave()}>
        <LogOut />
      </ActionButton>
    </div>
  );
};

export default style(Commands);
