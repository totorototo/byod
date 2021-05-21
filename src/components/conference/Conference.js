import React, { useState, useEffect } from "react";
import { AutoSizer } from "react-virtualized";

import style from "./Conference.Style";
import Commands from "../../containers/Commands";
import Tile from "../tile/Tile";
import Video from "../video/Video";
import { isMobile } from "../../helpers/device";
import { partition } from "../../helpers/fp";

const Conference = ({
  className,
  remoteParticipants,
  startVideo,
  stopVideo,
  startAudio,
  stopAudio,
  screenSharingStream,
}) => {
  const [participantsWithVideo, setParticipantsWithVideo] = useState([]);
  const [participantsWithoutVideo, setParticipantsWithoutVideo] = useState([]);

  useEffect(() => {
    const hasVideo = (participant) => participant.hasVideo;
    const partitionedParticipants = partition(remoteParticipants, hasVideo);

    const isMobileBrowser = isMobile();

    if (isMobileBrowser && partitionedParticipants[0].length > 4) {
      // keep only first four participants with video
      const participants = partitionedParticipants[0].slice(0, 4);
      setParticipantsWithVideo(participants);

      // then add the others in the other pool.
      const updatedParticipantWithoutVideo = partitionedParticipants[1].slice(
        4,
        partitionedParticipants[1].length - 1
      );

      setParticipantsWithoutVideo([
        ...partitionedParticipants[1],
        ...updatedParticipantWithoutVideo,
      ]);
    } else {
      setParticipantsWithVideo(partitionedParticipants[0]);
      setParticipantsWithoutVideo(partitionedParticipants[1]);
    }
  }, [remoteParticipants]);

  return (
    <div className={className}>
      {/*   <div className={"conference-details"}>{conferenceDetails.name}</div>*/}
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
          <div className={"remote-participants-video"}>
            {participantsWithVideo &&
              participantsWithVideo.length > 0 &&
              participantsWithVideo.map((participant, index) => (
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
          <div className={"remote-participants-no-video"}>
            {participantsWithoutVideo &&
              participantsWithoutVideo.length > 0 &&
              participantsWithoutVideo.map((participant, index) => (
                <div
                  className={"remote-participant-no-video-wrapper"}
                  key={index}
                >
                  {participant.name.split(" ").map((n) => n[0])}
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
