import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import {
  SiReact,
  SiTypescript,
  SiNodedotjs,
  SiGreensock,
  SiWebgl,
  SiNextdotjs,
  SiPython,
  SiSupabase,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiPostgresql,
  SiTailwindcss,
  SiMui,
  SiScikitlearn,
  SiHuggingface,
  SiPandas,
  SiNumpy,
  SiTensorflow,
  SiPytorch,
  SiMongodb,
  SiFirebase,
  SiVercel,
  SiGit
} from 'react-icons/si';
import { motion } from 'framer-motion';
import { FaDatabase, FaFlask, FaCode, FaChartLine } from 'react-icons/fa';

// Custom Three.js SVG Logo
const ThreeJSLogo = () => {
  return (
    <motion.svg 
      width="28" 
      height="28" 
      viewBox="0 0 256 256" 
      xmlns="http://www.w3.org/2000/svg"
      className="threejs-logo"
    >
      <motion.path 
        fill="#000000" 
        d="M128 0L256 64v128l-128 64L0 192V64z" 
      />
      <motion.path 
        fill="#3FA9F5" 
        d="M128 16L16 64v128l112 48 112-48V64z" 
      />
      <motion.path 
        fill="#FFFFFF" 
        d="M128 240L24 192V64l104-48 104 48v128z" 
      />
    </motion.svg>
  );
};

// Custom FastAPI Icon
const FastAPILogo = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0L18 6V18L12 24L6 18V6L12 0Z" fill="#05998B"/>
    <path d="M10.5 7.5L15 12L10.5 16.5H13L17.5 12L13 7.5H10.5Z" fill="white"/>
    <path d="M7 7.5L11.5 12L7 16.5H9.5L14 12L9.5 7.5H7Z" fill="white"/>
  </svg>
);

// Express.js Logo
const ExpressJSLogo = () => (
  <svg width="28" height="28" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
    <path fill="#000000" d="M128 0L256 64v128l-128 64L0 192V64z" />
    <path fill="#68A063" d="M192 128l-64-64-64 64 64 64z" />
    <path fill="#FFFFFF" d="M128 64l64 64-64 64-64-64z" />
  </svg>
);

interface Skill {
  name: string;
  colors: string[];
  glowColor: string;
  icon: JSX.Element;
  description: string;
  category: 'languages' | 'frameworks' | 'libraries' | 'databases' | 'tools';
}

