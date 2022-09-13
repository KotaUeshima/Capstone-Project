import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Earth from "./Earth";

function SpinningGlobe() {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <Earth />
      </Suspense>
    </Canvas>
  );
}

export default SpinningGlobe;
