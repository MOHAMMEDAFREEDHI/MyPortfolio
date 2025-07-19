import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
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
} from 'react-icons/si';
import { motion, AnimatePresence } from 'framer-motion';

// Custom Three.js SVG Logo
const ThreeJSLogo = () => (
  <svg width="28" height="28" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
    <path fill="#000000" d="M128 0L256 64v128l-128 64L0 192V64z" />
    <path fill="#3FA9F5" d="M128 16L16 64v128l112 48 112-48V64z" />
    <path fill="#FFFFFF" d="M128 240L24 192V64l104-48 104 48v128z" />
  </svg>
);

interface Skill {
  name: string;
  level: number;
  colors: string[]; // Array of colors for gradient
  glowColor: string;
  icon: JSX.Element;
  description: string;
}

const skills: Skill[] = [
  { 
    name: 'React.js', 
    level: 95, 
    colors: ['#61dafb', '#21a1f1'], 
    glowColor: 'rgba(97, 218, 251, 0.6)', 
    icon: <SiReact className="text-3xl text-cyan-400" />,
    description: 'Building responsive UIs with hooks, context, and component architecture' 
  },
  { 
    name: 'Three.js', 
    level: 88, 
    colors: ['#3FA9F5', '#1e90ff'], 
    glowColor: 'rgba(63, 169, 245, 0.6)', 
    icon: <ThreeJSLogo />,
    description: 'Creating immersive 3D experiences and WebGL visualizations' 
  },
  { 
    name: 'TypeScript', 
    level: 92, 
    colors: ['#3178c6', '#005cc5'], 
    glowColor: 'rgba(49, 120, 198, 0.6)', 
    icon: <SiTypescript className="text-3xl text-blue-500" />,
    description: 'Strongly typed JavaScript for scalable applications' 
  },
  { 
    name: 'Next.js', 
    level: 87, 
    colors: ['#000000', '#333'], 
    glowColor: 'rgba(255, 255, 255, 0.6)', 
    icon: <SiNextdotjs className="text-3xl text-white" />,
    description: 'Server-side rendering and static site generation' 
  },
  { 
    name: 'Node.js', 
    level: 85, 
    colors: ['#339933', '#2c8c2c'], 
    glowColor: 'rgba(51, 153, 51, 0.6)', 
    icon: <SiNodedotjs className="text-3xl text-green-500" />,
    description: 'Building RESTful APIs and server-side applications' 
  },
  { 
    name: 'GSAP', 
    level: 90, 
    colors: ['#88ce02', '#76c7d2'], 
    glowColor: 'rgba(136, 206, 2, 0.6)', 
    icon: <SiGreensock className="text-3xl text-lime-400" />,
    description: 'Creating complex animations and interactive experiences' 
  },
  { 
    name: 'Supabase', 
    level: 82, 
    colors: ['#3ECF8E', '#2abf7a'], 
    glowColor: 'rgba(62, 207, 142, 0.6)', 
    icon: <SiSupabase className="text-3xl text-emerald-400" />,
    description: 'Real-time databases and authentication solutions' 
  },
  { 
    name: 'WebGL', 
    level: 80, 
    colors: ['#990000', '#cc0000'], 
    glowColor: 'rgba(153, 0, 0, 0.6)', 
    icon: <SiWebgl className="text-3xl text-red-400" />,
    description: 'Hardware-accelerated graphics for the web' 
  },
  { 
    name: 'Python', 
    level: 82, 
    colors: ['#3776ab', '#2b5b8a'], 
    glowColor: 'rgba(55, 118, 171, 0.6)', 
    icon: <SiPython className="text-3xl text-blue-400" />,
    description: 'Scripting, automation, and data analysis' 
  },
];

// Optimized particle-like background using CSS
const OptimizedBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Static gradient layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-indigo-900/20 to-cyan-900/20"></div>
      
      {/* Animated particles using pure CSS */}
      {[...Array(20)].map((_, i) => (
        <div 
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${10 + Math.random() * 40}px`,
            height: `${10 + Math.random() * 40}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            background: `radial-gradient(circle, rgba(${
              Math.random() > 0.5 ? '97,218,251' : '236,72,153'
            },${0.2 + Math.random() * 0.3}), transparent)`,
            animation: `float ${15 + Math.random() * 20}s infinite ease-in-out`,
            animationDelay: `${Math.random() * 5}s`,
            opacity: 0.15 + Math.random() * 0.2,
            filter: 'blur(10px)',
            willChange: 'transform, opacity',
          }}
        />
      ))}
    </div>
  );
};

