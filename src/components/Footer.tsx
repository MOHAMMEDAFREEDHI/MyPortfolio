import { useState, useEffect } from 'react';

const Footer = () => {
  const [glowIntensity, setGlowIntensity] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlowIntensity(prev => (prev === 1 ? 1.2 : 1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-gradient-to-b from-[#05051f] via-[#0a0a30] to-[#020217] py-10 relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_60%,black)]"></div>
        <div className="absolute inset-0 [background-image:radial-gradient(circle_at_center,rgba(180,180,180,0.03)_0.5px,transparent_0.5px)] [background-size:16px_16px]"></div>
      </div>

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="floating-particle absolute rounded-full opacity-10"
          style={{
            width: `${Math.random() * 20 + 5}px`,
            height: `${Math.random() * 20 + 5}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            background: `radial-gradient(circle, 
              ${i % 3 === 0 ? '#6366f1' : i % 3 === 1 ? '#ec4899' : '#3b82f6'}, 
              transparent)`
          }}
        />
      ))}

      {/* Background Gradient */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-purple-500 rounded-full mix-blend-soft-light filter blur-[100px] opacity-30 animate-pulse-slow"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-soft-light filter blur-[120px] opacity-20 animate-pulse-slower"></div>
      </div>

      {/* Top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-600 to-transparent"></div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center">
          <div className="mb-8">
            <h3
              className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 drop-shadow-lg transition-all duration-500 ease-out cursor-pointer hover:animate-text-shine"
              aria-label="AFxLabs"
            >
              <span className="inline-block relative" aria-hidden="true">
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
                  className="mx-1.5 text-purple-300 relative z-10 inline-block transition-all duration-700"
                  style={{
                    textShadow: `0 0 ${glowIntensity * 10}px rgba(192, 132, 252, 0.7), 
                                 0 0 ${glowIntensity * 15}px rgba(99, 102, 241, 0.5)`,
                    transform: `scale(${glowIntensity})`,
                    animation: 'spin-diamond 8s linear infinite'
                  }}
                >
                  ✦
                </span>
              </span>
              AFxLabs
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto mt-4 font-light tracking-wide leading-relaxed">
              Passionate Full Stack Developer with expertise in AI, ML, Blockchain, and modern web technologies. Delivering innovative, secure, and futuristic solutions.
            </p>
          </div>

          <div className="pt-8 border-t border-gray-800/50 relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-purple-600 to-transparent"></div>

            <p className="text-gray-400 flex items-center justify-center text-sm font-light">
              Developed
              <span className="mx-1.5 text-pink-400 animate-pulse" aria-hidden="true">
                ✦
              </span>
              by
              <span className="ml-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent font-medium hover:underline transition duration-300 ease-in-out cursor-pointer">
                Mohammed Afreedhi
              </span>
            </p>
            <p className="text-gray-500 text-xs mt-2 tracking-wider">
              © 2025 Mohammed Afreedhi • All Rights Reserved
            </p>
          </div>
        </div>
      </div>

      {/* Fixed: Standard <style> tag for non-Next.js projects */}
      <style>{`
        @keyframes spin-diamond {
          0% {
            transform: scale(1) rotate(0deg);
          }
          25% {
            transform: scale(1.05) rotate(90deg);
          }
          50% {
            transform: scale(1) rotate(180deg);
          }
          75% {
            transform: scale(1.05) rotate(270deg);
          }
          100% {
            transform: scale(1) rotate(360deg);
          }
        }

        @keyframes float {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
          }
          25% {
            transform: translateY(-20px) translateX(10px) rotate(10deg);
          }
          50% {
            transform: translateY(0) translateX(20px) rotate(0deg);
          }
          75% {
            transform: translateY(-15px) translateX(-10px) rotate(-10deg);
          }
          100% {
            transform: translateY(0) translateX(0) rotate(0deg);
          }
        }

        .animate-float {
          animation: float 15s ease-in-out infinite;
        }

        .floating-particle {
          animation: floating 3s ease-in-out infinite;
        }

        @keyframes floating {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
          100% {
            transform: translateY(0);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes pulse-slower {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.3;
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .animate-pulse-slower {
          animation: pulse-slower 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
