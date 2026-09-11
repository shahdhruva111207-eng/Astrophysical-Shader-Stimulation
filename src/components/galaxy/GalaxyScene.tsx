import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { ProceduralGalaxy, GalaxyConfig } from './ProceduralGalaxy';
import { BackgroundStars } from './BackgroundStars';
import { GalaxyHotspots } from './GalaxyHotspots';

interface GalaxySceneProps {
  config: GalaxyConfig;
  showHotspots: boolean;
  onFpsUpdate?: (fps: number) => void;
}

// Camera Rig for subtle, damped depth parallax
const CameraRig: React.FC<{ mousePos: THREE.Vector2 }> = ({ mousePos }) => {
  useFrame((state) => {
    // Restrained camera sway lerp for multi-layered spatial depth
    const targetCamX = mousePos.x * 1.8;
    const targetCamY = 14 + mousePos.y * 1.2;

    state.camera.position.x += (targetCamX - state.camera.position.x) * 0.025;
    state.camera.position.y += (targetCamY - state.camera.position.y) * 0.025;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
};

// Frame Rate Telemetry Monitor inside R3F Context
const FrameMonitor: React.FC<{ onFpsUpdate?: (fps: number) => void }> = ({ onFpsUpdate }) => {
  const frames = useRef(0);
  const prevTime = useRef(performance.now());

  useFrame(() => {
    frames.current++;
    const now = performance.now();
    if (now >= prevTime.current + 1000) {
      const fps = Math.round((frames.current * 1000) / (now - prevTime.current));
      if (onFpsUpdate) onFpsUpdate(fps);
      frames.current = 0;
      prevTime.current = now;
    }
  });

  return null;
};

export const GalaxyScene: React.FC<GalaxySceneProps> = ({ config, showHotspots, onFpsUpdate }) => {
  const [mousePos, setMousePos] = useState<THREE.Vector2>(new THREE.Vector2(0, 0));
  const targetInput = useRef<THREE.Vector2>(new THREE.Vector2(0, 0));
  const lastActiveTime = useRef<number>(Date.now());

  useEffect(() => {
    // Mouse & Pointer events
    const handlePointerMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      targetInput.current.set(x, y);
      lastActiveTime.current = Date.now();
    };

    // Touch events for mobile/tablet devices
    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        const x = (touch.clientX / window.innerWidth) * 2 - 1;
        const y = -(touch.clientY / window.innerHeight) * 2 + 1;
        targetInput.current.set(x, y);
        lastActiveTime.current = Date.now();
      }
    };

    // Device orientation fallback for mobile gyroscopes
    const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
      if (event.gamma !== null && event.beta !== null) {
        // Gamma: [-90, 90] left-to-right tilt, Beta: [-180, 180] front-to-back tilt
        const x = THREE.MathUtils.clamp(event.gamma / 35, -1, 1);
        const y = THREE.MathUtils.clamp((event.beta - 45) / 35, -1, 1);
        targetInput.current.set(x, y);
        lastActiveTime.current = Date.now();
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchMove, { passive: true });

    if (window.DeviceOrientationEvent && typeof (window.DeviceOrientationEvent as any).requestPermission !== 'function') {
      window.addEventListener('deviceorientation', handleDeviceOrientation);
    }

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchMove);
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
    };
  }, []);

  // Smooth Interpolation Loop for Input Coordinates
  useEffect(() => {
    let animationFrameId: number;

    const updateInput = () => {
      const timeSinceActive = Date.now() - lastActiveTime.current;
      let targetX = targetInput.current.x;
      let targetY = targetInput.current.y;

      // Gentle automatic floating movement fallback when idle (>2.5s)
      if (timeSinceActive > 2500) {
        const t = Date.now() * 0.0006;
        targetX = Math.sin(t) * 0.25;
        targetY = Math.cos(t * 0.7) * 0.18;
      }

      setMousePos((prev) => {
        // High inertia exponential lerp
        const nextX = prev.x + (targetX - prev.x) * 0.035;
        const nextY = prev.y + (targetY - prev.y) * 0.035;
        return new THREE.Vector2(nextX, nextY);
      });

      animationFrameId = requestAnimationFrame(updateInput);
    };

    animationFrameId = requestAnimationFrame(updateInput);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="absolute inset-0 z-0 bg-[#02040a]">
      <Canvas
        camera={{ position: [0, 16, 22], fov: 45, near: 0.1, far: 200 }}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: false,
          stencil: false,
          depth: true,
        }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#010206']} />

        {/* Ambient lighting for hot spot indicators */}
        <ambientLight intensity={0.5} />
        <pointLight position={[0, 5, 0]} intensity={2.5} color="#ffffff" />
        <pointLight position={[10, 0, 10]} intensity={1.0} color="#38bdf8" />
        <pointLight position={[-10, 0, -10]} intensity={1.0} color="#fb923c" />

        {/* Procedural Galaxy & Background Stars */}
        <ProceduralGalaxy config={config} mousePos={mousePos} />
        <BackgroundStars count={4200} />
        <GalaxyHotspots visible={showHotspots} />

        {/* Camera Parallax & Controls */}
        <CameraRig mousePos={mousePos} />
        <OrbitControls
          enableZoom={true}
          zoomSpeed={0.8}
          minDistance={6}
          maxDistance={65}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.75}
          minPolarAngle={Math.PI / 8}
          rotateSpeed={0.6}
          dampingFactor={0.05}
        />

        <FrameMonitor onFpsUpdate={onFpsUpdate} />
      </Canvas>
    </div>
  );
};
