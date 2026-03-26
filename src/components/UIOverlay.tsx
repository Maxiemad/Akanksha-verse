import { motion, AnimatePresence } from 'framer-motion';

interface UIOverlayProps {
  currentScene: number;
  onSceneChange: (scene: number) => void;
}

const scenes = ['ORIGIN', 'MEMORY', 'GALAXY', 'NEURAL', 'SIGNAL'];

const UIOverlay = ({ currentScene, onSceneChange }: UIOverlayProps) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {/* Scene navigation - right side */}
      <motion.div
        className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 pointer-events-auto"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        {scenes.map((scene, i) => (
          <button
            key={scene}
            onClick={() => onSceneChange(i)}
            className="group flex items-center gap-3"
            aria-label={scene}
          >
            <div className={`w-2 h-2 rounded-full transition-all duration-500 ${
              currentScene === i
                ? 'bg-neon-purple shadow-[0_0_10px_hsl(270_80%_55%/0.8)] scale-150'
                : 'bg-muted-foreground/30 hover:bg-muted-foreground/60'
            }`} />
          </button>
        ))}
      </motion.div>

      {/* Bottom hint */}
      <AnimatePresence>
        {currentScene === 0 && (
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 2 }}
          >
            <span className="ui-label text-muted-foreground text-xs">SCROLL TO EXPLORE</span>
            <motion.div
              className="w-px h-8 bg-gradient-to-b from-neon-purple/50 to-transparent"
              animate={{ scaleY: [1, 1.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UIOverlay;
