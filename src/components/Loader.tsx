import { motion } from 'framer-motion';

interface LoaderProps {
  onEnter: () => void;
  ready: boolean;
}

const Loader = ({ onEnter, ready }: LoaderProps) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: 'easeInOut' }}
    >
      {/* Particle ring animation */}
      <div className="relative w-40 h-40 mb-12">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full border neon-border-purple"
            style={{ borderColor: i === 1 ? 'hsl(180 100% 50% / 0.3)' : i === 2 ? 'hsl(330 100% 58% / 0.3)' : undefined }}
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 3 + i * 2, repeat: Infinity, ease: 'linear' },
              scale: { duration: 2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 },
            }}
          />
        ))}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-4 h-4 rounded-full bg-neon-purple shadow-[0_0_30px_hsl(270_80%_55%/0.8)]" />
        </motion.div>
      </div>

      {/* Text */}
      <motion.p
        className="ui-label text-muted-foreground mb-8 tracking-[0.3em]"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {ready ? 'READY' : 'INITIALIZING UNIVERSE'}
      </motion.p>

      {/* Enter button */}
      <motion.button
        onClick={onEnter}
        className="glass-panel px-8 py-3 font-display text-sm tracking-[0.2em] uppercase text-foreground neon-border-purple hover:shadow-[0_0_40px_hsl(270_80%_55%/0.6)] transition-all duration-500"
        initial={{ opacity: 0, y: 20 }}
        animate={ready ? { opacity: 1, y: 0 } : {}}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Enter Experience
      </motion.button>
    </motion.div>
  );
};

export default Loader;
