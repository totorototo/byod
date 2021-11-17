import React, { useEffect, useState } from "react";

import style from "../../screens/conference/Conference.Style";
import Participant from "../participant/Participant";

const SpatialConference = ({
  className,
  width,
  height,
  setSpatialEnvironment,
  setParticipantPosition,
  participants,
  localParticipant,
}) => {
  const [participantsPositions, setParticipantsPositions] = useState({});

  const setPosition = ({ participantId, position }) => {
    setParticipantsPositions({
      ...participantsPositions,
      [participantId]: position,
    });

    // compute world coordinates
    setParticipantPosition({ participantId, position: { ...position, z: 0 } });
  };

  useEffect(() => {
    if (!width || !height) return;

    // compute spatial environment
    const scale = { x: width / 4, y: height / 3, z: 1 };
    const forward = { x: 0, y: -1, z: 0 };
    const up = { x: 0, y: 0, z: 1 };
    const right = { x: 1, y: 0, z: 0 };

    setSpatialEnvironment({ scale, forward, up, right });

    /* // set participant spatial position
    Object.entries(participantsPositions).forEach(
      ([participantId, position]) => {
        setPosition({ participantId, position });
      }
    );*/
  }, [width, height, setSpatialEnvironment]);

  const centerX = width / 2;
  const centerY = height / 2;

  return (
    <div className={className} style={{ width, height }}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {localParticipant && (
          <Participant
            participant={localParticipant}
            setSpatialPosition={setPosition}
            x={centerX}
            y={centerY}
            draggable
            color={"red"}
            width={100}
            height={100}
          />
        )}
        {participants &&
          participants.map((participant, index) => (
            <Participant
              participant={participant}
              key={index}
              setSpatialPosition={setPosition}
              x={100 * (index + 1)}
              y={100}
              draggable
              color={"blue"}
              width={100}
              height={100}
            />
          ))}
      </svg>
    </div>
  );
};

export default style(SpatialConference);
