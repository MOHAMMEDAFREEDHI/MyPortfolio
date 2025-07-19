import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github } from 'lucide-react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
}

const projects: Project[] = [
  {
  id: 1,
  title: "Health-AI App",
  description: "An AI-powered health assistant that offers a chatbot for medical and health queries, food calorie analysis, and disease symptom checkers for diabetes, heart disease, and lung cancer. Built with Hugging Face models and Pandas for AI predictions, delivering a seamless user experience.",
  image: "src/assets/healthy.jpg",
  technologies: ["Hugging Face", "Pandas", "FastAPI", "React", "TailwindCSS", "Python", "Uvicorn"],
  liveUrl: "https://health-ai-nu-ten.vercel.app/",
  githubUrl: "https://github.com/MOHAMMEDAFREEDHI",
  featured: true
}
,
  
  {
    id: 2,
    title: "Blockchain Voting System",
    description: "A real-time blockchain dashboard with dynamic charts, transaction updates, and responsive UI powered by D3.js, WebSockets, and React.",
    image: "https://images.unsplash.com/photo-1633158829875-e5316a358c6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    technologies: ["React", "D3.js", "WebSockets", "Node.js", "TailwindCSS"],
    liveUrl: "https://mohammedafreedhi.github.io/",
    githubUrl: "https://github.com/MOHAMMEDAFREEDHI",
    featured: true
  },
  {
    id: 3,
    title: "Apple Website Clone",
    description: "A highly polished Apple website clone with stunning animations, immersive parallax effects, and sleek product showcases. Developed using React, GSAP, and Three.js for a seamless, interactive browsing experience."
,
    image: "src/assets/apple.jpg",
    technologies: ["React", "Three.js", "GSAP", "WebGL", "Node.js"],
    liveUrl: "http://localhost:5173/",
    githubUrl: "https://github.com/MOHAMMEDAFREEDHI/iphone-website",
    featured: true
  },
  {
    id: 4,
    title: "E-commerce Platform",
    description: "Full-featured online shopping experience with payment integration, product filtering, and user dashboard.",
    image: "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    technologies: ["React", "Redux", "Stripe API", "MongoDB", "Express"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false
  }
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    if (inView && cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 60, scale: 0.95 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.8, 
          delay: index * 0.1, 
          ease: "power3.out",
          onComplete: () => {
            // Animate image and content separately
            if (imageRef.current && contentRef.current) {
              gsap.fromTo(imageRef.current, 
                { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' },
                { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: 0.8 }
              );
              
              gsap.fromTo(contentRef.current, 
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6, delay: 0.3 }
              );
            }
          }
        }
      );
    }
  }, [inView, index]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateY = ((x - centerX) / centerX) * 5;
    const rotateX = ((y - centerY) / centerY) * -5;
    
    gsap.to(cardRef.current, {
      rotationY: rotateY,
      rotationX: rotateX,
      transformPerspective: 1000,
      ease: "power2.out",
      duration: 0.3
    });
    
    // Parallax effect for image
    if (imageRef.current) {
      const moveX = ((x - centerX) / centerX) * 10;
      const moveY = ((y - centerY) / centerY) * 10;
      gsap.to(imageRef.current, {
        x: moveX,
        y: moveY,
        duration: 0.5
      });
    }
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotationY: 0,
      rotationX: 0,
      ease: "elastic.out(1.2, 0.5)",
      duration: 1
    });
    
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        x: 0,
        y: 0,
        duration: 0.8
      });
    }
  };

  return (
    <div ref={ref} className="project-card">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`relative rounded-2xl overflow-hidden transition-all duration-500 group ${
          project.featured ? 'md:col-span-2' : ''
        }`}
      >
        {/* Gradient border */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-600/20 via-transparent to-cyan-400/20 z-0 opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Inner glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent z-0"></div>
        
        {/* Card content */}
        <div className="relative z-10 bg-gradient-to-b from-gray-900/80 to-gray-950/80 backdrop-blur-sm rounded-2xl overflow-hidden h-full">
          <div className="relative overflow-hidden">
            <img
              ref={imageRef}
              src={project.image}
              alt={project.title}
              className="w-full h-48 md:h-64 object-cover transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute bottom-4 left-4 right-4 flex gap-3">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full text-white font-medium hover:scale-105 hover:shadow-lg transition-all duration-300 group/button"
                >
                  <ExternalLink size={16} className="mr-2 group-hover/button:rotate-12 transition-transform" />
                  Live Demo
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-700 rounded-full text-white font-medium hover:scale-105 hover:shadow-lg transition-all duration-300 group/button"
                >
                  <Github size={16} className="mr-2 group-hover/button:rotate-12 transition-transform" />
                  Source Code
                </a>
              </div>
            </div>
          </div>
          <div ref={contentRef} className="p-6">
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors flex items-center">
              {project.title}
              {project.featured && (
                <span className="ml-2 px-2 py-1 bg-gradient-to-r from-purple-600 to-pink-500 text-xs rounded-full">
                  Featured
                </span>
              )}
            </h3>
            <p className="text-gray-300 mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-gradient-to-r from-purple-600/30 to-blue-600/30 border border-purple-500/20 rounded-full text-sm text-purple-300 hover:bg-purple-600/50 transition-all cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        {/* Hover effect */}
        <div className="absolute inset-0 rounded-2xl z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/30 to-cyan-400/30 rounded-2xl blur-lg animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const [filter, setFilter] = useState<'all' | 'featured'>('all');
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const filteredProjects = filter === 'featured' ? projects.filter((p) => p.featured) : projects;

  useEffect(() => {
    if (inView && sectionRef.current) {
      // Create floating particles
      const particles = [];
      const particleCount = 30;
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute rounded-full';
        particle.style.width = `${Math.random() * 10 + 2}px`;
        particle.style.height = particle.style.width;
        particle.style.backgroundColor = i % 3 === 0 
          ? '#8B5CF6' 
          : i % 3 === 1 
            ? '#EC4899' 
            : '#06B6D4';
        particle.style.opacity = `${Math.random() * 0.4 + 0.1}`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        sectionRef.current.appendChild(particle);
        particles.push(particle);
        
        // Animate particles
        gsap.to(particle, {
          x: `+=${(Math.random() - 0.5) * 100}`,
          y: `+=${(Math.random() - 0.5) * 100}`,
          duration: Math.random() * 10 + 10,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }
      
      // Animate title and subtitle
      gsap.fromTo(titleRef.current, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
      
      gsap.fromTo(subtitleRef.current, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.2, ease: "power3.out" }
      );
      
      // Animate filter buttons
      gsap.fromTo(filterRef.current, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: "power3.out" }
      );
      
      // Cleanup particles on unmount
      return () => {
        particles.forEach(p => p.remove());
      };
    }
  }, [inView]);

  return (
    <section id="projects" ref={ref} className="py-20 px-4 relative overflow-hidden bg-gradient-to-b from-gray-950 to-black">
      {/* Animated grid background */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-grid-pattern bg-[length:40px_40px]"></div>
      </div>
      
      {/* Floating particles will be added here dynamically */}
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div ref={sectionRef} className="relative">
          <h2 
            ref={titleRef}
            className="text-4xl md:text-6xl font-extrabold text-center mb-8"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
              Project Showcase
            </span>
          </h2>

          <p 
            ref={subtitleRef}
            className="text-center text-gray-400 text-xl mb-12 max-w-3xl mx-auto"
          >
            Explore my immersive web experiences, real-time dashboards, and modern applications crafted with cutting-edge technologies.
          </p>

          <div ref={filterRef} className="flex justify-center mb-12">
            <div className="glass rounded-full p-1 flex bg-gray-900/50 backdrop-blur-md border border-gray-800">
              <button
                onClick={() => setFilter('all')}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  filter === 'all'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg shadow-purple-500/30'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                All Projects
              </button>
              <button
                onClick={() => setFilter('featured')}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  filter === 'featured'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg shadow-purple-500/30'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Featured
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-max">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
          
          {/* Call to action */}
          <div className="text-center mt-20">
            <p className="text-gray-400 text-lg mb-6">
              Interested in seeing more of my work?
            </p>
            <a 
              href="https://github.com/MOHAMMEDAFREEDHI" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full text-white font-medium text-lg hover:scale-105 hover:shadow-lg transition-all duration-300 group/cta"
            >
              <Github size={20} className="mr-3 group-hover/cta:rotate-12 transition-transform" />
              Explore My GitHub
              <svg 
                className="ml-3 w-5 h-5 group-hover/cta:translate-x-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;