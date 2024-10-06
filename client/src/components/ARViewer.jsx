import React, { useEffect, useRef } from 'react';
import { Canvas,useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import { useDrag } from '@use-gesture/react'; // Import useDrag for cursor gestures

// GLTF Model Component
const GLTFModel = () => {
    const modelRef = useRef(new THREE.Group());
    const rotationRef = useRef({ x: 0, y: 0 }); // Keep track of the current rotation

    // Load the GLTF model
    useEffect(() => {
        const loader = new GLTFLoader();
        loader.load('/SheenChair.glb', (gltf) => {
            modelRef.current.add(gltf.scene); // Add the loaded model to the ref
        }, undefined, (error) => {
            console.error('An error happened while loading the GLTF model:', error);
        });
    }, []);

    // Drag gesture to rotate the model
    const bind = useDrag(({ offset: [x, y] }) => {
        // Rotate model based on cursor drag
        rotationRef.current.x = y / 100; // Adjust the multiplier as needed
        rotationRef.current.y = x / 100;
    });

    // Apply rotation on every frame
    useFrame(() => {
        if (modelRef.current) {
            modelRef.current.rotation.x = rotationRef.current.x; // Rotate around X-axis
            modelRef.current.rotation.y = rotationRef.current.y; // Rotate around Y-axis
        }
    });

    return <group ref={modelRef} {...bind()} />; // Apply drag bindings
};

// Main ARViewer Component
const ARViewer = () => {
    return (
        <Canvas
            shadows
            style={{ height: '100vh', width: '100vw' }}
            camera={{ position: [0, 2, 5], fov: 50 }}
        >
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} castShadow />
            <GLTFModel /> {/* Add the GLTF model to the scene */}
        </Canvas>
    );
};

export default ARViewer;
