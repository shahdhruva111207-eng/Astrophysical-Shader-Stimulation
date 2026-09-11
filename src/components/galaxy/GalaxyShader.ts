import * as THREE from 'three';

export const GalaxyShader = {
  uniforms: {
    uTime: { value: 0 },
    uSize: { value: 20.0 },
    uSpeed: { value: 0.12 },
    uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uCoreGlow: { value: 1.1 },
    uColorTint: { value: new THREE.Color('#ffffff') },
  },
  vertexShader: `
    uniform float uTime;
    uniform float uSize;
    uniform float uSpeed;
    uniform float uPixelRatio;
    uniform vec2 uMouse;

    attribute float aSize;
    attribute vec3 aColor;
    attribute float aAlpha;
    attribute float aSpeed;
    attribute float aRandomness;
    attribute float aIsCore;
    attribute float aTier;
    attribute float aLuminosity;

    varying vec3 vColor;
    varying float vAlpha;
    varying float vDistance;
    varying float vIsCore;
    varying float vTier;
    varying float vLuminosity;

    void main() {
      vColor = aColor;
      vAlpha = aAlpha;
      vIsCore = aIsCore;
      vTier = aTier;
      vLuminosity = aLuminosity;

      vec3 pos = position;

      // Radial distance on orbital plane
      float radius = length(pos.xz);
      vDistance = radius;

      // Differential orbital rotation (inner stars orbit faster, mimicking rotation curves)
      float spinFactor = 1.0 / (radius * 0.22 + 0.65);
      float angle = uTime * uSpeed * aSpeed * spinFactor;

      // Orbit rotation around vertical Y axis
      float cosA = cos(angle);
      float sinA = sin(angle);
      
      float rotatedX = pos.x * cosA - pos.z * sinA;
      float rotatedZ = pos.x * sinA + pos.z * cosA;

      pos.x = rotatedX;
      pos.z = rotatedZ;

      // Organic subtle vertical wave motion
      pos.y += sin(uTime * 1.0 + radius * 0.35 + aRandomness * 6.28) * (0.02 + radius * 0.012);

      // Subtle mouse interaction depth shift
      pos.x += uMouse.x * (radius * 0.025 + 0.12);
      pos.y += uMouse.y * (radius * 0.025 + 0.12);

      // Transform matrix
      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_Position = projectionMatrix * mvPosition;

      // Controlled point size attenuation to prevent giant blobs
      float sizeAttenuation = (260.0 / -mvPosition.z);
      
      // Tier scale multipliers: Tier 0 (tiny)=0.65x, Tier 1 (small)=0.95x, Tier 2 (medium)=1.45x, Tier 3 (large)=2.2x
      float tierScale = 0.65;
      if (aTier >= 2.5) {
        tierScale = 2.2; // Large bright stars (1%)
      } else if (aTier >= 1.5) {
        tierScale = 1.45; // Medium glowing stars (6%)
      } else if (aTier >= 0.5) {
        tierScale = 0.95; // Small stars (18%)
      }

      gl_PointSize = aSize * uSize * tierScale * sizeAttenuation * uPixelRatio * 0.055;

      // Strict minimum size cap to preserve tiny individual pinpoint stars
      float minSize = (aTier < 0.5) ? 0.4 : (aTier < 1.5) ? 0.8 : 1.2;
      gl_PointSize = max(gl_PointSize, minSize);
    }
  `,
  fragmentShader: `
    uniform float uCoreGlow;
    uniform vec3 uColorTint;

    varying vec3 vColor;
    varying float vAlpha;
    varying float vDistance;
    varying float vIsCore;
    varying float vTier;
    varying float vLuminosity;

    void main() {
      // Distance from particle center sprite [0.0, 0.5]
      vec2 coord = gl_PointCoord - vec2(0.5);
      float dist = length(coord);

      if (dist > 0.5) discard;

      float normDist = dist * 2.0; // Normalized distance [0.0, 1.0]
      vec3 starColor = vColor * uColorTint * vLuminosity;

      // Subtle compact core warmth without washing out inner stars
      if (vIsCore > 0.5) {
        starColor += vec3(0.08, 0.07, 0.05) * uCoreGlow;
      }

      // --- Realistic Astronomical Point & Glow Rendering ---
      if (vTier >= 2.5) {
        // TIER 3: Large Bright Stars (~1%) - Soft Stellar Core + Atmospheric Halo
        float sharpCore = pow(1.0 - normDist, 6.0) * 1.3;
        float softHalo = pow(1.0 - normDist, 1.5) * 0.5;
        float totalIntensity = sharpCore + softHalo;

        vec3 glowColor = mix(starColor, vec3(1.0, 0.98, 0.94), 0.3) * (0.9 + totalIntensity * 0.4);
        float alpha = vAlpha * clamp(sharpCore + softHalo * 0.5, 0.0, 0.85);

        gl_FragColor = vec4(glowColor, alpha);
      }
      else if (vTier >= 1.5) {
        // TIER 2: Medium Glowing Particles (~6%) - Delicate Atmospheric Softness
        float sharpCore = pow(1.0 - normDist, 4.0) * 1.1;
        float softHalo = pow(1.0 - normDist, 1.8) * 0.3;
        float totalIntensity = sharpCore + softHalo;

        vec3 glowColor = starColor * (0.95 + totalIntensity * 0.25);
        float alpha = vAlpha * clamp(sharpCore + softHalo * 0.4, 0.0, 0.7);

        gl_FragColor = vec4(glowColor, alpha);
      }
      else {
        // TIER 0 & TIER 1: Tiny & Small Particles (~93%) - Crisp Pinpoint Stars (No Blobs)
        float pointProfile = pow(1.0 - normDist, 3.0);
        vec3 finalColor = starColor * pointProfile * 0.9;
        float alpha = vAlpha * pointProfile * 0.5;

        gl_FragColor = vec4(finalColor, alpha);
      }
    }
  `
};