const SkillBar = ({ skill, index }: { skill: Skill; index: number }) => {
  const barRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [activeDescription, setActiveDescription] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    if (inView && barRef.current) {
      // Optimize GSAP by using will-change and transform properties
      gsap.set(barRef.current, { willChange: 'width' });
      
      gsap.fromTo(
        barRef.current,
        { width: '0%' },
        {
          width: `${skill.level}%`,
          duration: 1.4,
          delay: index * 0.15,
          ease: 'power3.out',
          onComplete: () => {
            // Only add glow effect if element is still in view
            if (barRef.current) {
              gsap.to(barRef.current, {
                boxShadow: `0 0 10px ${skill.glowColor}`,
                repeat: -1,
                yoyo: true,
                duration: 1.2,
              });
            }
          },
        }
      );
    }
    
    // Cleanup animation on unmount
    return () => {
      if (barRef.current) {
        gsap.killTweensOf(barRef.current);
      }
    };
  }, [inView, skill.level, index, skill.glowColor]);

  return (
    <div
      ref={ref}
      className="skill-item mb-6 group relative"
      onMouseEnter={() => {
        setIsHovered(true);
        setTimeout(() => setActiveDescription(true), 100);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setActiveDescription(false);
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <motion.div 
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            {skill.icon}
          </motion.div>
          <span className="text-lg font-medium text-white/90">{skill.name}</span>
        </div>
      </div>
      
      <div className="relative">
        <div className="w-full bg-gray-800/70 rounded-full h-2.5 overflow-hidden">
          <div
            ref={barRef}
            className="h-full rounded-full"
            style={{
              background: `linear-gradient(90deg, ${skill.colors.join(', ')})`,
              width: '0%',
            }}
          />
        </div>
        
        {isHovered && (
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${skill.glowColor}, transparent)`,
              filter: 'blur(8px)',
              opacity: 0.4,
            }}
          ></div>
        )}
      </div>
      
      <AnimatePresence>
        {isHovered && activeDescription && (
          <motion.div
            className="absolute z-10 w-full mt-3 bg-gray-900/90 backdrop-blur-sm rounded-lg p-3 shadow-xl border border-white/10"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-sm text-white/90">{skill.description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const filteredSkills = activeCategory === 'frontend' 
    ? skills.slice(0, 4)
    : activeCategory === 'backend'
    ? skills.slice(4)
    : skills;

  return (
    <section id="skills" className="py-20 px-4 relative min-h-screen overflow-hidden">
      {/* Optimized background */}
      <OptimizedBackground />
      
      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-cyan-900/30 z-0"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow">
            Technical Expertise
          </h2>
          <p className="text-center text-gray-300 max-w-2xl mx-auto mb-16 text-lg">
            My toolkit for crafting exceptional digital experiences
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {['all', 'frontend', 'backend'].map((category) => (
            <motion.button
              key={category}
              className={`px-5 py-1.5 rounded-full font-medium transition-all ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-cyan-500/90 to-purple-500/90 text-white'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/70'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Frontend */}
          <motion.div 
            className="glass p-6 rounded-2xl transition-all duration-500 ease-out shadow-lg"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            whileHover={{ 
              y: -5,
              boxShadow: "0 15px 40px rgba(236, 72, 153, 0.2)"
            }}
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <motion.span 
                className="mr-2"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                💻
              </motion.span> 
              Frontend Technologies
            </h3>
            {filteredSkills.filter(s => ['React.js', 'Three.js', 'TypeScript', 'Next.js'].includes(s.name)).map((skill, index) => (
              <SkillBar key={skill.name} skill={skill} index={index} />
            ))}
          </motion.div>

          {/* Backend */}
          <motion.div 
            className="glass p-6 rounded-2xl transition-all duration-500 ease-out shadow-lg"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ 
              y: -5,
              boxShadow: "0 15px 40px rgba(52, 211, 153, 0.2)"
            }}
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <motion.span 
                className="mr-2"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
              >
                🛠️
              </motion.span> 
              Backend & Tools
            </h3>
            {filteredSkills.filter(s => ['Node.js', 'GSAP', 'Supabase', 'WebGL', 'Python'].includes(s.name)).map((skill, index) => (
              <SkillBar key={skill.name} skill={skill} index={index} />
            ))}
          </motion.div>
        </div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="glass p-5 rounded-xl inline-block shadow max-w-2xl">
            <p className="text-gray-300 text-base">
              <span className="font-medium bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
                Constantly Learning
              </span>{' '}
              • Exploring cutting-edge technologies like WebAssembly, WebGPU, and AI integration
            </p>
            <div className="flex justify-center mt-3 gap-1">
              {['🚀', '🧠', '🔍', '✨'].map((emoji, i) => (
                <motion.span
                  key={i}
                  className="text-xl"
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut"
                  }}
                >
                  {emoji}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* CSS animation keyframes */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(5px, 10px) rotate(5deg);
          }
          50% {
            transform: translate(10px, 5px) rotate(0deg);
          }
          75% {
            transform: translate(5px, -5px) rotate(-5deg);
          }
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
        }
        
        .glass {
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          background: rgba(15, 15, 35, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.08);
          will-change: transform, backdrop-filter;
        }
        
        .skill-item {
          will-change: transform, opacity;
        }
      `}</style>
    </section>
  );
};

export default SkillsSection;