import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import gsap from "gsap";

// Animated Sparkle Component
const AnimatedSparkle = () => {
  const [glowIntensity, setGlowIntensity] = useState(0);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const animateGlow = () => {
      const intensity = Math.abs(Math.sin(Date.now() / 800));
      setGlowIntensity(intensity);
      animationRef.current = requestAnimationFrame(animateGlow);
    };

    animationRef.current = requestAnimationFrame(animateGlow);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <span className="relative inline-block w-4 h-4">
      <span
        className="absolute inset-0 rounded-full"
        style={{
          filter: `blur(${glowIntensity * 10}px)`,
          background: `radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(192,132,252,0.6) 30%, rgba(99,102,241,0.4) 70%, rgba(6,182,212,0.2) 100%)`,
          opacity: glowIntensity * 0.6,
          transition: 'all 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
          width: '2.5rem',
          height: '2.5rem',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: -1
        }}
      />
      <span
        className="text-purple-300 relative z-10 inline-block transition-all duration-700"
        style={{
          textShadow: `0 0 ${glowIntensity * 10}px rgba(192, 132, 252, 0.7), 
                       0 0 ${glowIntensity * 15}px rgba(22, 25, 189, 0.5)`,
          transform: `scale(${ + glowIntensity * 0.9})`,
          animation: 'spin-diamond 8s linear infinite'
        }}
      >
        ✦
      </span>
    </span>
  );
};

// Navigation Component
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHover, setActiveHover] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  const scrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "py-0 bg-black/80 backdrop-blur-lg" : "py-2"}`}>
      <div className="absolute inset-0 -z-10">
        <div className="w-full h-full bg-gradient-to-r from-purple-600/30 via-pink-500/20 to-cyan-500/30 rounded-xl blur-2xl opacity-60"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="nav-item flex-shrink-0">
            <h1 className="text-2xl font-bold tracking-tight">
              <span className="relative inline-block group transform transition-all duration-700">
                <span className="absolute -inset-2 overflow-hidden rounded-lg">
                  {[...Array(8)].map((_, i) => (
                    <span
                      key={i}
                      className="absolute w-1 h-1 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100 group-hover:animate-float"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${i * 0.2}s`,
                      }}
                    />
                  ))}
                </span>
                <span className="absolute -inset-1 bg-[length:300%_300%] bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 rounded-lg blur opacity-80 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105 animate-gradient group-hover:animate-gradient-fast"></span>
                <span className="relative px-3 py-1.5 bg-black rounded-lg flex items-center group-hover:bg-gray-900 transition-all duration-500 shadow-[0_0_15px_#a855f7] group-hover:shadow-[0_0_25px_#ec4899]">
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-300 bg-clip-text text- font-bold tracking-wider text-xl relative">
                    <span className="relative z-10">MOHAMMED AFREEDHI</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 blur-md opacity-70 group-hover:opacity-90 transition-opacity duration-500"></span>
                  </span>
                  <span className="ml-3 relative">
                    <AnimatedSparkle />
                  </span>
                </span>
              </span>
            </h1>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollTo(item.href)}
                  onMouseEnter={() => setActiveHover(item.label)}
                  onMouseLeave={() => setActiveHover(null)}
                  className="nav-item px-4 py-2 text-sm font-medium relative group transition-all duration-500"
                >
                  <span className={`relative z-10 flex items-center ${activeHover === item.label ? 'text-white' : 'text-gray-300'}`}>
                    {item.label}
                    {activeHover === item.label && (
                      <span className="ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-cyan-400 animate-pulse"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5l7 7-7 7"></path>
                        </svg>
                      </span>
                    )}
                  </span>
                  <span className={`absolute inset-0 rounded-full ${activeHover === item.label ? 'bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20' : ''}`}></span>
                  <span className={`absolute inset-0 rounded-full border border-transparent ${activeHover === item.label ? 'border-pink-500/30' : ''} group-hover:border-cyan-500/30 transition-all duration-500`}></span>
                  <span className={`absolute left-1/2 bottom-0 h-0.5 bg-gradient-to-r from-pink-400 to-cyan-400 rounded-full transition-all duration-500 ${activeHover === item.label ? 'w-[80%] -translate-x-1/2' : 'w-0 left-1/2'}`}></span>
                  {activeHover === item.label && (
                    <>
                      <span className="absolute -top-1 -left-1 w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100"></span>
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 delay-200"></span>
                    </>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="nav-item p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800/50 focus:outline-none transition-all duration-300 relative group"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
              <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 transition-all duration-300"></span>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden animate-slide-down">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 backdrop-blur-lg bg-gradient-to-br from-purple-900/70 to-black/70 rounded-xl mx-2 mt-2 border border-gray-800">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollTo(item.href)}
                onMouseEnter={() => setActiveHover(item.label)}
                onMouseLeave={() => setActiveHover(null)}
                className={`text-gray-300 hover:text-white hover:bg-gray-800/50 block px-3 py-3 rounded-md text-base font-medium transition-all duration-300 w-full text-left flex items-center relative overflow-hidden ${activeHover === item.label ? 'bg-gray-800/30' : ''}`}
              >
                <span className="relative z-10 flex items-center">
                  <span className={`w-2 h-2 rounded-full mr-3 transition-all duration-300 ${activeHover === item.label ? 'bg-gradient-to-r from-pink-400 to-cyan-400 scale-150' : 'bg-cyan-400'}`}></span>
                  {item.label}
                </span>
                {activeHover === item.label && (
                  <>
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100"></span>
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-cyan-400"
                      >
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                    </span>
                  </>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
