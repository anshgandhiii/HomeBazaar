import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import { useDrag } from '@use-gesture/react'; // For dragging functionality
import { useSpring, animated } from '@react-spring/three'; // For smooth animation

// GLTF Model Component
const GLTFModel = ({ cursorPos }) => {
    const modelRef = useRef(new THREE.Group());
    const [dimensions, setDimensions] = useState({ length: 0, breadth: 0 });
    const [dragPos, setDragPos] = useState({ x: 0, y: 0, z: 0 }); // Track the dragged position

    // Load the GLTF model
    useEffect(() => {
        const loader = new GLTFLoader();
        loader.load('/SheenChair.glb', (gltf) => {
            const model = gltf.scene;
            modelRef.current.add(model); // Add the loaded model to the ref

            // Calculate and store the dimensions of the model
            const box = new THREE.Box3().setFromObject(model);
            const size = new THREE.Vector3();
            box.getSize(size);
            setDimensions({ length: size.x, breadth: size.z });
        }, undefined, (error) => {
            console.error('An error happened while loading the GLTF model:', error);
        });
    }, []);

    // Smooth rotation for parallax effect
    const { rotationX, rotationY } = useSpring({
        rotationX: cursorPos.y * 0.005, // Adjust sensitivity as needed
        rotationY: cursorPos.x * 0.005,
        config: { mass: 1, tension: 280, friction: 30 }, // Configure smooth transition
    });

    // Drag gesture to move the model in the scene
    const bindDrag = useDrag(({ movement: [x, y] }) => {
        setDragPos({ x: x / 100, y: -y / 100, z: 0 }); // Set the dragged position, now considering Y-axis (negative for inverted drag feel)
    });

    // Rotate and move model based on drag position and cursor movement
    useFrame(() => {
        if (modelRef.current) {
            // Apply dragging position on all axes (X, Y, Z)
            modelRef.current.position.set(dragPos.x, dragPos.y, dragPos.z); // Now includes movement on Y-axis

            // Apply rotation from cursor movement
            modelRef.current.rotation.x = rotationX.get();
            modelRef.current.rotation.y = rotationY.get();
        }
    });

    return (
        <animated.group ref={modelRef} {...bindDrag()} /> // Drag bindings applied
    );
};

// Main AR Component
const AR = () => {
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

    // Handle mouse movement to capture cursor position
    const handleMouseMove = (event) => {
        setCursorPos({
            x: event.clientX - window.innerWidth / 2, // Center cursor position relative to screen
            y: event.clientY - window.innerHeight / 2,
        });
    };

    return (
        <div
            onMouseMove={handleMouseMove} // Capture mouse movement
            style={{ position: 'relative', height: '100vh', width: '100vw', overflow: 'hidden' }}
        >
            {/* 3D Canvas */}
            <Canvas
                shadows
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 1, // Keep the canvas behind the image
                }}
                camera={{ position: [0, 2, 5], fov: 50 }}
            >
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} castShadow />
                <GLTFModel cursorPos={cursorPos} /> {/* Pass cursor position to the model */}
            </Canvas>

            {/* Image overlay in front of the 3D model */}
            <img
                src="/bg.jpg" // Update with the path to your image
                alt="Overlay"
                style={{
                    position: 'absolute',
                    top: '10%', // Position image at 10% from the top
                    left: '10%', // Position image at 10% from the left
                    width: '700px', // Set the width of the image
                    height: '700px', // Maintain aspect ratio
                    zIndex: 0, // Keep the image above the canvas
                }}
            />

            {/* Display model dimensions and cursor position */}
            <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 3, color: '#fff' }}>
                <p>Cursor Position: X: {cursorPos.x.toFixed(2)}, Y: {cursorPos.y.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default AR;
