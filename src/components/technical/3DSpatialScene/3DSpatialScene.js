import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, TransformControls, useCursor } from "@react-three/drei";
import { useControls } from "leva";

import style from "./3DSpatialScene.Style";

function Box({ setTarget, setSpatialPosition, participant, ...rest }) {
  const [hovered, setHovered] = useState(false);

  useCursor(hovered);

  return (
    <mesh
      {...rest}
      onClick={(e) => {
        setTarget(e.object);
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onUpdate={({ position }) => {
        setSpatialPosition({ participantId: participant.id, position });
      }}
    >
      <boxGeometry />
      <meshNormalMaterial color="orange" />
    </mesh>
  );
}

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
    mode: { value: "translate", options: ["translate"] },
  });

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
    >
      {localParticipant && (
        <Box
          setTarget={setTarget}
          setSpatialPosition={setParticipantPosition}
          participant={localParticipant}
          position={[0, 0, 0]}
        />
      )}
      {participants &&
        participants.map((participant, index) => (
          <Box
            key={index}
            setTarget={setTarget}
            position={[(index + 1) * 2, 0, -3]}
            setSpatialPosition={setParticipantPosition}
            participant={participant}
          />
        ))}

      {target && <TransformControls object={target} mode={mode} />}
      <OrbitControls makeDefault />
    </Canvas>
  );
};

export default style(SpatialScene);