const skills: Skill[] = [
  // Languages
  { 
    name: 'JavaScript', 
    colors: ['#06b6d4', '#8b5cf6'], 
    glowColor: 'rgba(247, 223, 30, 0.8)', 
    icon: <SiJavascript className="text-3xl" />,
    description: 'Core web language for interactive experiences',
    category: 'languages'
  },
  { 
    name: 'TypeScript', 
    colors: ['#06b6d4', '#8b5cf6'], 
    glowColor: 'rgba(49, 120, 198, 0.8)', 
    icon: <SiTypescript className="text-3xl" />,
    description: 'Strongly typed JavaScript for scalable applications',
    category: 'languages'
  },
  { 
    name: 'Python', 
    colors: ['#06b6d4', '#8b5cf6'], 
    glowColor: 'rgba(55, 118, 171, 0.8)', 
    icon: <SiPython className="text-3xl" />,
    description: 'Scripting, automation, and data analysis',
    category: 'languages'
  },
  { 
    name: 'Java', 
    colors: ['#06b6d4', '#8b5cf6'], 
    glowColor: 'rgba(248, 152, 32, 0.8)', 
    icon: <FaCode className="text-3xl" />,
    description: 'Object-oriented programming for robust applications',
    category: 'languages'
  },
  { 
    name: 'C', 
    colors: ['#06b6d4', '#8b5cf6'], 
    glowColor: 'rgba(92, 107, 192, 0.8)', 
    icon: <FaCode className="text-3xl" />,
    description: 'System programming and low-level development',
    category: 'languages'
  },
  { 
    name: 'SQL', 
    colors: ['#06b6d4', '#8b5cf6'], 
    glowColor: 'rgba(51, 103, 145, 0.8)', 
    icon: <SiPostgresql className="text-3xl" />,
    description: 'Database querying with PostgreSQL expertise',
    category: 'languages'
  },
  { 
    name: 'HTML/CSS', 
    colors: ['#06b6d4', '#8b5cf6'], 
    glowColor: 'rgba(228, 77, 38, 0.8)', 
    icon: <div className="flex"><SiHtml5 className="text-3xl" /><SiCss3 className="text-3xl ml-1" /></div>,
    description: 'Semantic markup and responsive styling',
    category: 'languages'
  },

  // Frameworks
  { 
    name: 'React.js', 
    colors: ['#06b6d4', '#8b5cf6'], 
    glowColor: 'rgba(97, 218, 251, 0.8)', 
    icon: <SiReact className="text-3xl" />,
    description: 'Building responsive UIs with hooks and component architecture',
    category: 'frameworks'
  },
  { 
    name: 'Next.js', 
    colors: ['#06b6d4', '#8b5cf6'], 
    glowColor: 'rgba(255, 255, 255, 0.8)', 
    icon: <SiNextdotjs className="text-3xl" />,
    description: 'Server-side rendering and static site generation',
    category: 'frameworks'
  },
  { 
    name: 'Node.js', 
    colors: ['#06b6d4', '#8b5cf6'], 
    glowColor: 'rgba(51, 153, 51, 0.8)', 
    icon: <SiNodedotjs className="text-3xl" />,
    description: 'Building RESTful APIs and server-side applications',
    category: 'frameworks'
  },
  { 
    name: 'Express.js', 
    colors: ['#06b6d4', '#8b5cf6'], 
    glowColor: 'rgba(104, 160, 99, 0.8)', 
    icon: <ExpressJSLogo />,
    description: 'Web application framework for Node.js',
    category: 'frameworks'
  },
  { 
    name: 'Flask', 
    colors: ['#06b6d4', '#8b5cf6'], 
    glowColor: 'rgba(0, 0, 0, 0.8)', 
    icon: <FaFlask className="text-3xl" />,
    description: 'Lightweight Python web framework',
    category: 'frameworks'
  },
  { 
    name: 'FastAPI', 
    colors: ['#06b6d4', '#8b5cf6'], 
    glowColor: 'rgba(0, 150, 136, 0.8)', 
    icon: <FastAPILogo />,
    description: 'High-performance Python API framework',
    category: 'frameworks'
  },
  { 
    name: 'Tailwind CSS', 
    colors: ['#06b6d4', '#8b5cf6'], 
    glowColor: 'rgba(56, 189, 248, 0.8)', 
    icon: <SiTailwindcss className="text-3xl" />,
    description: 'Utility-first CSS framework',
    category: 'frameworks'
  },
  { 
    name: 'Material-UI', 
    colors: ['#06b6d4', '#8b5cf6'], 
    glowColor: 'rgba(0, 129, 203, 0.8)', 
    icon: <SiMui className="text-3xl" />,
    description: 'React UI framework implementing Material Design',
    category: 'frameworks'
  },
  { 
    name: 'WebGL', 
    colors: ['#06b6d4', '#8b5cf6'], 
    glowColor: 'rgba(153, 0, 0, 0.8)', 
    icon: <SiWebgl className="text-3xl" />,
    description: 'Hardware-accelerated graphics for the web',
    category: 'frameworks'
  },

  // Libraries
  { 
    name: 'Three.js', 
    colors: ['#06b6d4', '#8b5cf6'], 
    glowColor: 'rgba(63, 169, 245, 0.8)', 
    icon: <ThreeJSLogo />,
    description: 'Creating immersive 3D experiences and WebGL visualizations',
    category: 'libraries'
  },
  { 
    name: 'GSAP', 
    colors: ['#06b6d4', '#8b5cf6'], 
    glowColor: 'rgba(136, 206, 2, 0.8)', 
    icon: <SiGreensock className="text-3xl" />,
    description: 'Creating complex animations and interactive experiences',
    category: 'libraries'
  },
  { 
    name: 'Scikit-learn', 
    colors: ['#06b6d4', '#8b5cf6'], 
    glowColor: 'rgba(247, 147, 30, 0.8)', 
    icon: <SiScikitlearn className="text-3xl" />,
    description: 'Machine learning library for Python',
    category: 'libraries'
  },
  { 
    name: 'Hugging Face', 
    colors: ['#06b6d4', '#8b5cf6'], 
    glowColor: 'rgba(255, 210, 30, 0.8)', 
    icon: <SiHuggingface className="text-3xl" />,
    description: 'State-of-the-art NLP models and transformers',
    category: 'libraries'
  },
  { 
    name: 'Pandas', 
    colors: ['#06b6d4', '#8b5cf6'], 
    glowColor: 'rgba(21, 4, 88, 0.8)', 
    icon: <SiPandas className="text-3xl" />,
    description: 'Data manipulation and analysis in Python',
    category: 'libraries'
  },
  { 
    name: 'NumPy', 
    colors: ['#06b6d4', '#8b5cf6'], 
    glowColor: 'rgba(77, 119, 207, 0.8)', 
    icon: <SiNumpy className="text-3xl" />,
    description: 'Numerical computing in Python',
    category: 'libraries'
  },
  { 
    name: 'Matplotlib', 
    colors: ['#06b6d4', '#8b5cf6'], 
    glowColor: 'rgba(17, 85, 124, 0.8)', 
    icon: <FaChartLine className="text-3xl" />,
    description: 'Data visualization in Python',
    category: 'libraries'
  },
  { 
    name: 'TensorFlow', 
    colors: ['#06b6d4', '#8b5cf6'], 
    glowColor: 'rgba(255, 111, 0, 0.8)', 
    icon: <SiTensorflow className="text-3xl" />,
    description: 'End-to-end machine learning platform',
    category: 'libraries'
  },
  { 
    name: 'PyTorch', 
    colors: ['#06b6d4', '#8b5cf6'], 
    glowColor: 'rgba(238, 76, 44, 0.8)', 
    icon: <SiPytorch className="text-3xl" />,
    description: 'Deep learning framework',
    category: 'libraries'
  },

  // Databases
  { 
    name: 'MongoDB', 
    colors: ['#06b6d4', '#8b5cf6'], 
    glowColor: 'rgba(71, 162, 72, 0.8)', 
    icon: <SiMongodb className="text-3xl" />,
    description: 'NoSQL document database',
    category: 'databases'
  },
  { 
    name: 'Supabase', 
    colors: ['#06b6d4', '#8b5cf6'], 
    glowColor: 'rgba(62, 207, 142, 0.8)', 
    icon: <SiSupabase className="text-3xl" />,
    description: 'Real-time databases and authentication solutions',
    category: 'databases'
  },
  { 
    name: 'Firebase', 
    colors: ['#06b6d4', '#8b5cf6'], 
    glowColor: 'rgba(255, 202, 40, 0.8)', 
    icon: <SiFirebase className="text-3xl" />,
    description: 'Backend-as-a-Service platform',
    category: 'databases'
  },
  { 
    name: 'SQL Databases', 
    colors: ['#06b6d4', '#8b5cf6'], 
    glowColor: 'rgba(51, 103, 145, 0.8)', 
    icon: <FaDatabase className="text-3xl" />,
    description: 'Relational database management',
    category: 'databases'
  },

  // Tools
  { 
    name: 'Vercel', 
    colors: ['#06b6d4', '#8b5cf6'], 
    glowColor: 'rgba(255, 255, 255, 0.8)', 
    icon: <SiVercel className="text-3xl" />,
    description: 'Cloud platform for static sites and Serverless Functions',
    category: 'tools'
  },
  { 
    name: 'Git', 
    colors: ['#06b6d4', '#8b5cf6'], 
    glowColor: 'rgba(241, 78, 50, 0.8)', 
    icon: <SiGit className="text-3xl" />,
    description: 'Version control and collaboration',
    category: 'tools'
  },
];

