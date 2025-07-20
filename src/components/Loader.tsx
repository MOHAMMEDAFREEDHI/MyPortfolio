import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CosmicLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [stage, setStage] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [sparksCount] = useState(() => Math.floor(window.innerWidth / 8));
  
  // Constellation data
  const constellations = [
    { id: 1, x: 15, y: 20, size: 1.8, delay: 0.2 },
    { id: 2, x: 85, y: 30, size: 1.2, delay: 0.4 },
    { id: 3, x: 25, y: 75, size: 1.5, delay: 0.6 },
    { id: 4, x: 70, y: 65, size: 2.0, delay: 0.8 },
  ];

  useEffect(() => {
    // Preload audio
    audioRef.current = new Audio("/sounds/whoosh.mp3");
    audioRef.current.volume = 0.7;
    audioRef.current.preload = "auto";

    const timers = [
      setTimeout(() => setStage(1), 1600),
      setTimeout(() => {
        setStage(2);
        setTimeout(onComplete, 1000);
      }, 4200)
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
      
      // Try Web Audio API for better timing
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
      playSound();
    }
  }, [stage]);

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden select-none">
      {/* Cosmic Nebula Background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-[#05051f] via-[#0a0a30] to-[#020217]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      />
      
      {/* Animated Nebula Layers */}
      <motion.div className="absolute inset-0">
        <motion.div 
          className="absolute w-[60vw] h-[60vw] bg-gradient-to-br from-[#00aacc33] to-[#0033cc33] rounded-full blur-[100px] top-[20%] left-[15%]"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ delay: 0.3, duration: 1.5, ease: "easeOut" }}
        />
        <motion.div 
          className="absolute w-[40vw] h-[40vw] bg-gradient-to-br from-[#4b008233] to-[#6a5acd33] rounded-full blur-[80px] bottom-[20%] right-[20%]"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
        />
      </motion.div>
      
      {/* Particle System */}
      <motion.div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full bg-cyan-500/20"
            style={{
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0],
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
            }}
            transition={{
              duration: Math.random() * 8 + 6,
              delay: Math.random() * 1.5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeOut"
            }}
          />
        ))}
      </motion.div>
      
      {/* Constellations */}
      {constellations.map((star) => (
        <motion.div
          key={`constellation-${star.id}`}
          className="absolute"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size * 10}px`,
            height: `${star.size * 10}px`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 0.8, 0.3], 
            scale: [0, star.size, star.size * 0.8] 
          }}
          transition={{
            duration: 1.5,
            delay: star.delay,
            ease: "easeOut"
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-[2px]"></div>
          <div className="absolute inset-0 rounded-full bg-cyan-300 animate-ping opacity-30"></div>
        </motion.div>
      ))}

      {/* Stage 0: Cosmic Spark Burst */}
      {stage === 0 && (
        <div className="absolute inset-0 overflow-hidden flex items-center justify-center">
          {Array.from({ length: sparksCount }).map((_, i) => {
            const size = Math.random() * 6 + 2;
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 200 + 50;
            const duration = Math.random() * 0.7 + 0.3;
            const hue = Math.random() * 60 + 180;
            
            return (
              <motion.div
                key={`spark-${i}`}
                className="absolute rounded-full"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  background: `hsl(${hue}, 100%, 70%)`,
                  boxShadow: `0 0 ${size * 3}px hsl(${hue}, 100%, 50%)`,
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
                  scale: [0.3, 1.8, 0.1],
                }}
                transition={{
                  duration,
                  delay: Math.random() * 0.3,
                  ease: "easeOut"
                }}
              />
            );
          })}

          {/* Pulsing Quantum Core */}
          <motion.div
            className="absolute flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.3, 1.3, 1],
              rotate: [0, 360],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="w-40 h-40 rounded-full bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-600 blur-[20px] opacity-60"></div>
            <div className="absolute text-8xl md:text-9xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8A2BE2] via-[#6A5ACD] to-[#00FFFF]">
                ✦
              </span>
            </div>
          </motion.div>
        </div>
      )}

      {/* Stage 1: Logo Quantum Reveal */}
      <AnimatePresence mode="wait">
        {stage >= 1 && (
          <motion.div
            className="flex items-center space-x-3 text-7xl md:text-9xl font-extrabold relative z-20"
            initial={{ opacity: 0, scale: 0.6, rotateY: -180 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.8 } }}
            transition={{ 
              duration: 1, 
              ease: [0.4, 0, 0.2, 1],
              rotateY: { duration: 1.2 } 
            }}
          >
            {/* Quantum Aura */}
            <motion.div
              className="absolute w-48 h-48 rounded-full bg-gradient-to-r from-[#8A2BE2] via-[#6A5ACD] to-[#00FFFF] blur-2xl opacity-70"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{
                scale: [0.8, 1.4, 0.8],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Logo Elements with Quantum Entanglement */}
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-r from-[#8A2BE2] via-[#6A5ACD] to-[#00FFFF]"
              initial={{ y: -250, opacity: 0, rotate: -720 }}
              animate={{
                y: 0,
                opacity: 1,
                rotate: 0,
                textShadow: [
                  "0 0 20px rgba(138,43,226,0.8)",
                  "0 0 40px rgba(106,90,205,0.9)",
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
              className="text-transparent bg-clip-text bg-gradient-to-r from-[#8A2BE2] via-[#6A5ACD] to-[#00FFFF]"
              initial={{ x: 200, opacity: 0 }}
              animate={{ 
                x: 0, 
                opacity: 1,
                textShadow: [
                  "0 0 10px rgba(138,43,226,0.5)",
                  "0 0 20px rgba(106,90,205,0.7)",
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

      {/* Stage 2: Quantum Collapse */}
      <AnimatePresence>
        {stage === 2 && (
          <motion.div
            className="absolute inset-0 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-[#8A2BE2] via-[#6A5ACD] to-[#00FFFF]"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute inset-0 bg-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Loading Progress */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-64 h-1 bg-gray-800 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <motion.div 
          className="h-full bg-gradient-to-r from-[#8A2BE2] via-[#6A5ACD] to-[#00FFFF]"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 3.5, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
};

export default CosmicLoader;