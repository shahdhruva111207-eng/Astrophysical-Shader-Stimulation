import React, { useMemo, useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { GalaxyShader } from './GalaxyShader';

export interface GalaxyConfig {
  particleCount: number;
  numArms: number;
  armTwist: number;
  armSpread: number;
  coreRadius: number;
  galaxyRadius: number;
  speed: number;
  palette: 'milky-way' | 'deep-blue' | 'supernova' | 'cyberpunk' | 'monochrome';
  coreGlow: number;
  particleScale: number;
}

interface ProceduralGalaxyProps {
  config: GalaxyConfig;
  mousePos: THREE.Vector2;
}

export const ProceduralGalaxy: React.FC<ProceduralGalaxyProps> = ({ config, mousePos }) => {
  const pointsRef = useRef<THREE.Points>(null!);
  const materialRef = useRef<THREE.ShaderMaterial>(null!);
  const { viewport, size } = useThree();

  // Color Palettes (Refined Astronomical Star Colors)
  const getPaletteColors = (paletteName: string) => {
    switch (paletteName) {
      case 'deep-blue':
        return {
          core: new THREE.Color('#ffffff'),
          innerArm: new THREE.Color('#e0f2fe'),
          outerArm: new THREE.Color('#93c5fd'),
          dust: new THREE.Color('#475569'),
          warmStar: new THREE.Color('#bfdbfe'),
        };
      case 'supernova':
        return {
          core: new THREE.Color('#fff7ed'),
          innerArm: new THREE.Color('#fed7aa'),
          outerArm: new THREE.Color('#fb923c'),
          dust: new THREE.Color('#78350f'),
          warmStar: new THREE.Color('#fef08a'),
        };
      case 'cyberpunk':
        return {
          core: new THREE.Color('#ffffff'),
          innerArm: new THREE.Color('#e0f2fe'),
          outerArm: new THREE.Color('#c084fc'),
          dust: new THREE.Color('#475569'),
          warmStar: new THREE.Color('#f43f5e'),
        };
      case 'monochrome':
        return {
          core: new THREE.Color('#ffffff'),
          innerArm: new THREE.Color('#f8fafc'),
          outerArm: new THREE.Color('#cbd5e1'),
          dust: new THREE.Color('#475569'),
          warmStar: new THREE.Color('#ffffff'),
        };
      case 'milky-way':
      default:
        return {
          core: new THREE.Color('#fffdf5'), // Pure hot white / pale golden core
          innerArm: new THREE.Color('#f8fafc'), // Crisp pure white inner arm stars
          outerArm: new THREE.Color('#e0f2fe'), // Soft pale ice blue
          dust: new THREE.Color('#94a3b8'), // Subtle slate dust filaments
          warmStar: new THREE.Color('#ffedd5'), // Subtle warm peach giant stars (~3%)
        };
    }
  };

  // Generate Procedural Geometry Attributes with Astronomical Hierarchy
  const { positions, colors, sizes, alphas, speeds, randomness, isCore, tiers, luminosity } = useMemo(() => {
    const count = config.particleCount;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const alphas = new Float32Array(count);
    const speeds = new Float32Array(count);
    const randomness = new Float32Array(count);
    const isCore = new Float32Array(count);
    const tiers = new Float32Array(count);
    const luminosity = new Float32Array(count);

    const palette = getPaletteColors(config.palette);
    const coreCount = Math.floor(count * 0.32); // 32% of stars in dense nuclear bulge

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const isBulgeStar = i < coreCount;

      let r: number;
      let theta: number;
      let x: number, y: number, z: number;
      let color: THREE.Color;

      // Tier Hierarchy Distribution:
      // ~75% Tiny particles, ~18% Small particles, ~6% Medium glowing, ~1% Large bright stars
      const randTier = Math.random();
      let tierVal = 0.0;
      let sizeVal = 0.5;
      let alphaVal = 0.5;

      if (randTier > 0.99) {
        // Tier 3: Large bright stars (1%)
        tierVal = 3.0;
        sizeVal = Math.random() * 1.6 + 3.2;
        alphaVal = 1.0;
      } else if (randTier > 0.93) {
        // Tier 2: Medium glowing particles (6%)
        tierVal = 2.0;
        sizeVal = Math.random() * 1.0 + 1.8;
        alphaVal = Math.random() * 0.15 + 0.85;
      } else if (randTier > 0.75) {
        // Tier 1: Small particles (18%)
        tierVal = 1.0;
        sizeVal = Math.random() * 0.6 + 0.9;
        alphaVal = Math.random() * 0.3 + 0.5;
      } else {
        // Tier 0: Tiny particles (75%)
        tierVal = 0.0;
        sizeVal = Math.random() * 0.4 + 0.4;
        alphaVal = Math.random() * 0.35 + 0.22;
      }

      if (isBulgeStar) {
        // --- Dense Nuclear Bulge / Core Generation ---
        // Tight exponential radial falloff focusing thousands of stars at center
        const u = Math.random();
        r = config.coreRadius * Math.pow(u, 2.5);

        // Ellipsoidal distribution for core bulge
        const phi = Math.acos(2 * Math.random() - 1);
        theta = Math.random() * Math.PI * 2;

        const coreHeightScale = 0.55;
        x = r * Math.sin(phi) * Math.cos(theta);
        y = r * Math.cos(phi) * coreHeightScale;
        z = r * Math.sin(phi) * Math.sin(theta);

        // Core colors: Hot white / golden cream
        const coreMix = Math.random();
        color = palette.core.clone().lerp(palette.innerArm, coreMix * 0.35);

        isCore[i] = 1.0;
        // Boost core particle tier distribution slightly for dense center halo
        if (Math.random() < 0.12 && tierVal < 2.0) tierVal = 2.0;
      } else {
        // --- Spiral Arms & Extended Disk Generation ---
        const armIndex = i % config.numArms;
        const armAngle = (armIndex * 2 * Math.PI) / config.numArms;

        // Radial distribution favoring inner-to-mid disk
        const normDist = Math.pow(Math.random(), 1.4);
        r = config.coreRadius + normDist * (config.galaxyRadius - config.coreRadius);

        // Logarithmic spiral angle calculation: theta = armAngle + r * twist
        const twistAngle = r * (config.armTwist / config.galaxyRadius);
        theta = armAngle + twistAngle;

        // Natural variation & stochastic turbulence
        const dispersion = Math.pow(r / config.galaxyRadius, 0.8) * config.armSpread * 2.2;

        // Gaussian-like offset using Box-Muller transform
        const u1 = Math.max(0.0001, Math.random());
        const u2 = Math.random();
        const randG1 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
        const randG2 = Math.sqrt(-2 * Math.log(u1)) * Math.sin(2 * Math.PI * u2);

        const offsetX = randG1 * dispersion;
        const offsetZ = randG2 * dispersion;
        
        // Disk thickness decreases at edges
        const thickness = (1 - r / config.galaxyRadius * 0.6) * 0.8;
        const offsetY = (Math.random() - 0.5) * dispersion * thickness;

        x = Math.cos(theta) * r + offsetX;
        z = Math.sin(theta) * r + offsetZ;
        y = offsetY;

        // Astrophysics Star Types & Color Palette
        const radiusRatio = (r - config.coreRadius) / (config.galaxyRadius - config.coreRadius);
        const randType = Math.random();

        if (randType < 0.04) {
          // Subtle warm orange/peach giant stars (~4%)
          color = palette.warmStar.clone();
        } else if (radiusRatio < 0.35) {
          // Inner arm: Bright pale cyan & white
          const mix = Math.random();
          color = palette.innerArm.clone().lerp(palette.outerArm, mix * 0.4);
        } else if (radiusRatio < 0.75) {
          // Mid arm: Cool sapphire blue
          const mix = Math.random();
          color = palette.outerArm.clone().lerp(palette.dust, mix * 0.35);
        } else {
          // Outer edge & dust lanes: Indigo & subtle cosmic violet
          color = palette.dust.clone();
        }

        isCore[i] = 0.0;
      }

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      sizes[i] = sizeVal * config.particleScale;
      alphas[i] = alphaVal;
      speeds[i] = Math.random() * 0.4 + 0.8;
      randomness[i] = Math.random();
      tiers[i] = tierVal;
      luminosity[i] = Math.random() * 0.45 + 0.8;
    }

    return { positions, colors, sizes, alphas, speeds, randomness, isCore, tiers, luminosity };
  }, [config]);

  // Create Shader Uniforms once
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: 24.0 * config.particleScale },
      uSpeed: { value: config.speed },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uCoreGlow: { value: config.coreGlow },
      uColorTint: { value: new THREE.Color('#ffffff') },
    }),
    []
  );

  // Update uniforms when props change
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uSpeed.value = config.speed;
      materialRef.current.uniforms.uCoreGlow.value = config.coreGlow;
      materialRef.current.uniforms.uSize.value = 24.0 * config.particleScale;
    }
  }, [config.speed, config.coreGlow, config.particleScale]);

  // Smooth rotation state tracking refs
  const currentRotX = useRef(0);
  const currentRotY = useRef(0);
  const currentRotZ = useRef(0);

  // Frame Animation Loop with Damped Mouse Parallax & Restrained Galaxy Tilt
  useFrame((state, delta) => {
    // 1. Update GLSL Shader Uniforms
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();

      // Subtle particle field position shift in GLSL vertex shader
      const targetMouseX = mousePos.x * 0.8;
      const targetMouseY = mousePos.y * 0.8;

      materialRef.current.uniforms.uMouse.value.x +=
        (targetMouseX - materialRef.current.uniforms.uMouse.value.x) * 0.03;
      materialRef.current.uniforms.uMouse.value.y +=
        (targetMouseY - materialRef.current.uniforms.uMouse.value.y) * 0.03;
    }

    // 2. Restrained Galaxy Axis Rotation & Tilt with Astronomical Inertia Damping
    if (pointsRef.current) {
      const time = state.clock.getElapsedTime();
      
      // Continuous slow baseline orbital rotation
      const baseRotationY = time * 0.012 * config.speed;

      // Base 3D Inclination Pitch (~30 degrees) so the galaxy forms a face-on spiral disc
      const basePitchX = 0.52;

      // Restrained target offsets:
      // Horizontal mouse movement gently rotates galaxy around vertical Y-axis (max ±0.35 rad ~20deg)
      // Vertical mouse movement gently tilts galaxy around X-axis (max ±0.18 rad ~10deg)
      const targetRotY = mousePos.x * 0.35;
      const targetRotX = -mousePos.y * 0.18;
      const targetRotZ = mousePos.x * mousePos.y * 0.06; // Subtle aesthetic roll

      // Smooth damping / lerp interpolation for heavy floating object feel
      const dampFactor = Math.min(delta * 2.5, 0.1);

      currentRotX.current += (targetRotX - currentRotX.current) * dampFactor;
      currentRotY.current += (targetRotY - currentRotY.current) * dampFactor;
      currentRotZ.current += (targetRotZ - currentRotZ.current) * dampFactor;

      // Apply combined rotations with 3D inclination pitch
      pointsRef.current.rotation.x = basePitchX + currentRotX.current;
      pointsRef.current.rotation.y = baseRotationY + currentRotY.current;
      pointsRef.current.rotation.z = currentRotZ.current;
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
          attach="attributes-aColor"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aSize"
          count={sizes.length}
          array={sizes}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aAlpha"
          count={alphas.length}
          array={alphas}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aSpeed"
          count={speeds.length}
          array={speeds}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aRandomness"
          count={randomness.length}
          array={randomness}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aIsCore"
          count={isCore.length}
          array={isCore}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aTier"
          count={tiers.length}
          array={tiers}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aLuminosity"
          count={luminosity.length}
          array={luminosity}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={GalaxyShader.vertexShader}
        fragmentShader={GalaxyShader.fragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};
