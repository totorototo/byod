/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: totopremier (https://sketchfab.com/totopremier)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/models/7379836c49b0420eb36a12fd1fa345c1
title: Yellow Robot
*/

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Text, useCursor, useGLTF } from "@react-three/drei";
import { useGraph } from "@react-three/fiber";
import * as THREE from "three";
import { useSpring, animated } from "@react-spring/three";
import { useDrag } from "@use-gesture/react";
import { SkeletonUtils } from "three-stdlib";

export default function Model({
  setIsDragging,
  floorPlane,
  participant,
  setSpatialPosition,
  color,
  initialPosition = [0, 0, 0],
  ...rest
}) {
  const { scene, materials } = useGLTF("/scene.gltf");
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);

  const [hovered, setHovered] = useState(false);

  useCursor(hovered);

  function handlePointerOver() {
    setHovered(true);
  }

  function handlePointerOut() {
    setHovered(false);
  }

  const [cachedPosition, setCachedPosition] = useState(initialPosition);

  const [pos, setPos] = useState(initialPosition);

  useEffect(() => {
    if (!participant) return;
    if (!setSpatialPosition) return;

    if (
      Math.abs(cachedPosition[0] - pos[0]) > 5 ||
      Math.abs(cachedPosition[2] - pos[2]) > 5
    ) {
      setSpatialPosition({
        participantId: participant.id,
        position: { x: pos[0], y: pos[1], z: pos[2] },
      });
      setCachedPosition(pos);
    }
  }, [pos, participant, setSpatialPosition]);

  let planeIntersectPoint = new THREE.Vector3();

  const dragObjectRef = useRef();

  const [spring, api] = useSpring(() => ({
    // position: [0, 0, 0],
    position: pos,
    scale: 1,
    rotation: [0, 0, 0],
    config: { friction: 10 },
  }));

  const bind = useDrag(
    ({ active, movement: [x, y], timeStamp, event }) => {
      if (active) {
        event.ray.intersectPlane(floorPlane, planeIntersectPoint);
        setPos([planeIntersectPoint.x, 1, planeIntersectPoint.z]);
      }

      setIsDragging(active);

      api.start({
        // position: active ? [x / aspect, -y / aspect, 0] : [0, 0, 0],
        position: pos,
        scale: active ? 1.2 : 1,
        rotation: [
          0,
          pos[0] > 0
            ? -Math.atan(pos[2] / pos[0]) - Math.PI / 2
            : -Math.atan(pos[2] / pos[0]) + Math.PI / 2,
          0,
        ],
      });
      return timeStamp;
    },
    { delay: true }
  );
  return (
    <animated.group
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      {...spring}
      {...bind()}
      ref={dragObjectRef}
      {...rest}
      dispose={null}
    >
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <Text
          color={participant.isSpeaking ? "red" : "black"} // default
          anchorX="center" // default
          anchorY="middle" // default
          scale={10}
          position={[2, 0, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          {participant.name}
        </Text>
        <group position={[0.93, -0.04, 0.68]} rotation={[0, -Math.PI / 2, 0]}>
          <mesh
            geometry={nodes.Sphere001_0.geometry}
            material={nodes.Sphere001_0.material}
          />
        </group>
        <group position={[1.01, -0.04, 0.67]} rotation={[0.06, -1.42, -0.26]}>
          <mesh
            geometry={nodes.Sphere002_0.geometry}
            material={nodes.Sphere002_0.material}
          />
        </group>
        <group position={[0.93, 0.01, 0.68]} rotation={[0, -Math.PI / 2, 0]}>
          <mesh
            geometry={nodes.Sphere003_0.geometry}
            material={nodes.Sphere003_0.material}
          />
        </group>
        <group position={[0.93, 0.06, 0.65]} rotation={[0, -Math.PI / 2, 0]}>
          <mesh
            geometry={nodes.Sphere004_0.geometry}
            material={nodes.Sphere004_0.material}
          />
        </group>
        <group position={[1.01, 0.01, 0.67]} rotation={[-0.2, -1.42, -0.02]}>
          <mesh
            geometry={nodes.Sphere005_0.geometry}
            material={nodes.Sphere005_0.material}
          />
        </group>
        <group position={[1.01, 0.07, 0.65]} rotation={[-0.09, -1.38, 0.68]}>
          <mesh
            geometry={nodes.Sphere006_0.geometry}
            material={nodes.Sphere006_0.material}
          />
        </group>
        <group position={[0, 0, 0.87]}>
          <mesh
            geometry={nodes.epaule2_0.geometry}
            material={nodes.epaule2_0.material}
          />
        </group>
        <group position={[0, 0, 0.87]}>
          <mesh
            geometry={nodes.epaule1_0.geometry}
            material={nodes.epaule1_0.material}
          />
        </group>
        <group position={[0, 0, 0.23]}>
          <mesh
            geometry={nodes.jambe_0.geometry}
            material={nodes.jambe_0.material}
          />
        </group>
        <group position={[0, 0, 0.9]}>
          <mesh
            geometry={nodes.genou1001_0.geometry}
            material={nodes.genou1001_0.material}
          />
        </group>
        <group position={[0, 0, 0.23]}>
          <mesh
            geometry={nodes.Cube001_0.geometry}
            material={nodes.Cube001_0.material}
          />
        </group>
        <group position={[0, 0, 0.23]}>
          <mesh
            geometry={nodes.pied_0.geometry}
            material={nodes.pied_0.material}
          />
        </group>
        <group position={[0, 0, 0.03]}>
          <mesh
            geometry={nodes.main_0.geometry}
            material={nodes.main_0.material}
          />
        </group>
        <group position={[-1, -0.01, 0.61]} rotation={[0, Math.PI / 2, 0]}>
          <mesh
            geometry={nodes.Cube003_0.geometry}
            material={nodes.Cube003_0.material}
          />
        </group>
        <group position={[0, 0, 0.03]}>
          <mesh
            geometry={nodes.poignet_0.geometry}
            material={nodes.poignet_0.material}
          />
        </group>
        <group position={[0, 0, 0.21]}>
          <mesh
            geometry={nodes.cuisse001_0.geometry}
            material={nodes.cuisse001_0.material}
          />
        </group>
        <group position={[-0.96, -0.01, 0.59]} rotation={[0, Math.PI / 2, 0]}>
          <mesh
            geometry={nodes.Cube002_0.geometry}
            material={nodes.Cube002_0.material}
          />
        </group>
        <group position={[-0.94, -0.01, 0.6]} rotation={[0, Math.PI / 2, 0]}>
          <mesh
            geometry={nodes.Cube_0.geometry}
            material={nodes.Cube_0.material}
          />
        </group>
        <group position={[0, 0, 0.23]}>
          <mesh
            geometry={nodes.hanche_0.geometry}
            material={nodes.hanche_0.material}
          />
        </group>
        <group position={[0, 0, 0.25]}>
          <mesh
            geometry={nodes.genou_articu_0.geometry}
            material={nodes.genou_articu_0.material}
          />
        </group>
        <group position={[0, 0, 0.23]}>
          <mesh
            geometry={nodes.cuisse_0.geometry}
            material={nodes.cuisse_0.material}
          />
        </group>
        <group position={[0, 0, 0.22]}>
          <mesh
            geometry={nodes.genou_articu001_0.geometry}
            material={nodes.genou_articu001_0.material}
          />
        </group>
        <group position={[0, 0, 0.28]}>
          <mesh
            geometry={nodes.Circle002_0.geometry}
            material={materials["robot.001"]}
          />
        </group>
        <group position={[0, -0.03, -0.62]}>
          <primitive object={nodes.rig_rootJoint} />
        </group>
        <group position={[0, 0, -0.61]}>
          <mesh geometry={nodes.rock_0.geometry} material={materials.rock} />
        </group>
      </group>
    </animated.group>
  );
}

useGLTF.preload("/scene.gltf");
