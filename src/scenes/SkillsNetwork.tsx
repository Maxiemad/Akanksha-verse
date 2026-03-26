import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const SKILLS = [
  'React', 'TypeScript', 'Node.js', 'Python', 'Three.js',
  'GraphQL', 'AWS', 'Docker', 'PostgreSQL', 'Next.js',
  'TailwindCSS', 'Git', 'MongoDB', 'Redis', 'Figma',
];

const SkillsNetwork = () => {
  const groupRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const nodePositions = useMemo(() => {
    return SKILLS.map((_, i) => {
      const phi = Math.acos(-1 + (2 * i) / SKILLS.length);
      const theta = Math.sqrt(SKILLS.length * Math.PI) * phi;
      const r = 4;
      return new THREE.Vector3(
        r * Math.cos(theta) * Math.sin(phi),
        r * Math.sin(theta) * Math.sin(phi),
        r * Math.cos(phi)
      );
    });
  }, []);

  const lineGeometry = useMemo(() => {
    const points: number[] = [];
    for (let i = 0; i < nodePositions.length; i++) {
      for (let j = i + 1; j < nodePositions.length; j++) {
        if (nodePositions[i].distanceTo(nodePositions[j]) < 5) {
          points.push(
            nodePositions[i].x, nodePositions[i].y, nodePositions[i].z,
            nodePositions[j].x, nodePositions[j].y, nodePositions[j].z,
          );
        }
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
    return geo;
  }, [nodePositions]);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.2;
  });

  return (
    <group ref={groupRef} position={[0, 0, -90]}>
      {/* Connection lines */}
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color="#8A2BE2" transparent opacity={0.2} />
      </lineSegments>

      {/* Skill nodes */}
      {nodePositions.map((pos, i) => (
        <mesh key={SKILLS[i]} position={pos}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshBasicMaterial
            color={i % 3 === 0 ? '#8A2BE2' : i % 3 === 1 ? '#00FFFF' : '#FF2D95'}
          />
        </mesh>
      ))}

      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 5]} intensity={0.5} color="#8A2BE2" />
    </group>
  );
};

export default SkillsNetwork;