const SkillCard = ({ skill, index }: { skill: Skill; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  
  return (
    <div ref={ref}>
      <motion.div
        className="relative rounded-2xl overflow-hidden border border-cyan-500/30 bg-gradient-to-br from-[#0a192f]/80 to-[#0f3460]/80 backdrop-blur-sm cursor-pointer h-full p-6"
        whileHover={{ 
          boxShadow: `0 0 30px rgba(6, 182, 212, 0.5)`,
          borderColor: 'rgba(139, 92, 246, 0.5)'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ opacity: 0, y: 50 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          transition: { delay: index * 0.05, duration: 0.5 } 
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-30 rounded-2xl pointer-events-none"></div>
        
        <div className="relative z-10 h-full flex flex-col">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <motion.div 
                className="icon-container relative"
                animate={{
                  filter: isHovered ? `drop-shadow(0 0 12px ${skill.glowColor})` : 'none',
                  scale: isHovered ? 1.2 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                {skill.icon}
                {isHovered && (
                  <motion.div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1.5 }}
                    exit={{ opacity: 0 }}
                    style={{ 
                      background: `radial-gradient(circle, rgba(139, 92, 246, 0.3), transparent)`,
                      filter: 'blur(8px)',
                    }}
                  />
                )}
              </motion.div>
              <div>
                <h3 className="text-xl font-bold text-cyan-300">{skill.name}</h3>
                <span className="text-sm text-cyan-500/80 capitalize">{skill.category}</span>
              </div>
            </div>
          </div>
          
          {/* Progress bar - static without animation */}
          <div className="w-full bg-gray-800/40 rounded-full h-2.5 mb-6 overflow-hidden">
            <div 
              className="h-full rounded-full"
              style={{ 
                width: '100%',
                background: `linear-gradient(90deg, ${skill.colors.join(', ')})`
              }}
            />
          </div>
          
          {/* Description */}
          <div className="mt-auto">
            <motion.p 
              className="text-gray-300 text-sm"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: inView ? 1 : 0,
              }}
              transition={{ delay: index * 0.05 + 0.8 }}
            >
              {skill.description}
            </motion.p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const categories = ['all', 'languages', 'frameworks', 'libraries', 'databases', 'tools'];
  
  const filteredSkills = activeCategory === 'all' 
    ? skills
    : skills.filter(skill => skill.category === activeCategory);

  // Category icons mapping
  const categoryIcons = {
    languages: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 8-6 8 6v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z"></path>
        <path d="M9 22V12h6v10"></path>
      </svg>
    ),
    frameworks: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="3" y1="9" x2="21" y2="9"></line>
        <line x1="9" y1="21" x2="9" y2="9"></line>
      </svg>
    ),
    libraries: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m16 6 4 14"></path>
        <path d="m12 6v14"></path>
        <path d="m8 8v12"></path>
        <path d="M4 4v16"></path>
      </svg>
    ),
    databases: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
        <path d="M3 5v14a9 3 0 0 0 18 0V5"></path>
        <path d="M3 12a9 3 0 0 0 18 0"></path>
      </svg>
    ),
    tools: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
      </svg>
    )
  };

  return (
    <section id="skills" className="py-24 px-4 relative min-h-screen overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#05051f] via-[#0a0a30] to-[#020217]"></div>
      
      {/* Floating grid pattern */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
        />
      </div>
      
      {/* Floating blobs */}
      <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-full blur-[120px] animate-float-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-full blur-[100px] animate-float-medium"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-block mb-4"
            animate={{ 
              rotate: [0, 5, -5, 0],
              y: [0, -5, 0]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
                <path d="M2 10h20"/>
                <path d="M12 2v20"/>
              </svg>
            </div>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Technical Skills
            </span>
          </h2>
          <p className="text-center text-gray-300 max-w-3xl mx-auto text-xl">
            Expertise in modern development technologies across multiple domains
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category}
              className={`group/button relative px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 overflow-hidden ${
                activeCategory === category
                  ? 'text-white'
                  : 'text-gray-300'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#0a192f] to-[#0f3460] border border-cyan-500/30 rounded-xl backdrop-blur-sm z-0"></div>
              
              {activeCategory === category && (
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl z-0"></div>
              )}
              
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-cyan-500/0 opacity-0 group-hover/button:opacity-100 transition-all duration-700 -translate-x-full group-hover/button:translate-x-0 z-0"></div>
              
              <span className="relative z-10 flex items-center gap-2">
                {category !== 'all' && categoryIcons[category as keyof typeof categoryIcons]}
                {category === 'all' ? 'All Skills' : category.charAt(0).toUpperCase() + category.slice(1)}
              </span>
            </motion.button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredSkills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </div>

        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="relative bg-gradient-to-br from-[#0a192f]/80 to-[#0f3460]/80 p-8 rounded-2xl inline-block border border-cyan-500/30 backdrop-blur-lg shadow-2xl max-w-3xl">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-2xl pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col items-center justify-center gap-4 mb-4">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"/>
                    <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/>
                    <path d="M12 2v2"/>
                    <path d="M12 22v-2"/>
                    <path d="m17 20.66-1-1.73"/>
                    <path d="M11 10.27 7 3.34"/>
                    <path d="m20.66 17-1.73-1"/>
                    <path d="m3.34 7 1.73 1"/>
                    <path d="M14 12h8"/>
                    <path d="M2 12h2"/>
                    <path d="m20.66 7-1.73 1"/>
                    <path d="m3.34 17 1.73-1"/>
                    <path d="m17 3.34-1 1.73"/>
                    <path d="m11 13.73-4 6.93"/>
                  </svg>
                </div>
              </motion.div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
                Continuous Learning
              </h3>
            </div>
            <p className="text-gray-300 mb-4 relative z-10">
              Always exploring new technologies and frameworks to enhance my development capabilities
            </p>
            <div className="flex flex-wrap justify-center gap-3 relative z-10">
              {['WebGPU', 'WebAssembly', 'Rust', 'Web3', 'AI/ML', 'Deno', 'Svelte', 'GraphQL'].map((tech, i) => (
                <motion.span
                  key={i}
                  className="group/tech relative inline-flex items-center px-3 py-1.5 text-sm rounded-full bg-gradient-to-br from-[#0a192f] to-[#0f3460] border border-cyan-500/30 text-cyan-300"
                  whileHover={{ 
                    scale: 1.1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="relative z-10">{tech}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-cyan-500/0 opacity-0 group-hover/tech:opacity-100 transition-all duration-700 -translate-x-full group-hover/tech:translate-x-0"></div>
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Signature */}
      <motion.div 
        className="absolute bottom-6 right-6 text-gray-500 text-sm flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="font-mono text-cyan-400">AFxLabs</span>
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
            <path d="M5 3v4"/>
            <path d="M19 17v4"/>
            <path d="M3 5h4"/>
            <path d="M17 19h4"/>
          </svg>
        </motion.div>
      </motion.div>
      
      {/* Custom styles for logo glow */}
      <style jsx global>{`
        .icon-container {
          transition: all 0.3s ease;
          position: relative;
          display: inline-block;
          z-index: 2;
        }
        
        .threejs-logo {
          filter: drop-shadow(0 0 0px transparent);
          transition: filter 0.3s ease;
        }
        
        .icon-container:hover .threejs-logo {
          filter: drop-shadow(0 0 10px #3FA9F5);
        }
      `}</style>
    </section>
  );
};

export default SkillsSection;