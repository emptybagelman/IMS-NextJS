import React, { useEffect, useRef, useCallback, useMemo } from "react";
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import styles from "../RoomOverlay/styles.module.scss"; // environment styling
import { useWindowSize } from "@/utils/windowSize";

interface EnvironmentProps {
  mapUrls: string[];
  roomId: number;
  user_id: number;
}

export default function Environment({ mapUrls, roomId, user_id }: EnvironmentProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);

  const windowSize = useWindowSize();

  const sizes = useMemo(() => ({ width: windowSize.width, height: windowSize.height }), [windowSize.width, windowSize.height]);


  const setupScene = useCallback((canvas: HTMLCanvasElement | null) => {
    if (!canvas) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
    camera.position.set(4, 5, 4);
    scene.add(camera);

    const controls = new OrbitControls(camera, canvas);
    controls.target.y = 3.5;
    controls.enableDamping = true;

    const renderer = new THREE.WebGLRenderer({
      canvas,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    scene.backgroundBlurriness = 0;
    scene.backgroundIntensity = 1;

    const environmentMap = new THREE.CubeTextureLoader().load(mapUrls);
    scene.environment = environmentMap;
    scene.background = environmentMap;

    const clock = new THREE.Clock();

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    };

    tick();

    return { tick:tick, controls, renderer, sizes, camera };
  }, [mapUrls, sizes]);

  useEffect(() => {
    const container = containerRef.current;

    const canvas = document.createElement('canvas');
    container?.appendChild(canvas);

    const sceneSetup = setupScene(canvas);

    if (!sceneSetup) {
      // Handle the case where setupScene returns undefined
      return;
    }

    const { tick, controls, renderer, sizes, camera } = sceneSetup;
    const animationId = requestAnimationFrame(tick);

    const onResize = () => {
      sizes.width = container?.clientWidth || 0;
      sizes.height = container?.clientHeight || 0;
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', onResize);

    return () => {
      while (container?.firstChild) {
        container?.removeChild(container?.firstChild);
      }
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', onResize);
      controls.dispose();
      renderer.dispose();
    };
  }, [mapUrls, setupScene, sizes]);

  return (
    <>
      <div ref={containerRef} className={styles.env_map} />
    </>
  );
}
