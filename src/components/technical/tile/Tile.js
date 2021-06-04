import React from "react";
import { User, Users } from "@styled-icons/feather";

import styled from "./Tile.Style";
import Video from "../video/Video";
import Commands from "./commands/Commands";

const Tile = ({
  className,
  width,
  height,
  participant,
  startVideo,
  stopVideo,
  startAudio,
  stopAudio,
}) => {
  return (
    <div className={className} style={{ width, height }}>
      <div className={"commands-wrapper"}>
        <div className={"participant-name"}>{participant.name}</div>
        <Commands
          participant={participant}
          startAudio={startAudio}
          stopAudio={stopAudio}
          startVideo={startVideo}
          stopVideo={stopVideo}
        />
      </div>
      {participant.hasVideo ? (
        <Video width={width} height={height} stream={participant.streams[0]} />
      ) : (
        <>{participant.inGroup ? <Users size={50} /> : <User size={50} />}</>
      )}
    </div>
  );
};

export default styled(Tile);
