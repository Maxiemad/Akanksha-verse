import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ExternalLink, Github, Briefcase, FolderGit2, ChevronDown, ChevronUp } from 'lucide-react';

interface Project {
  name: string;
  org: string;
  description: string[];
  tech: string;
  codeUrl?: string;
  hostedUrl?: string;
  color: string;
}

const projects: Project[] = [
  {
    name: 'GHAR',
    org: 'Newton School',
    description: [
      'AI-driven home design platform with smart suggestions, 3D previews, and safe land analysis.',
      'AI design ideas, real-time 3D visualization, interior/exterior customization, risk analysis, smart shopping.',
    ],
    tech: 'React.js, Tailwind CSS, Three.js, Node.js, Firebase/Supabase, OpenAI API, Framer Motion',
    codeUrl: 'https://github.com/Maxiemad/Ghar.git',
    hostedUrl: 'https://ghhaar.netlify.app/',
    color: 'neon-text-purple',
  },
  {
    name: 'Share the Light',
    org: 'Newton School',
    description: [
      'Club to support the Sant Ishwar Foundation.',
      'Enhanced brand storytelling and donor engagement through seamless UX and emotional design.',
    ],
    tech: 'React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, React Router, Node.js',
    codeUrl: 'https://github.com/Maxiemad/Share-the-Light',
    hostedUrl: 'https://share-the-light-nst.vercel.app/',
    color: 'neon-text-blue',
  },
  {
    name: 'The Zen Retreats',
    org: 'GoTo Retreats',
    description: [
      'Enhanced brand messaging and user engagement, positioning Zen Retreats as a premium wellness destination.',
    ],
    tech: 'React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, React Router, Node.js, Advanced animations',
    codeUrl: 'https://github.com/Maxiemad/The-Zen-Retreats.git',
    hostedUrl: 'https://zen-gtr-retreat.vercel.app/',
    color: 'neon-text-pink',
  },
  {
    name: 'Digital Marketing — GTR',
    org: 'GoTo Retreats',
    description: [
      'Digital Marketing Platform for wellness practitioners.',
      'SEO, ads, email automation, website design, and content strategy.',
    ],
    tech: 'TypeScript, Tailwind CSS, Vite, Node.js, Google & Meta Ads APIs, Vercel',
    codeUrl: 'https://github.com/Maxiemad/Digital-Marketing.git',
    hostedUrl: 'https://marketing.gotoretreats.com/',
    color: 'neon-text-purple',
  },
  {
    name: 'RetreatPlan',
    org: 'GoTo Retreats',
    description: [
      'Retreat Planning Platform for Coaches and Wellness Leaders.',
      'Tiered retreat bundles (DIY, DWY, DFY), venue curation, budgeting tools, itineraries.',
    ],
    tech: 'TypeScript, Tailwind CSS, Vite, Node.js, PostCSS, Vercel',
    codeUrl: 'https://github.com/Maxiemad/brand-dev.git',
    hostedUrl: 'https://planning.gotoretreats.com/',
    color: 'neon-text-blue',
  },
  {
    name: 'JCurve By Avi',
    org: 'Avi Sharma',
    description: [
      'Personal Branding and Growth Platform — scale creators\' online presence.',
      '$500K+ revenue, 100M+ views, 200K → 1M+ followers in 6 months.',
    ],
    tech: 'HTML, CSS, JS, Analytics, Automation workflows',
    codeUrl: 'https://github.com/Maxiemad/PERavi.git',
    hostedUrl: 'https://jcurvebyavi.com/',
    color: 'neon-text-pink',
  },
  {
    name: 'Mathrix',
    org: 'Newton School',
    description: [
      'Interactive math game with real-time data handling and local storage persistence.',
    ],
    tech: 'React.js',
    codeUrl: 'https://github.com/Maxiemad/Mathrix',
    hostedUrl: 'https://mathrix-56ba-git-main-akankshas-projects-55127cf0.vercel.app/',
    color: 'neon-text-purple',
  },
  {
    name: 'ESSENCE',
    org: 'Newton School',
    description: [
      'Wedding destination planner with search/filter for budget, location, and availability.',
    ],
    tech: 'HTML, CSS, JavaScript',
    codeUrl: 'https://github.com/Maxiemad/ESSENCE',
    hostedUrl: 'https://cheerful-jalebi-c14db7.netlify.app/',
    color: 'neon-text-blue',
  },
];

interface Experience {
  role: string;
  company: string;
  type: string;
  period: string;
  points: string[];
}

const experiences: Experience[] = [
  {
    role: 'Marketing and Web Development',
    company: 'GoTo Retreats',
    type: 'Internship',
    period: 'May 25 – Sep 25',
    points: [
      'Engineered responsive landing pages and custom web utilities.',
      'Worked on 6+ projects with the company.',
      'Mastered modern web stacks and remote agile workflows.',
    ],
  },
  {
    role: 'WordPress Developer',
    company: 'Sarvani Software Solutions Pvt Ltd',
    type: 'Internship',
    period: 'Feb 25 – May 25',
    points: [
      'Designed and optimized website interfaces for improved UX.',
      'Developed using HTML, CSS, JavaScript, and WordPress.',
    ],
  },
  {
    role: 'Content Management',
    company: 'Wipro-certified Krutanic Solution',
    type: 'Internship',
    period: 'Jul 24 – Aug 24',
    points: [
      'Managed and optimized 50+ content pieces, improving engagement by 20%.',
      'Content strategy, SEO, CMS platforms, data analysis.',
    ],
  },
];

