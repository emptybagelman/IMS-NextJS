"use client"

import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import Environment from "@/components/Homepage/Environment"
import House from "@/components/Homepage/House"

function ThreeHouse(){

    const box = new THREE.BoxGeometry();
    const cyl = new THREE.CylinderGeometry(1, 1, 2, 20);
    const tri = new THREE.CylinderGeometry(1, 1, 2, 3);

    return (
        <Canvas shadows camera={{ position: [-15, 10, 15], fov: 25 }}>
          <House
            scale={0.9}
            boxGeometry={box}
            triGeometry={tri}
            clyGeometry={cyl}
            scrollY={0}
          />
          <Environment />
          <OrbitControls makeDefault enableZoom={false} />
        </Canvas>
    )
}

export default ThreeHouse;