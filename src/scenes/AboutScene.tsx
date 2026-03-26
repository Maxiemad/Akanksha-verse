import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

const GlassPanel = ({ position, rotation, color }: { position: [number, number, number]; rotation: [number, number, number]; color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += 0.003;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.1;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} rotation={rotation}>
        <boxGeometry args={[2, 2.5, 0.05]} />
        <meshPhysicalMaterial
          color={color}
          transparent
          opacity={0.15}
          roughness={0.1}
          metalness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          envMapIntensity={1}
          side={THREE.DoubleSide}
        />
      </mesh>
    </Float>
  );
};

const AboutScene = () => {
  return (
    <group position={[0, 0, -30]}>
      <GlassPanel position={[-3, 1, 0]} rotation={[0, 0.3, 0]} color="#8A2BE2" />
      <GlassPanel position={[0, -0.5, -2]} rotation={[0, -0.2, 0.1]} color="#00FFFF" />
      <GlassPanel position={[3, 0.5, -1]} rotation={[0, 0.5, -0.1]} color="#FF2D95" />
      <GlassPanel position={[-1.5, -2, -3]} rotation={[0.1, -0.4, 0]} color="#8A2BE2" />

      <ambientLight intensity={0.2} />
      <pointLight position={[0, 5, 5]} intensity={0.8} color="#8A2BE2" />
      <pointLight position={[-5, -3, 3]} intensity={0.4} color="#00FFFF" />
      <spotLight position={[5, 5, 5]} intensity={0.5} color="#FF2D95" angle={0.5} penumbra={0.5} />
    </group>
  );
};

export default AboutScene;
