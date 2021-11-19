import React, { useState, useEffect, useContext } from "react";

import styled from "./Participant.Style";
import { ThemeContext } from "../themeProvider/ThemeProvider";
import Video from "../video/Video";

const RADIUS = 75;

const Participant = ({
  className,
  setSpatialPosition,
  participant,
  x,
  y,
  draggable = false,
  width,
  height,
  color,
}) => {
  const [strokeDashArray, setStrokeDashArray] = useState();

  const [strokeDashOffset, setStrokeDashOffset] = useState(0);

  const [position, setPosition] = useState({
    x,
    y,
  });

  const [audioLevel, setAudioLevel] = useState(0);

  const { theme, colorMode } = useContext(ThemeContext);

  // compute stroke dash array
  useEffect(() => {
    const length = 2 * Math.PI * (RADIUS + 3);
    setStrokeDashArray(length);
  }, []);

  // compute stroke dash offset
  useEffect(() => {
    const offset = strokeDashArray * (1 - audioLevel / 100);
    setStrokeDashOffset(offset);
  }, [strokeDashArray, audioLevel, setStrokeDashOffset]);

  // compute fake audio level
  useEffect(() => {
    console.log(participant.isSpeaking);
    if (!participant.isSpeaking) {
      setAudioLevel(0);
      return;
    }

    const timerID = setInterval(() => {
      const fakeAudioLevel = Math.floor(Math.random() * 100);
      setAudioLevel(fakeAudioLevel);
    }, 400);

    return () => {
      clearTimeout(timerID);
    };
  }, [participant.isSpeaking]);

  // compute participant position in scene
  useEffect(() => {
    if (!x || !y) return;
    setPosition({ x, y });
  }, [x, y]);

  // set participant spatial position (dispatch action to store)
  useEffect(() => {
    if (!position) return;

    setSpatialPosition({ participantId: participant.id, position });
    // eslint-disable-next-line
  }, [position]);

  const [dnd, setDnd] = useState({ active: false, offset: {} });

  const handlePointerDown = (e) => {
    if (!draggable) return;

    const el = e.target;
    const bbox = e.target.getBoundingClientRect();
    const x = e.clientX - bbox.left;
    const y = e.clientY - bbox.top;
    el.setPointerCapture(e.pointerId);
    setDnd({ ...dnd, active: true, offset: { x, y } });
  };
  const handlePointerMove = (e) => {
    if (!draggable) return;

    const bbox = e.target.getBoundingClientRect();
    const x = e.clientX - bbox.left;
    const y = e.clientY - bbox.top;

    if (dnd.active) {
      setPosition({
        ...position,
        x: position.x - (dnd.offset.x - x),
        y: position.y - (dnd.offset.y - y),
      });
    }
  };
  const handlePointerUp = (e) => {
    if (!draggable) return;

    setDnd({
      ...dnd,
      active: false,
    });
  };

  return (
    <svg
      className={className}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
      width={width}
      height={height}
      x={position.x}
      y={position.y}
    >
      <circle
        className={"progress"}
        cx={width / 2}
        cy={height / 2}
        r={RADIUS + 1}
        fill={"none"}
        strokeWidth={6}
        stroke={theme.colors[colorMode]["--color-primary"]}
        strokeDasharray={strokeDashArray}
        strokeDashoffset={strokeDashOffset}
      />
      {!participant.hasVideo ? (
        <>
          <circle cx={width / 2} cy={height / 2} r={RADIUS} fill={color} />
          <text x="50%" y="50%" textAnchor="middle" fill="white" dy=".3em">
            {participant.name}
          </text>
        </>
      ) : (
        <foreignObject x="0" y="0" width={width} height={height}>
          <Video
            width={RADIUS * 2}
            height={RADIUS * 2}
            stream={participant.streams[0]}
          />
        </foreignObject>
      )}
    </svg>
  );
};

export default styled(Participant);
