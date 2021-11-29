/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: DeltaRayquaza (https://sketchfab.com/EoinMcSharry)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/low-poly-among-us-character-bc5a1c378ad74f6fb56f26486c8edfc2
title: Low poly Among us character
*/

import { useMemo, useState, useRef } from "react";
import { useGLTF, useCursor, Text } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import { useGraph } from "@react-three/fiber";
import { useSpring, animated, config } from "@react-spring/three";

/*const Video = ({ ...rest }) => {
  const [video] = useState(() => {
    const vid = document.createElement("video");

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const constraints = {
        video: true,
      };

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function (stream) {
          // apply the stream to the video element used in the texture

          vid.srcObject = stream;
          vid.play();
        })
        .catch(function (error) {
          console.error("Unable to access the camera/webcam.", error);
        });
    } else {
      console.error("MediaDevices interface not available.");
    }

    /!*
    vid.src = url;
    vid.crossOrigin = "Anonymous";
    vid.loop = true;
    vid.muted = true;
    vid.play();*!/

    console.log(vid);
    return vid;
  });

  return (
    <mesh
      {...rest}
      rotation={[0, Math.PI / 2, Math.PI / 2]}
      position={[10, 10, 10]}
    >
      <planeGeometry args={[200, 100]} />
      <meshStandardMaterial emissive={"white"} side={THREE.DoubleSide}>
        <videoTexture attach="map" args={[video]} />
        <videoTexture attach="emissiveMap" args={[video]} />
      </meshStandardMaterial>
    </mesh>
  );
};*/

export default function Model({
  setTarget,
  setSpatialPosition,
  participant,
  color = "pink",
  ...rest
}) {
  const { scene, materials } = useGLTF("/scene.gltf");
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);

  const [hovered, setHovered] = useState(false);
  const ref = useRef();

  const { scale } = useSpring({
    scale: participant.isSpeaking ? 1.1 : 1,
    config: config.wobbly,
  });

  useCursor(hovered);

  function handlePointerOver() {
    setHovered(true);
  }

  function handlePointerOut() {
    setHovered(false);
  }

  return (
    <group
      {...rest}
      onClick={(e) => {
        setTarget(e.object.parent.parent.parent.parent);
      }}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onUpdate={({ position }) => {
        setSpatialPosition({ participantId: participant.id, position });
      }}
      dispose={null}
    >
      <animated.group scale={scale} ref={ref} rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group rotation={[0, Math.PI / 2, 0]}>
            <Text
              color="black" // default
              anchorX="center" // default
              anchorY="middle" // default
              position={[0, 4, 4]}
              scale={[110, 110, 0]}
            >
              {participant.name}
            </Text>
          </group>
          <group
            position={[-20.06, 0, -48.68]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[0.92, 1, 0.95]}
          >
            <mesh
              geometry={nodes["Box002_01_-_Default_0"].geometry}
              material={materials["01_-_Default"]}
            >
              <meshStandardMaterial color={color} />
            </mesh>
            <mesh
              geometry={nodes["Box002_02_-_Default_0"].geometry}
              material={materials["02_-_Default"]}
            />

            <mesh
              geometry={nodes["Box002_07_-_Default_0"].geometry}
              material={materials["07_-_Default"]}
            />
          </group>
        </group>
      </animated.group>
    </group>
  );
}

useGLTF.preload("/scene.gltf");
