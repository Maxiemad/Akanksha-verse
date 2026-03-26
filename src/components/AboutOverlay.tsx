import { motion } from 'framer-motion';

const AboutOverlay = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
      <motion.div
        className="glass-panel p-8 md:p-12 max-w-lg text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h2 className="scene-title text-2xl md:text-3xl text-gradient-cyber mb-6">
          ABOUT ME
        </h2>
        <p className="font-body text-muted-foreground leading-relaxed mb-4">
          A passionate software developer who thrives at the intersection of code and creativity.
          I build robust systems and craft beautiful digital experiences.
        </p>
        <p className="font-body text-muted-foreground leading-relaxed">
          With expertise spanning frontend mastery to backend architecture,
          I turn complex problems into elegant solutions.
        </p>
        <div className="mt-6 flex gap-4 justify-center">
          {['Developer', 'Designer', 'Creator'].map((tag) => (
            <span key={tag} className="ui-label text-neon-blue px-3 py-1 border border-neon-blue/20 rounded-full text-xs">
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AboutOverlay;
