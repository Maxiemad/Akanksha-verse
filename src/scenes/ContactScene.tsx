import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const HologramPanel = ({ position, size, color }: { position: [number, number, number]; size: [number, number]; color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.08 + Math.sin(state.clock.elapsedTime * 2) * 0.03;
  });

  return (
    <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.3}>
      <mesh ref={meshRef} position={position}>
        <planeGeometry args={size} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Border glow */}
      <mesh position={position}>
        <edgesGeometry args={[new THREE.PlaneGeometry(...size)]} />
        <lineBasicMaterial color={color} transparent opacity={0.4} />
      </mesh>
    </Float>
  );
};

const ContactScene = () => {
  return (
    <group position={[0, 0, -120]}>
      <HologramPanel position={[0, 0, 0]} size={[5, 6]} color="#8A2BE2" />
      <HologramPanel position={[-3, 1, -2]} size={[2, 3]} color="#00FFFF" />
      <HologramPanel position={[3, -1, -1]} size={[2, 2.5]} color="#FF2D95" />

      <ambientLight intensity={0.15} />
      <pointLight position={[0, 3, 5]} intensity={0.6} color="#8A2BE2" />
      <pointLight position={[-3, -2, 3]} intensity={0.3} color="#00FFFF" />
    </group>
  );
};

export default ContactScene;
