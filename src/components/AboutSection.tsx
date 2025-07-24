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
    { 
      icon: "🤖", 
      title: "AI Solutions", 
      description: "Building enterprise-grade AI systems",
      gradient: "from-blue-400/20 to-emerald-400/20",
      particles: 15,
      particleColor: "rgba(96, 165, 250, 0.4)"
    },
    { 
      icon: "🔗", 
      title: "Blockchain", 
      description: "Developing secure decentralized architectures",
      gradient: "from-indigo-400/20 to-purple-400/20",
      particles: 12,
      particleColor: "rgba(129, 140, 248, 0.4)"
    },
    { 
      icon: "🌐", 
      title: "Web3", 
      description: "Creating next-generation internet experiences",
      gradient: "from-cyan-400/20 to-blue-400/20",
      particles: 18,
      particleColor: "rgba(56, 189, 248, 0.4)"
    },
    { 
      icon: "🧠", 
      title: "Machine Learning", 
      description: "Designing intelligent data-driven systems",
      gradient: "from-violet-400/20 to-fuchsia-400/20",
      particles: 10,
      particleColor: "rgba(192, 132, 252, 0.4)"
    }
  ];

  // Create refs for GSAP animations
  const titleRef = useRef(null);
  const particleRefs = useRef<HTMLDivElement[]>([]);
  const hologramItemsRef = useRef<HTMLDivElement[]>([]);
  const statCardsRef = useRef<HTMLDivElement[]>([]);
  const hologramParticlesRef = useRef<HTMLDivElement[]>([]);
  const lightRayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inView && sectionRef.current) {
      // Animate counting with GSAP
      gsap.to({}, {
        duration: 1.8,
        ease: "power3.out",
        onUpdate: function() {
          const progress = this.progress();
          setCountedProjects(Math.floor(10 * progress));
        }
      });
      
      gsap.to({}, {
        duration: 1.4,
        ease: "power3.out",
        onUpdate: function() {
          const progress = this.progress();
          setCountedExperience(Math.floor(2 * progress));
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
            curviness: 1.2,
            autoRotate: false
          },
          duration: 25 + Math.random() * 15,
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
          ease: "expo.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
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
            delay: i * 0.25,
            ease: "power3.out",
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
          { opacity: 0, y: 40, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            delay: i * 0.15,
            ease: "back.out(1.2)",
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
          y: -8,
          scale: 1.03,
          duration: 0.3,
          boxShadow: "0 20px 40px -12px rgba(59, 130, 246, 0.25)",
          overwrite: "auto"
        });
      });
      
      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          boxShadow: "0 10px 25px -10px rgba(0, 0, 0, 0.1)",
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

  // Enhanced hologram animation effect
  useEffect(() => {
    if (hologramItemsRef.current.length > 0) {
      // Animate hologram change
      const currentHologram = hologramItemsRef.current[activeHologram];
      const prevIndex = activeHologram === 0 ? holograms.length - 1 : activeHologram - 1;
      const prevHologram = hologramItemsRef.current[prevIndex];
      
      // Reset all holograms
      hologramItemsRef.current.forEach(item => {
        gsap.set(item, { opacity: 0, scale: 0.9, display: "none" });
      });
      
      // Animate light ray burst
      if (lightRayRef.current) {
        gsap.set(lightRayRef.current, { 
          opacity: 1,
          rotation: Math.random() * 360,
          scale: 0 
        });
        
        gsap.to(lightRayRef.current, {
          scale: 1,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out"
        });
      }
      
      // Create particle burst effect
      hologramParticlesRef.current.forEach((particle, i) => {
        const angle = (i / hologramParticlesRef.current.length) * Math.PI * 2;
        const distance = 200 + Math.random() * 100;
        
        gsap.set(particle, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: Math.random() * 0.5 + 0.5
        });
        
        gsap.to(particle, {
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
          opacity: 0,
          duration: 1.2,
          ease: "power2.out",
          delay: Math.random() * 0.3
        });
      });
      
      // Animate in the new hologram
      gsap.set(currentHologram, { display: "block" });
      
      gsap.fromTo(currentHologram,
        { 
          opacity: 0, 
          scale: 0.8,
          rotationY: -30,
          z: -100
        },
        {
          opacity: 1,
          scale: 1,
          rotationY: 0,
          z: 0,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.3,
          onComplete: () => {
            // Animate the icon
            gsap.fromTo(currentHologram.querySelector(".hologram-icon"),
              { scale: 0, opacity: 0, z: -50 },
              {
                scale: 1,
                opacity: 1,
                z: 0,
                duration: 0.7,
                ease: "elastic.out(1.2, 0.5)"
              }
            );
            
            // Animate title and description
            gsap.fromTo(currentHologram.querySelector(".hologram-title"),
              { y: 20, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power3.out"
              }
            );
            
            gsap.fromTo(currentHologram.querySelector(".hologram-desc"),
              { y: 20, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.6,
                delay: 0.1,
                ease: "power3.out"
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
            opacity: 0.6,
            duration: 0.7,
            stagger: 0.15
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
      }, 3500);
    }
    
    return () => clearInterval(hologramInterval);
  }, [inView, holograms.length]);

  return (
    <section
      id="about"
      ref={ref}
      className="py-28 px-4 relative overflow-hidden min-h-screen flex items-center"
      style={{
        background: "radial-gradient(circle at center, #0a081f 0%, #070616 40%, #050412 100%)"
      }}
    >
      {/* Quantum particle background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            ref={el => el && (particleRefs.current[i] = el)}
            className="absolute rounded-full particle"
            style={{
              width: `${Math.random() * 6 + 1}px`,
              height: `${Math.random() * 6 + 1}px`,
              background: `rgba(${Math.random() > 0.5 ? 99 : 59}, ${Math.random() > 0.5 ? 102 : 130}, ${Math.random() > 0.5 ? 241 : 246}, ${Math.random() * 0.3 + 0.1})`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              boxShadow: `0 0 ${Math.random() * 8 + 3}px rgba(99, 102, 241, 0.4)`
            }}
          />
        ))}
        
        {/* Large gradient spheres */}
        <div className="absolute w-[800px] h-[800px] bg-gradient-to-br from-blue-900/10 to-emerald-900/10 rounded-full blur-[120px] -top-1/4 -left-1/4"></div>
        <div className="absolute w-[600px] h-[600px] bg-gradient-to-br from-indigo-900/10 to-purple-900/10 rounded-full blur-[100px] bottom-0 right-0"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div
          ref={sectionRef}
          className="grid lg:grid-cols-2 gap-20 items-center"
        >
          {/* Left Content */}
          <div className="space-y-10">
            <div className="relative inline-block">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl blur-2xl opacity-20"></div>
              <h2 ref={titleRef} className="relative text-4xl md:text-5xl xl:text-6xl font-bold mb-10 bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent tracking-tight">
                Professional Expertise
              </h2>
            </div>
            
            <div className="space-y-8 text-gray-300 text-lg">
              <p className="leading-relaxed about-paragraph font-light">
                As a seasoned <span className="text-blue-400 font-medium">full-stack architect</span>, I specialize in developing enterprise-grade solutions leveraging cutting-edge technologies. With a focus on scalable architecture and robust engineering practices, I deliver systems that drive business transformation.
              </p>
              
              <p className="leading-relaxed about-paragraph font-light">
                My approach combines <span className="text-cyan-400 font-medium">technical excellence</span> with strategic thinking, ensuring solutions are not just technically sound but also aligned with business objectives and market opportunities.
              </p>
              
              <p className="leading-relaxed about-paragraph font-light">
                I maintain expertise across the full technology stack while specializing in emerging fields where I've led multiple successful implementations for Fortune 500 clients and innovative startups.
              </p>
            </div>
            
            {/* Stats Cards */}
            <div ref={statsRef} className="grid grid-cols-2 gap-6 mt-12">
              <div className="relative group" ref={el => el && (statCardsRef.current[0] = el)}>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl blur opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                <div className="relative bg-gray-900/90 backdrop-blur-lg rounded-xl p-6 border border-gray-800 group-hover:border-blue-500 transition-all">
                  <h3 className="text-4xl font-bold text-blue-400 mb-2">
                    {countedProjects}+
                  </h3>
                  <p className="text-gray-400 font-medium">Personal & Academic Projects</p>
                </div>
              </div>
              
              <div className="relative group" ref={el => el && (statCardsRef.current[1] = el)}>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-600 to-emerald-600 rounded-xl blur opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                <div className="relative bg-gray-900/90 backdrop-blur-lg rounded-xl p-6 border border-gray-800 group-hover:border-cyan-500 transition-all">
                  <h3 className="text-4xl font-bold text-cyan-400 mb-2">
                    {countedExperience}+
                  </h3>
                  <p className="text-gray-400 font-medium">Years of Hands-On Practice</p>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Holographic Display */}
          <div className="relative h-[500px]" ref={hologramRef}>
            <div className="absolute inset-0 rounded-[2rem] overflow-hidden border border-cyan-500/20 shadow-2xl shadow-blue-500/10">
              {/* Grid pattern */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(96,165,250,0.05)_1px,transparent_1px)] bg-[length:30px_30px]"></div>
              
              {/* Light ray burst effect */}
              <div 
                ref={lightRayRef}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 opacity-0 pointer-events-none"
              >
                {[...Array(12)].map((_, i) => (
                  <div 
                    key={i}
                    className="absolute top-0 left-1/2 w-1 h-full bg-gradient-to-b from-cyan-400/80 to-transparent transform -translate-x-1/2"
                    style={{ transform: `translateX(-50%) rotate(${i * 30}deg)` }}
                  />
                ))}
              </div>
              
              {/* Hologram container */}
              <div className={`absolute inset-8 rounded-2xl ${holograms[activeHologram].gradient} backdrop-blur-2xl border border-cyan-500/10 flex items-center justify-center overflow-hidden`}>
                {holograms.map((hologram, index) => (
                  <div 
                    key={index}
                    ref={el => el && (hologramItemsRef.current[index] = el)}
                    className={`absolute inset-0 flex flex-col items-center justify-center p-10 text-center transition-opacity ${
                      index === activeHologram ? 'block' : 'hidden'
                    }`}
                  >
                    <div className="relative z-10">
                      <div className="hologram-icon text-7xl mb-8 text-white opacity-90">
                        {hologram.icon}
                      </div>
                      <h3 className="hologram-title text-3xl font-bold text-white mb-4 tracking-wide">
                        {hologram.title}
                      </h3>
                      <p className="hologram-desc text-xl text-gray-300 max-w-xs mx-auto font-light">
                        {hologram.description}
                      </p>
                    </div>
                    
                    {/* Depth effect */}
                    <div className="absolute w-full h-full top-0 left-0 opacity-20">
                      <div className="absolute w-64 h-64 rounded-full bg-white blur-[80px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                    </div>
                  </div>
                ))}
                
                {/* Transition particles */}
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    ref={el => el && (hologramParticlesRef.current[i] = el)}
                    className="absolute rounded-full opacity-0 pointer-events-none"
                    style={{
                      width: `${Math.random() * 8 + 4}px`,
                      height: `${Math.random() * 8 + 4}px`,
                      background: holograms[activeHologram].particleColor,
                      top: '50%',
                      left: '50%',
                      boxShadow: `0 0 ${Math.random() * 10 + 5}px currentColor`
                    }}
                  />
                ))}
                
                {/* Holographic lines */}
                <div className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden">
                  <div className="absolute w-[200%] h-[1px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent top-1/3 hologram-line"></div>
                  <div className="absolute w-[1px] h-[200%] bg-gradient-to-b from-transparent via-blue-400/60 to-transparent left-1/3 hologram-line"></div>
                  <div className="absolute w-[200%] h-[1px] bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent bottom-1/3 hologram-line"></div>
                </div>
                
                {/* Corner accents */}
                <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-cyan-400/60"></div>
                <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-blue-400/60"></div>
                <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-emerald-400/60"></div>
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-cyan-400/60"></div>
              </div>
              
              {/* Floating particles */}
              {[...Array(holograms[activeHologram].particles)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: `${Math.random() * 4 + 1}px`,
                    height: `${Math.random() * 4 + 1}px`,
                    background: holograms[activeHologram].particleColor,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    boxShadow: `0 0 ${Math.random() * 6 + 3}px currentColor`,
                    animation: `float${Math.floor(Math.random() * 4) + 1} 15s infinite ease-in-out`,
                    animationDelay: `${Math.random() * 5}s`
                  }}
                />
              ))}
            </div>
            
            {/* Outer glow */}
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-r from-blue-600/15 to-cyan-600/15 blur-xl opacity-40 -z-10"></div>
            
            {/* Floating indicators */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-8 flex space-x-3">
              {holograms.map((_, i) => (
                <div 
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-500 cursor-pointer ${
                    i === activeHologram 
                      ? 'bg-cyan-400 scale-125' 
                      : 'bg-gray-600 hover:bg-gray-400'
                  }`}
                  onClick={() => setActiveHologram(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Embedded CSS Animations */}
      <style >{`
        .particle {
          animation: float 25s infinite ease-in-out;
          will-change: transform;
        }
        
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(5px, -8px); }
          50% { transform: translate(8px, 4px); }
          75% { transform: translate(-4px, 7px); }
        }
        
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(8px, -6px); }
          50% { transform: translate(5px, 5px); }
          75% { transform: translate(-7px, 3px); }
        }
        
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(-5px, -7px); }
          50% { transform: translate(7px, 3px); }
          75% { transform: translate(-3px, 8px); }
        }
        
        @keyframes float3 {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(3px, -8px); }
          50% { transform: translate(-6px, 5px); }
          75% { transform: translate(8px, 2px); }
        }
        
        @keyframes float4 {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(-8px, -4px); }
          50% { transform: translate(4px, 7px); }
          75% { transform: translate(2px, -5px); }
        }
        
        .hologram-line {
          animation: sweep 12s infinite linear;
          will-change: transform;
        }
        
        @keyframes sweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .hologram-line:nth-child(2) {
          animation-name: sweep-vertical;
          animation-duration: 15s;
        }
        
        @keyframes sweep-vertical {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        
        .hologram-line:nth-child(3) {
          animation-name: sweep-reverse;
          animation-duration: 18s;
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