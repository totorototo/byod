import React, { useState } from "react";
import {
  Headphones,
  MessageCircle,
  Video,
  Voicemail,
} from "@styled-icons/feather";

import style from "./ConferenceSettings.Style";

const ConferenceSettings = ({ className, create }) => {
  const [conferenceName, setConferenceName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    create({
      alias: conferenceName,
      params: {
        liveRecording: true,
        ttl: 0,
        stats: "true",
        videoCodec: "H264",
        dolbyVoice: true,
      },
    });
  };

  const handleConferenceNameChange = (event) => {
    setConferenceName(event.target.value);
  };

  return (
    <div className={className}>
      <div className={"container"}>
        <div className={"icons"}>
          <Headphones width={40} height={40} />
          <MessageCircle width={40} height={40} />
          <Video width={40} height={40} />
          <Voicemail width={40} height={40} />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="user-box">
            <input
              type="text"
              name="conferenceName"
              required
              value={conferenceName}
              onChange={handleConferenceNameChange}
            />
            <label>Conference name</label>
          </div>
          <button type="submit">join conference</button>
        </form>
      </div>
    </div>
  );
};

export default style(ConferenceSettings);
