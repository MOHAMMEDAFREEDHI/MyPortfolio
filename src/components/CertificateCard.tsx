import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useInView } from 'react-intersection-observer';
import CertificateIcon from './CertificateIcon';

interface CertificateItem {
  id: number;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  verificationUrl?: string;
  type: 'certificate' | 'license' | 'award';
  description: string;
}

interface CertificateCardProps {
  certificate: CertificateItem;
  index: number;
}

// Function to get dynamic gradient colors based on certificate type
const getGradientColors = (type: 'certificate' | 'license' | 'award') => {
  switch (type) {
    case 'certificate':
      return {
        primary: '#6366f1',
        secondary: '#8b5cf6',
        accent: '#3b82f6'
      };
    case 'license':
      return {
        primary: '#10b981',
        secondary: '#06b6d4',
        accent: '#0ea5e9'
      };
    case 'award':
      return {
        primary: '#f59e0b',
        secondary: '#ec4899',
        accent: '#f97316'
      };
    default:
      return {
        primary: '#8b5cf6',
        secondary: '#ec4899',
        accent: '#3b82f6'
      };
  }
};

const CertificateCard = ({ certificate, index }: CertificateCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isExpanded, setIsExpanded] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const colors = getGradientColors(certificate.type);

  // Initial animation when card enters viewport
  useEffect(() => {
    if (inView && cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 60, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: index * 0.1,
          ease: 'power3.out',
        }
      );
      
      // Icon floating animation
      if (iconRef.current) {
        gsap.to(iconRef.current, {
          y: -10,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.1 + 0.5
        });
      }
    }
  }, [inView, index]);

  // Glow effect on hover
  useEffect(() => {
    if (isHovered && glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 0.5,
        scale: 1.5,
        duration: 0.5,
        ease: "power2.out"
      });
    } else if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 0.3,
        scale: 1,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  }, [isHovered]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
    
    const rotateY = ((x - rect.width / 2) / rect.width) * 20;
    const rotateX = -((y - rect.height / 2) / rect.height) * 20;
    
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        rotationY: rotateY,
        rotationX: rotateX,
        transformPerspective: 1000,
        transformOrigin: 'center',
        ease: 'power2.out',
        duration: 0.3,
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        rotationY: 0,
        rotationX: 0,
        ease: 'power2.out',
        duration: 0.5,
      });
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div ref={ref} className="certificate-card w-full max-w-2xl mx-auto">
      <div
        ref={cardRef}
        onMouseMove={(e) => {
          setIsHovered(true);
          handleMouseMove(e);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          handleMouseLeave();
        }}
        onClick={toggleExpand}
        className="relative rounded-2xl p-6 backdrop-blur-xl bg-gradient-to-br from-gray-900/80 to-black border border-gray-700 shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer"
        style={{
          boxShadow: `0 10px 30px -10px ${colors.primary}80`,
          transformStyle: 'preserve-3d',
          perspective: '1000px'
        }}
      >
        {/* Dynamic Glow Effect */}
        <div
          ref={glowRef}
          className="absolute inset-0 opacity-30 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${colors.primary}40, transparent 70%)`,
            zIndex: 0
          }}
        />
        
        {/* Particle Background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                background: colors.primary,
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 10}s infinite ease-in-out`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: Math.random() * 0.6 + 0.1
              }}
            />
          ))}
        </div>

        {/* Holographic Stripe */}
        <div 
          className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-30"
          style={{
            background: `linear-gradient(90deg, transparent, ${colors.secondary}, ${colors.accent}, ${colors.primary}, transparent)`,
            filter: 'blur(1px)'
          }}
        />

        <div className="flex items-start space-x-4 relative z-10">
          {/* Icon with Halo Effect */}
          <div
            ref={iconRef}
            className={`relative p-4 rounded-full flex-shrink-0 ${
              certificate.type === 'certificate'
                ? 'bg-blue-500/20 text-blue-400'
                : certificate.type === 'license'
                ? 'bg-green-500/20 text-green-400'
                : 'bg-yellow-500/20 text-yellow-400'
            }`}
            style={{
              boxShadow: `0 0 20px ${colors.primary}80`,
              backdropFilter: 'blur(4px)',
              border: `1px solid ${colors.primary}60`
            }}
          >
            {/* Halo effect */}
            <div 
              className="absolute inset-0 rounded-full opacity-30 animate-pulse-slow"
              style={{
                background: `radial-gradient(circle, ${colors.primary}, transparent 70%)`,
                filter: 'blur(5px)',
                zIndex: -1
              }}
            />
            
            {/* If AWS Certificate, show Amazon Logo */}
            {certificate.issuer === 'Amazon Web Services' ? (
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/d/de/Amazon_icon.png"
                alt="Amazon Logo"
                width={32}
                height={32}
                className="rounded-full"
              />
            ) : (
              <CertificateIcon type={certificate.type} size={32} />
            )}
          </div>

          <div className="flex-1">
            {/* Title & Badge */}
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                {certificate.title}
                <div className="text-sm font-normal text-gray-400 mt-1">
                  {certificate.issuer}
                </div>
              </h3>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold shadow-inner ${
                  certificate.type === 'certificate'
                    ? 'bg-gradient-to-r from-blue-600/40 to-blue-400/40 text-blue-200'
                    : certificate.type === 'license'
                    ? 'bg-gradient-to-r from-green-600/40 to-green-400/40 text-green-200'
                    : 'bg-gradient-to-r from-yellow-500/40 to-yellow-300/40 text-yellow-200'
                }`}
                style={{
                  boxShadow: `0 0 10px ${colors.primary}40`,
                  border: `1px solid ${colors.primary}40`
                }}
              >
                {certificate.type.charAt(0).toUpperCase() + certificate.type.slice(1)}
              </span>
            </div>

            {/* Description with expand/collapse */}
            <div className="space-y-2">
              <p 
                className={`text-gray-400 transition-all duration-500 overflow-hidden ${
                  isExpanded ? 'max-h-96' : 'max-h-20'
                }`}
              >
                {certificate.description}
              </p>
              
              <button 
                className="text-sm text-gray-500 hover:text-gray-300 focus:outline-none transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleExpand();
                }}
              >
                {isExpanded ? 'Show Less' : 'Show More'}
              </button>
            </div>

            {/* Date & Verify Link */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-800">
              <div>
                <span className="text-gray-300 text-sm">Issued: {certificate.date}</span>
                {certificate.credentialId && (
                  <p className="text-xs text-gray-500 mt-1">
                    ID: {certificate.credentialId}
                  </p>
                )}
              </div>
              
              {certificate.verificationUrl && (
                <a
                  href={certificate.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center group"
                  style={{
                    background: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary})`,
                    boxShadow: `0 4px 15px ${colors.primary}40`
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  Verify Credential
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
        
        {/* Corner Accents */}
        <div 
          className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-gray-700 rounded-tr-2xl"
          style={{ borderColor: colors.primary }}
        />
        <div 
          className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-gray-700 rounded-bl-2xl"
          style={{ borderColor: colors.secondary }}
        />
      </div>
    </div>
  );
};

export default CertificateCard;
export type { CertificateItem };