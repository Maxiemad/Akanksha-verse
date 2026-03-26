import { useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { ThreeEvent } from '@react-three/fiber';

type SpacecraftNavProps = {
  onSelectScene: (sceneIndex: number) => void;
};

type Craft = {
  sceneIndex: number;
  position: [number, number, number];
  baseColor: string;
  hoverColor: string;
};

const crafts: Craft[] = [
  // Right-aligned vertical stack
  // Left-aligned vertical stack (with larger gaps)
  { sceneIndex: 1, position: [-3.6, 1.8, 2.5], baseColor: '#7C3AED', hoverColor: '#22D3EE' }, // About
  { sceneIndex: 2, position: [-3.6, 0.6, 2.5], baseColor: '#06B6D4', hoverColor: '#FB7185' }, // Projects
  { sceneIndex: 3, position: [-3.6, -0.6, 2.5], baseColor: '#FB7185', hoverColor: '#A78BFA' }, // Skills
  { sceneIndex: 4, position: [-3.6, -1.8, 2.5], baseColor: '#A78BFA', hoverColor: '#06B6D4' }, // Contact
];

const makeCraftGeometry = () => {
  // Simple stylized spacecraft: cone nose + cylinder body + wings.
  const group = new THREE.Group();

  const bodyGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.7, 10, 1, false);
  const noseGeo = new THREE.ConeGeometry(0.14, 0.28, 10);
  const wingGeo = new THREE.BoxGeometry(0.38, 0.03, 0.16);

  const body = new THREE.Mesh(bodyGeo);
  const nose = new THREE.Mesh(noseGeo);
  const wingL = new THREE.Mesh(wingGeo);
  const wingR = new THREE.Mesh(wingGeo);

  body.position.set(0, 0, 0);
  nose.position.set(0, 0.49, 0);
  wingL.position.set(-0.22, -0.05, 0);
  wingR.position.set(0.22, -0.05, 0);

  group.add(body, nose, wingL, wingR);
  group.rotation.z = Math.PI; // point "forward" toward camera

  return group;
};

const Spacecraft = ({
  craft,
  onClick,
}: {
  craft: Craft;
  onClick: (sceneIndex: number) => void;
}) => {
  const ref = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  const materials = useMemo(() => {
    const base = new THREE.MeshStandardMaterial({
      color: craft.baseColor,
      emissive: craft.baseColor,
      emissiveIntensity: 0.6,
      metalness: 0.35,
      roughness: 0.35,
    });
    const hover = new THREE.MeshStandardMaterial({
      color: craft.hoverColor,
      emissive: craft.hoverColor,
      emissiveIntensity: 0.9,
      metalness: 0.25,
      roughness: 0.25,
    });
    return { base, hover };
  }, [craft.baseColor, craft.hoverColor]);

  const model = useMemo(() => makeCraftGeometry(), []);

  useMemo(() => {
    // Apply material to all meshes.
    model.traverse((obj) => {
      if (obj instanceof THREE.Mesh) obj.material = materials.base;
    });
    return undefined;
  }, [model, materials.base]);

  useFrame((state) => {
    const g = ref.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    g.rotation.y = Math.sin(t * 0.8 + craft.sceneIndex) * 0.25;
    g.position.y = craft.position[1] + Math.sin(t * 1.2 + craft.sceneIndex) * 0.08;

    const targetScale = hovered ? 1.12 : 1.0;
    g.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.15);

    // Smooth material swap by updating emissiveIntensity + color.
    const mat = hovered ? materials.hover : materials.base;
    model.traverse((obj) => {
      if (obj instanceof THREE.Mesh) obj.material = mat;
    });
  });

  const handleOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = 'pointer';
  };

  const handleOut = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(false);
    document.body.style.cursor = 'default';
  };

  const handleClick = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    onClick(craft.sceneIndex);
  };

  return (
    <group
      ref={ref}
      position={craft.position}
      onPointerOver={handleOver}
      onPointerOut={handleOut}
      onClick={handleClick}
    >
      <primitive object={model} />
      {/* tiny glow */}
      <pointLight
        intensity={hovered ? 0.9 : 0.45}
        distance={3}
        color={hovered ? craft.hoverColor : craft.baseColor}
        position={[0, 0, 0.4]}
      />
    </group>
  );
};

const SpacecraftNav = ({ onSelectScene }: SpacecraftNavProps) => {
  return (
    <group>
      {crafts.map((c) => (
        <Spacecraft key={c.sceneIndex} craft={c} onClick={onSelectScene} />
      ))}
    </group>
  );
};

export default SpacecraftNav;

