import React from "react";

import style from "./Main.Style";
import Video from "../../technical/video/Video";

const Main = ({ className, open, join, create, leave, localParticipant }) => {
  return (
    <div className={className}>
      <div>toto</div>
      <button onClick={() => open({ name: "local" })}>open</button>
      <button
        onClick={() =>
          create({
            alias: "toto",
            params: {
              ttl: 0,
              stats: "true",
              videoCodec: "H264",
              dolbyVoice: false,
            },
          })
        }
      >
        create
      </button>
      <button onClick={() => join({ audio: true, video: true })}>join</button>
      <button onClick={() => leave()}>leave</button>
      {localParticipant && localParticipant.streams.length > 0 && (
        <Video stream={localParticipant.streams[0]} />
      )}
    </div>
  );
};

export default style(Main);
