import React from "react";

import style from "./Settings.Style";

const Settings = ({ className, videoDevices, setVideoInput, hide }) => {
  const handleSelection = (id) => {
    setVideoInput(id);
    hide();
  };
  return (
    <div className={className}>
      {videoDevices.map((device, index) => (
        <div onClick={() => handleSelection(device.deviceId)} key={index}>
          {device.label}
        </div>
      ))}
    </div>
  );
};

export default style(Settings);
