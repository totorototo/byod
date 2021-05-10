import React from "react";
import { AutoSizer } from "react-virtualized";

import style from "./Conference.Style";
import Commands from "../../containers/Commands";
import Tile from "../tile/Tile";
import Video from "../video/Video";

const Conference = ({
  className,
  data,
  hasVideo,
  hasAudio,
  participantVideo,
  localParticioant,
  remoteParticipants,
  startVideo,
  stopVideo,
  startAudio,
  stopAudio,
  conferenceDetails,
  screenSharingStream,
}) => {
  return (
    <div className={className}>
      <div className={"conference-details"}>{conferenceDetails.name}</div>
      {Object.keys(screenSharingStream).length > 0 ? (
        <div className={"screen-share-wrapper"}>
          <AutoSizer>
            {({ width, height }) => (
              <Video
                stream={screenSharingStream}
                width={width}
                height={height}
              />
            )}
          </AutoSizer>
        </div>
      ) : (
        <>
          <div className={"remote-participants"}>
            {remoteParticipants &&
              remoteParticipants.length > 0 &&
              remoteParticipants.map((participant, index) => (
                <div key={index} className={"remote-participant-wrapper"}>
                  <AutoSizer>
                    {({ width, height }) => (
                      <Tile
                        participant={participant}
                        width={width}
                        height={height}
                        startAudio={startAudio}
                        stopAudio={stopAudio}
                        startVideo={startVideo}
                        stopVideo={stopVideo}
                      />
                    )}
                  </AutoSizer>
                </div>
              ))}
          </div>
        </>
      )}

      <div className={"main-commands-wrapper"}>
        <Commands />
      </div>
    </div>
  );
};

export default style(Conference);
