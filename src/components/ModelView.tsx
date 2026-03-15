import { OrbitControls, PerspectiveCamera, View } from "@react-three/drei";
import * as THREE from "three";
import { Suspense } from "react";
import type { ComponentRef, RefObject } from "react";
import type { ModelItem } from "../constants";
import Lights from "./Lights";
import Loader from "./Loader";
import IPhone from "./IPhone";

/** Ref handle for orbit controls (getAzimuthalAngle used to sync rotation state) */
export interface OrbitControlsRef {
  getAzimuthalAngle: () => number;
}

export interface ModelViewProps {
  index: number;
  groupRef: RefObject<THREE.Group>;
  gsapType: string;
  controlRef: RefObject<OrbitControlsRef | null>;
  setRotationState: (angle: number) => void;
  size: "small" | "large";
  item: ModelItem;
}

/**
 * One 3D viewport (view1 or view2). View has id for GSAP; groupRef is the THREE.Group we animate in Model. onEnd saves rotation for timeline sync.
 */
function ModelView({
  index,
  groupRef,
  gsapType,
  controlRef,
  setRotationState,
  size,
  item,
}: ModelViewProps): React.ReactElement {
  return (
    <View
      index={index}
      id={gsapType}
      className={`w-full h-full absolute ${index === 2 ? "right-[-100%]" : ""}`}
    >
      <ambientLight intensity={0.3} />
      <PerspectiveCamera makeDefault position={[0, 0, 4]} />
      <Lights />
      <OrbitControls
        makeDefault
        ref={controlRef as RefObject<ComponentRef<typeof OrbitControls>>}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        target={new THREE.Vector3(0, 0, 0)}
        onEnd={() =>
          controlRef.current &&
          setRotationState(controlRef.current.getAzimuthalAngle())
        }
      />
      <group
        ref={groupRef}
        name={index === 1 ? "small" : "large"}
        position={[0, 0, 0]}
      >
        <Suspense fallback={<Loader />}>
          {/* scale differs by index so small/large views have different model size */}
          <IPhone
            scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
            item={item}
            size={size}
          />
        </Suspense>
      </group>
    </View>
  );
}

export default ModelView;