type Tab = 'projects' | 'experience';

const ProjectsOverlay = () => {
  const [tab, setTab] = useState<Tab>('projects');
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="absolute inset-0 flex items-start pointer-events-none z-30 pt-20 pb-8">
      <div className="ml-6 md:ml-14 max-w-md w-full flex flex-col h-full">
        {/* Title */}
        <motion.div
          className="mb-5 flex-shrink-0"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="scene-title text-2xl md:text-3xl text-gradient-cyber mb-4">
            WORK
          </h2>

          {/* Tabs */}
          <div className="flex gap-2 pointer-events-auto">
            {(['projects', 'experience'] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); setExpanded(null); }}
                className={`ui-label text-xs px-3 py-1.5 rounded-full border transition-all duration-400 ${
                  tab === t
                    ? 'border-primary/60 bg-primary/15 text-primary'
                    : 'border-border/40 text-muted-foreground hover:border-primary/30 hover:text-foreground'
                }`}
              >
                {t === 'projects' ? (
                  <span className="flex items-center gap-1.5"><FolderGit2 size={12} /> Projects</span>
                ) : (
                  <span className="flex items-center gap-1.5"><Briefcase size={12} /> Experience</span>
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto pr-2 pointer-events-auto custom-scrollbar" onWheel={(e) => e.stopPropagation()}>
          <AnimatePresence mode="wait">
            {tab === 'projects' ? (
              <motion.div
                key="projects"
                className="flex flex-col gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
              >
                {projects.map((project, i) => {
                  const isExpanded = expanded === i;
                  return (
                    <motion.div
                      key={project.name}
                      className="glass-panel p-4 cursor-pointer hover:border-primary/40 transition-all duration-500 group"
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.06, duration: 0.5 }}
                      whileHover={{ x: 6 }}
                      onClick={() => setExpanded(isExpanded ? null : i)}
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h3 className={`font-display text-sm font-semibold tracking-wide ${project.color}`}>
                            {project.name}
                          </h3>
                          <span className="ui-label text-[10px] text-muted-foreground/70">{project.org}</span>
                        </div>
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          {project.codeUrl && (
                            <a
                              href={project.codeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="p-1 rounded border border-border/30 hover:border-primary/50 hover:text-primary transition-colors"
                              title="Source Code"
                            >
                              <Github size={12} />
                            </a>
                          )}
                          {project.hostedUrl && (
                            <a
                              href={project.hostedUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="p-1 rounded border border-border/30 hover:border-secondary/50 hover:text-secondary transition-colors"
                              title="Live Demo"
                            >
                              <ExternalLink size={12} />
                            </a>
                          )}
                          <button className="p-1 text-muted-foreground/50">
                            {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                          </button>
                        </div>
                      </div>

                      {/* Preview line */}
                      <p className="font-body text-muted-foreground text-xs mt-1.5 line-clamp-1">
                        {project.description[0]}
                      </p>

                      {/* Expanded details */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-2 mt-2 border-t border-border/20">
                              <ul className="space-y-1">
                                {project.description.map((d, idx) => (
                                  <li key={idx} className="font-body text-muted-foreground text-xs flex gap-1.5">
                                    <span className="text-primary/60 mt-0.5">▹</span>
                                    <span>{d}</span>
                                  </li>
                                ))}
                              </ul>
                              <div className="mt-2.5 flex flex-wrap gap-1">
                                {project.tech.split(', ').slice(0, 5).map((t) => (
                                  <span
                                    key={t}
                                    className="text-[9px] font-body px-1.5 py-0.5 rounded-sm bg-primary/8 text-primary/70 border border-primary/15"
                                  >
                                    {t}
                                  </span>
                                ))}
                                {project.tech.split(', ').length > 5 && (
                                  <span className="text-[9px] font-body text-muted-foreground/50">
                                    +{project.tech.split(', ').length - 5} more
                                  </span>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                key="experience"
                className="flex flex-col gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
              >
                {experiences.map((exp, i) => (
                  <motion.div
                    key={exp.company}
                    className="glass-panel p-4 hover:border-primary/40 transition-all duration-500"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                    whileHover={{ x: 6 }}
                  >
                    {/* Timeline dot */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--neon-purple)/0.6)]" />
                      <span className="ui-label text-[10px] text-primary/70">{exp.period}</span>
                      <span className="ui-label text-[9px] text-muted-foreground/50 ml-auto border border-border/30 rounded px-1.5 py-0.5">
                        {exp.type}
                      </span>
                    </div>

                    <h3 className="font-display text-sm font-semibold tracking-wide text-foreground">
                      {exp.role}
                    </h3>
                    <p className="ui-label text-[10px] text-muted-foreground/70 mb-2">{exp.company}</p>

                    <ul className="space-y-1">
                      {exp.points.map((p, idx) => (
                        <li key={idx} className="font-body text-muted-foreground text-xs flex gap-1.5">
                          <span className="text-secondary/60 mt-0.5">▹</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ProjectsOverlay;
