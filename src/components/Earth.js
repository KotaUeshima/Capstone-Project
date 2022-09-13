import React, { Suspense, useRef } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { TextureLoader } from "three";
import { OrbitControls } from "@react-three/drei";
import EarthSpecularMap from "../2k_earth_specular_map.jpg";

function Earth() {
  const [specularMap] = useLoader(TextureLoader, [EarthSpecularMap]);
  const earthRef = useRef();

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    earthRef.current.rotation.y = elapsedTime / 6;
  });

  return (
    <>
      <ambientLight intensity={1} />
      <mesh ref={earthRef}>
        <sphereGeometry args={[1.7, 32, 32]} />
        <meshPhongMaterial specularMap={specularMap} />
        <meshStandardMaterial map={specularMap} normalMap={specularMap} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          panSpeed={0.5}
          rotationSpeed={0.4}
        />
      </mesh>
    </>
  );
}

export default Earth;
