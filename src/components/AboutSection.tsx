import { useRef, useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { MotionPathPlugin } from "gsap/dist/MotionPathPlugin";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const hologramRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });
  
  const [countedProjects, setCountedProjects] = useState(0);
  const [countedExperience, setCountedExperience] = useState(0);
  const [activeHologram, setActiveHologram] = useState(0);
  
  const holograms = [
    { icon: "🤖", title: "AI Integration", description: "Creating intelligent solutions" },
    { icon: "🔗", title: "Blockchain", description: "Building decentralized systems" },
    { icon: "🌐", title: "Web3", description: "Shaping the future internet" },
    { icon: "🧠", title: "Neural Networks", description: "Mimicking human cognition" }
  ];

  // Create refs for GSAP animations
  const titleRef = useRef(null);
  const particleRefs = useRef<HTMLDivElement[]>([]);
  const hologramItemsRef = useRef<HTMLDivElement[]>([]);
  const statCardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (inView && sectionRef.current) {
      // Animate counting with GSAP
      gsap.to({}, {
        duration: 1.2,
        onUpdate: function() {
          const progress = this.progress();
          setCountedProjects(Math.floor(15 * progress));
        }
      });
      
      gsap.to({}, {
        duration: 0.8,
        onUpdate: function() {
          const progress = this.progress();
          setCountedExperience(Math.floor(1 * progress));
        }
      });
      
      // Create particle paths
      particleRefs.current.forEach((particle, i) => {
        const path = [
          { x: Math.random() * 100, y: Math.random() * 100 },
          { x: Math.random() * 100, y: Math.random() * 100 },
          { x: Math.random() * 100, y: Math.random() * 100 }
        ];
        
        gsap.to(particle, {
          motionPath: {
            path: path,
            curviness: 1.5,
            autoRotate: false
          },
          duration: 15 + Math.random() * 20,
          repeat: -1,
          ease: "none"
        });
      });
    }
  }, [inView]);

  useEffect(() => {
    // Setup ScrollTrigger animations
    if (sectionRef.current) {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
      
      // Animate paragraph text
      gsap.utils.toArray(".about-paragraph").forEach((p: any, i) => {
        gsap.fromTo(p,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.2,
            scrollTrigger: {
              trigger: p,
              start: "top 90%",
              toggleActions: "play none none none"
            }
          }
        );
      });
      
      // Stats card animations
      statCardsRef.current.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 40, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            delay: i * 0.1,
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none none"
            }
          }
        );
      });
    }
    
    // Hologram hover effect
    statCardsRef.current.forEach(card => {
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          y: -10,
          scale: 1.05,
          duration: 0.3,
          boxShadow: "0 25px 50px -12px rgba(236, 72, 153, 0.25)",
          overwrite: "auto"
        });
      });
      
      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          boxShadow: "none",
          duration: 0.3,
          overwrite: "auto"
        });
      });
    });
    
    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Hologram animation effect
  useEffect(() => {
    if (hologramItemsRef.current.length > 0) {
      // Animate hologram change
      const currentHologram = hologramItemsRef.current[activeHologram];
      
      // Reset all holograms
      hologramItemsRef.current.forEach(item => {
        gsap.set(item, { opacity: 0, scale: 0.8, display: "none" });
      });
      
      // Animate in the new hologram
      gsap.set(currentHologram, { display: "block" });
      
      gsap.fromTo(currentHologram,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          onComplete: () => {
            // Animate the icon
            gsap.fromTo(currentHologram.querySelector(".hologram-icon"),
              { scale: 0, opacity: 0 },
              {
                scale: 1,
                opacity: 1,
                duration: 0.5,
                ease: "elastic.out(1, 0.5)"
              }
            );
          }
        }
      );
      
      // Animate holographic lines
      gsap.to(".hologram-line", {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          gsap.to(".hologram-line", {
            opacity: 1,
            duration: 0.5,
            stagger: 0.1
          });
        }
      });
    }
  }, [activeHologram]);

  // Rotate holograms
  useEffect(() => {
    let hologramInterval: NodeJS.Timeout;
    
    if (inView) {
      hologramInterval = setInterval(() => {
        setActiveHologram(prev => (prev + 1) % holograms.length);
      }, 3000);
    }
    
    return () => clearInterval(hologramInterval);
  }, [inView, holograms.length]);

  return (
    <section
      id="about"
      ref={ref}
      className="py-24 px-4 relative overflow-hidden min-h-screen flex items-center"
      style={{
        background: "radial-gradient(circle at center, #0f0c29 0%, #0b081c 40%, #070514 100%)"
      }}
    >
      {/* Quantum particle background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div 
            key={i}
            ref={el => el && (particleRefs.current[i] = el)}
            className="absolute rounded-full particle"
            style={{
              width: `${Math.random() * 8 + 2}px`,
              height: `${Math.random() * 8 + 2}px`,
              background: `rgba(${Math.random() > 0.5 ? 139 : 56}, ${Math.random() > 0.5 ? 92 : 189}, ${Math.random() > 0.5 ? 246 : 248}, ${Math.random() * 0.4 + 0.1})`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              boxShadow: `0 0 ${Math.random() * 15 + 5}px rgba(${Math.random() > 0.5 ? 139 : 56}, ${Math.random() > 0.5 ? 92 : 189}, ${Math.random() > 0.5 ? 246 : 248}, 1)`
            }}
          />
        ))}
        
        {/* Large gradient spheres */}
        <div className="absolute w-[800px] h-[800px] bg-gradient-to-br from-purple-900/10 to-cyan-900/10 rounded-full blur-[100px] -top-1/4 -left-1/4"></div>
        <div className="absolute w-[600px] h-[600px] bg-gradient-to-br from-cyan-900/10 to-purple-900/10 rounded-full blur-[100px] bottom-0 right-0"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div
          ref={sectionRef}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left Content */}
          <div className="space-y-10">
            <div className="relative inline-block">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-xl blur-2xl opacity-30 animate-pulse"></div>
              <h2 ref={titleRef} className="relative text-5xl md:text-6xl xl:text-7xl font-bold mb-8 bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
                About Me
              </h2>
            </div>
            
            <div className="space-y-6 text-gray-300 text-lg md:text-xl">
              <p className="leading-relaxed about-paragraph">
                I'm a <span className="text-cyan-400 font-medium">passionate full-stack developer</span> with expertise in AI, Web3, and blockchain. I craft intelligent, secure, and dynamic web solutions that solve real-world problems using cutting-edge technologies.
              </p>
              
              <p className="leading-relaxed about-paragraph">
                My journey blends <span className="text-purple-400 font-medium">technical depth</span> with forward-thinking innovation, creating solutions that are not just functional but transformative and impactful.
              </p>
              
              <p className="leading-relaxed about-paragraph">
                When not coding, I explore AI breakthroughs, experiment with blockchain concepts, and design projects that <span className="text-pink-400 font-medium">challenge the limits</span> of modern web technology.
              </p>
            </div>
            
            {/* Stats Cards */}
            <div ref={statsRef} className="grid grid-cols-2 gap-6 mt-12">
              <div className="relative group" ref={el => el && (statCardsRef.current[0] = el)}>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative bg-gray-900/80 backdrop-blur-lg rounded-xl p-6 border border-gray-800 group-hover:border-cyan-500 transition-all">
                  <h3 className="text-4xl font-bold text-cyan-400 mb-2">
                    {countedProjects}+
                  </h3>
                  <p className="text-gray-400 font-medium">Projects Completed</p>
                </div>
              </div>
              
              <div className="relative group" ref={el => el && (statCardsRef.current[1] = el)}>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative bg-gray-900/80 backdrop-blur-lg rounded-xl p-6 border border-gray-800 group-hover:border-pink-500 transition-all">
                  <h3 className="text-4xl font-bold text-pink-400 mb-2">
                    {countedExperience}+
                  </h3>
                  <p className="text-gray-400 font-medium">Years Experience</p>
                </div>
              </div>
            </div>
          </div>

          {/* Holographic Display */}
          <div className="relative h-[500px]" ref={hologramRef}>
            <div className="absolute inset-0 rounded-3xl overflow-hidden border border-cyan-500/30">
              {/* Grid pattern */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(192,132,252,0.05)_1px,transparent_2px)] bg-[length:40px_40px]"></div>
              
              {/* Hologram container */}
              <div className="absolute inset-8 rounded-2xl bg-gradient-to-br from-gray-900/70 to-black/80 backdrop-blur-lg border border-cyan-500/20 flex items-center justify-center overflow-hidden">
                {holograms.map((hologram, index) => (
                  <div 
                    key={index}
                    ref={el => el && (hologramItemsRef.current[index] = el)}
                    className={`absolute inset-0 flex items-center justify-center p-8 text-center transition-opacity ${
                      index === activeHologram ? 'block' : 'hidden'
                    }`}
                  >
                    <div>
                      <div className="hologram-icon text-8xl mb-6 text-cyan-400">
                        {hologram.icon}
                      </div>
                      <h3 className="text-3xl font-bold text-white mb-3">
                        {hologram.title}
                      </h3>
                      <p className="text-xl text-gray-400 max-w-md mx-auto">
                        {hologram.description}
                      </p>
                    </div>
                  </div>
                ))}
                
                {/* Holographic lines */}
                <div className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden">
                  <div className="absolute w-[200%] h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent top-1/3 hologram-line"></div>
                  <div className="absolute w-[1px] h-[200%] bg-gradient-to-b from-transparent via-purple-400 to-transparent left-1/3 hologram-line"></div>
                  <div className="absolute w-[200%] h-[1px] bg-gradient-to-r from-transparent via-pink-400 to-transparent bottom-1/3 hologram-line"></div>
                </div>
                
                {/* Corner accents */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-cyan-400"></div>
                <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-pink-400"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-purple-400"></div>
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-cyan-400"></div>
              </div>
              
              {/* Floating particles */}
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: `${Math.random() * 6 + 2}px`,
                    height: `${Math.random() * 6 + 2}px`,
                    background: `rgba(${Math.random() > 0.5 ? 139 : 56}, ${Math.random() > 0.5 ? 92 : 189}, ${Math.random() > 0.5 ? 246 : 248}, ${Math.random() * 0.4 + 0.1})`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    boxShadow: `0 0 ${Math.random() * 10 + 5}px rgba(${Math.random() > 0.5 ? 139 : 56}, ${Math.random() > 0.5 ? 92 : 189}, ${Math.random() > 0.5 ? 246 : 248}, 0.7)`
                  }}
                />
              ))}
            </div>
            
            {/* Outer glow */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-600/20 to-purple-600/20 blur-2xl opacity-70 animate-pulse -z-10"></div>
            
            {/* Floating indicators */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-8 flex space-x-3">
              {holograms.map((_, i) => (
                <div 
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all duration-500 ${i === activeHologram ? 'bg-cyan-400 scale-125' : 'bg-gray-600'}`}
                  onClick={() => setActiveHologram(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Embedded CSS Animations */}
      <style jsx global>{`
        .particle {
          animation: float 15s infinite linear;
        }
        
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(5px, -10px); }
          50% { transform: translate(10px, 5px); }
          75% { transform: translate(-5px, 10px); }
        }
        
        .hologram-line {
          animation: sweep 8s infinite linear;
        }
        
        @keyframes sweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .hologram-line:nth-child(2) {
          animation-name: sweep-vertical;
          animation-duration: 10s;
        }
        
        @keyframes sweep-vertical {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        
        .hologram-line:nth-child(3) {
          animation-name: sweep-reverse;
          animation-duration: 12s;
        }
        
        @keyframes sweep-reverse {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </section>
  );
};

export default AboutSection;