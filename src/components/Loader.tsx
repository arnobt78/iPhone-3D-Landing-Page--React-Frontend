import { Html } from "@react-three/drei";
import React from "react";

/** Shown while GLB is loading. Drei Html renders DOM inside the 3D scene. */
function Loader(): React.ReactElement {
  return (
    <Html>
      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
        <div className="w-[10vw] h-[10vw] rounded-full">Loading...</div>
      </div>
    </Html>
  );
}

export default Loader;
