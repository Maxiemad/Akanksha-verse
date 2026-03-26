import { Canvas } from '@react-three/fiber';
import { Suspense, useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import HeroScene from '../scenes/HeroScene';
import AboutScene from '../scenes/AboutScene';
import ProjectsGalaxy from '../scenes/ProjectsGalaxy';
import SkillsNetwork from '../scenes/SkillsNetwork';
import ContactScene from '../scenes/ContactScene';
import CustomCursor from './CustomCursor';
import Loader from './Loader';
import UIOverlay from './UIOverlay';
import HeroOverlay from './HeroOverlay';
import AboutOverlay from './AboutOverlay';
import ProjectsOverlay from './ProjectsOverlay';
import SkillsOverlay from './SkillsOverlay';
import ContactOverlay from './ContactOverlay';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const SCENE_POSITIONS = [0, -30, -60, -90, -120];

interface CameraControllerProps {
  targetZ: number;
}

const CameraController = ({ targetZ }: CameraControllerProps) => {
  const { camera } = useThree();

  useFrame(() => {
    // Higher lerp factor = snappier scene transitions.
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ + 10, 0.07);
  });

  return null;
};

const Experience = () => {
  const [entered, setEntered] = useState(false);
  const [ready, setReady] = useState(false);
  const [currentScene, setCurrentScene] = useState(0);
  const wheelAccumRef = useRef(0);
  const wheelRafRef = useRef<number | null>(null);
  const wheelLockRef = useRef(false);
  const wheelUnlockTimeoutRef = useRef<number | null>(null);

  // Mark ready quickly to avoid unnecessary perceived delay.
  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 150);
    return () => clearTimeout(t);
  }, []);

  // Scroll to navigate scenes
  useEffect(() => {
    if (!entered) return;

    const WHEEL_THRESHOLD = 60; // higher = less sensitive, prevents accidental multi-skip
    const COOLDOWN_MS = 450; // lock duration so one gesture changes one scene

    const handleWheel = (e: WheelEvent) => {
      // Don't navigate scenes if user is scrolling inside a scrollable container
      const target = e.target as HTMLElement;
      const scrollable = target.closest('.custom-scrollbar');
      if (scrollable) {
        const el = scrollable as HTMLElement;
        const atTop = el.scrollTop === 0;
        const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
        // Only allow scene change if at the edge of the scrollable area
        if ((e.deltaY < 0 && !atTop) || (e.deltaY > 0 && !atBottom)) {
          return;
        }
      }

      // Prevent browser scroll and treat this as scene navigation.
      e.preventDefault();

      // If we just changed scene, ignore remaining wheel events in the same gesture.
      if (wheelLockRef.current) return;

      // Accumulate wheel delta (trackpads emit many small deltas).
      wheelAccumRef.current += e.deltaY;

      // Process at most once per animation frame.
      if (wheelRafRef.current != null) return;
      wheelRafRef.current = window.requestAnimationFrame(() => {
        wheelRafRef.current = null;
        const delta = wheelAccumRef.current;

        // Not enough intent yet.
        if (Math.abs(delta) < WHEEL_THRESHOLD) return;

        // Consume this gesture.
        wheelAccumRef.current = 0;

        const direction = delta > 0 ? 1 : -1;
        setCurrentScene((s) => {
          const next = Math.max(0, Math.min(4, s + direction));
          return next;
        });

        // Lock briefly so a single gesture doesn't skip multiple scenes.
        wheelLockRef.current = true;
        if (wheelUnlockTimeoutRef.current != null) {
          window.clearTimeout(wheelUnlockTimeoutRef.current);
        }
        wheelUnlockTimeoutRef.current = window.setTimeout(() => {
          wheelLockRef.current = false;
        }, COOLDOWN_MS);
      });
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      wheelAccumRef.current = 0;
      if (wheelRafRef.current != null) {
        window.cancelAnimationFrame(wheelRafRef.current);
        wheelRafRef.current = null;
      }
      if (wheelUnlockTimeoutRef.current != null) {
        window.clearTimeout(wheelUnlockTimeoutRef.current);
        wheelUnlockTimeoutRef.current = null;
      }
      wheelLockRef.current = false;
    };
  }, [entered]);

  const overlays = [
    <HeroOverlay key="hero" />,
    <AboutOverlay key="about" />,
    <ProjectsOverlay key="projects" />,
    <SkillsOverlay key="skills" />,
    <ContactOverlay key="contact" />,
  ];

  return (
    <div className="w-screen h-screen bg-background overflow-hidden relative">
      <CustomCursor />

      <AnimatePresence>
        {!entered && (
          <Loader onEnter={() => setEntered(true)} ready={ready} />
        )}
      </AnimatePresence>

      {entered && (
        <>
          {/* 3D Canvas */}
          <Canvas
            className="absolute inset-0"
            camera={{ position: [0, 0, 10], fov: 60, near: 0.1, far: 200 }}
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 1.5]}
          >
            <Suspense fallback={null}>
              <CameraController targetZ={SCENE_POSITIONS[currentScene]} />
              <fog attach="fog" args={['#050505', 5, 30]} />
              <HeroScene />
              <AboutScene />
              <ProjectsGalaxy />
              <SkillsNetwork />
              <ContactScene />
            </Suspense>
          </Canvas>

          {/* HTML Overlays */}
          <AnimatePresence mode="sync">
            <motion.div
              key={currentScene}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              {overlays[currentScene]}
            </motion.div>
          </AnimatePresence>

          <UIOverlay currentScene={currentScene} onSceneChange={setCurrentScene} />
        </>
      )}
    </div>
  );
};

export default Experience;
