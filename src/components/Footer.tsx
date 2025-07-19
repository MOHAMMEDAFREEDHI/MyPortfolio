import { Heart } from 'lucide-react';
import { useState, useEffect } from 'react';

const Footer = () => {
  const [glowIntensity, setGlowIntensity] = useState(1);
  
  // Create pulsing effect for the diamond
  useEffect(() => {
    const interval = setInterval(() => {
      setGlowIntensity(prev => prev === 1 ? 1.2 : 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 py-10 relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_60%,black)]"></div>
        <div className="absolute inset-0 [background-image:radial-gradient(circle_at_center,rgba(180,180,180,0.03)_0.5px,transparent_0.5px)] [background-size:16px_16px]"></div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full opacity-20 animate-float"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              background: `rgba(${Math.random() > 0.5 ? 236 : 139}, ${Math.random() > 0.5 ? 72 : 92}, ${Math.random() > 0.5 ? 153 : 246}, 0.6)`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}
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
              {/* Enhanced diamond symbol with glow effect */}
              <span 
                className="inline-block relative"
                aria-hidden="true"
              >
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
  <span
    className="mx-1.5 text-pink-400 animate-pulse"
    aria-hidden="true"
  >
    ✦
  </span> 
  by
  <span
    className="ml-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent font-medium hover:underline transition duration-300 ease-in-out cursor-pointer"
    aria-label="Mohammed Afreedhi"
  >
    Mohammed Afreedhi
  </span>
</p>
<p className="text-gray-500 text-xs mt-2 tracking-wider">
  © 2025 Mohammed Afreedhi • All Rights Reserved
</p>

          </div>
        </div>
      </div>
      
      <style jsx global>{`
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
      `}</style>
    </footer>
  );
};

export default Footer;