import { motion } from 'framer-motion';

const skillCategories = [
  {
    title: 'Frontend',
    skills: ['React', 'TypeScript', 'Next.js', 'Three.js', 'TailwindCSS'],
    color: '#8A2BE2',
  },
  {
    title: 'Backend',
    skills: ['Node.js', 'Python', 'GraphQL', 'PostgreSQL', 'Redis'],
    color: '#00FFFF',
  },
  {
    title: 'DevOps',
    skills: ['AWS', 'Docker', 'Git', 'CI/CD', 'MongoDB'],
    color: '#FF2D95',
  },
];

const SkillsOverlay = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
      <div className="max-w-2xl w-full px-8">
        <motion.h2
          className="scene-title text-2xl md:text-3xl text-gradient-cyber mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          NEURAL NETWORK
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              className="glass-panel p-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
            >
              <h3
                className="font-display text-sm mb-3 tracking-wider"
                style={{ color: cat.color, textShadow: `0 0 10px ${cat.color}40` }}
              >
                {cat.title}
              </h3>
              <div className="flex flex-col gap-2">
                {cat.skills.map((skill) => (
                  <span key={skill} className="font-body text-sm text-muted-foreground">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsOverlay;
