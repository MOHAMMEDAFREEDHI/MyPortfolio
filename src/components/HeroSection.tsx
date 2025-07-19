import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDown, Download, Send } from 'lucide-react';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(heroRef.current, {
        rotationY: x / 50,
        rotationX: -y / 50,
        scale: 1.03,
        ease: 'power2.out',
        duration: 0.3,
      });
    };

    const handleMouseLeave = () => {
      if (!heroRef.current) return;
      gsap.to(heroRef.current, {
        rotationY: 0,
        rotationX: 0,
        scale: 1,
        ease: 'power3.out',
        duration: 0.6,
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

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black"
    >
      {/* Electric Glow Background */}
      <div className="absolute inset-0">
        {/* Electric blue cloud */}
        <div className="absolute w-[200%] h-[200%] bg-gradient-radial from-cyan-400 via-blue-700 to-transparent opacity-25 blur-3xl animate-[pulse_12s_infinite]"></div>
        {/* Violet plasma cloud */}
        <div className="absolute w-[180%] h-[180%] bg-gradient-radial from-purple-500 via-indigo-700 to-transparent opacity-20 blur-2xl animate-[spin_80s_linear_infinite]"></div>
        {/* Cyan energy rings */}
        <div className="absolute w-[160%] h-[160%] bg-gradient-radial from-cyan-500 via-teal-400 to-transparent opacity-15 blur-[120px] animate-[ping_18s_infinite]"></div>
        {/* Base dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#020024] via-[#090979] to-[#00d4ff] opacity-60"></div>
      </div>
 <div className="absolute inset-0">
        <div className="absolute w-96 h-96 bg-gradient-to-br from-[#00ccaa] to-[#0066cc] rounded-full blur-3xl opacity-15 top-12 left-16 animate-pulse-slow"></div>
        <div className="absolute w-72 h-72 bg-gradient-to-br from-[#00aacc] to-[#003399] rounded-full blur-2xl opacity-15 animate-ping-slow bottom-20 right-20"></div>
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_center,rgba(0,170,204,0.05)_0%,transparent_70%)]"></div>
      </div>
      {/* Rotating Electric Ring */}
      <div className="absolute top-1/2 left-1/2 w-[700px] h-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[5px] border-gradient-to-r from-[#00f5ff] via-[#4f46e5] to-[#38bdf8] blur-[120px] opacity-50 animate-spin-slow"></div>

      <div
        ref={heroRef}
        className="relative text-center z-10 px-4 max-w-5xl mx-auto transition-transform duration-500 ease-out"
      >
        <h1
          className="text-6xl md:text-8xl font-extrabold mb-6 bg-gradient-to-r from-[#00f5ff] via-[#4f46e5] to-[#38bdf8] bg-clip-text text-transparent drop-shadow-[0_0_60px_rgba(0,245,255,0.8)] hover:animate-pulse cursor-pointer"
        >
          ✦ AFxLabs
        </h1>

        <p className="text-xl md:text-2xl lg:text-3xl text-gray-200 mb-8">
          Electrifying futuristic experiences
        </p>

        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
          Dive into an interactive portfolio charged with 3D visuals and neon-electric animations.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* Explore My Work */}
          <button
            onClick={scrollToAbout}
            className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#00f5ff] via-[#00d4ff] to-[#4f46e5] rounded-full text-white font-semibold transition-transform duration-500 hover:scale-110 hover:shadow-[0_0_50px_rgba(0,245,255,0.7)]"
          >
            Explore My Work
            <ArrowDown className="ml-2 group-hover:translate-y-1 transition-transform duration-300" size={20} />
          </button>

          {/* Download Resume */}
          <a
            href="/resume.pdf"
            download="resume.pdf"
            className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#38bdf8] via-[#06b6d4] to-[#3b82f6] rounded-full text-white font-semibold transition-transform duration-500 hover:scale-110 hover:shadow-[0_0_50px_rgba(6,182,212,0.6)]"
          >
            <Download className="mr-2 group-hover:rotate-12 transition-transform duration-300" size={20} />
            <span className="relative z-10">Download Resume</span>
          </a>

          {/* Hire Me */}
          <a
            href="mailto:mohammedafreedhi06@gmail.com?subject=I%20want%20to%20Hire%20You&body=Hi%20Afreen,%0D%0AI%20would%20like%20to%20discuss%20a%20project%20with%20you."
            className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#4f46e5] via-[#6366f1] to-[#3b82f6] rounded-full text-white font-semibold transition-transform duration-500 hover:scale-110 hover:shadow-[0_0_50px_rgba(99,102,241,0.7)]"
          >
            Hire Me
            <Send className="ml-2 group-hover:translate-y-1 transition-transform duration-300" size={20} />
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <div className="w-12 h-20 rounded-full border-4 border-gradient-to-r from-[#38bdf8] via-[#06b6d4] to-[#3b82f6] flex justify-center items-center animate-bounce shadow-[0_0_50px_rgba(6,182,212,0.8)]">
          <ArrowDown size={20} className="text-cyan-400 animate-bounce-slow" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
