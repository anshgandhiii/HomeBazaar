import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Model } from './Model' // import the Model component

function ViewModel() {
  return (
    <div style={{ width: '100vw', height: '100vh', margin: 0 }}>
      <Canvas
        shadows
        camera={{ position: [1.5, 1.5, 1.5], fov: 90 }} // Adjust camera position and FOV
        style={{ width: '100%', height: '100%' }} // Make the canvas full-screen
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />

        {/* Adjust the model's position if needed */}
        <Model position={[0, 0, 0]} />

        {/* OrbitControls to navigate the scene */}
        <OrbitControls />
      </Canvas>
    </div>
  )
}

export default ViewModel
