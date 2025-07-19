  import { useEffect, useRef } from 'react';
  import gsap from 'gsap';
  import { ArrowDown, Download, Send } from 'lucide-react';

  const HeroSection = () => {
    const heroRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const particlesRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
      // Create particle system
      particlesRef.current.forEach((particle, i) => {
        gsap.to(particle, {
          x: gsap.utils.random(-200, 200),
          y: gsap.utils.random(-200, 200),
          rotation: gsap.utils.random(0, 360),
          duration: gsap.utils.random(15, 25),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.1
        });
      });

      // Mouse parallax effect
      const handleMouseMove = (e: MouseEvent) => {
        if (!heroRef.current) return;
        const rect = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / 80;
        const y = (e.clientY - rect.top - rect.height / 2) / 80;

        gsap.to(heroRef.current, {
          rotationY: x,
          rotationX: -y,
          scale: 1.01,
          ease: 'power2.out',
          duration: 0.5,
        });

        // Text parallax effect
        if (textRef.current) {
          gsap.to(textRef.current, {
            x: x * 10,
            y: y * 10,
            duration: 0.8,
            ease: 'power2.out'
          });
        }

        // Interactive particle effect
        particlesRef.current.forEach(particle => {
          const distX = parseFloat(particle.dataset.x || '0') - e.clientX;
          const distY = parseFloat(particle.dataset.y || '0') - e.clientY;
          const distance = Math.sqrt(distX * distX + distY * distY);
          
          if (distance < 300) {
            gsap.to(particle, {
              x: `+=${distX * 0.03}`,
              y: `+=${distY * 0.03}`,
              scale: 1.5,
              duration: 0.5,
              overwrite: true
            });
          }
        });
      };

      const handleMouseLeave = () => {
        if (!heroRef.current) return;
        gsap.to(heroRef.current, {
          rotationY: 0,
          rotationX: 0,
          scale: 1,
          ease: 'power3.out',
          duration: 1,
        });
        
        if (textRef.current) {
          gsap.to(textRef.current, {
            x: 0,
            y: 0,
            duration: 1,
            ease: 'power3.out'
          });
        }

        // Reset particles
        particlesRef.current.forEach(particle => {
          gsap.to(particle, {
            scale: 1,
            duration: 1,
            ease: 'power2.out'
          });
        });
      };

      const currentHero = heroRef.current;
      currentHero?.addEventListener('mousemove', handleMouseMove);
      currentHero?.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        currentHero?.removeEventListener('mousemove', handleMouseMove);
        currentHero?.removeEventListener('mouseleave', handleMouseLeave);
      };
    }, []);

    const scrollToAbout = () => {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    };

    // Create particle elements
    const particles = Array.from({ length: 30 }, (_, i) => {
      const size = Math.random() * 8 + 2;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const hue = Math.random() * 60 + 180; // Blue/cyan range
      
      return (
        <div
          key={i}
          ref={el => el && (particlesRef.current[i] = el)}
          data-x={window.innerWidth * (posX / 100)}
          data-y={window.innerHeight * (posY / 100)}
          className="absolute rounded-full pointer-events-none"
          style={{
            top: `${posY}%`,
            left: `${posX}%`,
            width: `${size}px`,
            height: `${size}px`,
            background: `hsl(${hue}, 100%, 70%)`,
            opacity: Math.random() * 0.4 + 0.1,
            boxShadow: `0 0 ${size * 2}px hsl(${hue}, 100%, 50%)`,
            filter: 'blur(1px)',
            transform: `scale(${Math.random() * 0.5 + 0.5})`
          }}
        />
      );
    });

    return (
      <section
        id="home"
        className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#05051f] via-[#0a0a30] to-[#020217]"
      >
        {/* Enhanced background effects */}
        <div className="absolute inset-0">
          {/* Geometric grid pattern with animation */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:40px_40px]"></div>
          
          {/* Animated nebula effect */}
          <div className="absolute top-1/2 left-1/2 w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_center,rgba(22,78,99,0.15)_0%,transparent_70%)] animate-[pulse_30s_infinite] -translate-x-1/2 -translate-y-1/2"></div>
          
          {/* Interactive particles */}
          {particles}
        </div>

        {/* Floating elements with depth */}
        <div className="absolute inset-0">
          <div className="absolute w-[40rem] h-[40rem] bg-gradient-to-br from-[#00ccaa33] to-[#0066cc33] rounded-full blur-[120px] top-1/4 left-1/4 animate-float-slow"></div>
          <div className="absolute w-[30rem] h-[30rem] bg-gradient-to-br from-[#00aacc33] to-[#00339933] rounded-full blur-[100px] bottom-1/4 right-1/4 animate-float-medium"></div>
        </div>

        {/* Multi-layered ring system */}
        <div className="absolute top-1/2 left-1/2 w-[60rem] h-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-500/20 blur-[1px] animate-[spin_60s_linear_infinite]"></div>
        <div className="absolute top-1/2 left-1/2 w-[65rem] h-[65rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-indigo-500/15 blur-[1px] animate-[spin_80s_linear_infinite_reverse]"></div>
        <div className="absolute top-1/2 left-1/2 w-[70rem] h-[70rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-500/10 blur-[1px] animate-[spin_100s_linear_infinite]"></div>

        {/* Main content with refined animations */}
        <div
          ref={heroRef}
          className="relative text-center z-10 px-4 max-w-5xl mx-auto transition-transform duration-700 ease-out"
        >
          <h1
            ref={textRef}
            className="text-5xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-[#b3f0ff] via-[#a7d2ff] to-[#c2a6ff] bg-clip-text text-transparent tracking-tighter"
          >
            <span className="inline-block transition-all duration-700 hover:scale-105 hover:translate-y-[-3px] hover:drop-shadow-[0_0_40px_rgba(179,240,255,0.7)]">
              ✦AFxLabs
            </span>
          </h1>

          <div className="relative inline-block mb-12">
            <p className="text-xl md:text-3xl text-gray-300 mb-8 font-light tracking-wide relative z-10">
              <span className="inline-block transition-all duration-500 hover:scale-105 hover:text-cyan-300">
                Innovating Digital Experiences
              </span>
            </p>
            <div className="absolute bottom-1 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/70 to-transparent"></div>
            <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-cyan-500 transition-all duration-1000 group-hover:w-full group-hover:left-0"></div>
          </div>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
            <span className="inline-block transition-all duration-700 hover:scale-[1.02] hover:text-gray-300">
              We craft immersive digital solutions at the intersection of design and technology, 
              transforming complex ideas into elegant experiences.
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <button
              onClick={scrollToAbout}
              className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#0a192f] to-[#0f3460] border border-cyan-500/30 rounded-xl text-gray-200 font-medium tracking-wide transition-all duration-500 hover:border-cyan-500/80 hover:shadow-[0_0_30px_rgba(0,245,255,0.3)] hover:scale-[1.05] overflow-hidden"
            >
              <span className="relative z-10">View Portfolio</span>
              <div className="ml-3 h-px w-8 bg-cyan-400 transition-all duration-500 group-hover:w-12 group-hover:bg-cyan-300"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-all duration-700 -translate-x-full group-hover:translate-x-0"></div>
            </button>

            <a
              href="/resume.pdf"
              download="resume.pdf"
              className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#0a192f] to-[#0f3460] border border-indigo-500/30 rounded-xl text-gray-200 font-medium tracking-wide transition-all duration-500 hover:border-indigo-500/80 hover:shadow-[0_0_30px_rgba(79,70,229,0.3)] hover:scale-[1.05] overflow-hidden"
            >
              <Download className="mr-3 transition-transform duration-300 group-hover:rotate-12" size={20} />
              <span className="relative z-10">Download CV</span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/20 to-indigo-500/0 opacity-0 group-hover:opacity-100 transition-all duration-700 -translate-x-full group-hover:translate-x-0"></div>
            </a>

            <a
              href="mailto:contact@afx-labs.com"
              className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#0a192f] to-[#0f3460] border border-purple-500/30 rounded-xl text-gray-200 font-medium tracking-wide transition-all duration-500 hover:border-purple-500/80 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:scale-[1.05] overflow-hidden"
            >
              <span className="relative z-10">Contact Us</span>
              <Send className="ml-3 transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-125" size={20} />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/20 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-all duration-700 -translate-x-full group-hover:translate-x-0"></div>
            </a>
          </div>
        </div>

        {/* Sophisticated scroll indicator with animation */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <div className="text-sm text-gray-500 mb-2 tracking-widest font-light animate-pulse-slow">EXPLORE</div>
          <div 
            className="w-px h-24 bg-gradient-to-b from-cyan-500/80 to-transparent flex justify-center cursor-pointer transition-transform duration-500 hover:scale-y-125"
            onClick={scrollToAbout}
          >
            <div className="w-3 h-3 rounded-full bg-cyan-500 mt-1 animate-bounce">
              <div className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-70"></div>
            </div>
          </div>
        </div>

        {/* Animated connection lines */}
        <div className="absolute top-1/4 left-1/4 w-0.5 h-40 bg-gradient-to-b from-cyan-500/30 to-transparent"></div>
        <div className="absolute bottom-1/4 right-1/4 w-0.5 h-40 bg-gradient-to-t from-indigo-500/30 to-transparent"></div>
        <div className="absolute top-1/3 right-1/3 w-40 h-0.5 bg-gradient-to-l from-purple-500/30 to-transparent"></div>
      </section>
    );
  };

  export default HeroSection;