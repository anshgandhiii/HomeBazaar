// ThreeDViewer.jsx
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';

const Sphere = ({ image }) => {
  // Load the texture for the sphere
  const texture = useTexture(image);

  return (
    <mesh>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

const ThreeDViewerComponent = ({ images }) => {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} />
      <OrbitControls />
      {images.map((src, index) => (
        <Sphere key={index} image={src} position={[index * 2 - (images.length - 1), 0, 0]} />
      ))}
    </Canvas>
  );
};

export default ThreeDViewerComponent; // Export the renamed component
