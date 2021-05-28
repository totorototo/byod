import React from "react";

import style from "./Settings.Style";

const Settings = ({ className, videoDevices, setVideoInput }) => {
  return (
    <div className={className}>
      {videoDevices.map((device, index) => (
        <div onClick={() => setVideoInput(device.deviceId)} key={index}>
          {device.label}
        </div>
      ))}
    </div>
  );
};

export default style(Settings);
