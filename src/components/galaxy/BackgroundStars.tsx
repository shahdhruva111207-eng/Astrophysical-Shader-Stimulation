import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface BackgroundStarsProps {
  count?: number;
}

export const BackgroundStars: React.FC<BackgroundStarsProps> = ({ count = 4500 }) => {
  const pointsRef = useRef<THREE.Points>(null!);

  const { positions, colors, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const sz = new Float32Array(count);

    const colorOptions = [
      new THREE.Color('#ffffff'), // White
      new THREE.Color('#93c5fd'), // Pale blue
      new THREE.Color('#bae6fd'), // Light cyan
      new THREE.Color('#fed7aa'), // Pale warm peach
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Spherical radius between 35 and 90
      const radius = 35 + Math.random() * 55;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = radius * Math.cos(phi);
      pos[i3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

      const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      col[i3] = color.r;
      col[i3 + 1] = color.g;
      col[i3 + 2] = color.b;

      // Tiny crisp background stars
      sz[i] = Math.random() * 1.5 + 0.5;
    }

    return { positions: pos, colors: col, sizes: sz };
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.003;
      pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.002) * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        vertexColors={true}
        transparent={true}
        opacity={0.7}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};
