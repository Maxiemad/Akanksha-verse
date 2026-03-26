import { motion } from 'framer-motion';

const HeroOverlay = () => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-30">
      <motion.p
        className="ui-label text-neon-blue tracking-[0.4em] mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1.5 }}
      >
        WELCOME TO MY UNIVERSE
      </motion.p>

      <motion.h1
        className="scene-title text-4xl md:text-7xl text-gradient-cyber mb-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1.2, ease: 'easeOut' }}
      >
        AKANKSHA
      </motion.h1>

      <motion.div
        className="flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
      >
        <p className="font-body text-muted-foreground text-sm md:text-base tracking-wide">
          I design systems. I build experiences.
        </p>
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-neon-purple to-transparent mt-4" />
      </motion.div>
    </div>
  );
};

export default HeroOverlay;
