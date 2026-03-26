import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface PlanetProps {
  position: [number, number, number];
  color: string;
  emissive: string;
  size: number;
  speed: number;
  distort: number;
}

const Planet = ({ position, color, emissive, size, speed, distort }: PlanetProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += speed;
    const s = hovered ? 1.3 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(s, s, s), 0.05);
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        position={position}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <Sphere args={[size, 64, 64]}>
          <MeshDistortMaterial
            color={color}
            emissive={emissive}
            emissiveIntensity={hovered ? 1.5 : 0.5}
            roughness={0.2}
            metalness={0.8}
            distort={distort}
            speed={2}
          />
        </Sphere>
      </mesh>
      <mesh position={position} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[size + 0.5, size + 0.55, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.15} side={THREE.DoubleSide} />
      </mesh>
    </Float>
  );
};

const ProjectsGalaxy = () => {
  return (
    <group position={[0, 0, -60]}>
      {/* GHAR - hero planet */}
      <Planet position={[0, 0, 0]} color="#8A2BE2" emissive="#8A2BE2" size={1.5} speed={0.005} distort={0.4} />
      {/* Share the Light */}
      <Planet position={[-4, 1, -2]} color="#00FFFF" emissive="#00FFFF" size={0.8} speed={0.008} distort={0.3} />
      {/* Zen Retreats */}
      <Planet position={[3.5, -1, -3]} color="#FF2D95" emissive="#FF2D95" size={0.7} speed={0.006} distort={0.2} />
      {/* Digital Marketing GTR */}
      <Planet position={[5, 2, -1]} color="#8A2BE2" emissive="#00FFFF" size={0.5} speed={0.01} distort={0.25} />
      {/* RetreatPlan */}
      <Planet position={[-3, -2, -4]} color="#00FFFF" emissive="#00FFFF" size={0.55} speed={0.009} distort={0.2} />
      {/* JCurve */}
      <Planet position={[2, 2.5, -5]} color="#FF2D95" emissive="#FF2D95" size={0.45} speed={0.007} distort={0.15} />
      {/* Mathrix */}
      <Planet position={[-5, -0.5, -3]} color="#8A2BE2" emissive="#8A2BE2" size={0.4} speed={0.012} distort={0.2} />
      {/* ESSENCE */}
      <Planet position={[4.5, -2.5, -6]} color="#00FFFF" emissive="#8A2BE2" size={0.35} speed={0.011} distort={0.15} />

      <ambientLight intensity={0.15} />
      <pointLight position={[0, 0, 5]} intensity={1} color="#8A2BE2" distance={20} />
      <pointLight position={[-5, 3, 0]} intensity={0.5} color="#00FFFF" distance={15} />
      <pointLight position={[5, -3, -5]} intensity={0.3} color="#FF2D95" distance={15} />
    </group>
  );
};

export default ProjectsGalaxy;
