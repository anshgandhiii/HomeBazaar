import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export function Model(props) {
    const { nodes, materials } = useGLTF('/kitchen-transformed.glb')
    
    // Create a reference to the group that holds the model
    const modelRef = useRef()
  
    // Use the useFrame hook to update rotation on each frame
    useFrame(() => {
      if (modelRef.current) {
        // Rotate the model group around the Y-axis infinitely
        modelRef.current.rotation.y += 0.002 // Adjust this value for faster/slower rotation
      }
    })
  
    return (
      <group ref={modelRef} {...props} dispose={null}>
        <mesh castShadow receiveShadow geometry={nodes.carpet.geometry} material={materials.carpet} />
        <mesh castShadow receiveShadow geometry={nodes.table.geometry} material={materials.walls} />
        <mesh castShadow receiveShadow geometry={nodes.kitchen.geometry} material={materials.walls} />
        <mesh castShadow receiveShadow geometry={nodes.vase.geometry} material={materials.gray} />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.lamp_socket.geometry}
          material={materials.gray}
        />
        <mesh castShadow receiveShadow geometry={nodes.sink.geometry} material={materials.chrome} />
        <mesh castShadow receiveShadow geometry={nodes.vase1.geometry} material={materials.gray} />
        <mesh castShadow receiveShadow geometry={nodes.bottle.geometry} material={materials.glass} />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.cuttingboard.geometry}
          material={materials.walls}
        />
        <mesh castShadow receiveShadow geometry={nodes.lamp.geometry} material={materials.gray} />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.lamp_cord.geometry}
          material={materials.gray}
        />
        <mesh castShadow receiveShadow geometry={nodes.bowl.geometry} material={materials.walls} />
        <mesh castShadow receiveShadow geometry={nodes.walls_1.geometry} material={materials.floor} />
        <mesh castShadow receiveShadow geometry={nodes.walls_2.geometry} material={materials.walls} />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.chairs_1.geometry}
          material={materials.walls}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.chairs_2.geometry}
          material={materials.plastic}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.plant_1.geometry}
          material={materials.potted_plant_01_leaves}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.plant_2.geometry}
          material={materials.potted_plant_01_pot}
        />
      </group>
    )
  }
  
  useGLTF.preload('/kitchen-transformed.glb')