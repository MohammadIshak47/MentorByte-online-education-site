import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MathUtils } from 'three';
import { useThree } from '@react-three/fiber';
import { Sphere, Environment } from '@react-three/drei';

const Particles = ({ count = 100 }) => {
  const mesh = useRef<any>();
  const { viewport } = useThree();
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = MathUtils.lerp(
        mesh.current.rotation.x,
        (state.mouse.y * Math.PI) / 10,
        0.1
      );
      mesh.current.rotation.y = MathUtils.lerp(
        mesh.current.rotation.y,
        (state.mouse.x * Math.PI) / 10,
        0.1
      );
    }
  });

  return (
    <group ref={mesh}>
      {[...Array(count)].map((_, i) => (
        <Sphere 
          key={i} 
          args={[0.1, 8, 8]} 
          position={[
            Math.random() * 20 - 10,
            Math.random() * 20 - 10,
            Math.random() * 20 - 10
          ]}
        >
          <meshBasicMaterial 
            color={i % 2 === 0 ? "#4338ca" : "#6366f1"} 
            transparent 
            opacity={0.15}
          />
        </Sphere>
      ))}
    </group>
  );
};

const ThreeJsBackground = () => {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-black to-gray-900">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <Particles count={50} />
        <Environment preset="night" />
      </Canvas>
    </div>
  );
};

export default ThreeJsBackground;