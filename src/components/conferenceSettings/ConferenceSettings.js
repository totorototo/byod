import React, { useState } from "react";

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
        <form onSubmit={handleSubmit}>
          <div className="user-box">
            <input
              id="conferenceName"
              autoComplete="off"
              type="search"
              name="conferenceName"
              required
              value={conferenceName}
              onChange={handleConferenceNameChange}
            />
            <label htmlFor="conferenceName">Conference name</label>
          </div>
          <button type="submit">join conference</button>
        </form>
      </div>
      <div className={"dolby"}>powered by dolby.io</div>
    </div>
  );
};

export default style(ConferenceSettings);
