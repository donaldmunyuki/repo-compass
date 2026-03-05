import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

function FloatingShape({ position, color, speed, rotationSpeed }: { position: [number, number, number], color: string, speed: number, rotationSpeed: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Rotate the shape
    meshRef.current.rotation.x += rotationSpeed;
    meshRef.current.rotation.y += rotationSpeed;

    // Subtle movement based on mouse
    const { mouse } = state;
    const x = (mouse.x * window.innerWidth) / 50;
    const y = (mouse.y * window.innerHeight) / 50;
    
    // Smoothly interpolate position towards mouse influence
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, position[0] + mouse.x * 2, 0.05);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, position[1] + mouse.y * 2, 0.05);
  });

  return (
    <Float speed={speed} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color={color} wireframe transparent opacity={0.3} />
      </mesh>
    </Float>
  );
}

function Scene() {
  const shapes = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10 - 5
      ] as [number, number, number],
      color: i % 2 === 0 ? '#ea580c' : '#eab308', // Orange and Yellow
      speed: Math.random() * 2 + 1,
      rotationSpeed: Math.random() * 0.01,
    }));
  }, []);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      {shapes.map((shape, i) => (
        <FloatingShape key={i} {...shape} />
      ))}
      <Stars radius={100} depth={50} count={500} factor={4} saturation={0} fade speed={1} />
    </>
  );
}

export function InteractiveBackground() {
  return (
    <div className="fixed inset-0 -z-10 opacity-60 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <Scene />
      </Canvas>
    </div>
  );
}
