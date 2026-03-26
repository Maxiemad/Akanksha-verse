import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Reduce particle count for cleaner look + better performance.
const PARTICLE_COUNT = 1200;

const HeroParticles = () => {
  const meshRef = useRef<THREE.Points>(null);
  const { mouse } = useThree();

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const vel = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
      vel[i * 3] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }
    return [pos, vel];
  }, []);

  const colors = useMemo(() => {
    const cols = new Float32Array(PARTICLE_COUNT * 3);
    const purple = new THREE.Color('#8A2BE2');
    const blue = new THREE.Color('#00FFFF');
    const pink = new THREE.Color('#FF2D95');
    const palette = [purple, blue, pink];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const c = palette[Math.floor(Math.random() * palette.length)];
      cols[i * 3] = c.r;
      cols[i * 3 + 1] = c.g;
      cols[i * 3 + 2] = c.b;
    }
    return cols;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const geo = meshRef.current.geometry;
    const posAttr = geo.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    const mx = mouse.x * 5;
    const my = mouse.y * 5;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const idx = i * 3;
      // Mouse influence
      const dx = arr[idx] - mx;
      const dy = arr[idx + 1] - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 3) {
        const force = (3 - dist) * 0.002;
        arr[idx] += dx * force;
        arr[idx + 1] += dy * force;
      }

      arr[idx] += velocities[idx];
      arr[idx + 1] += velocities[idx + 1];
      arr[idx + 2] += velocities[idx + 2];

      // Boundary
      for (let j = 0; j < 3; j++) {
        if (Math.abs(arr[idx + j]) > 10) {
          velocities[idx + j] *= -1;
        }
      }
    }
    posAttr.needsUpdate = true;

    meshRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={PARTICLE_COUNT}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

const HeroScene = () => {
  return (
    <group>
      <HeroParticles />
      <ambientLight intensity={0.1} />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#8A2BE2" />
      <pointLight position={[-5, -5, 5]} intensity={0.3} color="#00FFFF" />
    </group>
  );
};

export default HeroScene;
