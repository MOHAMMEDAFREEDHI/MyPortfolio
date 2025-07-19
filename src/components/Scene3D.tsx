
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Float, Text3D, Center } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const FloatingCube = ({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={color} transparent opacity={0.8} />
      </mesh>
    </Float>
  );
};

const GlowingParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return positions;
  }, []);

  const particlesColors = useMemo(() => {
    const colors = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      const colorIndex = Math.floor(Math.random() * 4);
      if (colorIndex === 0) {
        colors[i * 3] = 1; colors[i * 3 + 1] = 0.4; colors[i * 3 + 2] = 0.7; // Pink
      } else if (colorIndex === 1) {
        colors[i * 3] = 0.7; colors[i * 3 + 1] = 0.3; colors[i * 3 + 2] = 1; // Purple
      } else if (colorIndex === 2) {
        colors[i * 3] = 0.2; colors[i * 3 + 1] = 0.6; colors[i * 3 + 2] = 1; // Blue
      } else {
        colors[i * 3] = 0.1; colors[i * 3 + 1] = 0.9; colors[i * 3 + 2] = 0.9; // Cyan
      }
    }
    return colors;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0005;
      particlesRef.current.rotation.x += 0.0002;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={2000}
          array={particlesPosition}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={2000}
          array={particlesColors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.05} 
        vertexColors 
        transparent 
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const InteractiveLights = () => {
  const lightRef1 = useRef<THREE.PointLight>(null);
  const lightRef2 = useRef<THREE.PointLight>(null);
  const lightRef3 = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (lightRef1.current) {
      lightRef1.current.position.x = Math.sin(time) * 8;
      lightRef1.current.position.z = Math.cos(time) * 8;
      lightRef1.current.intensity = 0.5 + Math.sin(time * 2) * 0.3;
    }
    
    if (lightRef2.current) {
      lightRef2.current.position.x = Math.sin(time * 0.7) * 6;
      lightRef2.current.position.y = Math.cos(time * 0.5) * 4;
      lightRef2.current.intensity = 0.4 + Math.cos(time * 1.5) * 0.2;
    }
    
    if (lightRef3.current) {
      lightRef3.current.position.z = Math.sin(time * 0.3) * 10;
      lightRef3.current.position.y = Math.cos(time * 0.8) * 3;
      lightRef3.current.intensity = 0.3 + Math.sin(time * 3) * 0.2;
    }
  });

  return (
    <>
      <pointLight ref={lightRef1} position={[5, 5, 5]} intensity={0.5} color="#ff6b6b" />
      <pointLight ref={lightRef2} position={[-5, -3, -5]} intensity={0.4} color="#a855f7" />
      <pointLight ref={lightRef3} position={[0, 8, -8]} intensity={0.3} color="#3b82f6" />
    </>
  );
};

const Scene3D = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.2} />
        <InteractiveLights />
        
        <Stars radius={150} depth={80} count={3000} factor={6} saturation={0} fade speed={1.5} />
        <GlowingParticles />
        
        <FloatingCube position={[-4, 3, -2]} color="#ff6b6b" scale={0.6} />
        <FloatingCube position={[4, -2, -4]} color="#a855f7" scale={1.0} />
        <FloatingCube position={[0, 4, -5]} color="#3b82f6" scale={0.4} />
        <FloatingCube position={[-3, -3, -1]} color="#22d3ee" scale={0.7} />
        <FloatingCube position={[5, 2, -3]} color="#f59e0b" scale={0.5} />
        <FloatingCube position={[-2, 1, -6]} color="#10b981" scale={0.8} />
        <FloatingCube position={[2, -4, -2]} color="#ef4444" scale={0.3} />
        
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
      </Canvas>
    </div>
  );
};

export default Scene3D;
