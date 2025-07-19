import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Loader = ({ onComplete }: { onComplete: () => void }) => {
  const [stage, setStage] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [sparksCount] = useState(() => Math.floor(window.innerWidth / 10));

  useEffect(() => {
    // Preload audio
    audioRef.current = new Audio("/sounds/whoosh.mp3");
    audioRef.current.volume = 0.7;
    audioRef.current.preload = "auto";

    const timers = [
      setTimeout(() => setStage(1), 1800), // Faster transition to stage 1
      setTimeout(() => {
        setStage(2);
        setTimeout(onComplete, 1200); // Shorter exit delay
      }, 4500) // Total duration reduced to 4.5s
    ];

    return () => {
      timers.forEach(clearTimeout);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [onComplete]);

  const playSound = async () => {
    try {
      if (!audioRef.current) return;
      
      // Try Web Audio API first for better timing
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const context = new AudioContext();
      if (context.state === "suspended") await context.resume();

      const source = context.createBufferSource();
      source.buffer = await fetchAudioBuffer("/sounds/whoosh.mp3", context);
      source.connect(context.destination);
      source.start(0);
    } catch (error) {
      // Fallback to HTML5 Audio
      if (audioRef.current) {
        await audioRef.current.play().catch(() => {});
      }
    }
  };

  const fetchAudioBuffer = async (url: string, context: AudioContext) => {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    return await context.decodeAudioData(arrayBuffer);
  };

  useEffect(() => {
    if (stage === 1) {
      playSound(); // Play sound when stage 1 is reached
    }
  }, [stage]);

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden select-none">
      {/* Animated Cosmic Background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/60 to-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      />

      {/* Particle Background */}
      <motion.div 
        className="absolute inset-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full bg-white/10"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, (Math.random() - 0.5) * 100],
              x: [0, (Math.random() - 0.5) * 100],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
          />
        ))}
      </motion.div>

      {/* Stage 0: Spark Burst */}
      {stage === 0 && (
        <div className="absolute inset-0 overflow-hidden flex items-center justify-center">
          {/* Dynamic sparks based on screen size */}
          {Array.from({ length: sparksCount }).map((_, i) => {
            const size = Math.random() * 5 + 2;
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 150 + 50;
            const duration = Math.random() * 0.8 + 0.4;
            
            return (
              <motion.div
                key={`spark-${i}`}
                className="absolute rounded-full bg-gradient-to-br from-[#8A2BE2] via-[#FF00FF] to-[#00FFFF]"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  boxShadow: `0 0 ${size * 3}px ${size * 1.5}px rgba(138, 43, 226, 0.5)`,
                }}
                initial={{ 
                  x: 0,
                  y: 0,
                  opacity: 0,
                  scale: 0.3
                }}
                animate={{
                  x: Math.cos(angle) * distance,
                  y: Math.sin(angle) * distance,
                  opacity: [0, 1, 0],
                  scale: [0.3, 1.5, 0.1],
                }}
                transition={{
                  duration,
                  delay: Math.random() * 0.5,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeOut"
                }}
              />
            );
          })}

          {/* Pulsing Center Symbol */}
          <motion.div
            className="absolute text-8xl md:text-9xl"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1.3, 1],
              rotate: [0, 360],
              textShadow: [
                "0 0 10px rgba(138,43,226,0.5)",
                "0 0 30px rgba(255,0,255,0.7)",
                "0 0 20px rgba(0,255,255,0.6)",
              ],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8A2BE2] via-[#FF00FF] to-[#00FFFF]">
              ✦
            </span>
          </motion.div>
        </div>
      )}

      {/* Stage 1: Logo Reveal */}
      <AnimatePresence mode="wait">
        {stage >= 1 && (
          <motion.div
            className="flex items-center space-x-3 text-7xl md:text-9xl font-extrabold relative"
            initial={{ opacity: 0, scale: 0.6, rotateY: -180 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.8 } }}
            transition={{ 
              duration: 1, 
              ease: [0.4, 0, 0.2, 1],
              rotateY: { duration: 1.2 } 
            }}
          >
            {/* Pulsing Aura */}
            <motion.div
              className="absolute w-40 h-40 rounded-full bg-gradient-to-r from-[#8A2BE2] via-[#FF00FF] to-[#00FFFF] blur-xl opacity-70"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{
                scale: [0.8, 1.3, 0.8],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Animated Logo Elements */}
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-r from-[#8A2BE2] via-[#FF00FF] to-[#00FFFF]"
              initial={{ y: -250, opacity: 0, rotate: -720 }}
              animate={{
                y: 0,
                opacity: 1,
                rotate: 0,
                textShadow: [
                  "0 0 20px rgba(138,43,226,0.8)",
                  "0 0 40px rgba(255,0,255,0.9)",
                  "0 0 30px rgba(0,255,255,0.7)",
                ],
              }}
              transition={{
                duration: 1.2,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              ✦
            </motion.span>

            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-r from-[#8A2BE2] via-[#FF00FF] to-[#00FFFF]"
              initial={{ x: 200, opacity: 0 }}
              animate={{ 
                x: 0, 
                opacity: 1,
                textShadow: [
                  "0 0 10px rgba(138,43,226,0.5)",
                  "0 0 20px rgba(255,0,255,0.7)",
                  "0 0 15px rgba(0,255,255,0.6)",
                ],
              }}
              transition={{
                delay: 0.4,
                duration: 0.8,
                ease: "easeOut",
              }}
            >
              AFxLabs
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stage 2: Exit Animation */}
      <AnimatePresence>
        {stage === 2 && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Loader;
