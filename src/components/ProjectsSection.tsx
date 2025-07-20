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
  },
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
    description: "A highly polished Apple website clone with stunning animations, immersive parallax effects, and sleek product showcases. Developed using React, GSAP, and Three.js for a seamless, interactive browsing experience.",
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
        {/* Updated gradient border */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-600/20 via-transparent to-purple-600/20 z-0 opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Card content */}
        <div className="relative z-10 bg-gradient-to-b from-[#0a192f]/80 to-[#0f3460]/80 backdrop-blur-sm rounded-2xl overflow-hidden h-full border border-cyan-500/30">
          <div className="relative overflow-hidden">
            <img
              ref={imageRef}
              src={project.image}
              alt={project.title}
              className="w-full h-48 md:h-64 object-cover transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute bottom-4 left-4 right-4 flex gap-3">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/button relative inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#0a192f] to-[#0f3460] border border-cyan-500/30 rounded-xl text-gray-200 font-medium tracking-wide transition-all duration-500 hover:border-cyan-500/80 hover:shadow-[0_0_20px_rgba(0,245,255,0.3)] hover:scale-[1.05] overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    <ExternalLink size={16} className="mr-2 group-hover/button:rotate-12 transition-transform" />
                    Live Demo
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-cyan-500/0 opacity-0 group-hover/button:opacity-100 transition-all duration-700 -translate-x-full group-hover/button:translate-x-0"></div>
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/button relative inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#0a192f] to-[#0f3460] border border-indigo-500/30 rounded-xl text-gray-200 font-medium tracking-wide transition-all duration-500 hover:border-indigo-500/80 hover:shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:scale-[1.05] overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    <Github size={16} className="mr-2 group-hover/button:rotate-12 transition-transform" />
                    Source Code
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/20 to-indigo-500/0 opacity-0 group-hover/button:opacity-100 transition-all duration-700 -translate-x-full group-hover/button:translate-x-0"></div>
                </a>
              </div>
            </div>
          </div>
          <div ref={contentRef} className="p-6">
            <h3 className="text-xl font-bold text-cyan-300 mb-2 group-hover:text-cyan-200 transition-colors flex items-center">
              {project.title}
              {project.featured && (
                <span className="ml-2 px-2 py-1 bg-gradient-to-r from-cyan-500 to-purple-500 text-xs rounded-full">
                  Featured
                </span>
              )}
            </h3>
            <p className="text-gray-300 mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-gradient-to-r from-cyan-600/30 to-purple-600/30 border border-cyan-500/20 rounded-full text-sm text-cyan-300 hover:bg-cyan-600/50 transition-all cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
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
    }
  }, [inView]);

  return (
    <section id="projects" ref={ref} className="py-20 px-4 relative overflow-hidden bg-gradient-to-br from-[#05051f] via-[#0a0a30] to-[#020217]">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-[40rem] h-[40rem] bg-gradient-to-br from-[#00ccaa33] to-[#0066cc33] rounded-full blur-[120px] animate-float-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-gradient-to-br from-[#00aacc33] to-[#00339933] rounded-full blur-[100px] animate-float-medium"></div>
      </div>

      {/* Grid background */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-grid-pattern bg-[length:40px_40px]"></div>
      </div>
      
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
            <div className="rounded-full p-1 flex bg-[#0a192f]/50 backdrop-blur-md border border-cyan-500/20">
              <button
                onClick={() => setFilter('all')}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  filter === 'all'
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-cyan-500/30'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                All Projects
              </button>
              <button
                onClick={() => setFilter('featured')}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  filter === 'featured'
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-cyan-500/30'
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
              className="group/cta relative inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#0a192f] to-[#0f3460] border border-cyan-500/30 rounded-xl text-gray-200 font-medium text-lg tracking-wide transition-all duration-500 hover:border-cyan-500/80 hover:shadow-[0_0_30px_rgba(0,245,255,0.3)] hover:scale-[1.05] overflow-hidden"
            >
              <Github size={20} className="mr-3 group-hover/cta:rotate-12 transition-transform" />
              <span className="relative z-10">Explore My GitHub</span>
              <svg 
                className="ml-3 w-5 h-5 group-hover/cta:translate-x-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-cyan-500/0 opacity-0 group-hover/cta:opacity-100 transition-all duration-700 -translate-x-full group-hover/cta:translate-x-0"></div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;