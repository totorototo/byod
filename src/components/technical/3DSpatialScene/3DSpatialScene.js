import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, TransformControls } from "@react-three/drei";
import { useControls } from "leva";

import Participant from "./Model";
import style from "./3DSpatialScene.Style";
import Grid from "./Grid";

const getPosition = (radius, angle) => {
  // Convert angle to radians
  const theta = angle * (Math.PI / 180);
  return [radius * Math.cos(theta), 0, -radius * Math.sin(theta)];
};

const DELTA = 30;

const SpatialScene = ({
  className,
  participants,
  localParticipant,
  width,
  height,
  setSpatialEnvironment,
  setParticipantPosition,
}) => {
  const [target, setTarget] = useState();
  const { mode } = useControls({
    mode: { value: "translate", options: ["translate", "rotate"] },
  });

  const [colors, setColors] = useState({});

  useEffect(() => {
    participants.forEach((participant) => {
      if (!Object.keys(colors).includes(participant.id)) {
        const color = "#" + Math.random().toString(16).substr(-6);
        setColors({ ...colors, [participant.id]: color });
      }
    });
  }, [participants, colors]);

  useEffect(() => {
    if (!width || !height) return;

    // compute spatial environment (fix direction issues)
    const scale = { x: 1, y: 1, z: 1 };
    const forward = { x: 0, y: -1, z: 0 };
    const up = { x: 0, y: 0, z: 1 };
    const right = { x: 1, y: 0, z: 0 };

    setSpatialEnvironment({ scale, forward, up, right });
  }, [width, height, setSpatialEnvironment]);

  return (
    <Canvas
      className={className}
      style={{ width, height }}
      dpr={[1, 2]}
      onPointerMissed={() => setTarget(null)}
      camera={{ position: [10, 10, 15] }}
    >
      <pointLight position={[5, 5, 5]} />
      <Grid size={30} />
      {localParticipant && (
        <Suspense fallback={null /* or null */}>
          <Participant
            setTarget={setTarget}
            setSpatialPosition={setParticipantPosition}
            participant={localParticipant}
            scale="0.05"
            color="red"
            position={[0, 0, 0]}
            rotation={[0, Math.PI / 2, 0]}
          />
        </Suspense>
      )}
      {participants &&
        participants.map((participant, index) => (
          <Suspense key={index} fallback={null}>
            <Participant
              scale="0.05"
              color={colors[participant.id]}
              position={getPosition(
                12,
                (index === 0
                  ? 0
                  : index % 2
                  ? index * DELTA
                  : -index * DELTA + DELTA) + 90
              )}
              rotation={[0, -Math.PI / 2, 0]}
              participant={participant}
              setTarget={setTarget}
              setSpatialPosition={setParticipantPosition}
            />
          </Suspense>
        ))}

      {target && <TransformControls object={target} mode={mode} />}
      <OrbitControls makeDefault />
    </Canvas>
  );
};

export default style(SpatialScene);
